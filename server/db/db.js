/**
 **********************************************************
 *
 *
 * @author      wangzhiwei.
 * @date        2017/12/4.
 * @time        16:49.
 * @versions    0.0.0
 *
 *
 *********************************************************
 */
var MongoClient = require('mongodb').MongoClient
    , assert = require('assert');
var dbMethod = {};
var ObjectId = require('mongodb').ObjectId;
var options = {
    server: {
        auto_reconnect: true,
        poolSize: 10
    }
};

// Connection URL
var url = 'mongodb://localhost:27017/myproject';
var document = 'question';
// Use connect method to connect to the server
MongoClient.connect(url, options,function (err, db) {
    assert.equal(null, err);
    console.log("Connected successfully to DB server");
    dbMethod.db = db;
});
/**
 * 回去db连接
 * @returns {*} 返回db连接
 */
dbMethod.getConnect =function(){
  return this.db;
};
dbMethod.destroyConnect = function(db){

};
/**
 * 插入数据
 * @param data [{},...]
 * @param callback 执行成功回调
 */
dbMethod.insert = function (data, callback) {
    var db = this.getConnect();
    // Get the documents collection
    var collection = db.collection(document);
    // Insert some documents
    collection.insertMany(data, function (err, result) {
        //assert.equal(err, null);
        //assert.equal(3, result.result.n);
        //assert.equal(3, result.ops.length);
        callback(result);
        console.log('插入成功');
        dbMethod.destroyConnect(db);
    });
};
/**
 * 查询数据
 * @param condition 查询条件 {a:3}
 * @param callback 查询完成回调
 */
dbMethod.find = function (condition, callback) {
    var db = this.getConnect();
    // Get the documents collection
    var collection = db.collection(document);
    if(condition._id){
        condition = {_id:ObjectId(condition._id)}
    }
    // Find some documents
    collection.find(condition).toArray(function (err, docs) {
        assert.equal(err, null);
        console.log("Found the following records");
        callback(docs);
        dbMethod.destroyConnect(db);
    });
};
/**
 * 更新一条数据
 * @param condition 更新条件 {a: 2}
 * @param newData 更新的值 {$set: {b: 1}}
 * @param callback
 */
dbMethod.update = function (condition, newData, callback) {
    var db = this.getConnect();
    // Get the documents collection
    var collection = db.collection(document);
    delete newData._id;
    // Update document where a is 2, set b equal to 1
    collection.updateOne({_id:ObjectId(condition._id)}, newData, function (err, result) {
        assert.equal(err, null);
        console.log("Updated the document with the field a equal to 2");
        callback(result);
        dbMethod.destroyConnect(db);
    });
};
/**
 * 删除一条数据
 * @param condition 删除条件 {a: 3}
 * @param callback 删除成功回调
 */
dbMethod.remove = function (condition, callback) {
    var db = this.getConnect();
    // Get the documents collection
    var collection = db.collection(document);
    // Delete document where a is 3
    collection.deleteOne(condition, function (err, result) {
        assert.equal(err, null);
        assert.equal(1, result.result.n);
        callback(result);
        dbMethod.destroyConnect(db);
    });
};
module.exports = dbMethod;