<?php

namespace App\Controller;

use App\Repository\UserRepository;
use Firebase\JWT\JWT;
use Psr\Log\LoggerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Cookie;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Session\SessionInterface;
use Symfony\Component\HttpKernel\Exception\TooManyRequestsHttpException;
use Symfony\Component\RateLimiter\RateLimiterFactory;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Csrf\CsrfToken;
use Symfony\Component\Security\Csrf\CsrfTokenManagerInterface;

class LoginController extends AbstractController
{

      /**
     * GET CSRF TOKEN
     * @method GET
     * @param SessionInterface $sessionInterface
     * @param CsrfTokenManagerInterface $csrfTokenManager
     * @return JsonResponse
     * set cookie
     */
    #[Route('/api/csrfToken', name: 'app_csrfToken', methods: ['GET'])]
    public function getCSRF(CsrfTokenManagerInterface $csrfTokenManager,SessionInterface $sessionInterface,RateLimiterFactory $apiLimiter,Request $request): JsonResponse
    {
        $limiter = $apiLimiter->create($request->getClientIp());
        if (false === $limiter->consume(1)->isAccepted()) {
            throw new TooManyRequestsHttpException();
        }
        $csrfToken = $csrfTokenManager->getToken("authenticate")->getValue();
    
        $response = new JsonResponse(['success' => 'CSRF token generated', 'csrfToken' => $csrfToken], 200);
        
        $response->headers->setCookie(new Cookie(session_name(), $sessionInterface->getId()));
    
        return $response;
    }

     /**
     * LOGIN
     * @method POST
     * @param Request $request
     * @param UserRepository $userRepository
     * @param CsrfTokenManagerInterface $csrfTokenInterface
     * @param LoggerInterface $logger
     * @return JsonResponse $token
     */
    #[Route('/api/login', name: 'app_login',methods: ['POST'])]
    public function index(Request $request,UserRepository $userRepository,CsrfTokenManagerInterface $csrfTokenInterface,LoggerInterface $logger,RateLimiterFactory $apiLimiter): JsonResponse
    {
        try {
            $limiter = $apiLimiter->create($request->getClientIp());
            if (false === $limiter->consume(1)->isAccepted()) {
                throw new TooManyRequestsHttpException();
            }
            $data = $request->request->all();
            $csrfToken = $data['csrfToken'];
            if (!is_string($csrfToken) || !$csrfTokenInterface->isTokenValid(new CsrfToken('authenticate', $csrfToken))) {
                    return $this->json(['error' => 'Invalid CSRF tosken'], 400);
                }
            
            $user = $userRepository->findOneBy(['username' => $data['username']]);
            if (!$user) {
                return $this->json([
                    "error" => "User not found"
                ],404);
            }

            if (!password_verify($data['password'], $user->getPassword())) {
                return $this->json([
                    "error" => "Invalid username or password"
                ],401);
            }


            $payload = [
                "username" => $data['username'],
                "JWT_P" => $_ENV['JWT_P']
            ];
            $key = $_ENV['JWT_KEY'];

            $token = JWT::encode($payload,$key, 'HS256');
            return $this->json([
                "token" => $token
            ],200);

        } catch (\Throwable $th) {
            $logger->error($th->getMessage());
            return $this->json(['error' => 'An error occurred during LOGIN'], 500);
        }
    }
}
