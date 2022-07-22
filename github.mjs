import { exec } from "child_process";

export default (category, name) => {
    exec(`git add . && git status && git commit -m "download ${category}: ${name}" && git push`, (error, stdout, stderr) => {
        if (error) console.log("Error:", error.message);
        if (stderr) console.log("StdErr:", stderr);
        if (stdout) console.log("StdOut:", stdout);
    });
}