<?php
namespace App\Security;

use App\Entity\User;
use App\Repository\UserRepository;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Exception\AuthenticationException;
use Symfony\Component\Security\Core\Exception\CustomUserMessageAuthenticationException;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Csrf\CsrfTokenManagerInterface;
use Symfony\Component\Security\Http\Authenticator\AbstractAuthenticator;
use Symfony\Component\Security\Http\Authenticator\Passport\Badge\UserBadge;
use Symfony\Component\Security\Http\Authenticator\Passport\Credentials\CustomCredentials;
use Symfony\Component\Security\Http\Authenticator\Passport\Passport;
use Psr\Log\LoggerInterface;



class TokenAuthenticator extends AbstractAuthenticator
{
//    private CsrfTokenManagerInterface $csrfTokenManager;

    public function __construct(
        private UserRepository $userRepository,
        private CsrfTokenManagerInterface $csrfTokenManager ,
        private LoggerInterface $logger
    ) {
        $this->csrfTokenManager = $csrfTokenManager;
        $this->logger = $logger;
    }
   

    public function supports(Request $request): ?bool
    {
    
        return $request->headers->has('Authorization');
    }

    public function authenticate(Request $request,): Passport
    {
       
        
        
        $apiToken = $request->headers->get('Authorization');
        if (null === $apiToken) {
            // Code 401 "Unauthorized"
            throw new CustomUserMessageAuthenticationException('No API token provided');
        }
       
        $apiToken = str_replace('Bearer ', '', $apiToken);
     
        $key = $_ENV['JWT_KEY'];
        $decodedToken = JWT::decode($apiToken, new Key($key, 'HS256'));
        if (!$decodedToken) {
            throw new CustomUserMessageAuthenticationException('Invalid API token');
        }
        $username = $decodedToken->username;
       
        return new Passport(
            new UserBadge($username, function (string $userIdentifier): ?UserInterface {
                return $this->userRepository->findOneBy(['username' => $userIdentifier]);
            }),
           new CustomCredentials(
               function ($credentials, User $user) {
                   return true;
               },
              $apiToken
           )
        );
    }

    public function onAuthenticationSuccess(Request $request, TokenInterface $token, string $firewallName): ?Response
    {
       
        return null;
    }

    public function onAuthenticationFailure(Request $request, AuthenticationException $exception): ?Response
    {
        $data = [
            'message' => strtr($exception->getMessageKey(), $exception->getMessageData())
           
        ];
        $this->logger->error($exception->getMessage(),$data);

        return new JsonResponse("Error during Authentication", Response::HTTP_UNAUTHORIZED);
    }


    // public function supportsRememberMe(): bool
    // {
    //     return true;
    // }
}