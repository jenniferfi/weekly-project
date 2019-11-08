var express = require('express');
var router = express.Router();
var topics = require('./topicfunction')

router.route('/')
  .get(function(req, res, next) {
  topics.getAllTopics((results) => {
    res.json(results)
  });
})
  .post(function(req, res) {
  topics.createTopic(req, function(results) {
    res.send(results);
    console.log(req.body);
  });
});

router.route('/:id')
  .get(function(req, res) {
   topics.getSingleTopic(req, function(results){
     res.json(results);
   })
  })
  .delete(function(req, res) {
    topics.deleteTopic(req, function(results){
      res.send(results);
    })
  })
  .put(function(req, res) {
    topics.updateTopic(req, function(results){
      res.send(results);
    })
  });


module.exports = router;
