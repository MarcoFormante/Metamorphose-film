<?php

namespace App\Controller;

use App\Entity\Project;
use App\Entity\ProjectImages;
use App\Entity\ProjectStaff;
use App\Security\Sanitizer;
use Doctrine\ORM\EntityManagerInterface;
use Exception;
use Psr\Log\LoggerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Http\Attribute\IsGranted;


class ProjectController extends AbstractController
{

    private Sanitizer $sanitizer;
    private LoggerInterface $logger;

    public function __construct(Sanitizer $sanitizer, LoggerInterface $logger)
    {
        $this->sanitizer = $sanitizer;
        $this->logger = $logger;
    }

  /**
     * GET PROJECT DATA
     * @method GET
     * @param int $id
     * @param EntityManagerInterface $em
     * @return JsonResponse 
     * get project data by id
     */
    #[Route('/api/projectData/{id}', name: 'app_project',requirements: ['id' => '^[0-9]+$'], methods: ['GET'])]
    public function index(int $id, EntityManagerInterface $em): JsonResponse
    {
        try {
            $project = $em->getRepository(Project::class)->findOneBy(['id' => $this->sanitizer->sanitize($id,"int")]);
            if(!$project){
                throw new Exception ('Project not found');
            }
            $staff = $project->getProjectStaff();
            $projectImages = $project->getProjectImages();
            $data = [];
            if (!$staff && !$projectImages) {
                throw new Exception ('No staff or images found');
            }
          
                $data["staff"]= [
                    "production" => $staff->getProduction(),
                    "artists" => $staff->getArtists(),
                    "montage" => $staff->getMontage(),
                    "cadrage" => $staff->getCadrage(),
                    "droniste" => $staff->getDroniste(),
                    "ph_plateau" => $staff->getPhPlateau(),
                    "decorateurs" => $staff->getDecorateurs(),
                    "moreStaffFields"=>$staff->getMoreStaffFields(),
                 ];
             
                foreach($projectImages as $projectImage){
                    $data["images"][] = $projectImage->getSrc();
                }
            
            return $this->json(['projectData' => $data],200);
        } catch (\Throwable $th) {
            $this->logger->error("An error occurred while getting project data: {$th->getMessage()}", [
                'exception' => $th
            ]);
            return $this->json(['error' => "error getting project data"],500);
        }
        
    }

      /**
     * GET HOME PROJECTS
     * @method GET
     * @param EntityManagerInterface $em
     * @return JsonResponse 
     * get all projects
     */
    #[Route('/api/home/projects', name: 'app_home_projects', methods: ['GET'])]
    public function HomeProjects(EntityManagerInterface $em){
        try {
            $projects = $em->getRepository(Project::class)->findBy([],['orderIndex' => 'ASC']);
            if(!$projects){
                return $this->json(['message' => 'No projects found'],404);
            }
            $arrayOfProjects = [];

            $filteredProjects = array_filter($projects, function($project){
                return $project->isActive();
            }); 
            foreach($filteredProjects as $project){
                    $arrayOfProjects[] = [
                        "id" => $project->getId(),
                        'name' => $project->getName(),
                        "abrName" => $project->getAbrName(),
                        'youtube_video' => $project->getYoutubeVideo(),
                        'background_video' => $project->getBackgroundVideo(),
                        'collab_with' => $project->getCollabWith(),
                        'isActive' => $project->isActive(),
                        "made_by" => $project->getMadeBy()
                    ];
            }
            return $this->json(['projects' => $arrayOfProjects],200);
        } catch (\Throwable $th) {
            $this->logger->error("An error occurred while getting projects: {$th->getMessage()}", [
                'exception' => $th
            ]);
            return $this->json(['error' => "error getting projects"],500);
        }
    }

      /**
     * GET PROJECT BY NAME
     * @method GET
     * @param EntityManagerInterface $em
     * @param Request $request
     * @return JsonResponse
     * get project by name
     */

