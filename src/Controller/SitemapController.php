<?php
namespace App\Controller;

use App\Entity\Pages;
use App\Entity\Project;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use samdark\sitemap\Sitemap;

use function Symfony\Component\DependencyInjection\Loader\Configurator\env;

class SitemapController extends AbstractController
{
    
    public function generateSitemap( EntityManagerInterface $em): bool
    {
        try {
            $isDev = $_ENV["APP_ENV"] === "dev" ? true : false;
            $hostname = 'https://metamorphosefilm.com';
            $sitemapPath = $this->getParameter('kernel.project_dir') . ($isDev ? '/public/sitemap.xml' : "/public_html/sitemap.xml");
            $sitemap = new Sitemap($sitemapPath);
    
            // Static pages
           $pages = $em->getRepository(Pages::class)->findBy(["isActive"=>1]);
            foreach($pages as $page){
                $sitemap->addItem(
                    $hostname . $page->getPage(),
                    $page->getUpdatedAt()->getTimestamp(),
                    Sitemap::MONTHLY,
                    $page->getPriority()
                );
            }
            
            //Videos
                $projects = $em->getRepository(Project::class)->findBy(["isActive"=>1]);
                foreach ($projects as $project) {
                    $sitemap->addItem(
                        $hostname . "/projet/" .  $project->getSlug(),
                        $project->getUpdatedAt()->getTimestamp(),
                        Sitemap::MONTHLY,
                        0.8
                    );
                }
            
            $sitemap->write();
    
            return true;
        } catch (\Throwable $th) {
            return false;
        }
       
    }


    public function updatePage(EntityManagerInterface $em, $page, $priority = null, $isActive = null)
    {
        try {
            $pageRepository = $em->getRepository(Pages::class);
            $pageExists = $pageRepository->findOneBy(["page" => $page]);
            if ($pageExists) {
                $pageExists->setUpdatedAt(new \DateTimeImmutable());
                $pageExists->setActive($isActive ? $isActive : $pageExists->isActive());
                $pageExists->setPriority($priority ? $priority : $pageExists->getPriority());
                $em->persist($pageExists);
               
            } else {
                $pages = new Pages();
                $pages->setPage($page);
                $pages->setUpdatedAt(new \DateTimeImmutable());
                $pages->setActive($isActive);
                $pages->setPriority($priority);
                $em->persist($pages);
            }
            return true;
        } catch (\Throwable $th) {
            return false;
        }
    }
}