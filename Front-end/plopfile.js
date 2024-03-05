export default function (plop) {
  // story generator
  plop.setGenerator("story", {
    description: "application story logic",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "story component name please!",
      },
    ],
    actions: [
      {
        type: "add",
        path: "src/stories/{{name}}.stories.ts",
        templateFile: "plop-templates/story.hbs",
      },
    ],
  });
}
