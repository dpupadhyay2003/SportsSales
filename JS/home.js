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
    $('#logout').click(function(e) {
        e.preventDefault();
        window.location.href = 'login.html';
    });

    $('#Favourite').click(function(e) {
        e.preventDefault();
        window.location.href = 'Favourite.html?id=' + userID;
    });

    LoadData(userID);
});

$.urlParam = function(name) {
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results) {
        return 0 || results[1] || null;
    }
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



function LoadData(userID) {
    var tableData = '';
    var itemList = [];
    $.ajax({
        type: "GET",
        url: "http://localhost:3000/admin/getItem",
        async: false,
        success: function(response) {
            // tableData
            data = JSON.parse(response);
            var counter = 1;
            for (let index = 0; index < data.length; index++) {
                const element = data[index];
                if (counter <= 3) {
                    if (counter === 1) {
                        tableData += '<div class="ui-block-a dis-flex">';
                    } else if (counter === 2) {
                        tableData += '<div class="ui-block-b dis-flex">';
                    } else if (counter === 3) {
                        tableData += '<div class="ui-block-c dis-flex">';
                    } else {
                        counter = 1;
                    }
                    tableData += '<div>';
                    tableData += '<img alt="home" height="200px" src="./IMG/' + element.imageurl + '" />';
                    tableData += '<h2>' + element.name;
                    tableData += '<a href="#popupDialog" data-rel="popup" data-position-to="window" data-transition="pop"><i title="Favourite" onclick="favourites(' + element.id + ', false, ' + userID + ');" class="fa fa-heart-o float_clear"></i></a>'
                    tableData += '<i class="fa fa-shopping-cart float_clear" onclick="favourites(' + element.id + ', true, ' + userID + ');"></i>';
                    tableData += '<span class="float_clear"> Qty:' + element.quantity + ' </span>';
                    tableData += '<br>$' + element.price;
                    tableData += '</h2>';
                    tableData += '</div>';
                    tableData += '</div>';
                    counter++;
                } else {
                    counter = 1;
                    index = index - 1;
                }
            }
        }
    });
    $('#viewList').append(tableData).listview('refresh');
}

function favourites(id, cart, userID) {
    if (cart) {
        // Add to Cart API
        console.log("CART");
    } else {
        // Favourites API
        $.ajax({
            type: "POST",
            url: "http://localhost:3000/AddFavourite",
            data: {
                userID: userID,
                itemId: id
            },
            async: false,
            success: function(response) {
                if (response === "Record Already Found") {
                    alert('Record Already Favourite, Try Again !!!');
                } else {
                    alert('Add to Favourties!!');
                }
                window.location.reload();
            }
        });
    }
}