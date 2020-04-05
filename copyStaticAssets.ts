import * as shell from "shelljs";

console.log("Copying static assets...");

shell.cp("-R", "source/public/img", "dist/public/");
shell.cp("-R", "source/public/css", "dist/public/");