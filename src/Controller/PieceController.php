<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use App\Repository\PieceRepository;

class PieceController extends AbstractController
{
    #[Route('/piece/{id}', name: 'app_piece')]
    public function index(PieceRepository $pieceRepository, $id = null): JsonResponse
    {
        if ($id == null) {
            $result = [];
            $data = $pieceRepository->findAll();
            foreach ($data as $key => $value) {
                $result[$key] = new class ($value) {
                    public $doc;
                    public $id;
                    public function __construct($piece) {
                        $this->id = $piece->getId();
                        $this->doc = new class($piece) {
                            public $nom;
                            public $longueur;
                            public $largeur;
                            public $x;
                            public $y;
                            public function __construct($value) {
                                $this->nom = $value->getNom();
                                $this->longueur = $value->getLongeur();
                                $this->largeur = $value->getLargeur();
                                $this->x = $value->getX();
                                $this->y = $value->getY();
                            }
                        };
                    }
                };
            }
            return new JsonResponse($result);
        }
        return new JsonResponse(new class($pieceRepository->find($id)){
            public $nom;
            public $longueur;
            public $largeur;
            public $x;
            public $y;
            public function __construct($value) {
                $this->nom = $value->getNom();
                $this->longueur = $value->getLongeur();
                $this->largeur = $value->getLargeur();
                $this->x = $value->getX();
                $this->y = $value->getY();
            }
        });
    }
}
