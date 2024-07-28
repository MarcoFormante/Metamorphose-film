<?php

namespace App\Controller;

use App\Entity\Project;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;

class HomeController extends AbstractController
{
   
    // /** 
    //  * Get all projects for the homepage
    //  * @param EntityManagerInterface $em
    //  * @return JsonResponse
    // */
    // #[Route('/', name: 'app_home', methods: ['GET'],)]
    // public function index(EntityManagerInterface $em): JsonResponse
    // {
    //     $projects = $em->getRepository(Project::class)->findAll();
    //     if(!$projects){
    //         return $this->json(['message' => 'No projects found'],404);
    //     }
       
    //     $arrayOfProjects = [];
       
    //     foreach($projects as  $project){
           
    //         $arrayOfProjects= [
    //             'name' => $project->getName(),
    //             'youtube_video' => $project->getYoutubeVideo(),
    //             'background_video' => $project->getBackgroundVideo(),
    //             'collab_with' => $project->getCollabWith(),
    //         ];
    //     }

    //     return $this->json(['projects' => $arrayOfProjects],200);
    // }
}
