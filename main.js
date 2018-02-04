'use strict';

const BucketWrapper = require('./src/beans/BucketWrapper');
const FileUtil = require('./src/beans/FileUtil');
const AWS = require('aws-sdk');
const s3  = new AWS.S3();

const bucketName = 'hjosef-tarea2';


const buckets = new BucketWrapper('hjosef-cubeta2');
buckets.listBuckets();
buckets.listObjects().then((data)=>{
    console.log(data);
});

/*
buckets.createBucket('hjosef-cubeta2').then((data)=>{
    buckets.addFileToBucket('archivo02.txt','Otra prueba').then(()=>{
    });
});*/
/*
buckets.getFileFromBucket('archivo02.txt').then((content)=>{
    console.log(content)
});
*/
/*
const file3 = 'archivo03.txt';
FileUtil.getBufferFromFile(file3).then((buffer)=>{
    buckets.addFileToBucket(file3,buffer).then(()=>{
        buckets.getFileFromBucket(file3).then((content)=>{
            console.log(content)
        });
    });
});
*/
/*
s3.listBuckets({}, function (err, data) {
        if (err) {
            console.log(err, err.stack);
        } else {
            console.log(data);
        }
});
*/

/*
console.log(params);
const params = {
    "Bucket": bucketName,
    "CreateBucketConfiguration": {
        "LocationConstraint": 'us-west-2'
    }
};

s3.createBucket(params,function(err,data){
    let addFile = true;
    if(err){
        if(err.code === 'BucketAlreadyOwnedByYou'){
            console.log('El bucket ya existe');
        }else{
            console.log(err,err.stack);
            addFile  = false;
        }
    }
    if(addFile){
        let params = {
            "Bucket": bucketName,
            "Key" : "archivo01.txt",
            "Body" : "Hola Mundo"
        }

        s3.putObject(params, function(err,data){
            if(err){
                console.log(err,err.stack);
            }else{
                console.log('Archivo agregado.... ETag:'+data.ETag);
            }
        });
    }
});
*/


