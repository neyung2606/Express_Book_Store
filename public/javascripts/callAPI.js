$(document).ready(() => {
    $("#form").submit((e) => {
        e.preventDefault();
        const id = $("#idUser").val();
        console.log(id)
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
    });
    $("button#delBtn").click((e) => {
        const id = e.target.dataset.id;
        console.log(id)
        $.ajax({
            url: `/admin/users/${id}`,
            method: "DELETE",
        });
        window.location.reload();
    });
})