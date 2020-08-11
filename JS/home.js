var userID;

$(document).ready(function() {
    userID = $.urlParam('id');
    getUserById(userID);
    $('#profile').click(function(e) {
        e.preventDefault();
        window.location.href = "registration.html?id=" + userID;
    });

    $('#homePage').click(function(e) {
        e.preventDefault();
        window.location.href = 'Home.html?id=' + userID;
    });
    $('#about_us').click(function(e) {
        e.preventDefault();
        window.location.href = 'about_us.html?id=' + userID;
    });

    $('#contact_us').click(function(e) {
        e.preventDefault();
        window.location.href = 'Contact_Us.html?id=' + userID;
    });

    LoadData();
});

$.urlParam = function(name) {
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    return 0 || results[1];
}

function getUserById(id) {
    $.ajax({
        type: "GET",
        url: "http://localhost:3000/getUserById",
        data: {
            id: id
        },
        async: false,
        success: function(response) {
            data = JSON.parse(response);
            $('#welcomeUser').html('').append('Welcome ' + data[0].name);
        }
    });
}


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

                    tableData += '<div class="card side-by-side table-row">';
                    tableData += '<div class="card-image">';
                    tableData += '<img alt="home" height="200px" src="./IMG/' + element.imageurl + '" />';
                    tableData += '<div class="banner"></div>';
                    tableData += '<h2>' + element.name + ' <i title="Favourite" class="fa fa-heart float_clear"></i></h2>';
                    tableData += '</div>';
                    tableData += '</div>';

                }
            }
        }
    });
    $('#viewList').append(tableData).listview('refresh');
}