    #[Route('/api/projectByName/{name}', name: 'app_project_byName', methods: ['GET'], requirements: ['name' => '^[a-zA-Z0-9-]+$'])]
    public function projectByName( EntityManagerInterface $em, Request $request): JsonResponse
    {
        try {
            $name = $this->sanitizer->sanitize($request->attributes->get('name'),"string");
            if($name === "" || !is_string($name) || is_numeric($name)){
                return $this->json("Project Not Found",404);
            }
            $project = $em->getRepository(Project::class)->findOneBy(['name' => $name]);
    
            if(!$project){
                return $this->json(['error' => 'Project Not found'],404);
            }
            
            $data = [];
            if ($project->isActive()) {
                $data[] = [
                    "id" => $project->getId(),
                    'name' => $project->getName(),
                    "abrName" => $project->getAbrName(),
                    'youtube_video' => $project->getYoutubeVideo(),
                    'background_video' => $project->getBackgroundVideo(),
                    'collab_with' => $project->getCollabWith(),
                    'isActive' => $project->isActive(),
                    "made_by" => $project->getMadeBy()
                ];
            }else{
                return $this->json("Not Found",404);
            }
        } catch (\Throwable $th) {
            $this->logger->error("An error occurred while getting project: {$th->getMessage()}", [
                'exception' => $th
            ]);
            return $this->json(['error' => "error finding project"],500);
        }
        return $this->json(['project' => $data],200);
    }

  /**
     * GET PROJECT DATA FOR ADMIN PAGE
     * @method GET
     * @param EntityManagerInterface $em
     * @param Request $request
     * @param role ROLE_ADMIN
     * @return JsonResponse 
     * get project data for admin page
     */

    #[IsGranted('ROLE_ADMIN')]
    #[Route('/api/admin/projectData/{id}', name: 'app_project_data', methods: ['GET'])]
    public function projectData(EntityManagerInterface $em, Request $request): JsonResponse{
    
        try {
            $id = $this->sanitizer->sanitize($request->attributes->get('id'),"int");
            $project = $em->getRepository(Project::class)->findOneBy(['id' => $id]);
            if(!$project){
                return $this->json(['message' => 'No project found'],404);
            }
            $projectData = [
                "id" => $project->getId(),
                'name' => $project->getName(),
                "abrName" => $project->getAbrName(),
                'youtube_video' => $project->getYoutubeVideo(),
                'background_video' => $project->getBackgroundVideo(),
                'collab_with' => $project->getCollabWith(),
                'isActive' => $project->isActive(),
                "made_by" => $project->getMadeBy(),
                'images' => array_map(function($projectImage){
                    return ["src"=> $projectImage->getSrc(),"id" => $projectImage->getId()];
                }, $project->getProjectImages()->toArray()),
                'staff' => [
                    "production" => $project->getProjectStaff()->getProduction(),
                    "moreStaffFields"=> $project->getProjectStaff()->getMoreStaffFields(),
                    "artists" => $project->getProjectStaff()->getArtists(),
                    "montage" => $project->getProjectStaff()->getMontage(),
                    "cadrage" => $project->getProjectStaff()->getCadrage(),
                    "droniste" => $project->getProjectStaff()->getDroniste(),
                    "phPlateau" => $project->getProjectStaff()->getPhPlateau(),
                    "decorateurs" => $project->getProjectStaff()->getDecorateurs()
                ],
            ];

            return $this->json(['project' => $projectData],200);

        } catch (\Throwable $th) {
            $this->logger->error("An error occurred while getting project data: {$th->getMessage()}", [
                'exception' => $th
            ]);
            return $this->json(['error' => 'Error getting project data'],500);
        }
    }

    /**
     * GET PROJECTS FOR ADMIN PAGE
     * @method GET
     * @param EntityManagerInterface $em
     * @param role ROLE_ADMIN
     * @return JsonResponse 
     * get all projects for admin page
     */

    #[IsGranted('ROLE_ADMIN')]
    #[Route('/api/admin/projects', name: 'app_projects', methods: ['GET'])]
    public function projects(EntityManagerInterface $em): JsonResponse{
       try {
        $projects = $em->getRepository(Project::class)->findBy([],['orderIndex' => 'ASC']);
        if(!$projects){
            return $this->json(['message' => 'No projects found'],200);
        }
        $arrayOfProjects = [];
        foreach($projects as $i => $project){
            $arrayOfProjects[$i] = [
                    "id" => $project->getId(),
                    'name' => $project->getName(),
                    'isActive' => $project->isActive(),
                ];
        }
        return $this->json(['projects' => $arrayOfProjects],200);
        } catch (\Throwable $th) {
            $this->logger->error("An error occurred while getting Home projects: {$th->getMessage()}", [
                'exception' => $th
            ]);
            return $this->json(['error' => 'Error getting projects'],500);
        }
    }


