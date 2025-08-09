/**
 * Builder.io Publish configuration
 */
export const BUILDER_PUBLISH_API_KEY = process.env.NEXT_PUBLIC_BUILDER_PUBLISH_API_KEY || '';

/** Supported Builder models used in this app */
export const BUILDER_MODELS = {
  page: 'page',
} as const;

export type BuilderModel = typeof BUILDER_MODELS[keyof typeof BUILDER_MODELS];
