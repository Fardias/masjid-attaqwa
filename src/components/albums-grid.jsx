"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Edit,
  MoreHorizontal,
  Trash,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter } from "@/app/components/ui/card";
import useEmblaCarousel from "embla-carousel-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { deleteAlbum, getAllAlbums } from "@/lib/services/albumsService";
import useSWR from "swr";

const fetchImages = () => getAllAlbums();

function AlbumCarousel({ images }) {
  const [emblaRef, emblaApi] = useEmblaCarousel();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
  const scrollNext = () => emblaApi && emblaApi.scrollNext();

  return (
    <div className="relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {images?.map((image, index) => (
            <div key={index} className="relative flex-[0_0_100%] aspect-[4/3]">
              <Image
                src={image || "/images/placeholder.jpg"}
                alt={`Image ${index + 1}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>
      {images?.length > 1 && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
          {images.map((_, index) => (
            <div
              key={index}
              className={cn(
                "w-2 h-2 rounded-full",
                index === selectedIndex ? "bg-white" : "bg-white/50"
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function AlbumsGrid({ filter = "all" }) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [albumToDelete, setAlbumToDelete] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const {
    data: albums,
    error,
    mutate: refreshAlbums,
  } = useSWR("albums", fetchImages);

  const handleDelete = (album) => {
    setAlbumToDelete(album);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (albumToDelete) {
      await deleteAlbum(albumToDelete.id);

      if (Array.isArray(albumToDelete.images_url)) {
        for (const imgPath of albumToDelete.images_url) {
          const filename = imgPath.split("/").pop();

          await fetch("/api/deleteImages", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ filename }),
          });
        }
      }

      refreshAlbums();
      setIsDeleteDialogOpen(false);
      setAlbumToDelete(null);
    }
  };

  const filteredAlbums =
    albums?.filter(
      (album) =>
        (filter === "all" || album.category === filter) &&
        album.title.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

  return (
    <div className="space-y-4">
      <div className="flex items-center">
        <Input
          placeholder="Cari album..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-sm"
        />
      </div>

      {!albums ? (
        <div className="py-12 text-center text-muted-foreground">
          Loading...
        </div>
      ) : filteredAlbums.length === 0 ? (
        <div className="py-12 text-center text-muted-foreground">
          Tidak ada album yang ditemukan
        </div>
      ) : error ? (
        <div className="py-12 text-center text-muted-foreground">
          Error loading albums
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredAlbums.map((album) => (
            <Card key={album.id} className="overflow-hidden">
              <AlbumCarousel images={album.images_url} />
              <Badge
                className={cn(
                  "absolute top-2 right-2 z-10",
                  album.category === "social_activities"
                    ? "bg-amber-500"
                    : "bg-amber-600"
                )}
              >
                {album.category === "social_activities"
                  ? "Kegiatan Sosial"
                  : "Hari Besar Islam"}
              </Badge>
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold truncate mb-1">
                  {album.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-1">
                  {new Date(album.date).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
                <p className="text-sm">{album.imageCount} foto</p>
              </CardContent>
              <CardFooter className="flex justify-between p-4 pt-0">
                <Button variant="outline" size="sm">
                  Lihat Album
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="w-4 h-4" />
                      <span className="sr-only">Menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Aksi</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleDelete(album)}
                      className="text-red-600"
                    >
                      <Trash className="w-4 h-4 mr-2" />
                      Hapus
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Apakah Anda yakin?</AlertDialogTitle>
            <AlertDialogDescription>
              Tindakan ini tidak dapat dibatalkan. Album ini akan dihapus secara
              permanen dari server.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Hapus
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