      /**
     * UPDATE PROJECT
     * @method POST
     * @param EntityManagerInterface $em
     * @param Request $request
     * @param role ROLE_ADMIN
     * @return JsonResponse 
     * update project
     */

    #[IsGranted('ROLE_ADMIN')]
    #[Route('/api/admin/project/update', name: 'app_project_update', methods: ['POST'])]
    public function updateProject(EntityManagerInterface $em, Request $request):JsonResponse{
        try {
            $id = $this->sanitizer->sanitize($request->request->get('id'),"int");
            if (!$id){ 
                return $this->json(['error' => 'Project Id is required'], 400);
            }
            $project = $em->getRepository(Project::class)->findOneBy(['id' => $id]);
            if (!$project){
                return $this->json(['error' => 'No Projects found'], 404);
            }
            $data = $request->request->all();
            $images = $request->files->get('images');
            $video = $request->files->get('video');
            $oldVideo = $request->request->get('oldVideo');
            $oldImages = json_decode($request->request->get('oldImages'), true);
            
            if (isset($data['name']) && is_string($data['name']) && $data['name'] !== "") {
                $project->setName($this->sanitizer->sanitize($data['name'],"string"));
            }

            if (isset($data['yt']) && filter_var($data['yt'], FILTER_VALIDATE_URL) && $data['yt'] !== "") {
                $project->setYoutubeVideo($this->sanitizer->sanitize($data['yt'],'url'));
            }

            if (isset($data['collab']) && is_string($data['collab']) && $data['collab'] !== "") {
                $project->setCollabWith($this->sanitizer->sanitize($data['collab'],"string"));
            }
            if (isset($data['abrName']) && is_string($data['abrName']) && $data['abrName'] !== "") {
                $project->setAbrName($this->sanitizer->sanitize($data['abrName'],"string"));
            }
            
            if (isset($data['madeBy']) && is_string($data['madeBy']) && $data['madeBy'] !== "") {
                $project->setMadeBy($this->sanitizer->sanitize($data['madeBy'],"string"));
            }

            if (isset($data['production']) && is_string($data['production']) && $data['production'] !== "") {
                $project->getProjectStaff()->setProduction($this->sanitizer->sanitize($data['production'],"string"));
            }

            if (isset($data['artists']) && is_string($data['artists']) ) {
                $project->getProjectStaff()->setArtists($this->sanitizer->sanitize($data['artists'],"string"));
            }

            if (isset($data['montage']) && is_string($data['montage']) ) {
                $project->getProjectStaff()->setMontage($this->sanitizer->sanitize($data['montage'],"string"));
            }

            if (isset($data['cadrage']) && is_string($data['cadrage']) ) {
                $project->getProjectStaff()->setCadrage($this->sanitizer->sanitize($data['cadrage'],"string"));
            }

            if (isset($data['droniste'])&& is_string($data['droniste']) ) {
                $project->getProjectStaff()->setDroniste($this->sanitizer->sanitize($data['droniste'],"string"));
            }

            if (isset($data['phPlateau'])&& is_string($data['phPlateau']) ) {
                $project->getProjectStaff()->setPhPlateau($this->sanitizer->sanitize($data['phPlateau'],"string"));
            }

            if (isset($data['decorateurs'])&& is_string($data['decorateurs']) ) {
                $project->getProjectStaff()->setDecorateurs($this->sanitizer->sanitize($data['decorateurs'],"string"));
            }
         
            
            if (isset($data['staff']) && is_array(json_decode($data['staff'],true))) {
                $project->getProjectStaff()->setMoreStaffFields([$this->sanitizer->sanitize(json_decode($data['staff'],true),"arrayString")]);
            }else{
                $this->json(['error' => 'Error creating project : More Staff Fields'],400);
            }

            if(isset($data['staff']) && $data['staff'] == "null") {
                $project-> getProjectStaff()->setMoreStaffFields([]);
            }
           
            $RandomVideoName = "";
           
            if ($video) {
                if($video->getSize() > 10000000){
                    return $this->json(['error' => 'Video is too large'], 400);
                }
                if ($video->getMimeType() !== 'video/mp4') {
                    return $this->json(['error' => 'Invalid video type'], 400);
                }
                $RandomVideoName = uniqid("video-", true) . $this->sanitizer->sanitize($video->getClientOriginalName(),'string');
                $project->setBackgroundVideo($RandomVideoName);
               
                if($oldVideo){  
                    if (file_exists("assets/uploads/videos/".$oldVideo)) {
                        unlink("assets/uploads/videos/".$oldVideo);
                    }
                }
            }

            if($images){
                $imageTypes = ['image/webp'];
                $newImageNames = [];
                foreach ($images as $index => $image ) {
                    if (getimagesize($image) === false){
                        return $this->json(['error' => 'Invalid image'], 400);
                    }
                    if (!in_array(getimagesize($image)['mime'], $imageTypes)) {
                        return $this->json(['error' => 'Invalid image type'], 400);
                    }
                    $imageId = $this->sanitizer->sanitize($oldImages[$index],"int");
                    $oldImage = $em->getRepository(ProjectImages::class)->findOneBy(['id' => $imageId]);
                    if($oldImage){
                        if(unlink("assets/uploads/images/projects/".$oldImage->getSrc())){
                            $randomImageName = uniqid("p-img",true);
                            $newImageNames[] = $randomImageName . $this->sanitizer->sanitize($image->getClientOriginalName(),"string");
                            $oldImage->setSrc($newImageNames[$index]);
                        }else{
                            return $this->json(['error' => 'Error updating image'], 500);
                        }
                    }
                    $em->persist($oldImage);
                }
            }

            if ($images) {
                foreach ($newImageNames as $index => $newImageName) {
                    $images[$index]->move("assets/uploads/images/projects/", $newImageName);
                }
            }

            if($video){
                $video->move("assets/uploads/videos/", $RandomVideoName);
            }
           
            $em->persist($project);
            $em->flush();

        } catch (\Throwable $th) {
            $this->logger->error("An error occurred while updating project: {$th->getMessage()}", [
                'exception' => $th
            ]);
            return $this->json(['error' => 'Error updating project: ' . $th->getMessage()], 500);
        }

        return $this->json(['message' => 'success'], 200);
    }


    
    /**
     * CREATE NEW PROJECT
     * @method POST
     * @param EntityManagerInterface $em
     * @param Request $request
     * @return JsonResponse 
     * @param role ROLE_ADMIN
     * create new project
     */


