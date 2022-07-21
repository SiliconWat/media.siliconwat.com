import { exec } from "child_process";

export default (req) => {
    // exec(`git add . && git status && git commit -m "download ${req.body.category}: ${req.body.title}" && git push`, (error, stdout, stderr) => {
    //     if (error) console.log("Error:", error.message);
    //     if (stderr) console.log("StdErr:", stderr);
    //     if (stdout) console.log("StdOut:", stdout);
    // });
}