<img src="./public/images/diet-coke/full-can.svg" width="50" height="auto">

## Diet Coke reviews 🥤

This is a simple, markdown-powered website for posting reviews of Diet Cokes at restaurants.

It is hosted on Vercel here: [https://dietcoke.reviews](https://dietcoke.reviews)

It is largely based on this project: https://github.com/rebelchris/next-markdown-blog.

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Adding a review

1. Add a new markdown file in the `posts` directory (e.g., `restaurant_name.md`).
2. Add the review image to the `public/images` directory.
3. In the markdown files, fill in the following metadata fields

```
---
title: 'Restaurant name'
location: 'location'
media:
  - mediaType: "img"
    path: images/img1
  - ...
rating: rating (0 to 5 with 0.5 increments)
date: 'YYYY-MM-DD'
tags:
  - tag 1
  - tag 2
  - ...
---
```

4. Write review text below the metadata section
5. Reload page

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