    #[IsGranted('ROLE_ADMIN')]
    #[Route('/api/admin/project/new', name: 'app_project_new', methods: ['POST'])]
    public function newProject(EntityManagerInterface $em, Request $request): JsonResponse
    {
    try {
        $data =  $request->request->all();
        $images = $request->files->get('images');
        $video = $request->files->get('video');
      

        $requiredFields = ['name', 'yt', 'collab', 'abrName', 'images', 'video', 'production', 'madeBy', 'artists', 'montage', 'cadrage', 'droniste', 'phPlateau', 'decorateurs'];
        foreach ($requiredFields as $field) {
            if (!isset($data[$field])  && !isset(${$field})) {
                return $this->json(['error' => 'Missing data: ' . $field], 400);
            }
        }

        $stringFields = ['name', 'yt', 'collab', 'production', 'madeBy', 'artists', 'montage', 'cadrage', 'droniste', 'phPlateau', 'decorateurs'];

        foreach ($stringFields as $field) {
            if (!is_string($data[$field])) {
                return $this->json(['error' => "Invalid data type for $field"], 400);
            }
        }

        if (!filter_var($data['yt'], FILTER_VALIDATE_URL)) {
            return $this->json(['error' => 'Invalid youtube link'], 400);
        }

        if ($video === null) {
            return $this->json(['error' => 'Video is required'], 400);
        }

        // Validate video
        if ($video === null || $video->getSize() > 10000000 || $video->getMimeType() !== 'video/mp4') {
            return $this->json(['error' => 'Video validation failed'], 400);
        }

        /// Validate images
        $imageTypes = ['image/jpeg', 'image/png', 'image/webp'];
        if (is_array($images) && count($images) === 6) {
            foreach ($images as $image) {
                $imageInfo = getimagesize($image);
                if ($imageInfo === false || !in_array($imageInfo['mime'], $imageTypes)) {
                    return $this->json(['error' => 'Image validation failed'], 400);
                }
            }
        } else {
            return $this->json(['error' => 'Invalid number of images'], 400);
        }

      
            $qb = $em->createQueryBuilder();
            $qb->select('MAX(p.orderIndex)')
                ->from(Project::class, 'p');
            $maxOrderIndex = $qb->getQuery()->getSingleScalarResult();
            $orderIndex = $maxOrderIndex ? $maxOrderIndex + 1 : 0;

            $project = new Project();
            $project->setName($this->sanitizer->sanitize($data['name'], 'string'));
            $project->setYoutubeVideo($this->sanitizer->sanitize($data['yt'],'url'));
            $project->setCollabWith($this->sanitizer->sanitize($data['collab'],'string'));
            $project->setActive(false);
            $project->setAbrName($this->sanitizer->sanitize($data['abrName'],'string'));
            $project->setMadeBy($this->sanitizer->sanitize($data['madeBy'],'string'));
            $project->setOrderIndex($this->sanitizer->sanitize($orderIndex,'int'));

            $imageNames = [];
            foreach ($images as $image) {
                $newImage = new ProjectImages();
                $newImage->setProjectId($project);
                $randomImageName = uniqid("p-img",true);
                $imageNames[] =  $randomImageName  . $this->sanitizer->sanitize($image->getClientOriginalName(),'string');
                $newImage->setSrc($randomImageName  . $this->sanitizer->sanitize($image->getClientOriginalName(),'string'));
                $em->persist($newImage);
            }
            
            $staff = new ProjectStaff();
            $staff->setProject($project);
            $staff->setProduction($this->sanitizer->sanitize($data['production'],'string'));
            $staff->setArtists($this->sanitizer->sanitize($data['artists'],'string'));
            $staff->setMontage($this->sanitizer->sanitize($data['montage'],'string'));
            $staff->setCadrage($this->sanitizer->sanitize($data['cadrage'],'string'));
            $staff->setDroniste($this->sanitizer->sanitize($data['droniste'],'string'));
            $staff->setPhPlateau($this->sanitizer->sanitize($data['phPlateau'],'string'));
            $staff->setDecorateurs($this->sanitizer->sanitize($data['decorateurs'],'string'));
            
            if (isset($data['moreStaffFields']) && is_array(json_decode($data["moreStaffFields"],true))) {
                    $staff->setMoreStaffFields([$this->sanitizer->sanitize(json_decode($data['moreStaffFields'],true),'arrayString')]);
            }else{
                $this->json(['error' => 'Error creating project : More Staff Fields'],400);
            }
          
        
        $em->persist($staff);

        foreach ($imageNames as $index => $imageName) {
            $images[$index]->move("assets/uploads/images/projects/", $imageName);
        }
        $randomVideoName = uniqid("video-",true) . $this->sanitizer->sanitize($video->getClientOriginalName(),'string');
        $project->setBackgroundVideo($randomVideoName);
        if ($video->move("assets/uploads/videos/",$randomVideoName)) {
          
            $em->persist($project);
            $em->flush();
         
        }else{
            return $this->json(['message' => 'Error during creating new project,video Error'],200);
        }

    } catch (\Throwable $th) {
        $this->logger->error("An error occurred while creating project: {$th->getMessage()}", [
            'exception' => $th
        ]);
        return $this->json(['error' => 'Error creating project : '], 500);
    }
       
        return $this->json(['message' => 'Project created'],200);
    }


