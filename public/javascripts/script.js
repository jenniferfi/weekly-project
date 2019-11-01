var table = document.getElementById('result');
var titleInput = document.getElementById('title');
var descrInput = document.getElementById('description');
var ttmInput = document.getElementById('ttm');
var tsInput = document.getElementById('timespent');
var srcInput = document.getElementById('source');
var sldInput = document.getElementById('sld');
var inprogInput = document.getElementById('inprog');
var compldInput = document.getElementById('compld');

class Topic {
    constructor (title, description, timetomaster, timespent, source, startlearningdate, inprogress, completiondate) {
    this.title = title;
    this.description = description;
    this.timetomaster = timetomaster;
    this.timespent = timespent;
    this.source = source;
    this.startlearningdate = startlearningdate;
    this.inprogress = inprogress;
    this.completiondate = completiondate;
    }
}

var arrTopic = [];

$(document).ready(listAll)
function listAll(){
    $.getJSON('/api/topics', function (data){
        console.dir(data);
        $('#result').empty();
        for (let t of data) {
            $('#result').append(`<tr><td>${t.title}</td><td>${t.description}</td><td>${t.timetomaster}</td><td>${t.timespent}</td><td>${t.source}</td><td>${t.startlearningdate}</td><td>${t.inprogress}</td><td>${t.completiondate}</td><td><button onclick="remove('${t.id}')">Delete</button></td></tr>`)
        }
    })
}

function createTopic () {
    let titleT = titleInput.value;
    let descrT = descrInput.value;
    let ttmT = ttmInput.value;
        if (!ttmT) {
            ttmT = undefined;
        }
    let timesT = tsInput.value;
        if (!timesT) {
            timesT = undefined;
        }
    let sourceT = srcInput.value;
    let sldT = sldInput.value;
        if (!sldT) {
            sldT = undefined;
        }
    let inprogT = $('input[type=checkbox]').is(':checked') ? "true" : "false";
    let compldT = compldInput.value;
    
    var topic = new Topic (titleT, descrT, ttmT, timesT, sourceT, sldT, inprogT, compldT);

    //localStorage.setItem(idT, [titleT, descrT, ttmT, timesT, sourceT, sldT, inprogT, compldT])

    arrTopic.push(topic);

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "http://localhost:3000/api/topics",
        "method": "POST",
        "headers": {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        "data": JSON.stringify(topic)
    }

    $.ajax(settings).done(function () {
        listAll();
    });
emptyForm();
}

function remove (id) {
    //console.log(id);
    $.ajax({
    url: `http://localhost:3000/api/topics/${id}`,
    type: 'DELETE',
    success: function(result) {
        //console.dir(result);
        listAll();
    }
});

}

function emptyForm(){
    document.getElementById('title').value = "";
    document.getElementById('description').value = "";
    document.getElementById('ttm').value = "";
    document.getElementById('timespent').value = "";
    document.getElementById('source').value = "";
    document.getElementById('sld').value = "";
    document.getElementById('inprog').value = "";
    document.getElementById('compld').value = "";
}

document.getElementById("btn_add").onclick = createTopic;