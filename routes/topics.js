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

/* var fs = require('fs');

var topics = []; 

router.route('').get(function (req, res) {
  res.json(topics);
}).post((req, res) => {
  console.dir(req.body)
  let nt = req.body;
  topics.push(nt);
  updateTopics();
  res.status(201).location(`http://localhost:3000/api/topics/${req.body.id}`)
    .send();
  //console.log("New topic created!")
})

router.route('/:id')
  .get((req, res) => {
    for (var top of topics) {
      if (top.id == req.params.id) {
        res.json(top);
        return;
      }
    }
    res.json("{'msg': 'Error, no such topic!'}");
  })
  .delete((req, res) => {
    for (var top in topics) {
      if (topics[top].id == req.params.id) {
        topics.splice(top, 1);
        res.json("{msg: 'Topic removed'}");
        updateTopics();
        return;
      }
    }
    res.json("{'msg': 'Error, no such topic!'}");
  });

function updateTopics() {
  fs.writeFile("topics.json", JSON.stringify(topics), () => {
    console.log("List of topics updated!")
  })
}

fs.readFile("topics.json", (err,data)=>{
  topics=JSON.parse(data);
  //console.dir(topics);
})
 */
module.exports = router;
