const label = "";
var LastInsertedFileName = "";
$(document).ready(function() {
    var flag = getUrlVars()['flag'];
    var id = getUrlVars()['id'];

    if (flag) {
        $('#label').append('Update Item');
        $("#submit-btn").text('Update');
        $("#itemid").attr("value", id);
        GetDataById(id);
    } else {
        $('#label').append('Add Item');
        $("#submit-btn").text('Add');
    }
});

function SUBMITAPICALL(e) {
    var id = $("#itemid").val();

    var form_Data = new FormData();
    form_Data.append('itemName', $("#name").val());
    form_Data.append('itemType', $("#itype").val());
    form_Data.append('itemPrice', $("#price").val());
    form_Data.append('itemQty', $("#quantity").val());
    form_Data.append('itemDescription', $("#idesc").val());
    form_Data.append('files', $('#files').get(0).files[0]);

    var urlString = "";
    if (id) {
        console.log("Update");
        form_Data.append('id', $("#itemid").val());
        urlString = "http://localhost:3000/admin/UpdateItem";
    } else {
        console.log("Add");
        urlString = "http://localhost:3000/admin/AddItem";
    }

    $.ajax({
        type: "POST",
        url: urlString,
        data: form_Data,
        processData: false,
        contentType: false,
        success: function(response) {
            console.log(response);
            if (response === "Success") {
                window.location.href = "ViewItemList.html";
            }
        }
    });
}

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value) {
        vars[key] = value;
    });
    return vars;
}

function GetDataById(id) {
    $.ajax({
        type: "GET",
        url: "http://localhost:3000/admin/getItemById",
        data: {
            id: id
        },
        success: function(response) {
            //API Response
            var data = JSON.parse(response);
            console.log(data[0]);
            $('#itemid').val(data[0].id);
            $('#name').val(data[0].name);
            $('#itype').val(data[0].type);
            $('#price').val(data[0].price);
            $('#quantity').val(data[0].quantity);
            $('#idesc').val(data[0].description);
            LastInsertedFileName = data[0].imageurl;
        }
    });
}