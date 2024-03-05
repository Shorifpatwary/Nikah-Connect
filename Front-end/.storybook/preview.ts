import type { Preview } from "@storybook/react";
import * as NextImage from "next/image";
import "../src/app/globals.css";
const OriginalNextImage = NextImage.default;
// Object.defineProperty(NextImage, 'default', {
//   configurable: true,
//   value: (props) => <OriginalNextImage {...props} unoptimized />,
// });

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    themes: {
      light: "light",
      dark: "dark",
    },
  },
  // previewTabs: {
  //   "storybook/docs/panel": { index: -1 },
  // },
};

export default preview;