      /**
     * DELETE PROJECT
     * @method DELETE
     * @param EntityManagerInterface $em
     * @param Request $request
     * @param int $id
     * @param role ROLE_ADMIN
     * @return JsonResponse 
     * delete project
     */
  
    #[IsGranted('ROLE_ADMIN')]
    #[Route('/api/admin/project/{id}', name: 'app_project_delete', methods: ['DELETE'],requirements: ['id' => '\d+'])]
    public function deleteProject(EntityManagerInterface $em,int $id):JsonResponse{
        try {
            $project = $em->getRepository(Project::class)->findOneBy(['id' => $this->sanitizer->sanitize($id,"int")]);
            if (!$project) {
                return $this->json(["error" => "Project not found"], 404);
            }
            $images = $project->getProjectImages();
            foreach($images as $image){
                if (file_exists("assets/uploads/images/projects/" . $image->getSrc())) {
                    unlink("assets/uploads/images/projects/" . $image->getSrc());
                }
            }
            $video = $project->getBackgroundVideo();
            if (file_exists("assets/uploads/videos/" . $video)) {
                unlink("assets/uploads/videos/" . $video);
            }
            $em->remove($project);
            $em->flush();
          
            return $this->json(["success" =>"Project Deleted"],200);
        } catch (\Throwable $th) {
            $this->logger->error("An error occurred while deleting the project: {$th->getMessage()}", [
                'exception' => $th
            ]);
            return $this->json(["error" => "An error occurred while deleting the project"], 500);
        }
        
    }


