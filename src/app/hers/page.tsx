import { HersFlagshipPage } from "@/components/work/HersFlagshipPage";
import { baseURL, person } from "@/resources";
import { withBasePath } from "@/utils/paths";
import { getPosts } from "@/utils/utils";
import { Meta } from "@once-ui-system/core";
import { notFound } from "next/navigation";

const hersProjectSlug = "hers_heterogeneities_rotational_seismology";
const hersPath = "/hers";

function getHersPost() {
  return getPosts(["src", "app", "work", "projects"]).find(
    (post) => post.slug === hersProjectSlug,
  );
}

export async function generateMetadata() {
  const post = getHersPost();

  if (!post) return {};

  const previewImage =
    post.metadata.image ||
    post.metadata.heroImage ||
    post.metadata.images[0] ||
    "/images/og/anjali-research-preview.png";

  return Meta.generate({
    title: "HERS - Heterogeneities and Their Effect on Rotational Seismology",
    description: post.metadata.summary,
    baseURL,
    image: previewImage,
    path: hersPath,
  });
}

export default function HersPage() {
  const post = getHersPost();

  if (!post) {
    notFound();
  }

  const avatars =
    post.metadata.team
      ?.map((member) => {
        const fallbackAvatar =
          member.name === person.name || member.name.includes(person.firstName) ? person.avatar : "";

        return {
          src: withBasePath(member.avatar || fallbackAvatar),
        };
      })
      .filter((member) => member.src) || [];

  const previewImage =
    post.metadata.image ||
    post.metadata.heroImage ||
    post.metadata.images[0] ||
    "/images/og/anjali-research-preview.png";
  const heroImage = post.metadata.heroImage || post.metadata.images[0];
  return (
    <HersFlagshipPage
      post={post}
      avatars={avatars}
      previewImage={previewImage}
      heroImage={heroImage}
      pagePath={hersPath}
    />
  );
}
