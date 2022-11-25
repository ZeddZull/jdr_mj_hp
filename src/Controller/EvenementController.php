<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use App\Repository\EvenementRepository;

class EvenementController extends AbstractController
{
    #[Route('/evenement/{id}', name: 'app_evenement')]
    public function index(EvenementRepository $evenementRepository, $id = null): JsonResponse
    {
        if ($id == null){
            $result = [];
            $data = $evenementRepository->findAll();
            foreach ($data as $key=>$value){
                $result[$key]= new class($value){
                    public $doc;
                    public $id;
                    public function __construct($evenement){
                        $this->id = $evenement->getId();
                        $this->doc = new class($evenement){
                            public $description;
                            public $piece;
                            public function __construct($event){
                                $this->description = $event->getDescription();
                                $this->piece = $event->getPiece()->getId();
                            }
                        };
                    }
                };
            }
            return new JsonResponse($result);
        } else {
            return new JsonResponse(new class($evenementRepository->find($id)){
                public $description;
                public $piece;
                public function __construct($event){
                    $this->description = $event->getDescription();
                    $this->piece = $event->getPiece()->getId();
                }
            });
        }
    }
}
