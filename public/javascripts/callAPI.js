$(document).ready(() => {
    $("input.validate").each(function() {
        $(this).on('blur', function() {
            if(validate(this) == false){
                showValidate(this);
            }
        });
        $(this).on('keydown', function(e) {
            const index = $(this).attr("data-id");
            const input = $("input.validate");
            const button = $("#editFormBtn");
            if (input[0].value != "" && input[1].value != "" && input[2].value != "") {
                if (index == 0) {
                    if (input[0].value.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/) == null ) {
                        $('#usernameError').html("Độ dài tối thiểu là 6 mà có ít nhất 1 chữ và 1 số");
                        button[0].disabled = true;
                    } else {
                        $('#usernameError').html("");
                        button[0].disabled = false;
                    }
                }
                if (index == 1) {
                    if (input[1].value.match(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i) == null) {
                        $('#emailError').html("Email không đúng định dạng");
                        button[0].disabled = true;
                    } else {
                        $('#emailError').html("");
                        button[0].disabled = false;
                    }
                }  
                if (index == 2) {
                    if (input[2].value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/) == null) {
                        $('#passError').html("Độ dài tối thiểu là 8 mà có ít nhất 1 chữ và 1 số");
                        button[0].disabled = true;
                    } else {
                        $('#passError').html("");
                        button[0].disabled = false;
                    }
                }
            } else button[0].disabled = true;
        });
        $(this).change(function() {
            const index = $(this).attr("data-id");
            const input = $("input.validate");
            const button = $("#editFormBtn");
            if (input[0].value != "" && input[1].value != "" && input[2].value != "") {
                if (index == 0) {
                    if (input[0].value.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/) == null ) {
                        $('#usernameError').html("Độ dài tối thiểu là 6 mà có ít nhất 1 chữ và 1 số");
                        button[0].disabled = true;
                    } else {
                        $('#usernameError').html("");
                        button[0].disabled = false;
                    }
                }
                if (index == 1) {
                    if (input[1].value.match(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i) == null) {
                        $('#emailError').html("Email không đúng định dạng");
                        button[0].disabled = true;
                    } else {
                        $('#emailError').html("");
                        button[0].disabled = false;
                    }
                }  
                if (index == 2) {
                    if (input[2].value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/) == null) {
                        $('#passError').html("Độ dài tối thiểu là 8 mà có ít nhất 1 chữ và 1 số");
                        button[0].disabled = true;
                    } else {
                        $('#passError').html("");
                        button[0].disabled = false;
                    }
                }
            } else button[0].disabled = true;
        })
        $(this).on('keyup', function(e) {
            const index = $(this).attr("data-id");
            const input = $("input.validate");
            const button = $("#editFormBtn");
            if (input[0].value != "" && input[1].value != "" && input[2].value != "") {
                if (index == 0) {
                    if (input[0].value.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/) == null ) {
                        button[0].disabled = true;
                    } else {
                        $('#usernameError').html("");
                        button[0].disabled = false;
                    }
                }
                if (index == 1) {
                    if (input[1].value.match(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i) == null) {
                        $('#emailError').html("Email không đúng định dạng");
                        button[0].disabled = true;
                    } else {
                        $('#emailError').html("");
                        button[0].disabled = false;
                    }
                }
                if (index == 2) {
                    if (input[2].value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/) == null) {
                        console.log("123")
                        $('#passError').html("Độ dài tối thiểu là 8 mà có ít nhất 1 chữ và 1 số");
                        button[0].disabled = true;
                    } else {
                        console.log("aaaaa")
                        $('#passError').html("");
                        button[0].disabled = false;
                    }
                } 
            } else button[0].disabled = true;
        });
        $(this).focus(function(){
            hideValidate(this);
        });
    })
    $("input#username").on

    function validate (input) {
        if($(input).val() == ''){
            return false;
        }
    }
    function showValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).removeClass('alert-validate');
    }
    // ajax update user
    $("#form").submit((e) => {
        e.preventDefault();
        const id = $('#idUser').val();
        $.ajax({
            url: `/admin/users/${id}`,
            method: "PUT",
            data: {
                username: $("#username").val(),
                password: $("#password").val(),
                email: $("#email").val(),
                role: $("#role").val()
            }
        });
        window.location.reload();
    });

    // ajax delete user
    $("button#delBtn").click((e) => {
        e.preventDefault();
        const id = e.target.dataset.id;
        console.log(id)
        $.ajax({
            url: `/admin/users/${id}`,
            method: "DELETE",
        });
        window.location = "/admin/users";
    });

    // ajax delete book
    $("button#delBookBtn").click((e) => {
        e.preventDefault();
        const id = e.target.dataset.id;
        console.log(id)
        $.ajax({
            url: `/admin/books/${id}`,
            method: "DELETE",
        });
        window.location= "/admin/books";
    });
})