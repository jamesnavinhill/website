"use client";
import type { BuilderContent } from "@builder.io/sdk-react/bundle/browser";
import { Content } from "@builder.io/sdk-react/bundle/browser";

import { BUILDER_PUBLISH_API_KEY } from "@/config/builder";

export type BuilderContentClientProps = {
  content: BuilderContent | null;
  model: string;
};

export function BuilderContentClient({
  content,
  model,
}: BuilderContentClientProps) {
  return (
    <Content
      content={content ?? undefined}
      model={model}
      apiKey={BUILDER_PUBLISH_API_KEY}
    />
  );
}

export default BuilderContentClient;
