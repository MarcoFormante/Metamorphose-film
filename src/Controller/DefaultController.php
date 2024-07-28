<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class DefaultController extends AbstractController
{
   
    #[Route("/{reactRouting}", name: 'app_default', defaults: ['reactRouting' => null],requirements: ['reactRouting' => '^(?!api|_(profiler|wdt)).*'])]
    public function index(): Response
    {
        return $this->render('base.html.twig');
    }
}
