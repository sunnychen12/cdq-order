//获取目录
const fs = require("fs");
const path = require("path");

function getChildrenDir(root) {
    var result=[];

    var pa = fs.readdirSync(root);
    pa.forEach(function(ele,index){

        var info = fs.statSync( path.resolve(root, ele) )
        if(info.isDirectory()){
            //console.log("dir: "+ele);
            result.push(ele)
            //readDirSync(path+"/"+ele);遍历子目录
        }else{
            //console.log("file: "+ele)
            result.push(ele);
        }
    })

    return result;

}

module.exports=getChildrenDir;
