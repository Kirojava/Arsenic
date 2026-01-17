import { useGallery } from "@/hooks/use-gallery";
import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

export default function Gallery() {
  const { data: images, isLoading } = useGallery();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  if (isLoading) {
    return (
      <div className="pt-24 min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="pt-24 min-h-screen bg-background pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">Conference Gallery</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Memories from our past editions. Capturing moments of diplomacy, debate, and delight.
          </p>
        </div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {images?.map((image) => (
            <div 
              key={image.id} 
              className="break-inside-avoid relative group rounded-xl overflow-hidden cursor-pointer"
              onClick={() => setSelectedImage(image.url)}
            >
              <img 
                src={image.url} 
                alt={image.caption || "Gallery image"} 
                className="w-full h-auto transform transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <p className="text-white font-medium">{image.caption}</p>
              </div>
            </div>
          ))}
          
          {/* Fallback placeholders if no data */}
          {(!images || images.length === 0) && [1, 2, 3, 4, 5, 6].map((i) => (
             <div key={i} className="break-inside-avoid relative rounded-xl overflow-hidden bg-card border border-white/5 h-64 flex items-center justify-center text-muted-foreground">
               No images yet
             </div>
          ))}
        </div>

        <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
          <DialogContent className="max-w-5xl bg-transparent border-none p-0 shadow-none">
            {selectedImage && (
              <img 
                src={selectedImage} 
                alt="Full size" 
                className="w-full h-auto rounded-lg shadow-2xl"
              />
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
