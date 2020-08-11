var userID = 0;
$(document).ready(function() {
    $('#error-div').hide();
    userID = $.urlParam('id');
    if (userID) {
        getUserById(userID);
        $('#reTypePassword').css('display', 'none');
        $("#submit").text('Update Profile');
    } else {
        $('#reTypePassword').css('display', 'initial');
        $("#submit").text('Register Profile');
    }


    function checkNullOrNot(id, num) {
        // Check String or text 

        if (num === "number") {
            // data is Number
            if (num === "number" && $(id).val() != '' && $(id).val().length == 10) {
                $('#error-div').hide();
                return true;
            } else {
                $('#error-div').show();
                return false;
            }
        } else {
            // data is character
            if ($(id).val() != '') {
                $('#error-div').hide();
                return true;
            } else {
                $('#error-div').show();
                return false;
            }
        }
    }

    $('#submit').click(function() {
        var name = $("#name").val();
        var email = $("#email").val();
        var password = $("#password").val();
        var re_password = $("#re_password").val();
        var phoneNumber = $("#phone").val();
        var age = $("#age").val();

        if (checkNullOrNot("#name", "string") && checkNullOrNot("#password", "string") &&
            checkNullOrNot("#phone", "number") && email != '') {
            // Check Upper case, Lower Case, digits, characters ! # $ % & ' * + - / = ? ^ _ ` { | } ~
            if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
                // Valid Email.
                $('#error-div').hide();
                console.log('ID: ', $('#regid').val());
                if ($('#regid').val()) {
                    // Update
                    if (password.length >= 8) {
                        // Call API
                        console.log("Password Correct");
                        $('#error-div').hide();
                        $.post("http://localhost:3000/UpdateRegister", {
                                "id": $('#regid').val(),
                                "name": name,
                                "email": email,
                                "password": password,
                                "phoneNumber": phoneNumber,
                                "age": age
                            },
                            function(response, textStatus) {
                                console.log(response);
                                $('#error-div').hide();
                                window.location.href = "Home.html?id=" + $('#regid').val();
                            }
                        );
                    } else {
                        console.log("Password INCorrect");
                        // Password Doesnot Matched, Error Occured.
                        $('#error-div').show();
                    }
                } else {
                    // Add 
                    if (password === re_password && password.length >= 8) { // Password Matched
                        // Call API
                        $('#error-div').hide();
                        $.post("http://localhost:3000/register", {
                                "name": name,
                                "email": email,
                                "password": password,
                                "phoneNumber": phoneNumber,
                                "age": age
                            },
                            function(response, textStatus) {
                                console.log(response);
                                $('#error-div').hide();
                                window.location.href = "login.html";
                            }
                        );
                    } else {
                        // Password Doesnot Matched, Error Occured.
                        $('#error-div').show();
                        console.log("Password ELSE Correct");
                    }

                }


                // Update

            } else {
                // InValid Email, Error Occured.
                $('#error-div').show();
                console.log("Email Incorrect");
            }
        } else {
            $('#error-div').show();
            console.log("INCORRECT");
        }
    });

    // Only Alphabets Validation
    $('#name').bind('keyup paste', function() {
        this.value = this.value.replace(/[^a-z | A-Z]/g, '');
    });

    // Age Validation
    $('#age').bind('keyup paste', function() {
        this.value = this.value.replace(/[^0-9]/g, '');
    });

    // Phone Number Validation
    $('#phone').bind('keyup paste', function() {
        this.value = this.value.replace(/[^0-9]/g, '');
    });


    $('#togglePassword').unbind("click").click(function(e) {
        e.preventDefault();
        console.log($(this).hasClass('fa fa-eye-slash'));
        if ($(this).hasClass('fa fa-eye-slash')) {
            $(this).removeClass('fa fa-eye-slash');
            $(this).addClass('fa fa-eye');
            password.setAttribute('type', 'text');
        } else {
            $(this).removeClass('fa fa-eye');
            $(this).addClass('fa fa-eye-slash');
            password.setAttribute('type', 'password');
        }
    });



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
            $('#regid').val(data[0].id);
            $('#name').val(data[0].name);
            $('#email').val(data[0].email);
            $('#password').val(data[0].password);
            $('#phone').val(data[0].phoneNumber);
            $('#age').val(data[0].age);
        }
    });
}