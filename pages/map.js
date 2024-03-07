import { useRef, useEffect, useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
import fs from "fs";
import matter from "gray-matter";
import * as turf from "@turf/turf";
import { createRoot } from "react-dom/client";
import { PostPopUp } from "../components/Post";

import "mapbox-gl/dist/mapbox-gl.css";
import RegionSelector from "../components/RegionSelector";

const defaultRegion = process.env.NEXT_PUBLIC_DEFAULT_REGION;

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

export default function Map({ posts }) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const popup = useRef(null);
  const [selectedRegion, setSelectedRegion] = useState(defaultRegion);
  const regions = posts.reduce(
    (acc, post) => {
      if (post.frontmatter.region) {
        acc.add(post.frontmatter.region);
      }
      return acc;
    },
    new Set([defaultRegion]),
  );

  useEffect(() => {
    if (!mapContainer.current) return;

    const postFeatures = posts
      .filter((post) => post.frontmatter.coordinates)
      .filter(
        (post) =>
          post.frontmatter.region === selectedRegion ||
          (post.frontmatter.region === undefined &&
            selectedRegion === defaultRegion),
      )
      .map((post) => {
        return {
          type: "Feature",
          properties: {
            title: post.frontmatter.title,
            description: post.frontmatter.description,
            slug: post.slug,
          },
          geometry: {
            type: "Point",
            coordinates: [
              post.frontmatter.coordinates.longitude,
              post.frontmatter.coordinates.latitude,
            ],
          },
        };
      });

    const bounds = turf.bbox({
      type: "FeatureCollection",
      features: postFeatures,
    });

    if (map.current) {
      map.current?.getSource("posts")?.setData({
        type: "FeatureCollection",
        features: postFeatures,
      });
      if (popup.current) {
        popup.current.remove();
      }
      map.current?.fitBounds(
        [
          [bounds[0], bounds[1]],
          [bounds[2], bounds[3]],
        ],
        {
          padding: 50, // Adjust padding as needed
        },
      );
      return;
    }

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      bounds,
      fitBoundsOptions: {
        padding: 50,
      },
    });

    map.current.on("load", () => {
      // Use an image as a custom icon
      map.current.loadImage("images/diet-coke/map-icon.png", (error, image) => {
        if (error) throw error;
        map.current.addImage("custom-marker", image);
        map.current.addSource("posts", {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: postFeatures,
          },
        });
        map.current.addLayer({
          id: "posts",
          type: "symbol",
          source: "posts",
          layout: {
            "icon-image": "custom-marker",
            "icon-allow-overlap": true,
          },
        });

        map.current.on("click", "posts", (e) => {
          // Ensure that if the map is zoomed out such that multiple
          // copies of the feature are visible, the popup appears
          // over the copy being pointed to.
          while (
            Math.abs(e.lngLat.lng - e.features[0].geometry.coordinates[0]) > 180
          ) {
            e.features[0].geometry.coordinates[0] +=
              e.lngLat.lng > e.features[0].geometry.coordinates[0] ? 360 : -360;
          }

          const scale = 0.7;
          const iconWidth = 40 * scale;
          const iconHeight = 71 * scale;

          const coordinates = e.features[0].geometry.coordinates.slice();
          const popupNode = document.createElement("div");
          const post = posts.find(
            (post) => post.slug === e.features[0].properties.slug,
          );
          if (!post) return;
          const root = createRoot(popupNode);
          root.render(
            <PostPopUp
              frontmatter={post.frontmatter}
              content={post.content}
              iconWidth={iconWidth}
              iconHeight={iconHeight}
              onRender={() => {
                // Create a popup and set its content
                const newPopup = new mapboxgl.Popup({
                  closeButton: false,
                })
                  .setLngLat(coordinates)
                  .setHTML(popupNode.outerHTML)
                  .addTo(map.current);

                if (popup.current) {
                  popup.current.remove();
                }
                popup.current = newPopup;
              }}
            />,
          );
        });
        // Change the cursor to a pointer when over clickable points
        map.current.on("mouseenter", "posts", () => {
          map.current.getCanvas().style.cursor = "pointer";
        });

        map.current.on("mouseleave", "posts", () => {
          map.current.getCanvas().style.cursor = "";
        });

        if (postFeatures.length === 0) {
          return;
        }

        if (bounds) {
          map.current.fitBounds(
            [
              [bounds[0], bounds[1]],
              [bounds[2], bounds[3]],
            ],
            {
              animate: false,
              padding: 50, // Adjust padding as needed
            },
          );
        }
      });
    });
  }, [selectedRegion, posts]);

  return (
    <div className="relative w-full flex-1 md:pb-4 lg:pb-4">
      <div className="absolute top-[5px] left-[5px] z-50">
        <RegionSelector
          regions={[...regions]}
          selectedRegion={selectedRegion}
          onSelected={setSelectedRegion}
        />
      </div>
      <div ref={mapContainer} className="h-full w-full" />
    </div>
  );
}
