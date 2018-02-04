'use strict';
const Promise = require('promise');
const AWS = require('aws-sdk');
const s3 = new AWS.S3();
module.exports = class BucketWrapper {
    constructor(bucketName) {
        this.bucketName = bucketName;
        this.LocationConstraint = 'us-west-2';
    }

    listBuckets() {
        return new Promise((fulfill,reject)=>{
            const params = { };
            s3.listBuckets(params,  (err, data) =>{
                if (err) {
                    console.log(err, err.stack);
                    reject(err);
                } else {
                    console.log(data);
                    fulfill(data);
                }
            });
        });
    }
    /**
     * 
     * @param {int} maxKeys The number of elements, default to 100
     */
    listObjects(maxKeys = 100){
        return new Promise((fulfill,reject)=>{
            let params = {
                "Bucket" : this.bucketName,
                "MaxKeys" : maxKeys
            };
            s3.listObjects(params, function(err, data) {
                if (err) {
                    console.log(err, err.stack); // an error occurred
                    reject(err);
                }
                else{
                    console.log(data);           // successful response
                    fulfill(data);
                }
              });
        });
    }
    /**
     * 
     * @param {String} fileName The name of the file to be retrieved.
     */
    getFileFromBucket(fileName) {
        let params = {
            "Bucket" : this.bucketName,
            "Key" : fileName
        };
        return new Promise((fulfill,reject)=>{
            s3.getObject(params,(err,data)=>{
                if(err){
                    console.log(err,err.stack);
                    reject(err);
                }else{
                    //console.log(data);
                    //console.log(data.Body.toString());
                    fulfill(data.Body.toString());
                }
            });
        });
    }
    /**
     * 
     * @param {string} fileName 
     * @param {string} fileBody 
     */
    addFileToBucket(fileName,fileBody){
        return new Promise((fulfill, reject) => {
            let params = {
                "Bucket": this.bucketName,
                "Key": fileName,
                "Body": fileBody
            }
            console.log('adding file ['+params.Key+'] to bucket ['+this.bucketName+']');
            s3.putObject(params,  (err, data)=> {
                if (err) {
                    console.log(err, err.stack);
                    reject(err);
                } else {
                    console.log('Archivo agregado.... ETag:' + data.ETag);
                    fulfill(data)
                }
            });
        });
    }
    /**
     * Creates a new bucket. Also updates the property aiming to that bucket.
     * @param {String} nameOfBucket the name of the bucket to be created.
     */
    createBucket(nameOfBucket) {
        return new Promise((fulfill, reject) => {
            const params = {
                "Bucket": nameOfBucket,
                "CreateBucketConfiguration": {
                    "LocationConstraint": this.LocationConstraint
                }
            };
            s3.createBucket(params, (err, data) =>{
                if (err) {
                    if (err.code === 'BucketAlreadyOwnedByYou') {
                        console.log('El bucket ya existe');
                        this.bucketName = nameOfBucket;
                        fulfill(data);
                    } else {
                        console.log(err, err.stack);
                        reject(err);
                    }
                }else{
                    console.log('Bucket['+nameOfBucket+'] created');
                    this.bucketName = nameOfBucket;
                    fulfill(data);
                }
            });
        });
    }
}