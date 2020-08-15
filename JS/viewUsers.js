$(document).ready(function() {

    LoadData();

    $("#addItem").click(function(e) {
        e.preventDefault();
        window.location.href = "AddItem.html";
    });

    $("#viewItem").click(function(e) {
        e.preventDefault();
        window.location.href = "ViewItemList.html";
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
    tableData += "<td data-priority='1'> Registered ID </td>";
    tableData += "<td data-priority='persist'> Name </td>";
    tableData += "<td data-priority='2'> Email </td>";
    tableData += "<td data-priority='3'> Password </td>";
    tableData += "<td data-priority='4'> PhoneNumber </td>";
    tableData += "<td data-priority='5'> Age </td>";
    tableData += "</tr>";
    tableData += "</thead>";
    tableData += "<tbody>";

    $.ajax({
        type: "GET",
        url: "http://localhost:3000/admin/getUsers",
        async: false,
        success: function(response) {
            // tableData
            data = JSON.parse(response);
            for (const key in data) {
                if (data.hasOwnProperty(key)) {
                    const element = data[key];
                    tableData += "<tr>";
                    tableData += "<td id='" + element.id + "'> " + element.id + " </td>";
                    tableData += "<td> " + element.name + " </td>";
                    tableData += "<td> " + element.email + " </td>";
                    tableData += "<td> " + element.password + " </td>";
                    tableData += "<td> " + element.phoneNumber + " </td>";
                    tableData += "<td> " + element.age + " </td>";
                    tableData += "</tr>";
                }
            }
        }
    });
    tableData += "</tbody>";
    $('#viewList').append(tableData);
}