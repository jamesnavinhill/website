import type { Preview } from "@storybook/nextjs-vite";
import React from "react";

import "../src/app/globals.css";

const preview: Preview = {
  parameters: {
    layout: "padded",
    backgrounds: {
      default: "light",
      values: [
        { name: "light", value: "#ffffff" },
        { name: "dark", value: "#0a0a0a" },
      ],
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "todo",
    },
    docs: {
      toc: true,
    },
  },
  globalTypes: {
    theme: {
      description: "Global theme for components",
      defaultValue: "light",
      toolbar: {
        title: "Theme",
        icon: "circlehollow",
        items: [
          { value: "light", icon: "circlehollow", title: "Light" },
          { value: "dark", icon: "circle", title: "Dark" },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme || "light";

      return React.createElement(
        "div",
        { className: theme, style: { minHeight: "100vh" } },
        React.createElement(
          "div",
          { className: "bg-background text-foreground min-h-full" },
          React.createElement(Story)
        )
      );
    },
  ],
};

export default preview;
