$(document).ready(function() {
    LoadData();
});


function LoadData() {
    var tableData = '';

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

                    // <div class="ui-block-a" id="exampleBlockA">Hello 1</div>
                    tableData += '<div class="ui-block-a float_clear">';
                    tableData += '<img src="./IMG/' + element.imageurl + '" width="210px" height="90px" class="ui-li-thumb" />';
                    tableData += '<h2> ' + element.name + ' </h2>';
                    tableData += '<p> $' + element.price + '';
                    tableData += '&nbsp;&nbsp;<i title="Favourite" class="fa fa-times"></i> </p>';
                    tableData += '</div>';

                    // tableData += '<li>';
                    // tableData += '<a href="#">';
                    // tableData += '<img src="./IMG/' + element.imageurl + '" width="210px" height="90px" class="ui-li-thumb" />';
                    // tableData += '<h2> ' + element.name + ' </h2>';
                    // tableData += '<p> $' + element.price + '';
                    // tableData += '&nbsp;&nbsp;<i title="Favourite" class="fa fa-times"></i> </p>';
                    // tableData += '</a>';
                    // tableData += '</li>';

                }
            }
        }
    });
    $('#viewList').append(tableData).listview('refresh');
}