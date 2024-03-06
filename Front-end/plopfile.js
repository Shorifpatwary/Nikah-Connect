module.exports = function (plop) {
  // component generator
  plop.setGenerator("component", {
    description: "Generate a TypeScript component",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "Component name:",
      },
    ],
    actions: [
      {
        type: "add",
        path: "src/components/{{dashCase name}}.tsx",
        templateFile: "plop-templates/component.hbs",
      },
    ],
  });

  // story book  story generator
  plop.setGenerator("story", {
    description: "Generate a TypeScript Story",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "Story name:",
      },
      {
        type: "input",
        name: "sourcePath",
        message: "Story source path:",
        default: "components-ui",
      },
    ],
    actions: [
      {
        type: "add",
        path: "src/stories/{{pathCase sourcePath}}/{{snakeCase name}}.stories.ts",
        templateFile: "plop-templates/story.hbs",
      },
    ],
  });
};