      /**
     * TOGGLE PROJECT ACTIVE STATE
     * @method DELETE
     * @param EntityManagerInterface $em
     * @param Request $request
     * @param role ROLE_ADMIN
     * @return JsonResponse 
     * toggle project active state
     */

    #[IsGranted('ROLE_ADMIN')]
    #[Route('/api/admin/project/active', name: 'app_project_active', methods: ['POST'])]
    public function projectActiveToggle(EntityManagerInterface $em, Request $request):JsonResponse{
        try {
            $id = $this->sanitizer->sanitize($request->request->get("id"),"int");
            
            $project = $em->getRepository(Project::class)->findOneBy(['id' => $id]);
            if(!$project){
                return $this->json("Project not found",404);
            }
            $lastActiveState = $project->isActive();
            $newActiveState = $lastActiveState === false ? true : false;
            $project->setActive($newActiveState);
            $em->persist($project);
            $em->flush();
            return $this->json(["isActive" => $newActiveState],200);
        } catch (\Throwable $th) {
            $this->logger->error("An error occurred while toggling project active state: {$th->getMessage()}", [
                'exception' => $th
            ]);
            return $this->json(["error" => "An error occurred while toggling project active state"], 500);
        }
    }



      /**
     * REORDER PROJECTS
     * @method POST
     * @param EntityManagerInterface $em
     * @param Request $request
     * @param role ROLE_ADMIN
     * @return JsonResponse 
     * reorder projects
     */

    #[IsGranted('ROLE_ADMIN')]
    #[Route('/api/admin/projects/reorder', name: 'app_project_reorder', methods: ['POST'])]
    public function reorder(EntityManagerInterface $em, Request $request): JsonResponse
    {
        try {
            $currId = $this->sanitizer->sanitize($request->request->get("currId"),"int");
            $newId = $this->sanitizer->sanitize($request->request->get("newId"),"int");
            $project = $em->getRepository(Project::class)->findOneBy(['id' => $currId]);
            if (!$project) {
                return $this->json("Project not found", 404);
            }
            $secondProject = $em->getRepository(Project::class)->findOneBy(['id' => $newId]);
            if (!$secondProject) {
                return $this->json("Project not found", 404);
            }
            $tempOrder = $project->getOrderIndex();
            $secondOrder = $secondProject->getOrderIndex();
            $project->setOrderIndex($secondOrder);
            $secondProject->setOrderIndex($tempOrder);
            $em->persist($project);
            $em->persist($secondProject);
            $em->flush();
            return $this->json(["message" => "Projects reordered"], 200);
              
        } catch (\Throwable $th) {
            $this->logger->error("An error occurred while reordering projects: {$th->getMessage()}", [
                'exception' => $th
            ]);
            return $this->json(['error' => 'An error occurred reordering projects'], 500);
        }
    }
}
