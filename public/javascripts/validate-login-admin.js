
(function ($) {
    "use strict";

    /*==================================================================
    [ Focus Contact2 ]*/
    $('input.input100').each(function(){
        $(this).on('blur', function(){
            if($(this).val().trim() != "") {
                $(this).addClass('has-val');
            }
            else {
                if(validate(this) == false){
                    showValidate(this);
                }
                $(this).removeClass('has-val');
            }
        });
        $(this).keydown(function() {
            const input = $("input.input100");
            const button = $(".login100-form-btn");
            if (input[0].value != "" && input[1].value != "") {
                button[0].disabled = false;
            } else button[0].disabled = true;
        }); 
    })
  
  
    /*==================================================================
    [ Validate ]*/


    $('.validate-form .input100').each(function(){
        $(this).focus(function(){
           hideValidate(this);
        });
    });

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
    

})(jQuery);