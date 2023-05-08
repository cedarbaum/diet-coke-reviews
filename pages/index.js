import fs from "fs";
import matter from "gray-matter";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { SearchContext } from "../components/SearchContext";
import { getCanTypesFromRating } from "../util/util";
import PostMedia from "../components/PostMedia";
import md from "markdown-it";
import useSound from "use-sound";
const NUM_IMAGES_TO_PRIORITIZE = 8;

export async function getStaticProps() {
  const files = fs.readdirSync("posts");
  const posts = files.map((fileName) => {
    const slug = fileName.replace(".md", "");
    const readFile = fs.readFileSync(`posts/${fileName}`, "utf-8");
    const { data: frontmatter, content } = matter(readFile);
    return {
      slug,
      frontmatter,
      content,
    };
  });

  return {
    props: {
      posts,
    },
  };
}

export default function Home({ posts }) {
  const { search, setIsInNotFoundState } = useContext(SearchContext);
  const [toggledCards, setToggledCards] = useState(new Set([]));
  const [play] = useSound("/sounds/can-open.mp3");

  function matchesSearch(frontmatter, search) {
    if (search === undefined || search === "") {
      return true;
    }

    const searchLowerCase = search.toLowerCase();
    return (
      frontmatter.title.toLowerCase().includes(searchLowerCase) ||
      frontmatter.neighborhood.toLowerCase().includes(searchLowerCase) ||
      frontmatter.borough.toLowerCase().includes(searchLowerCase) ||
      frontmatter.tags?.some((tag) =>
        tag.toLowerCase().includes(searchLowerCase)
      )
    );
  }

  const filteredAndSortedPosts = posts
    .filter(({ frontmatter }) => matchesSearch(frontmatter, search))
    .sort((p1, p2) => {
      const p1Date = Date.parse(p1.frontmatter.date);
      const p2Date = Date.parse(p2.frontmatter.date);
      return p2Date - p1Date;
    });

  useEffect(() => {
    setIsInNotFoundState(filteredAndSortedPosts?.length === 0);
  }, [filteredAndSortedPosts]);

  const openCard = (slug) => {
    play();
    setToggledCards((prev) => {
      return new Set(prev.add(slug));
    });
  };

  const closeCard = (slug) => {
    setToggledCards((prev) => {
      prev.delete(slug);
      return new Set(prev);
    });
  };

  return filteredAndSortedPosts.length > 0 ? (
    <div className="mt-6 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 p-4 w-full h-fit gap-8">
      {filteredAndSortedPosts.map(({ slug, frontmatter, content }, idx) => (
        <div className="flip-card-container w-full h-full" key={slug}>
          <div
            className={`flip-card w-full h-full ${
              toggledCards.has(slug) ? "flip-card-active cursor-pointer" : ""
            }`}
            onClick={() =>
              toggledCards.has(slug) ? closeCard(slug) : undefined
            }
          >
            <div className="card-front">
              <article className="flex flex-col translate-x-0 w-full h-full">
                <div className="flex flex-col grow container">
                  <div className="h-[340px] w-full">
                    <PostMedia
                      frontmatter={frontmatter}
                      priority={idx < NUM_IMAGES_TO_PRIORITIZE}
                    />
                  </div>
                  <div
                    className="grow flex flex-col cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      openCard(slug);
                    }}
                  >
                    <header className="grow">
                      <div className="flex justify-between items-baseline leading-tight p-2">
                        <h1 className="text-lg font-bold">
                          {frontmatter.title}
                        </h1>
                        <p className="text-grey-darker text-sm">
                          {frontmatter.date}
                        </p>
                      </div>
                      <div className="pl-2">
                        <h2 className="text-gray-500 text-sm">
                          {frontmatter.neighborhood}, {frontmatter.borough}
                        </h2>
                      </div>
                    </header>
                    <footer className="p-2">
                      <CardCanRating rating={frontmatter.rating} />
                    </footer>
                  </div>
                </div>
              </article>
            </div>
            <div className="card-back">
              <article className="flex flex-col h-full w-full">
                <div className="flex flex-col grow container">
                  <div className="grow prose p-4">
                    <header>
                      <h1 className="mb-0">{frontmatter.title}</h1>
                      <h2 className="text-gray-500 text-sm mt-1">
                        {frontmatter.neighborhood}, {frontmatter.borough}
                      </h2>
                    </header>
                    <div
                      dangerouslySetInnerHTML={{ __html: md().render(content) }}
                    />
                  </div>
                  <footer className="p-2">
                    <CardCanRating rating={frontmatter.rating} />
                  </footer>
                </div>
              </article>
            </div>
          </div>
        </div>
      ))}
    </div>
  ) : (
    <div className="container flex flex-col flex-1 mb-4 md:justify-center items-center">
      <div>
        <Image
          width={100}
          height={178}
          src="/images/diet_pepsi_icon.svg"
          alt="Diet Pepsi can"
          style={{
            maxWidth: "100%",
            width: 100,
            height: 178,
          }}
        />
      </div>
      <div className="mt-3">
        <h1 className="font-bold text-lg">Nothing found - Is Pepsi OK?</h1>
      </div>
    </div>
  );
}

function CardCanRating({ rating }) {
  return (
    <div className="flex justify-center">
      {getCanTypesFromRating(rating).map((canType, idx) => (
        <span key={`can_${idx}`} className="inline-block m-1">
          <Image
            width={25}
            height={45}
            src={`/images/diet-coke/${canType}.svg`}
            alt="Diet Coke can"
            style={{
              maxWidth: "100%",
              width: 25,
              height: 45,
            }}
          />
        </span>
      ))}
    </div>
  );
}
