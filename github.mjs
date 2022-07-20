import { exec, spawn } from "child_process";

export default (req, res) => {
    res.json(res.getLibrary());
    commit(req);
    //push(res);
}

function commit(req) {
    exec(`git add . && git status && git commit -m "download ${req.body.category}: ${req.body.title}" && git push`, (error, stdout, stderr) => {
        if (error) console.log("Error:", error.message);
        if (stderr) console.log("StdErr:", stderr);
        if (stdout) console.log("StdOut:", stdout);
    });
}

// deprecated
function push(res) {
    const ls = spawn("git", ["push"]);

    ls.stdout.on("data", data => {
        console.log(`stdout: ${data}`);
    });

    ls.stderr.on("data", data => {
        console.log(`stderr: ${data}`);
    });

    ls.on('error', (error) => {
        console.log(`error: ${error.message}`);
    });

    ls.on("close", code => {
        console.log(`child process exited with code ${code}`);
        res.json(res.getLibrary());
    });
}