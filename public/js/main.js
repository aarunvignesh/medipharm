
(function ($) {
    "use strict";

    var name = $('.validate-input input[name="name"]');
    var email = $('.validate-input input[name="email"]');
    var company = $('.validate-input input[name="companyName"]');
    var contact = $('.validate-input input[name="contactNumber"]');


    $('.enquiry-form-btn').on('click',function(e){
        e.preventDefault();
        var check = true;

        if($(name).val().trim() == ''){
            showValidate(name);
            check=false;
        }

        if($(email).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
            showValidate(email);
            check=false;
        }

        if($(company).val().trim() == ''){
            showValidate(company);
            check=false;
        }

        if($(contact).val().trim() == ''){
            showValidate(contact);
            check=false;
        }

        if(check){
            var formData = new FormData(this);    
            
            $('.enquiry-form-btn').hide();
            var payload = new FormData($(".enquiry-form.validate-form")[0]);
			// $(".enquiry-form.validate-form").serializeArray().forEach(function(val){
			// 	payload[val.name] = val.value;
            // });

			$.ajax({
				url:"./enquiry",
				method: "post",
                data: payload,
                cache: false,
                contentType: false,
                processData: false
			}).done(function(){
				$(".notify-msg").show();
				setTimeout(function(){
					$(".notify-msg").hide();
					window.location.href = "/";
				},5000);
			});
        }
        return check;
    });


    $('.validate-form .input1').each(function(){
        $(this).focus(function(){
           hideValidate(this);
       });
    });

    function showValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).removeClass('alert-validate');
    }

})(jQuery);