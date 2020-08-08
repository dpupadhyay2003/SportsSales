$(document).ready(function() {
    $("#error-div").hide();
    $('#submit-btn').click(function() {

        var itemName = $("#name").val();
        var itemType = $("#itype").val();
        var itemPrice = $("#price").val();
        var itemImage = $('#Image').get(0).files[0];
        var itemQty = $("#quantity").val();
        var itemDescription = $("#idesc").val();

        var form_Data = new FormData();
        form_Data.append('itemName', itemName);
        form_Data.append('itemType', itemType);
        form_Data.append('itemPrice', itemPrice);
        form_Data.append('itemImage', itemImage);
        form_Data.append('itemQty', itemQty);
        form_Data.append('itemDescription', itemDescription);
        $.ajax({
            type: "POST",
            url: "http://localhost:3000/admin/addItem",
            data: form_Data,
            processData: false,
            contentType: false,
            success: function(response) {
                console.log(response);
            }
        });

        $.post("http://localhost:3000/admin/addItem", form_Data,
            function(response, textStatus) {
                console.log(response);
            }
        );
    });
});