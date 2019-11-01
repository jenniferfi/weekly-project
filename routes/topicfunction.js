const Pool = require('pg').Pool;
const conopts = {
    user: 'postgres',
    password: 'Sovelto1',
    host: 'localhost',
    database: 'cont_exercise'
}
const pool = new Pool(conopts);

function getAllTopics(callback) {
    pool.connect((err, client) => {
        if (err) throw err;
        client.query('select * from topic',
        (err, data) => {
            if (err) throw err;
            client.release();
            callback(data.rows);
        })
    })
}

function getSingleTopic(req, callback) {
    pool.connect((err, client)=> {
        if (err) throw err;
        client.query('select * from topic where id=$1', [req.params.id], (err, data)=>{
            if (err) throw err;
            client.release();
            callback(data.rows);
        })
    })
}

function deleteTopic(req, callback) {
    pool.connect((err, client)=> {
        if (err) throw err;
        client.query('delete from topic where id=$1', [req.params.id], 
        (err, data) => {
            if (err) throw err;
            client.release();
            callback('Topic deleted!');
        })
    })
}

function createTopic(req, callback) {
    pool.query('INSERT INTO topic (title, description, timetomaster, timespent, source, startlearningdate, inprogress) values ($1, $2, $3, $4, $5, $6, $7)', [req.body.title, req.body.description, req.body.timetomaster, req.body.timespent, req.body.source, req.body.startlearningdate, req.body.inprogress], (err, results)=> {
        if (err) throw err;
        callback('Topic created!')
    });
};
/* function createTopic(req, callback){
    const {title, description, timetomaster, timespent, source, startlearningdate, inprogress} = req.body;
    console.log(req.body);
    pool.connect((err, client)=>{
        if (err) throw err;
        client.query('INSERT INTO topic (title, description, timetomaster, timespent, source, startlearningdate, inprogress) values ($1, $2, $3, $4, $5, $6, $7)', [title, description, timetomaster, timespent, source, startlearningdate, inprogress], (err, data) => {
            //if (err) throw err;
            client.release();
            callback();
        })    
    })
} */

function updateTopic(req, callback){
    const {title, description, timetomaster, timespent, source, startlearningdate, inprogress} = req.body;
    const id = parseInt(req.params.id);
    pool.connect((err, client) => {
        client.query('UPDATE topic set title=$1, description=$2, timetomaster=$3, timespent=$4, source=$5, startlearningdate=$6, inprogress=$7 where id=$8', [title, description, timetomaster, timespent, source, startlearningdate, inprogress, id], (err, data) => {
            client.release();
            callback("Topic updated!");
        })
    })
}

module.exports = {getAllTopics, getSingleTopic, deleteTopic, createTopic, updateTopic};