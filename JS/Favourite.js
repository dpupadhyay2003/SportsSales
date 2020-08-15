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

    LoadData(userID);
    // GetItemById(14);
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


function GetItemById(idList) {
    var itemData = [];
    idList.forEach(element => {
        $.ajax({
            type: "GET",
            url: "http://localhost:3000/admin/getItemById",
            data: {
                id: element
            },
            async: false,
            success: function(response) {
                data = JSON.parse(response);
                console.log("DATA:===>>", data);
                itemData.push(data[0]);
            }
        });
    });
    var tableData = '';
    var counter = 1;
    for (let index = 0; index < itemData.length; index++) {
        const element = itemData[index];
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
            tableData += '<h2>' + element.name + ' <i title="Favourite" onclick="favourites(' + element.id + ', false);" class="fa fa-heart float_clear"></i>'
            tableData += '<i class="fa fa-shopping-cart float_clear" onclick="favourites(' + element.id + ', true);"></i>';
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
    $('#FavouriteList').append(tableData).listview('refresh');
}


function LoadData(user_id) {
    var itemIdList = [];
    $.ajax({
        type: "GET",
        url: "http://localhost:3000/GetFavourite",
        data: {
            id: user_id
        },
        async: false,
        success: function(response) {
            // tableData
            data = JSON.parse(response);
            for (const key in data) {
                if (data.hasOwnProperty(key)) {
                    const element = data[key];
                    itemIdList.push(element.item_id);
                }
            }
            GetItemById(itemIdList);
        }
    });
}



function favourites(itemId, cart) {
    if (cart) {
        // Add to Cart
    } else {
        // Remove from Favourites.
        $.ajax({
            type: "POST",
            url: "http://localhost:3000/RemoveFavourite",
            data: {
                userID: userID,
                itemId: itemId
            },
            async: false,
            success: function(response) {
                alert('Remove From Favourties!!');
                window.location.reload();
            }
        });
    }

}