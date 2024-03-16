import type { Meta, StoryObj } from "@storybook/react";

import Header from "@/components/sections/header";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "components/sections/header/desktop",
  component: Header,
  parameters: {
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    className: { control: "text" },

    // size: {
    //   control: {
    //     type: "select",
    //     options: ["default", "sm", "lg"],
    //   },
    // },
  },
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  // args: {
  //   variant: "default",
  //   children: "header children",
  // },
};
