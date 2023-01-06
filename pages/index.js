import fs from "fs";
import matter from "gray-matter";
import Link from "next/link";
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
  const { search, setSearch } = useContext(SearchContext);
  console.log(`search = ${search}`);

    function matchesSearch(frontmatter, search) {
        if (search === undefined || search === '') {
            return true
        }

        const searchLowerCase = search.toLowerCase()
        return frontmatter.title.toLowerCase().includes(searchLowerCase) ||
          frontmatter.neighborhood.toLowerCase().includes(searchLowerCase) ||
          frontmatter.burrough.toLowerCase().includes(searchLowerCase)
    }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 p-4 md:p-0">
        {posts.filter(({frontmatter}) => matchesSearch(frontmatter, search)).map(({ slug, frontmatter }) => (
        <article
          key={slug}
          className="border border-gray-200 m-2 rounded-xl shadow-lg overflow-hidden flex flex-col"
        >
          <Link href={`/post/${slug}`}>
            <a>
              <img
                width={650}
                height={340}
                alt={frontmatter.title}
                src={`/${frontmatter.socialImage}`}
              />
              <header>
                <div className="flex items-center justify-between leading-tight p-2 md:p-2">
                  <h1 className="text-lg font-bold">{frontmatter.title}</h1>
                  <p className="text-grey-darker text-sm">{frontmatter.date}</p>
                </div>
                <div className="pl-2">
                  <h2 className="text-gray-500 text-sm">
                      {frontmatter.neighborhood}, {frontmatter.burrough}
                  </h2>
                </div>
              </header>
              <footer className="p-2">
                {getCanTypesFromRating(frontmatter.rating).map((canType) => (
                  <span className="inline-block">
                    <img
                      className="m-1"
                      width={25}
                      src={`/images/diet-coke/${canType}.svg`}
                    />
                  </span>
                ))}
              </footer>
            </a>
          </Link>
        </article>
      ))}
    </div>
  );
}
