'use strict';
const express = require('express');
const bucketsRouter = express.Router();
const BUCKET_NAME = process.env.BUCKET_NAME || 'hjosef-cubeta2';
const BucketWrapper = require('../beans/BucketWrapper');
const FileUtil = require('../beans/FileUtil');

bucketsRouter.route('/').get((req,res)=>{
    let buckets = new BucketWrapper(BUCKET_NAME);
    buckets.listBuckets().then((listBuckets)=>{
        res.render('buckets', {
            'buckets': listBuckets.Buckets,
            'owner':listBuckets.Owner.DisplayName
        });
    })
}).post((req,res)=>{
    console.log(req.body);
    let buckets = new BucketWrapper(req.body.bucketName);
    buckets.createBucket(req.body.bucketName).then((data)=>{
        res.redirect('/'+req.body.bucketName);
    });
});
bucketsRouter.route('/new').get((req,res)=>{
    console.log('rendering new view');
    res.render('newBucket', { });
});
bucketsRouter.route('/:id').get((req,res)=>{
    let buckets = new BucketWrapper(req.params.id);
    buckets.listObjects().then((listObjects)=>{
        res.render('bucket',{
            "bucketName":req.params.id,
            "objects":listObjects.Contents
        });
    });
}).post((req,res)=>{
    let buckets = new BucketWrapper(req.params.id);
    console.log(req.files.objectFile.data);
    console.log(req.body.objectName);
    buckets.addFileToBucket(req.body.objectName,req.files.objectFile.data).then(()=>{
        res.redirect('/'+req.params.id+'/'+req.body.objectName);
    });
});
bucketsRouter.route('/:id/:objectId').get((req,res)=>{
    if(req.params.objectId==='new'){
        console.log('newww');
        res.render('newObject',{bucketName:req.params.id});
    }else{
        let buckets = new BucketWrapper(req.params.id);
        console.log('viewing bucket:'+req.params.id+' object:'+req.params.objectId);
        buckets.getFileFromBucket(req.params.objectId).then((content)=>{
            res.render('object',{
                "bucketName":req.params.id,
                "objectName":req.params.objectId,
                "content":content
            });
        });
    }
});
module.exports = bucketsRouter;