export default function SchemaGallery({ images,name }) {
    const schemaData = {
      "@context": "https://schema.org",
      "@type": "ImageGallery",
      name: `Galerie ${name} - Metamorphose Film`,
      url: "https://metamorphosefilm.com/gallery",
      publisher: {
        "@type": "Organization",
        name: "Metamorphose Film",
        logo: {
          "@type": "ImageObject",
          url: "https://metamorphosefilm.com/android-chrome-192x192.png",
          width: 192,
          height: 192
        }
      },
      image: images.map(image => ({
        "@type": "ImageObject",
        contentUrl: `https://metamorphosefilm.com/assets/uploads/gallery/${image.filename}`,
        name: image.name || "Foto di produzione",
        uploadDate: new Date().toISOString().split("T")[0]
      }))
    };
  
    return (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemaData)
        }}
      />
    );
  }