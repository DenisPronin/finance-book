(function($) {
    "use strict";

    $(document).ready(function(){
        $('#loginLink').click(function(){
            $(this).addClass('active');
            $('#signUpLink').removeClass('active');

            $('#signUpContainer').hide();
            $('#loginContainer').fadeIn();
        }).click();

        $('#signUpLink').click(function(){
            $(this).addClass('active');
            $('#loginLink').removeClass('active');

            $('#loginContainer').hide();
            $('#signUpContainer').fadeIn();
        });
    });

})(jQuery);
