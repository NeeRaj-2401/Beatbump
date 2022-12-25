import { sveltekit } from "@sveltejs/kit/vite";
import type { UserConfig } from "vite";
const version = new Date(Date.now());
const version_fmt = `${version.getUTCFullYear()}.${version.getMonth().toString().padStart(2, "0")}.${version
	.getDate()
	.toString()
	.padStart(2, "0")}`;
/** @type {*} */
const config: UserConfig = {
	plugins: [sveltekit()],
	build: {
		minify: "esbuild",
		cssTarget: ["chrome58", "edge16", "firefox57", "safari11"],
	},
	define: {
		"process.env.APP_VERSION": JSON.stringify(version_fmt),
	},
	esbuild: { treeShaking: true, minifyWhitespace: true, minifyIdentifiers: true, minifySyntax: true },

	worker: {
		plugins: [],
		format: "es",
		rollupOptions: { treeshake: { preset: "recommended" }, external: ["hls.js", "peerjs"], output: { format: "iife" } },
	},
};
export default config;
