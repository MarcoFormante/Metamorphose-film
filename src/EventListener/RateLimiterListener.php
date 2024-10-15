<?php
namespace App\EventListener;
use Symfony\Component\HttpKernel\Event\RequestEvent;
use Symfony\Component\HttpKernel\Exception\TooManyRequestsHttpException;
use Symfony\Component\RateLimiter\RateLimiterFactory;

class RateLimiterListener
{

    private RateLimiterFactory $apiLimiter;

    public function __construct(RateLimiterFactory $apiLimiter)
    {
        $this->apiLimiter = $apiLimiter;
    }

    public function onKernelRequest(RequestEvent $event):void
    {
        $request = $event->getRequest();
        
        $limiter = $this->apiLimiter->create($request->getClientIp());
        if (false === $limiter->consume(1)->isAccepted()) {
            throw new TooManyRequestsHttpException();
        }
        
    }
}