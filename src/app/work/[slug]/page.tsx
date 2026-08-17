import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects } from "@/lib/data";
import WorkDetailClient from "./WorkDetailClient";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = projects.find((p) => p.id === params.slug);
  if (!project) return {};
  return {
    title: `${project.title} — Case Study`,
    description: project.description,
    openGraph: {
      title: `${project.title} | TheWebYatra`,
      description: project.description,
    },
  };
}

export default function WorkDetailPage({ params }: Props) {
  const project = projects.find((p) => p.id === params.slug);
  if (!project) notFound();
  return <WorkDetailClient project={project} />;
}
