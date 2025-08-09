import type { BuilderContent } from "@builder.io/sdk-react";
import { fetchOneEntry, isPreviewing } from "@builder.io/sdk-react/edge";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import BuilderContentClient from "@/components/client/builder-content";
import { BUILDER_MODELS, BUILDER_PUBLISH_API_KEY } from "@/config/builder";

type Params = { slug?: string[] };

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const urlPath = `/${(params.slug ?? []).join("/")}` || "/";
  const entry = await fetchOneEntry({
    model: BUILDER_MODELS.page,
    apiKey: BUILDER_PUBLISH_API_KEY,
    userAttributes: { urlPath },
  });
  const title = (entry as BuilderContent | null)?.data?.title as
    | string
    | undefined;
  return { title: title ?? undefined };
}

export default async function BuilderCatchAllPage({
  params,
}: {
  params: Params;
}) {
  const urlPath = `/${(params.slug ?? []).join("/")}` || "/";

  // Fetch Builder entry on the server
  const entry = (await fetchOneEntry({
    model: BUILDER_MODELS.page,
    apiKey: BUILDER_PUBLISH_API_KEY,
    userAttributes: { urlPath },
  })) as BuilderContent | null;

  // Render even when content is missing if the editor preview is active
  if (!entry && !isPreviewing()) {
    notFound();
  }

  return (
    <main className="min-h-screen">
      <BuilderContentClient content={entry} model={BUILDER_MODELS.page} />
    </main>
  );
}

// Revalidate ISR cache periodically so published updates roll out without redeploys
export const revalidate = 5; // seconds
