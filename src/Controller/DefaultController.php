<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Cookie;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Session\SessionInterface;
use Symfony\Component\Routing\Annotation\Route;

class DefaultController extends AbstractController
{
    #[Route("/{reactRouting}", name: 'app_default', defaults: ['reactRouting' => null], requirements: ['reactRouting' => '^(?!api|_(profiler|wdt)).*'])]
    public function index(Request $request, SessionInterface $sessionInterface): Response
    {
        $response = new Response();
        $sessionName = $sessionInterface->getName();

        // Start the session if it is not already started
        if (!$sessionInterface->isStarted()) {
            $sessionInterface->start();
        }

        // Check if the session cookie exists
        if (!$request->cookies->has($sessionName)) {
            // Create a new session cookie
            $cookie = new Cookie(
                $sessionName,
                $sessionInterface->getId(),
                0, // Session cookie
                '/',
                null,
                true,
                true,
                false,
                Cookie::SAMESITE_STRICT
            );
            $response->headers->setCookie($cookie);
        }

        // Render the template and set the content of the response
        $response->setContent($this->renderView('base.html.twig'));

        return $response;
    }
}