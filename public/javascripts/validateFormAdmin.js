$(document).ready(() => {
    $("input#price").on('keypress', function(e) {
        if (e.keyCode < 48 || e.keyCode > 57) {
            console.log("aaaaaa")
            return false;
        }
        return true;
    });
    $("input#quantity").on("change", function(e) {
        e.target.value < 1 ? e.target.value = 1 : e.target.value = e.target.value;
    })
    $("input#year").on('keypress', function(e) {
        if (e.keyCode < 48 || e.keyCode > 57) {
            console.log("aaaaaa")
            return false;
        }
        if (e.target.value.length > 3) return false;
        return true;
    });
})