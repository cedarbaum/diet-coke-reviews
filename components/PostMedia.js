import React from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

export default function PostMedia({ frontmatter, priority }) {
  const [emblaRef] = useEmblaCarousel(undefined, [Autoplay()]);

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
            {mediaType === "mp4" ? (
              <video autoPlay loop>
                <source src={`/${path}`} />
              </video>
            ) : (
              <Image
                fill
                style={{ objectFit: "cover" }}
                alt={frontmatter.title}
                src={`/${path}`}
                priority={priority}
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
