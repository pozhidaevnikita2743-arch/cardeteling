import type { NextConfig } from "next";

// GitHub Pages отдаёт проект по /<repo>/, поэтому пути нужно префиксовать —
// но только для этой сборки, Vercel продолжает работать с корня
const isGithubPages = process.env.GITHUB_PAGES === "true";
const basePath = "/cardeteling";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  basePath: isGithubPages ? basePath : undefined,
  assetPrefix: isGithubPages ? `${basePath}/` : undefined,
};

export default nextConfig;
