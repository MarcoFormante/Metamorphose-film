<?php
namespace App\EventListener;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Event\ExceptionEvent;
use Symfony\Component\HttpKernel\Exception\TooManyRequestsHttpException;
use Twig\Environment;

class TooManyRequestsListener {

    private Environment $twig;
        
        public function __construct(Environment $twig)
        {
            $this->twig = $twig;
        }


    public function onKernelException(ExceptionEvent $event): void
    {
       $exception = $event->getThrowable();

       if ($exception instanceof TooManyRequestsHttpException) {
            $response = new Response(
                $this->twig->render('base.html.twig',[
                    "react_component" => 'ErrorHandler'
                ]),
                Response::HTTP_TOO_MANY_REQUESTS
            );
            $event->setResponse($response);
       }
        
    }
}

