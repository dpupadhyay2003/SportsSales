$(document).ready(function() {

    LoadData();

    $("#addItem").click(function(e) {
        e.preventDefault();
        window.location.href = "AddItem.html";
    });

    $("#logout").click(function(e) {
        e.preventDefault();
        window.location.href = "login.html";
    });
});

function LoadData() {
    var tableData = "";

    tableData += "<thead>";
    tableData += "<tr>";
    tableData += "<td data-priority='1'> Item ID </td>";
    tableData += "<td data-priority='persist'> Item Name </td>";
    tableData += "<td data-priority='2'> Item Type </td>";
    tableData += "<td data-priority='3'> Item Price </td>";
    tableData += "<td data-priority='4'> Item Quantity </td>";
    tableData += "<td data-priority='5'> Item Image </td>";
    tableData += "<td colspan=2 data-priority='6'> Action </td>";
    tableData += "</tr>";
    tableData += "</thead>";
    tableData += "<tbody>";

    $.ajax({
        type: "GET",
        url: "http://localhost:3000/admin/getItem",
        async: false,
        success: function(response) {
            // tableData
            data = JSON.parse(response);
            for (const key in data) {
                if (data.hasOwnProperty(key)) {
                    const element = data[key];
                    tableData += "<tr>";
                    tableData += "<td id='" + element.id + "'> " + (parseInt(key) + 1) + " </td>";
                    tableData += "<td> " + element.name + " </td>";
                    tableData += "<td> " + element.type + " </td>";
                    tableData += "<td> $" + element.price + " </td>";
                    tableData += "<td> " + element.quantity + " </td>";
                    tableData += "<td> <img src=./IMG/" + element.imageurl + " alt='" + element.name + "' width='100px' height='100px'> </td>";
                    tableData += "<td> <a href='#' onclick='edit(" + element.id + ")' title='Edit' data-rel='external'><i class='fa fa-pencil-square-o fa-2x' aria-hidden='true'></i></a> </td>";
                    tableData += "<td><a href='#' onclick='deleteById(" + element.id + ")' title='Delete' data-rel='external'><i class='fa fa-trash fa-2x'  aria-hidden='true'></i></a> </td>";
                    tableData += "</tr>";
                }
            }
        }
    });
    tableData += "</tbody>";
    $('#viewList').append(tableData);
}

function edit(id) {
    window.location.href = "AddItem.html?flag=true&id=" + id + "";
}

function deleteById(id) {
    $.ajax({
        type: "GET",
        url: "http://localhost:3000/admin/deleteById",
        data: {
            id: id
        },
        success: function(response) {
            if (response === "Success") {
                window.location.reload();
            }
        }
    });
}