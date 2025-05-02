export default function SchemaHome({ projects }) {
  
    
    return (
        <script type="application/ld+json"
        dangerouslySetInnerHTML={{
            __html: JSON.stringify(projects.map(project => ({
                "@context": "https://schema.org",
                "@type": "VideoObject",
                name: project.name,
                description: `Realizzato da Metamorphose Film`,
                contentUrl: `https://metamorphosefilm.com/assets/uploads/videos/${project.background_video}`,
                embedUrl: project.youtube_video?.includes("watch?v=")
                  ? project.youtube_video.replace("watch?v=", "embed/")
                  : project.youtube_video || "",
                uploadDate: new Date().toISOString(),
                publisher: {
                  "@type": "Organization",
                  name: "Metamorphose Film",
                  logo: {
                    "@type": "ImageObject",
                    url: "https://metamorphosefilm.com/android-chrome-192x192.png",
                    width: 192,
                    height: 192
                  }
                }
              })))
          }}
        />
      );
}