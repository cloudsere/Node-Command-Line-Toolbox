const fs = require('fs');
const src = process.argv[2];
const command = process.argv[3];
const ignoreFiles = process.argv.slice(4);
const exec = require('child_process').exec;

function redStr(str) {
  return "\033[31m" + str + "\033[0m";
}
function greenStr(str) {
  return "\033[32m" + str + "\033[0m";
}

console.log(greenStr(`Watching files inside ${src} and execing command ${command}`));

function execCommand(){
  exec(command, (error, stdout, stderr)=>{
    console.log(greenStr('Exec command returned'));
    if(error){
      console.log(redStr(stderr));
      console.log(redStr(`Something went wrong ${error}`));
    }
    console.log(stdout);
  })
}

const filesMap = {};
let restart = false;

function readFiles(dirname){
  const files = fs.readdirSync(dirname);
  for(let i = 0; i < files.length; i++){
    if(ignoreFiles.indexOf(files[i]) > -1){
      continue;
    }
    filesMap[files[i]] = true;
  }
}

function listenFiles(){
  for(let file in filesMap){
    if(!filesMap.hasOwnProperty(file)){
      continue;
    }
    fs.watchFile(file, {}, (cur, prev)=>{
      if(cur.mtime > prev.mtime){
        console.log(`file ${file} changed: ${cur.mtime}, ${prev.mtime}`);
        restart = true;
      }
    })
  }
}

function init(){
  readFiles(src);
  listenFiles();
  execCommand();

  setInterval(()=>{
    if(restart){
      restart = false;
      execCommand();
    }
  }, 50);
}

init();