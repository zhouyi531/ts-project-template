var sys = require("util");
var exec = require("child_process").exec;

function Create() {
  var path = process.argv[2];
  var projectName = process.argv[3];

  if (!projectName && !path) {
    console.log("at least please provide a project name");
    return;
  }

  if (!projectName) {
    projectName = path;
    path = "..";
  }

  if (path[path.length - 1] !== "/") {
    path += "/";
  }

  //TODO: error handler... now mkdir failed but the rest steps will run
  console.log(`mkdir ${path}${projectName}`);
  exec(`mkdir -p ${path}${projectName}`, function(err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    if (!err) {
      exec(`cp -r . ${path}${projectName}`, function(err, stdout, stderr) {
        console.log(`cp -r . ${path}${projectName}`);
        console.log(stdout);
        console.log(stderr);
        if (!err) {
          console.log(`rm -rf ${path}${projectName}/.git`);
          exec(`rm -rf ${path}${projectName}/.git`, function(err, stdout, stderr) {
            console.log(stdout);
            console.log(stderr);
          });
        }
      });
    }
  });
}

Create();
