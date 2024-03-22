import React from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import GradientLoadingPlaceholder from "./GradientLoadingPlaceholder";

export default function PostMedia({ frontmatter, priority }) {
  const [emblaRef] = useEmblaCarousel(undefined, [Autoplay()]);
  const [isLoaded, setIsLoaded] = React.useState(false);

  return (
    <div className="overflow-hidden h-full" ref={emblaRef}>
      <div className="flex h-full relative">
        {(
          frontmatter.media ?? [
            { path: frontmatter.socialImage, mediaType: "img" },
          ]
        ).map(({ path, mediaType }, idx) => (
          <div
            key={`media_${idx}`}
            className="relative w-full h-full flex-[0_0_100%]"
          >
            {!isLoaded && mediaType !== "video" && (
              <div className="absolute z-50 top-0 left-0 w-full h-full">
                <GradientLoadingPlaceholder />
              </div>
            )}
            {mediaType === "video" ? (
              <video
                muted
                autoPlay
                loop
                playsInline
                className="w-full h-full object-cover"
              >
                <source src={`${path}.mp4`} />
                <source src={`${path}.webm`} />
                <source src={`${path}.mov`} />
              </video>
            ) : (
              <Image
                fill
                style={{ objectFit: "cover" }}
                alt={frontmatter.title}
                src={`/${path}`}
                priority={priority}
                onLoad={() => setIsLoaded(true)}
                sizes="(max-width: 768px) 100vw,
                       (max-width: 1200px) 50vw,
                       33vw"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
