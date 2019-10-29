(function(root, document, $) {
	'use strict';
	var app = {
		init : function() {
			this.win = $(window);
			this.doc = $(document);
			this.body = $('body');
            this.processingForm = false;

            this.validateEmail = function (email) {
                    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    return re.test(String(email).toLowerCase());
                };

			for (var name in this) {
				if (typeof(this[name].init) === 'function') {
					this[name].init();
				}
			}
		},
		// test_func : {
		// 	init : function() {
  //               console.log('Test init!');
		// 	}
		// }
		carousel : {
			init : function() {
                $("#projects-list").slick({
                	fade: true,
                	prevArrow: '<i class="prev far fa-chevron-left"></i>',
                	nextArrow: '<i class="next far fa-chevron-right"></i>',
                	  centerPadding: '60px',

                });
			}
		},
        getInTouch : {
            init : function() {

                $("#contact-heading a").on("click", function(e){
                    e.preventDefault();
                    
                    $("#contact-form .fields").slideToggle("fast", function(){
                        $("html, body").animate({ scrollTop: $(document).height()-$(window).height() });
                    });
                    
                });
                
                $("#contact-form").on("submit", function(e){
                    e.preventDefault();
                    if(app.processingForm){
                        return false;
                    }else{
                        app.processingForm = true;
                    }

                    $("#contact-form .gfield_error").removeClass("gfield_error");

                    var errors = [];

                    $(".field", this).each(function(k,v){
                        var field_value = $(v).val();
                        if(field_value.length === 0){
                            errors.push($(v));
                            return;
                        }
                        if($(v).hasClass("email") && !app.validateEmail(field_value)){
                            errors.push($(v));
                            return;
                        }
                    });

                    if(errors.length){
                        // form failed
                        app.processingForm = false;
                        setTimeout(function(){
                            $.each(errors, function(k,v){
                                $(v).parent().addClass("gfield_error");
                            });
                        },10);

                        return false;
                    }else{
                        
                        emailjs.sendForm('sendgrid', 'template_YCvpqNZZ', this);

                        $(".fields", this).slideUp("fast");
                        $("#contact-heading").slideUp("fast");
                        $(".thanks", this).slideDown("fast");

                        window.dataLayer = window.dataLayer || [];
                        dataLayer.push({
                         'event': 'formSubmission',
                         'formType': 'Contact us',
                         'formPosition': 'Main'
                        });

                    }

                });
            }
        }
	};
	// publish
	root.app = app;
	// init
	$( root ).ready(function() {
		app.init();
	});
})(window, document, jQuery);
