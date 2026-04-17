import coreWebVitals from "eslint-config-next/core-web-vitals";

/** @type {import("eslint").Linter.Config[]} */
const config = [
  ...coreWebVitals,
  {
    ignores: [
      "src/_legacy/**",
      "node_modules/**",
      ".next/**",
      "out/**",
      ".netlify/**",
    ],
  },
];

export default config;
