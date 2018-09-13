
(function ($) {
    "use strict";
    $('.enquiry-form-btn').on('click',function(e){
        e.preventDefault();
        var check = true;

        var name = $('#modalName');
        var email = $('#modalEmail');
        var company = $('#modalCompany');
        var contact = $('#modalContact');

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
            var payload = new FormData($(".enquiry-form.validate-form.modal-form")[0]);
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
                $('.enquiry-form-btn').show();
                name.val("");
                email.val("");
                company.val("");
                contact.val("");
                $("#modalMessage").val("");
                closeEnquiry();
			});
        }
        return check;
    });


    $('.validate-form .input1').each(function(){
        $(this).focus(function(){
           hideValidate(this);
       });
    });

    $('.index-form-btn').on('click',function(e){
        e.preventDefault();
        var check = true;

        var name = $('#indexName');
        var email = $('#indexEmail');
        var company = $('#indexCompany');
        var contact = $('#indexContact');

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
        console.log(check);
        if(check){
            var formData = new FormData(this);    
            
            $('.index-form-btn').hide();
            var payload = new FormData($(".index-form")[0]);
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
                $('.index-form-btn').show();
                name.val("");
                email.val("");
                company.val("");
                contact.val("");
                $("#indexMessage").val("");
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