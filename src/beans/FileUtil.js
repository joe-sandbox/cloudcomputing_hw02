'use strict';
const Promise = require('promise');
const fs    = require('fs');
module.exports = class FileUtil{
    static getBufferFromFile(path){
        return new Promise((fulfill,reject)=>{
            fs.readFile(path,(err,data)=>{
                if(err){
                    console.log(err,err.stack);
                }else{
                    fulfill(new Buffer(data,'binary'));
                }
            });
        });
    }
}