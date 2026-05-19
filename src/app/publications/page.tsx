import { about, baseURL, home, person } from "@/resources";
import { Meta, Schema } from "@once-ui-system/core";
import { PublicationsView } from "./PublicationsView";
import { publications } from "./content";

export async function generateMetadata() {
  return Meta.generate({
    title: publications.title,
    description: publications.description,
    baseURL: baseURL,
    image: home.image,
    path: publications.path,
  });
}

export default function PublicationsPage() {
  return (
    <>
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={publications.path}
        title={publications.title}
        description={publications.description}
        image={home.image}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <PublicationsView publications={publications} />
    </>
  );
}
