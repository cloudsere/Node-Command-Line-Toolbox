# Node Command Line Tool Collection

这里是平常工作学习中用到的一些Node Command Line小工具

Here are some of my command line tool written in nodeJs.

### watchFileAndExecCommand

经常在学习typescript或者wepback时，跟着教程敲代码以后，需要用tsc或者webpack来编译或者执行，然后查看结果，当代码片段较小时，重复执行tsc index.js或者webpack很麻烦，同时，在学习初期，其实我并不需要一个完整的npm module来安装依赖，以便进行--watch的操作。所以我自己写了watchFileAndExecCommand, 不需要任何依赖就可以达到一个简单的目的：监听某个dir内文件的变化，在变化时执行某个shell命令，支持ignore不需要的files。

When I was learning typescript or webpack, I always find myself repeat typing `tsc index.js` or `webpack`. Although there are some great dependencies that can help me *watch* files and exec those command for me, but I often don't want to bother create a npm module and run a lot of `npm init, npm install ...`. As a result, I wrote watchFileAndExecCommand.js, which can help me achieve a simple goal: listen to file changes inside a directory and exec some shell commands whenever file changes, this script is simple and doesn't depend on other modules, so you can simply use it under your working directory and do `node watchFileAndExecCommand.js`

#### Usage
```
node watchFileAndExecCommand.js . "tsc index.ts" index.js
``` 

process.argv[2]  directory to be watched

process.argv[3]  command to be executed

process.argv.slice(4)  files to be ignoredf
