import fs from "fs";
import matter from "gray-matter";
import md from "markdown-it";
import Image from "next/Image";

import { getCanTypesFromRating } from "../../util/util";

export async function getStaticPaths() {
  const files = fs.readdirSync("posts");
  const paths = files.map((fileName) => ({
    params: {
      slug: fileName.replace(".md", ""),
    },
  }));
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { slug } }) {
  const fileName = fs.readFileSync(`posts/${slug}.md`, "utf-8");
  const { data: frontmatter, content } = matter(fileName);
  return {
    props: {
      frontmatter,
      content,
    },
  };
}

export default function PostPage({ frontmatter, content }) {
  return (
    <article className="prose mx-8">
      <h1 className="mb-2">{frontmatter.title}</h1>
      <h2 className="text-gray-500 text-sm mt-0">
        {frontmatter.neighborhood}, {frontmatter.burrough}
      </h2>
      <div dangerouslySetInnerHTML={{ __html: md().render(content) }} />
      <footer className="container mt-8 flex justify-center">
        <div>
          {getCanTypesFromRating(frontmatter.rating).map((canType, idx) => (
            <span key={`can_${idx}`} className="inline-block m-1 align-bottom">
              <Image
                className="align-bottom"
                width={40}
                height={canType === "half-can" ? 35.3167 : 71.2833}
                src={`/images/diet-coke/${canType}.svg`}
                alt={"Diet Coke can"}
              />
            </span>
          ))}
        </div>
      </footer>
    </article>
  );
}
