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
            $('#result').append(`<tr>
            <td>${t.title}</td>
            <td>${t.description}</td>
            <td>${t.timetomaster}</td>
            <td>${t.timespent}</td>
            <td>${t.source}</td>
            <td>${t.startlearningdate}</td>
            <td>${t.inprogress}</td>
            <td>${t.completiondate}</td>
            <td><button onclick="remove('${t.id}')">Delete</button>
            <button onclick="update('${t.id}', '${t.title}','${t.description}', '${t.timetomaster}', '${t.timespent}', '${t.source}', '${t.startlearningdate}', '${t.inprogress}', '${t.completiondate}')">Edit</button></td>
            </tr>`)
        }
    })
}

function createTopic () {
    let titleValue = titleInput.value;
    let descrValue = descrInput.value;
    let ttmValue = ttmInput.value;
        if (!ttmValue) { ttmValue = undefined;}
    let timesValue = tsInput.value;
        if (!timesValue) { timesValue = undefined;}
    let sourceValue = srcInput.value;
    let sldValue = sldInput.value;
        if (!sldValue) { sldValue = undefined;}
    let inprogValue = $('input[type=checkbox]').is(':checked') ? "true" : "false";
    let compldValue = compldInput.value;
    
    var topic = new Topic (titleValue, descrValue, ttmValue, timesValue, sourceValue, sldValue, inprogValue, compldValue);

    //localStorage.setItem(id, [titleValue, descrValue, ttmValue, timesValue, sourceValue, sldValue, inprogValue, compldValue])

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

function update(id, title, description, timetomaster, timespent, source, startlearningdate, inprogress, completiondate) {
    //new form elements
    let body = document.querySelector('body');
    let updateDiv = document.createElement('div');
    let titleInput = document.createElement('input');
    let descInput = document.createElement('input');
    let ttmInput = document.createElement('input');
    let tsInput = document.createElement('input');
    let sourceInput = document.createElement('input');
    let sldInput = document.createElement('input');
    let inprogInput = document.createElement('input');
    let compldInput = document.createElement('input');
    let saveBtn = document.createElement('input');

    //element attributes
    updateDiv.setAttribute('id', 'formdiv');

    titleInput.setAttribute('type', 'text');
    titleInput.setAttribute('name', 'uTitle');
    titleInput.setAttribute('id', 'uTitle');
    titleInput.setAttribute('value', title);

    descInput.setAttribute('type', 'text');
    descInput.setAttribute('name', 'description');
    descInput.setAttribute('id', 'uDescription');
    descInput.setAttribute('value', description);

    ttmInput.setAttribute('type', 'number');
    ttmInput.setAttribute('name', 'ttm');
    ttmInput.setAttribute('id', 'uTtm');
    ttmInput.setAttribute('value', timetomaster);

    tsInput.setAttribute('type', 'number');
    tsInput.setAttribute('name', 'timespent');
    tsInput.setAttribute('id', 'uTimespent');
    tsInput.setAttribute('value', timespent);

    sourceInput.setAttribute('type', 'text');
    sourceInput.setAttribute('name', 'source');
    sourceInput.setAttribute('id', 'uSource');
    sourceInput.setAttribute('value', source);

    sldInput.setAttribute('type', 'date');
    sldInput.setAttribute('name', 'sld');
    sldInput.setAttribute('id', 'uSld');
    sldInput.setAttribute('value', startlearningdate);

    inprogInput.setAttribute('type', 'checkbox');
    inprogInput.setAttribute('name', 'inprog');
    inprogInput.setAttribute('id', 'uInprog');
    inprogInput.setAttribute('value', inprogress);

    compldInput.setAttribute('type', 'date');
    compldInput.setAttribute('name', 'compld');
    compldInput.setAttribute('id', 'uCompld');
    compldInput.setAttribute('value', completiondate);

    saveBtn.setAttribute('type', 'submit');
    saveBtn.setAttribute('id', "btn_save");
    saveBtn.setAttribute('value', 'Save');
    saveBtn.setAttribute('onclick', `updateTopic('${id}')`);

    //appends
    updateDiv.appendChild(titleInput);
    updateDiv.appendChild(descInput);
    updateDiv.appendChild(ttmInput);
    updateDiv.appendChild(tsInput);
    updateDiv.appendChild(sourceInput);
    updateDiv.appendChild(sldInput);
    updateDiv.appendChild(inprogInput);
    updateDiv.appendChild(compldInput);
    updateDiv.appendChild(saveBtn);

    body.appendChild(updateDiv);

}

function updateTopic(id) {
    //tyhjennä lomake jos on jo siinä
    let title = document.getElementById('uTitle').value;
    let description = document.getElementById('uDescription').value;
    let timetomaster = document.getElementById('uTtm').value;
        if (!timetomaster) { timetomaster = undefined;}
    let timespent = document.getElementById('uTimespent').value;
        if (!timespent) { timespent = undefined;}
    let source = document.getElementById('uSource').value;
    let startlearningdate = document.getElementById('uSld').value;
        if (!startlearningdate) { startlearningdate = undefined;}
    let inprogress = $('input[type=checkbox]').is(':checked') ? "true" : "false";
    let completiondate = document.getElementById('uCompld').value;

    let updatedTopic = {title, description, timetomaster, timespent, source, startlearningdate, inprogress, completiondate};

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
        //console.log(updatedTopic);
        listAll();
        //poista lomake kun painaa save
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