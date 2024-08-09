<?php

namespace App\Entity;

use App\Repository\GalleryImagesRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: GalleryImagesRepository::class)]
class GalleryImages
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $src = null;

    #[ORM\Column]
    private ?string $gallery_name = null;

    #[ORM\Column(nullable: true)]
    private ?int $order_index = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getSrc(): ?string
    {
        return $this->src;
    }

    public function setSrc(string $src): static
    {
        $this->src = $src;

        return $this;
    }

    public function getGalleryName(): ?string
    {
        return $this->gallery_name;
    }

    public function setGalleryName(string $gallery_name): static
    {
        $this->gallery_name = $gallery_name;

        return $this;
    }

    public function getOrderIndex(): ?int
    {
        return $this->order_index;
    }

    public function setOrderIndex(?int $order_index): static
    {
        $this->order_index = $order_index;

        return $this;
    }
}
