import type { GetStaticProps } from "next";

import type { BlogPostType } from "models/blog";
import { getSortedPostsData } from "utils/posts";

import type { HomeProps } from "./types";

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const allPostsData: Array<BlogPostType> = getSortedPostsData();

  return {
    props: {
      allPostsData,
    },
  };
};
