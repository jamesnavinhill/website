import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Typography } from "./typography";

const meta = {
  title: "UI/Typography",
  component: Typography,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Typography component for consistent text styling throughout the application.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: [
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "body",
        "caption",
        "overline",
      ],
    },
    as: {
      control: { type: "text" },
    },
  },
} satisfies Meta<typeof Typography>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Heading1: Story = {
  args: {
    variant: "h1",
    children: "The quick brown fox jumps over the lazy dog",
  },
};

export const Heading2: Story = {
  args: {
    variant: "h2",
    children: "The quick brown fox jumps over the lazy dog",
  },
};

export const Heading3: Story = {
  args: {
    variant: "h3",
    children: "The quick brown fox jumps over the lazy dog",
  },
};

export const Body: Story = {
  args: {
    variant: "body",
    children:
      "The quick brown fox jumps over the lazy dog. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
};

export const Caption: Story = {
  args: {
    variant: "caption",
    children: "Caption text for images or additional information",
  },
};

export const Overline: Story = {
  args: {
    variant: "overline",
    children: "Overline Text",
  },
};

export const AllHeadings: Story = {
  args: {
    children: "Typography Example",
  },
  render: () => (
    <div className="space-y-4">
      <Typography variant="h1">Heading 1</Typography>
      <Typography variant="h2">Heading 2</Typography>
      <Typography variant="h3">Heading 3</Typography>
      <Typography variant="h4">Heading 4</Typography>
      <Typography variant="h5">Heading 5</Typography>
      <Typography variant="h6">Heading 6</Typography>
      <Typography variant="body">
        Body text - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
        do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </Typography>
      <Typography variant="caption">Caption text</Typography>
      <Typography variant="overline">Overline text</Typography>
    </div>
  ),
};
