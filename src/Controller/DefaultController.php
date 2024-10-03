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
        return $this->render('base.html.twig');
    }
}