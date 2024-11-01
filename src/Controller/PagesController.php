<?php

namespace App\Controller;

use App\Entity\Pages;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;

class PagesController extends AbstractController
{
    public function createPages(EntityManagerInterface $em): Response
    {
        try{
            $this->handleNewPage($em, "/", 1.0, true);
            $this->handleNewPage($em, "/galerie",0.5, true);
            $this->handleNewPage($em, "/galerie/studio",0.7, true);
            $this->handleNewPage($em, "/galerie/concert",0.7, true);
            $this->handleNewPage($em, "/galerie/tournage",0.7, true);
            $this->handleNewPage($em, "/galerie/evenementiel",0.7, true);
            $this->handleNewPage($em, "/services",0.6, true);
            $this->handleNewPage($em, "/services/drone",0.3, true);
            $this->handleNewPage($em, "/a-propos",0.3, true);
        }catch(\Exception $e){
            return $this->json($e->getMessage());
        }
        $em->flush();
        
        return $this->json("Pages Updated for sitemap");
    }

    public function updateTimeStamp(EntityManagerInterface $em): Response
    {
        $pageRepository = $em->getRepository(Pages::class);
        $pages = $pageRepository->findAll();
        foreach ($pages as $page) {
            $page->setUpdatedAt(new \DateTimeImmutable());
            $em->persist($page);
        }
        $em->flush();
        return $this->json("Timestamps Updated");
    }

    private function handleNewPage($em, $page, $priority, $isActive)
    {
        $pageRepository = $em->getRepository(Pages::class);
        $pageExists = $pageRepository->findOneBy(["page" => $page]);
        if ($pageExists) {
            $pageExists->setUpdatedAt(new \DateTimeImmutable());
            $pageExists->setActive($isActive);
            $pageExists->setPriority($priority);
            $em->persist($pageExists);
            return;
        }else{
            $pages = new Pages();
            $pages->setPage($page);
            $pages->setUpdatedAt(new \DateTimeImmutable());
            $pages->setActive($isActive);
            $pages->setPriority($priority);
            $em->persist($pages);
        }
    }
}
