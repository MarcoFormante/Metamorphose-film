<?php

namespace App\Controller;

use App\Entity\GalleryImages;
use App\Security\Sanitizer;
use Doctrine\ORM\EntityManagerInterface;
use Psr\Log\LoggerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\HttpKernel\Exception\TooManyRequestsHttpException;
use Symfony\Component\RateLimiter\RateLimiterFactory;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Http\Attribute\IsGranted;
use Symfony\Contracts\Cache\TagAwareCacheInterface;
use Symfony\Contracts\Cache\ItemInterface;

class GalleryController extends AbstractController
{

    private Sanitizer $s;
    private LoggerInterface $logger;
    private TagAwareCacheInterface $cache;
    public function __construct(Sanitizer $s, LoggerInterface $logger,TagAwareCacheInterface $cache)
    {
        $this->s = $s;
        $this->logger = $logger;
        $this->cache = $cache;
    }   
    /**
     * GET IMAGES OF GALLERY
     * @param string $name
     * @method GET
     * @param EntityManagerInterface $em
     * @return JsonResponse
     */
    #[Route('/api/gallery/{name}', name: 'app_gallery', methods: ['GET'], requirements: ['name' => '^[a-zA-Z0-9_]+$'])]
    public function index(string $name, EntityManagerInterface $em,Request $request,RateLimiterFactory $apiLimiter): JsonResponse
    {
        try {
            $limiter = $apiLimiter->create($request->getClientIp());
            if (false === $limiter->consume(1)->isAccepted()) {
                throw new TooManyRequestsHttpException();
            }
            $offset = $this->s->sanitize($request->query->get('offset'),"int");
            $limit = 10;
            $totalImages = false;
            $galleryName = strtolower($this->s->sanitize($name,"string"));
            $images = [];
            $gallery = $this->cache->get('gallery_' . $galleryName . '_offset_' . $offset, function (ItemInterface $item) use ($em, $galleryName,$limit,$offset,$images,$totalImages) {
                $item->expiresAfter(86400);
                $item->tag(['gallery_'.$galleryName]);
                if ((int)$offset < 1) {
                    $imagesCount = $em->createQueryBuilder()
                    ->select('COUNT(g)')
                    ->from(GalleryImages::class, 'g')
                    ->where('g.gallery_name = :gallery_name')
                    ->setParameter('gallery_name', $galleryName)                
                    ->getQuery()
                    ->getResult();
                    $this->logger->info('Gallery images retrieved:');
                    if(is_integer($imagesCount[0][1])){
                        $totalImages = $imagesCount[0][1];
                    }
                }
                $galleryImages =  $em->getRepository(GalleryImages::class)->findBy(['gallery_name' => $galleryName], ['order_index' => 'ASC'],$limit, $offset * $limit);
                foreach ($galleryImages as $gallery) {
                    if ($this->isGranted("ROLE_ADMIN")) {
                        $images[] = ["src" => $gallery->getSrc(),"id" => $gallery->getId()];
                    }else{
                        $images[] = ["src" => $gallery->getSrc(),];
                    }
                }
                return ['images' => $images,"total" => $totalImages];
    
            });
            
            if (!$gallery) {
                return $this->json(['error' => 'An error occurred getting Gallery' . $name], 204);
            }
            
            return $this->json(['images' => $gallery['images'], 'total' => $gallery['total']],200)->setMaxAge(86400)->setPublic();
        } catch (\Throwable $th) {
            $this->logger->error($th->getMessage());
            return $this->json(['error' => 'An error occurred getting Gallery' . $name], $th->getCode());
        }
       
    }


    #[Route('/api/admin/gallery', name: 'app_gallery_admin', methods: ['POST'], requirements: ['name' => '^[a-zA-Z0-9_]+$'])]
    public function getAdminGallery(EntityManagerInterface $em,Request $request): JsonResponse
    {
        $name = $request->request->get('galleryName');
      
        try {
            
            $gallery = $em->getRepository(GalleryImages::class)->findBy(['gallery_name' => $this->s->sanitize($name,"string")], ['order_index' => 'ASC']);

            if (!$gallery) {
                throw new NotFoundHttpException('The gallery was not found.');
            }
           
            $images = [];
    
            foreach ($gallery as $gallery) {
                if ($this->isGranted("ROLE_ADMIN")) {
                    $images[] = ["src" => $gallery->getSrc(),"id" => $gallery->getId()];
                }else{
                    $images[] = ["src" => $gallery->getSrc(),];
                }
            }
        } catch (\Throwable $th) {
            $this->logger->error($th->getMessage());
            return $this->json(['error' => 'An error occurred getting Gallery'], 500);
        }
       
        return $this->json(['images' => $images],200);
    }


    /**
     * DELETE IMAGE OF GALLERY
     * @method DELETE
     * @param Request $request ID
     * @param EntityManagerInterface $em
     * @return JsonResponse
     * @role ROLE_ADMIN
     */
    #[IsGranted('ROLE_ADMIN')]
    #[Route('/api/admin/gallery/image/{id}', name: 'app_image_delete', methods: ['DELETE'], requirements: ['id' => '^[0-9]+$'])]
    public function deleteImage(Request $request, EntityManagerInterface $em): JsonResponse
    {
        try {
            if ($request->get('id') === null || $request->get('id') === ""){
                return $this->json(['error' => 'Id is required'], 400);
            }
            $image = $em->getRepository(GalleryImages::class)->findOneBy(['id' => $this->s->sanitize($request->get('id'),"int")]);
            $galleryName = strtolower($image->getGalleryName());
            if (!$image) {
                return $this->json(['error' => 'Image not found'], 404);
            }
            if (file_exists("assets/uploads/images/galleries/".$image->getSrc())) {
                unlink("assets/uploads/images/galleries/".$image->getSrc());
            }
            $em->remove($image);
            $em->flush();
            $this->cache->invalidateTags(['gallery_'.$galleryName]);
        } catch (\Throwable $th) {
            $this->logger->error($th->getMessage());
            return $this->json(['error' => 'An error occurred deleting Image'], 500);
        }
        return $this->json(['success'=>"Image has been deleted"], 200);
    }


