import { useEffect } from "react";
import md from "markdown-it";
import Image from "next/image";
import { getCanTypesFromRating } from "../util/util";

export default function Post({ frontmatter, content, onRender }) {
  useEffect(() => {
    if (onRender) {
      onRender();
    }
  }, [onRender]);

  const location = frontmatter.location
    ? frontmatter.location
    : `${frontmatter.neighborhood}, ${frontmatter.borough}`;
  return (
    <article className="prose mx-8">
      <h1 className="mb-2">{frontmatter.title}</h1>
      <h2 className="text-gray-500 text-sm mt-0">{location}</h2>
      <div dangerouslySetInnerHTML={{ __html: md().render(content) }} />
      <footer className="container mt-8 flex justify-center">
        <div>
          {getCanTypesFromRating(frontmatter.rating).map((canType, idx) => (
            <span key={`can_${idx}`} className="inline-block m-1 align-bottom">
              <Image
                className="align-bottom"
                width={40}
                height={71}
                src={`/images/diet-coke/${canType}.svg`}
                alt="Diet Coke can"
                style={{
                  maxWidth: "100%",
                  width: 40,
                  height: 71,
                }}
              />
            </span>
          ))}
        </div>
      </footer>
    </article>
  );
}

export function PostPopUp({ frontmatter, content, iconWidth, iconHeight, onRender }) {
  useEffect(() => {
    if (onRender) {
      onRender();
    }
  }, [onRender]);

  const location = frontmatter.location
    ? frontmatter.location
    : `${frontmatter.neighborhood}, ${frontmatter.borough}`;
  return (
    <article className="prose">
      <h2 className="mb-2">{frontmatter.title}</h2>
      <h2 className="text-gray-500 text-sm mt-0">{location}</h2>
      <footer className="container flex justify-center">
        <div>
          {getCanTypesFromRating(frontmatter.rating).map((canType, idx) => (
            <span key={`can_${idx}`} className="inline-block m-1 align-bottom">
              <Image
                className="align-bottom"
                width={40}
                height={71}
                src={`/images/diet-coke/${canType}.svg`}
                alt="Diet Coke can"
                style={{
                  maxWidth: "100%",
                  width: iconWidth || 40,
                  height: iconHeight || 71,
                }}
              />
            </span>
          ))}
        </div>
      </footer>
    </article>
  );
}
