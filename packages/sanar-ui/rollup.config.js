import resolve from "rollup-plugin-node-resolve";
import babel from "rollup-plugin-babel";
import commonjs from "rollup-plugin-commonjs";
import less from "rollup-plugin-less";
import external from "rollup-plugin-peer-deps-external";
import json from "@rollup/plugin-json";
import image from "@rollup/plugin-image";
import postcss from "rollup-plugin-postcss";

import pkg from "./package.json";

export default {
  input: "src/index.js",
  output: {
    file: "dist/index.js",
    format: "cjs",
    sourcemap: true
  },
  external: [...Object.keys(pkg.peerDependencies)],
  plugins: [
    external(),
    resolve({
      extensions: [".js", ".jsx"]
    }),
    babel({
      exclude: "node_modules/**",
      extensions: [".js", ".jsx"]
    }),
    less(),
    commonjs(),
    json(),
    image(),
    postcss()
  ]
};
