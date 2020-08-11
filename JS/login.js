$(document).ready(function() {
    $("#error-div").hide();
    $('#submit').click(function() {
        var id;
        var email = $("#email").val();
        var password = $("#password").val();
        $.get("http://localhost:3000/login", {
                "email": email,
                "password": password
            },
            function(response, textStatus) {
                var res = JSON.parse(response);
                var flag = false;
                for (const key in res) {
                    if (res.hasOwnProperty(key)) {
                        const data = res[key];
                        if (email === data.email) {
                            flag = true;
                            id = data.id;
                            break;
                        } else {
                            flag = false;
                        }
                    }
                }
                if (flag) {
                    console.log("Password Matched . . .");
                    $("#error-div").hide();
                    window.location.href = "Home.html?id=" + id + "";
                } else {
                    $("#error-div").show();
                }
            }
        );
    });

    $("#registration").click(function(e) {
        e.preventDefault();
        window.location.href = "registration.html";
    });


    $('#togglePassword').unbind("click").click(function(e) {
        e.preventDefault();
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