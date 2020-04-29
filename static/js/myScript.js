var btn = document.getElementById("submit").addEventListener("click", displayData);

function loading() {
    document.getElementById("time_elapsed").innerHTML = "Loading...";
}

function insertDisplay() {
    clearCache();
    var userId = $("textarea[id='userId']").val();
    // var orderNumber = $("textarea[id='orderNumber']").val();
    var dayOfWeek = $("input[id='dayOfWeek']").val();
    var hourOfDay = $("textarea[id='hourOfDay']").val();
    var daysSinceLast = $("textarea[id='daysSinceLast']").val();

    // document.getElementById('whatis').scrollIntoView();
    loading();
    var xmlHttp = new XMLHttpRequest();
    var url = "/insert?query=" + "," + userId + "," + "x" + "," + dayOfWeek + "," + hourOfDay + "," + daysSinceLast + ")";
    xmlHttp.open("GET", url, true);
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            var responseText = xmlHttp.responseText;
            var obj = JSON.parse(responseText);
            createDataTable(obj);
            document.getElementById("time_elapsed").innerHTML = "Insert Success";
        } else if (xmlHttp.readyState == 4) {
            var error = "Wrong Input";
            document.getElementById("time_elapsed").innerHTML = error;
        }
        console.log(xmlHttp.responseText);
    };
    xmlHttp.send(null);
}

function displayData() {
    clearCache();
    // var method = $("input[id='InputName']").val();
    // var method = "mysql"
    var sql = $("textarea[id='InputMessage']").val();
    var xmlHttp = new XMLHttpRequest();
    var url = "/mysql" + "?query=" + sql;

    // document.getElementById('whatis').scrollIntoView();
    loading();
    xmlHttp.open("GET", url, true);
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            var responseText = xmlHttp.responseText;
            var obj = JSON.parse(responseText);
            createDataTable(obj);
            var time = obj['query_time'];
            document.getElementById("time_elapsed").innerHTML = time;
        } else if (xmlHttp.readyState == 4) {
            var error = "Wrong Input";
            document.getElementById("time_elapsed").innerHTML = error;
        }
        console.log(xmlHttp.responseText);
    };
    xmlHttp.send(null);
}

function createDataTable(obj) {
    var table = document.getElementById("rounded-corner");
    var create1 = document.createElement("thead");
    create1.setAttribute("id", "tbhead");
    table.appendChild(create1);
    var thead = document.getElementById('tbhead');
    var row = document.createElement('tr');
    for (var j = 0; j < obj['col_name'].length; j++) {
        var idCell = document.createElement('th');
        idCell.setAttribute("scope", "col");
        if (j === 0) {
            idCell.setAttribute("class", "rounded-first");
            // alert("success")
        }
        if (j === obj['col_name'].length - 1) {
            idCell.setAttribute("class", "rounded-last");
        }
        idCell.innerHTML = obj['col_name'][j];
        row.appendChild(idCell);
    }
    thead.appendChild(row);

    var create2 = document.createElement("thead");
    create2.setAttribute("id", "tbmain");
    table.appendChild(create2);
    var tbody = document.getElementById('tbmain');
    for (var i = 0; i < obj['result'].length; i++) {
        var trow = fillTable(obj['result'][i]);
        tbody.appendChild(trow);
    }
}

function fillTable(data) {
    var row = document.createElement('tr');
    for (var i = 0; i < data.length; i++) {
        var idCell = document.createElement('td');
        idCell.innerHTML = data[i];
        row.appendChild(idCell);
    }
    return row;
}

function clearThis() {
    document.getElementById("time_elapsed").innerHTML = "";
    clearCache();
}

function clearCache() {
    var table = document.getElementById("rounded-corner");
    var child1 = document.getElementById("tbhead");
    if (child1 != null) {
        var child2 = document.getElementById("tbmain");
        table.removeChild(child1);
        table.removeChild(child2);
        document.getElementById("time_elapsed").innerHTML = "";
    }
}