<?php

namespace App\Controller;

use App\Entity\GalleryImages;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Http\Attribute\IsGranted;

class GalleryController extends AbstractController
{
    /**
     * GET IMAGES OF GALLERY
     * @param string $name
     * @method GET
     * @param EntityManagerInterface $em
     * @return JsonResponse
     */
    #[Route('/api/gallery/{name}', name: 'app_gallery', methods: ['GET'], requirements: ['name' => '^[a-zA-Z0-9_]+$'])]
    public function index(string $name, EntityManagerInterface $em): JsonResponse
    {
        $gallery = $em->getRepository(GalleryImages::class)->findBy(['gallery_name' => $name]);

        if (!$gallery) {
            throw new NotFoundHttpException('The gallery was not found.');
        }
       
        $images = [];

        foreach ($gallery as $gallery) {
            if ($this->isGranted("ROLE_ADMIN")) {
                $images[] = ["src" => $gallery->getSrc(),"id" => $gallery->getId()];
            }else{
                $images[] = ["src" => $gallery->getSrc()];
            }
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
    public function deleteImage(Request $request, EntityManagerInterface $em,): JsonResponse
    {
        if ($request->get('id') === null){
            return $this->json(['error' => 'Id is required'], 400);
        }

        $image = $em->getRepository(GalleryImages::class)->findOneBy(['id' => $request->get('id')]);
        if (!$image) {
            return $this->json(['error' => 'Image not found'], 404);
        }

        if (file_exists("assets/uploads/images/galleries/".$image->getSrc())) {
            unlink("assets/uploads/images/galleries/".$image->getSrc());
        }
        $em->remove($image);
        $em->flush();
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
        // // $gallery = $em->getRepository(GalleryImages::class)->findBy(['gallery_name' => $request->get('galleryName')]);
        $galleries=[
            "Concert",
            "Tournage",
            "Studio",
            "Evenements"
        ];

        $galleryName = $request->get('galleryName');
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
    
        foreach ($images as $image) {
            if (getimagesize($image) === false){
                return $this->json(['error' => 'Invalid image'], 400);
            }
            if (!in_array(getimagesize($image)['mime'], $imageTypes)) {
                return $this->json(['error' => 'Invalid image type'], 400);
            }
            $newImage = new GalleryImages();
            $newImage->setGalleryName($request->get('galleryName'));
            $randomName = uniqid("g-img",true);
            $newImage->setSrc($randomName . $image->getClientOriginalName());
            $em->persist($newImage);
         
            if(!$image->move("assets/uploads/images/galleries/", $randomName .  $image->getClientOriginalName())){
                $errors[] = ['error' => 'Image not uploaded. name: ' . $image->getClientOriginalName()];
            }
        }
        if ($errors) {
           return  $this->json(["error"=>$errors], 400);
        }
        $em->flush();
        return $this->json(['success' => 'Images added'], 200);
    }
}
