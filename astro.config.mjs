import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: "Guide Docs",
      social: {
        github: "https://github.com/saurabhjaykar1603",
      },
      sidebar: [
        {
          label: "Introduction",
          items: [
            { label: "Introduction to Guide Docs", link: "/intro/intro/" },
          ],
        },
        // {
        //   label: "HTML",
        //   items: [
        //     // Each item here is one entry in the navigation menu.
        //     { label: "What is HTML", link: "/html/html/" },
        //   ],
        // },
        {
          label: "Python",
          items: [
            { label: "Introduction to Python", link: "/python/introduction" },
            { label: "Python inner working", link: "/python/innerworking" },
            {
              label: "Mutable and Immutable Types in Python",
              link: "/python/mutable-and-immutable",
            },
            {
              label: "Data Types in Python",
              link: "/python/data-types-python",
            },
            {
              label: "Numbers in Python",
              link: "/python/numbers-in-python"
            },
            {
              label: "Operators in Python",
              link: "/python/operators-in-python",
            },
          ],
        },
        {
          label: "TypeScript",
          items: [
            { label: "What is TypeScript", link: "/typescript/typescript/" },
            {
              label: "Typescript Inner Working and Installation",
              link: "/typescript/innerworking",
            },
            {
              label: "TypeScript Data Types",
              link: "/typescript/typescript-data-types",
            },
            {
              label: "Types and Interfaces in TypeScript",
              link: "/typescript/typescript-type-and-interfaces",
            },
            {
              label: "TypeScript Optional Properties",
              link: "/typescript/typescript-optional-properties",
            },
            {
              label: "TypeScript Type Assertions",
              link: "/typescript/typescript-type-assertions",
            },
            {
              label: "Functions in TypeScript",
              link: "/typescript/typescript-functions",
            },
            {
              label: "Classes in TypeScript",
              link: "/typescript/typescript-classes",
            },
            {
              label: "Generics in TypeScript",
              link: "/typescript/typescript-generics",
            },
            {
              label: "Literal Types in TypeScript",
              link: "/typescript/typescript-literal-types",
            },
            {
              label: "Namespaces in TypeScript",
              link: "/typescript/typescript-namespaces",
            },
            {
              label: "Type Guards in TypeScript",
              link: "/typescript/typescript-type-guards",
            },
            {
              label: "Index Signatures in TypeScript",
              link: "/typescript/typescript-index-signatures",
            },
            {
              label: "Utility Types in TypeScript",
              link: "/typescript/typescript-utility-types",
            },
            {
              label: "Modules in TypeScript",
              link: "/typescript/typescript-modules",
            },
            {
              label: "Decorators in TypeScript",
              link: "/typescript/typescript-decorators",
            },
          ],
        },

        {
          label: "JavaScript",
          items: [
            {
              label: "What is JavaScript",
              link: "/javascript/javascript_introduction",
            },
            {
              label: "Variables in JavaScript",
              link: "/javascript/javascript_variables",
            },
            {
              label: "Datatypes in JavaScript",
              link: "/javascript/javascript_datatypes",
            },
            {
              label: "Stack and Heap Memory in JavaScript",
              link: "/javascript/javascript_stack_and_heap_memory",
            },
            {
              label: "Rest and Spread Operator in JavaScript",
              link: "/javascript/javascript_rest_and_spread_operator",
            },

            {
              label: "String in JavaScript",
              link: "/javascript/string_javascript",
            },
            {
              label: "Numbers in JavaScript",
              link: "/javascript/javascript_number",
            },
            {
              label: "Date and Time in JavaScript",
              link: "/javascript/javascript_date_time",
            },
          ],
        },
        {
          label: "Node",
          items: [{ label: "What is Node", link: "/node/node/" }],
        },
        {
          label: "Dsa JavaScript Questions",
          items: [
            { label: "Easy", link: "/dsa-js/questions/" },
            { label: "Medium", link: "/dsa-js/medium/" },
            { label: "Advance Linked List", link: "/dsa-js/linkedlist/" },
          ],
        },
        {
          label: "Devops",
          items: [
            {
              label: "Full Node.js Deployment to AWS",
              link: "/devops/aws_node_deployment",
            },
          ],
        },

        {
          label: "Tips and Tools",
          items: [
            {
              label: "Regular Expressions in Javascript",
              link: "/tipsandtools/regularexpressions/",
            },
            {
              label: "HTTP Response Status Codes",
              link: "/tipsandtools/httpresponsestatuscode/",
            },
          ],
        },
      ],
    }),
  ],
});
