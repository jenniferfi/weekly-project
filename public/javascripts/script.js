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
    constructor(title, description, timetomaster, timespent, source, startlearningdate, inprogress, completiondate) {
        this.title = title;
        this.description = description;
        this.timetomaster = timetomaster || null;
        this.timespent = timespent || null;
        this.source = source;
        this.startlearningdate = startlearningdate || '1970-01-01';
        this.inprogress = inprogress;
        this.completiondate = completiondate || '1970-01-01';
    }
}

var arrTopic = [];

//List topics in table
$(document).ready(listAll)
function listAll() {
    $.getJSON('/api/topics', function (data) {
        //console.dir(data);

        $('#result').empty();
        for (let t of data) {
            let inprog ='';
            if (t.inprogress === true) {
                inprog = 'In Progress'
            } else {
                inprog = 'Completed'
            };

            let startdate = new Date(t.startlearningdate).toLocaleDateString("fi-FI");
            let compdate = new Date(t.completiondate).toLocaleDateString("fi-FI");

            $('#result').append(`<tr>
            <td>${t.title}</td>
            <td>${t.description}</td>
            <td>${t.timetomaster}</td>
            <td>${t.timespent}</td>
            <td>${t.source}</td>
            <td>${startdate}</td>
            <td>${inprog}</td>
            <td>${compdate}</td>
            <td><button class="fa fa-trash" onclick="remove('${t.id}')"></button>
            <button class="fa fa-edit" onclick="update('${t.id}', '${t.title}','${t.description}', '${t.timetomaster}', '${t.timespent}', '${t.source}', '${t.startlearningdate}', '${t.inprogress}', '${t.completiondate}')"></button></td>
            </tr>`)
        }
    })
}

function createTopic() {
    let titleValue = titleInput.value;
    let descrValue = descrInput.value;
    let ttmValue = ttmInput.value;
    let timesValue = tsInput.value;
    let sourceValue = srcInput.value;
    let sldValue = sldInput.value;
    let inprogValue = $('input[type=checkbox]').is(':checked') ? "true" : "false";
    let compldValue = compldInput.value;

    var topic = new Topic(titleValue, descrValue, ttmValue, timesValue, sourceValue, sldValue, inprogValue, compldValue);

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

function remove(id) {
    $.ajax({
        url: `http://localhost:3000/api/topics/${id}`,
        type: 'DELETE',
        success: function (result) {
            listAll();
        }
    });
}

function update(id, title, description, timetomaster, timespent, source, startlearningdate, inprogress, completiondate) {

    //removes form if there already is one
    if (document.contains(document.getElementById('updateForm'))) {
        document.getElementById('updateForm').remove();
    }

    //new form
    let inprog ='';
    if (inprogress == 'true') {inprog = 'checked'};

    options = {year: 'numeric', month:'2-digit', day:'2-digit'}
    let startdate = new Date(startlearningdate).toLocaleDateString("fi-FI", options).split('.').reverse().join('-');
    let compdate = new Date(completiondate).toLocaleDateString("fi-FI", options).split('.').reverse().join('-');
    
    let body = document.querySelector('body');
    
    $(body).append(`
    <div class="container" id="updateForm">
    <h2>Update topic</h2>
    <div class="row">
        <div class="col-25"><label for="title">Title: </label></div>
        <div class="col-75"><input id="uTitle" type="text" name="title" value="${title}" /></div>
    </div>
    <div class="row">
        <div class="col-25"><label for="description">Description: </label></div>
        <div class="col-75"><textarea id="uDescription" name="description" style="height:150px">${description}</textarea></div>
    </div>
    <div class="row">
        <div class="col-25"><label for="ttm">Time to Master: </label></div>
        <div class="col-75"><input id="uTtm" type="number" name="ttm" value="${timetomaster}" /></div>
    </div>
    <div class="row">
        <div class="col-25"><label for="timespent">Time Spent: </label></div>
         <div class="col-75"><input id="uTimespent" type="number" name="timespent" value="${timespent}" /></div>
    </div>
    <div class="row">
        <div class="col-25"><label for="source">Source: </label></div>
        <div class="col-75"><input id="uSource" type="text" name="source" value="${source}" /></div>
    </div>
    <div class="row">
        <div class="col-25"><label for="sld">Start Learning Date: </label></div>
        <div class="col-75"> <input id="uSld" type="date" name="sld" value="${startdate}" /></div>
    </div>
    <div class="row">
        <div class="col-25"><label for="inprog">In Progress:</label></div>
        <div class="col-75"><input id="uInprog" type="checkbox" name="inprog" value="true" ${inprog} /></div>
    </div>
    <div class="row">
        <div class="col-25"><label for="compld">Completion Date </label></div>
        <div class="col-75"><input id="uCompld" type="date" name="compld" value=${compdate} /></div>
    </div>
    <div class="row"><input type="submit" id="btn_save" onclick=updateTopic('${id}') value="Save"><input type="button" id="btn_cancel" onclick=cancel() value="Cancel"></div>
</div>`)

document.querySelector('#box1').classList.add('blur');
document.querySelector('#table').classList.add('blur');
window.scrollTo(0,0);
}

function updateTopic(id) {
    let title = document.getElementById('uTitle').value;
    let description = document.getElementById('uDescription').value;
    let timetomaster = document.getElementById('uTtm').value;
    if (!timetomaster) { timetomaster = undefined; }
    let timespent = document.getElementById('uTimespent').value;
    if (!timespent) { timespent = undefined; }
    let source = document.getElementById('uSource').value;
    let startlearningdate = document.getElementById('uSld').value;
    if (!startlearningdate) { startlearningdate = undefined; }
    let inprogress = $('input[type=checkbox]').is(':checked') ? "true" : "false";
    let completiondate = document.getElementById('uCompld').value;

    let updatedTopic = { title, description, timetomaster, timespent, source, startlearningdate, inprogress, completiondate };

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": `http://localhost:3000/api/topics/${id}`,
        "method": "PUT",
        "headers": {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        "data": JSON.stringify(updatedTopic)
    }

    $.ajax(settings).done(function () {
        listAll();
        document.getElementById('updateForm').remove();
        document.querySelector('#box1').classList.remove('blur');
        document.querySelector('#table').classList.remove('blur');
    });
}

function emptyForm() {
    document.getElementById('title').value = "";
    document.getElementById('description').value = "";
    document.getElementById('ttm').value = "";
    document.getElementById('timespent').value = "";
    document.getElementById('source').value = "";
    document.getElementById('sld').value = "";
    document.getElementById('inprog').value = "";
    document.getElementById('compld').value = "";
}

function cancel() {
    document.getElementById('updateForm').remove();
    document.querySelector('#box1').classList.remove('blur');
    document.querySelector('#table').classList.remove('blur');
}

document.getElementById("btn_add").onclick = createTopic;