     /**
     * ADD IMAGES IN GALLERY
     * @method POST
     * @param Request $galleryName, $images
     * @param EntityManagerInterface $em
     * @return JsonResponse
     * @role ROLE_ADMIN
     */
    #[IsGranted('ROLE_ADMIN')]
    #[Route('/api/admin/gallery/addImages', name: 'app_gallery_image_add', methods: ['POST'] )]
    public function addImages(Request $request, EntityManagerInterface $em): JsonResponse
    {
        try {
        
            $galleries=[
                "Concert",
                "Tournage",
                "Studio",
                "Evenementiel"
            ];
            $galleryName = $this->s->sanitize($request->get('galleryName'),"string");
            if (!$galleryName) {
                return $this->json(['error' => 'Gallery name is required'], 400);
            }
            if (!is_string($galleryName)) {
                return $this->json(['error' => 'Gallery name is required'], 400);
            }
            if(!in_array($galleryName, $galleries)){
                return $this->json(['error' => 'Gallery name is invalid'], 400);
            }
        
            $images = $request->files->get('images');
            
            if (!$images) {
                return $this->json(['error' => 'Images are required'], 400);
            }
            $imageTypes = ['image/jpeg', 'image/png', 'image/webp'];
        
            $errors = [];
            $qb = $em->createQueryBuilder();
            $qb->select('MAX(g.order_index)')
                ->from(GalleryImages::class, 'g')
                ->where('g.gallery_name = :galleryName')
                ->setParameter('galleryName', $galleryName);
            $maxOrderIndex = $qb->getQuery()->getSingleScalarResult();
            $orderIndex = $maxOrderIndex ? $maxOrderIndex + 1 : 0;
        
        
            foreach ($images as $index => $image) {
                if (getimagesize($image) === false){
                    return $this->json(['error' => 'Invalid image'], 400);
                }
                if (!in_array(getimagesize($image)['mime'], $imageTypes)) {
                    return $this->json(['error' => 'Invalid image type'], 400);
                }
                $newImage = new GalleryImages();
                $newImage->setGalleryName($galleryName);
                $randomName = uniqid("g-img",true);
                $newImage->setSrc($randomName . $this->s->sanitize($image->getClientOriginalName(),"string"));
                $newImage->setOrderIndex($orderIndex + $index);
                $em->persist($newImage);
                if(!$image->move("assets/uploads/images/galleries/", $randomName .  $this->s->sanitize($image->getClientOriginalName(),"string"))){
                    $errors[] = ['error' => 'Image not uploaded. name: ' . $this->s->sanitize($image->getClientOriginalName(),"string")];
                }
            }
            if ($errors) {
            return  $this->json(["error"=>$errors], 400);
            }
            $em->flush();
            $this->cache->invalidateTags(['gallery_'.strtolower($galleryName)]);
        }catch (\Throwable $th) {
            $this->logger->error($th->getMessage());
            return $this->json(['error' => 'An error occurred adding Images'], 500);
        }
        return $this->json(['success' => 'Images added'], 200);
    }


     /**
     * REORDER IMAGES IN GALLERY
     * @method POST
     * @param Request $currID, $newID (int)
     * @param EntityManagerInterface $em
     * @return JsonResponse
     * @role ROLE_ADMIN
     */
    #[IsGranted('ROLE_ADMIN')]
    #[Route('/api/admin/gallery/image/reorder', name: 'app_image_reorder', methods: ['POST'])]
    public function reorderImage(Request $request, EntityManagerInterface $em,): JsonResponse
    {
    try {
        $currId = $this->s->sanitize($request->request->get("currId"),"int");
        $newId =  $this->s->sanitize($request->request->get("newId"),"int");
        $firstImage = $em->getRepository(GalleryImages::class)->findOneBy(['id' => $currId]);
        if (!$firstImage) {
            return $this->json("First Image not found", 404);
        }
        $secondImage = $em->getRepository(GalleryImages::class)->findOneBy(['id' => $newId]);
        if (!$secondImage) {
            return $this->json("Second Image not found", 404);
        }
        $galleryName = strtolower($firstImage->getGalleryName());
        $tempOrder = $firstImage->getOrderIndex();
        $secondOrder = $secondImage->getOrderIndex();
        $firstImage->setOrderIndex($secondOrder);
        $secondImage->setOrderIndex($tempOrder);
        $em->persist($firstImage);
        $em->persist($secondImage);
        $em->flush();
        $this->cache->invalidateTags(['gallery_'. $galleryName]);
    } catch (\Throwable $th) {
        $this->logger->error($th->getMessage());
        return $this->json(['error' => 'An error occurred reordering Images'], 500);
       }
        return $this->json(["message" => "Projects reordered"], 200);
    }
}
