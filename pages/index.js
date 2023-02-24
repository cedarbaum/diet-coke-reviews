import fs from "fs";
import matter from "gray-matter";
import Link from "next/link";
import Image from "next/image";
import { useContext } from "react";
import { SearchContext } from "../components/SearchContext";
import { getCanTypesFromRating } from "../util/util";

export async function getStaticProps() {
  const files = fs.readdirSync("posts");

  const posts = files.map((fileName) => {
    const slug = fileName.replace(".md", "");
    const readFile = fs.readFileSync(`posts/${fileName}`, "utf-8");
    const { data: frontmatter } = matter(readFile);
    return {
      slug,
      frontmatter,
    };
  });

  return {
    props: {
      posts,
    },
  };
}

export default function Home({ posts }) {
  const { search } = useContext(SearchContext);

  function matchesSearch(frontmatter, search) {
    if (search === undefined || search === "") {
      return true;
    }

    const searchLowerCase = search.toLowerCase();
    return (
      frontmatter.title.toLowerCase().includes(searchLowerCase) ||
      frontmatter.neighborhood.toLowerCase().includes(searchLowerCase) ||
      frontmatter.borough.toLowerCase().includes(searchLowerCase)
    );
  }

  const filteredAndSortedPosts = posts
    .filter(({ frontmatter }) => matchesSearch(frontmatter, search))
    .sort((p1, p2) => {
      const p1Date = Date.parse(p1.frontmatter.date);
      const p2Date = Date.parse(p2.frontmatter.date);
      return p2Date - p1Date;
    });

  return filteredAndSortedPosts.length > 0 ? (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 p-4 md:p-0">
      {filteredAndSortedPosts
        .filter(({ frontmatter }) => matchesSearch(frontmatter, search))
        .map(({ slug, frontmatter }) => (
          <article
            key={slug}
            className="border border-gray-200 m-2 rounded-xl outline-1 outline-slate-200 overflow-hidden flex flex-col"
          >
            <Link href={`/post/${slug}`}>
              <a className="flex flex-col grow container">
                <div
                  style={{
                    position: "relative",
                    width: "auto",
                    height: "340px",
                  }}
                >
                  {" "}
                  <Image
                    layout="fill"
                    objectFit="cover"
                    alt={frontmatter.title}
                    src={`/${frontmatter.socialImage}`}
                  />
                </div>
                <header className="grow">
                  <div className="flex justify-between items-baseline leading-tight p-2 md:p-2">
                    <h1 className="text-lg font-bold">{frontmatter.title}</h1>
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
                  <div className="flex justify-center">
                    {getCanTypesFromRating(frontmatter.rating).map(
                      (canType, idx) => (
                        <span key={`can_${idx}`} className="inline-block m-1">
                          <Image
                            width={25}
                            height={44.55}
                            src={`/images/diet-coke/${canType}.svg`}
                            alt="Diet Coke can"
                          />
                        </span>
                      )
                    )}
                  </div>
                </footer>
              </a>
            </Link>
          </article>
        ))}
    </div>
  ) : (
    <div className="container flex flex-col mb-4 justify-center items-center">
      <div>
        <Image
          width="100px"
          height="178.2px"
          src="/images/diet_pepsi_icon.svg"
          alt="Diet Pepsi can"
        />
      </div>
      <div className="mt-3">
        <h1 className="font-bold text-lg">Nothing found - Is Pepsi OK?</h1>
      </div>
    </div>
  );
}
