<?php
namespace App\Controller;

use App\Entity\Project;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Routing\RouterInterface;
use samdark\sitemap\Sitemap;
use samdark\sitemap\Index;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Http\Attribute\IsGranted;

class SitemapController extends AbstractController
{
    #[Route('/api/generate-sitemap', name: 'app_generate_sitemap', methods: ['POST'])]
    public function generateSitemap(Request $request, EntityManagerInterface $em): Response
    {
        $data = $request->request->all();
        
        $homelastTime = new \DateTime("2024-10-29T00:39:38+01:00");
        $homeTimeStamp = $homelastTime->getTimestamp();

        $galerielastTime = new \DateTime("2024-10-29T00:39:38+01:00");
        $galerieTimeStamp = $galerielastTime->getTimestamp();

        $serviceslastTime = new \DateTime("2024-10-29T00:39:38+01:00");
        $servicesTimeStamp = $serviceslastTime->getTimestamp();

        if(isset($data['home'])){
            $homeTimeStamp = time();
        }

        if(isset($data['galerie'])){
            $galerieTimeStamp = time();
        }

        if(isset($data['services'])){
            $servicesTimeStamp = time();
        }


        $hostname = 'https://yourwebsite.com';
        $sitemapPath = $this->getParameter('kernel.project_dir') . '/public/sitemap.xml';
        $sitemap = new Sitemap($sitemapPath);

        // Aggiungi URL statici
        $sitemap->addItem($hostname . "/", $homeTimeStamp, Sitemap::MONTHLY, 1.0);
        $sitemap->addItem($hostname . "/galerie",  $galerieTimeStamp, Sitemap::MONTHLY, 0.8);
        $sitemap->addItem($hostname . "/services", $servicesTimeStamp, Sitemap::MONTHLY, 1.0);
        $sitemap->addItem($hostname . "/a-propos", $servicesTimeStamp, Sitemap::MONTHLY, 1.0);
        
        if(isset($data['videos'])){
            $projects = $em->getRepository(Project::class)->findBy(["isActive"=>1]);
            foreach ($projects as $project) {
                $sitemap->addItem(
                    $hostname . "/projet/" .  urlencode($project->getName()),
                    time(),
                    Sitemap::MONTHLY,
                    0.7
                );
            }
        }else{
            $projects = $em->getRepository(Project::class)->findBy(["isActive"=>1]);
            foreach ($projects as $project) {
                $sitemap->addItem(
                    $hostname . "/projet/" .  urlencode($project->getName()),
                    $project->getUpdatedAt()->getTimestamp(),
                    Sitemap::MONTHLY,
                    0.7
                );
            }
        }
        
        // Scrivi la sitemap nel filesystem
        $sitemap->write();

        return new Response('Sitemap generated successfully!', Response::HTTP_OK);
    }
}