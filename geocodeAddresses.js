// scriptWithYargs.js

const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const fs = require("fs");
const matter = require("gray-matter");
const argv = yargs(hideBin(process.argv)).argv;
const { Client } = require("@googlemaps/google-maps-services-js");
const turf = require("@turf/turf");
const client = new Client({});

require("dotenv").config({ path: [".env.local", ".env"] });

const defaultRegion = process.env.NEXT_PUBLIC_DEFAULT_REGION;

// Use `.option` to define options
yargs(hideBin(process.argv))
  .usage("Usage: $0 [options]")
  .example("$0")
  .help("h")
  .alias("h", "help")
  .option("force-regeocode", {
    alias: "f",
    describe: "Force all restaurants to be regeocoded",
    type: "boolean",
    default: false,
  }).argv;

async function geocodeAddress(address) {
  const data = await client.geocode({
    params: {
      address: address,
      key: process.env.GOOGLE_MAPS_API_KEY,
    },
  });

  return {
    latitude: data.data.results[0].geometry.location.lat,
    longitude: data.data.results[0].geometry.location.lng,
  };
}

async function main() {
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

  for (const post of posts) {
    const address = post.frontmatter.address;
    if (!address) {
      console.log(`No address found for ${post.slug}`);
      continue;
    }
    const existingCoordinates = post.frontmatter.coordinates;
    if (existingCoordinates && !argv.forceRegeocode) {
      console.log(`Skipping ${post.slug} because it already has coordinates`);
      continue;
    }
    console.log(`Geocoding ${post.slug}`);
    const coordinates = await geocodeAddress(post.frontmatter.address);
    console.log(`Got coordinates for ${post.slug}:`, coordinates);

    // Write markdown file with coordinates
    const newFrontmatter = { ...post.frontmatter, coordinates };
    const newPost = matter.stringify(post.content, newFrontmatter);
    fs.writeFileSync(`posts/${post.slug}.md`, newPost);
  }
}

main();
