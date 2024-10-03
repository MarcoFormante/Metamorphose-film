<?php
namespace App\EventListener;
use Symfony\Component\HttpKernel\Event\RequestEvent;
use Symfony\Component\Security\Core\Exception\InvalidCsrfTokenException;
use Symfony\Component\Security\Csrf\CsrfToken;
use Symfony\Component\Security\Csrf\CsrfTokenManagerInterface;

class MyCsrfTokenListener
{

    private $csrfTokenManager;

    public function __construct(CsrfTokenManagerInterface $csrfTokenManager)
    {
        $this->csrfTokenManager = $csrfTokenManager;
    }

    public function onKernelRequest(RequestEvent $event):void
    {
        $request = $event->getRequest();
        if (!preg_match('#^/admin#', $request->getPathInfo())) {
            return;
        }
        if (!in_array($request->getMethod(), [ "POST",'PUT', 'DELETE', 'PATCH'], true)) {
            return;
        }
      
        $token = $request->cookies->get('XSRF-TOKEN');
        if (!$token) {
          
            throw new InvalidCsrfTokenException();
        }
        if (!$this->csrfTokenManager->isTokenValid(new CsrfToken('authenticate', $token))) {
            throw new InvalidCsrfTokenException();
        }

        
    }
}