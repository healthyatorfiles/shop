(function($) {
    "use strict"; // this function is executed in strict mode 



    /* =================================
       2.0 DOCUMENT READY FUNCTION
    =================================== */
    $(document).ready(function() {
		
		/******************** 2.10 COUNTER UP ********************/
		$('.counter').counterUp({
			delay: 10,
			time: 2000
		});
		
		/******************** 2.11 CONTACT FORM *******************
		function isValidEmail(emailAddress) {
			var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
			return pattern.test(emailAddress);
		};
		$("#contact-form").on('submit', function(e) {
			e.preventDefault();
			var success = $(this).find('.email-success'),
				failed = $(this).find('.email-failed'),
				loader = $(this).find('.email-loading'),
				postUrl = $(this).attr('action');

			var data = {
				name: $(this).find('.contact-name').val(),
				email: $(this).find('.contact-email').val(),
				subject: $(this).find('.contact-subject').val(),
				message: $(this).find('.contact-message').val()
			};
			if (isValidEmail(data['email']) && (data['message'].length > 1) && (data['name'].length > 1)) {
				$.ajax({
					type: "POST",
					url: postUrl,
					data: data,
					beforeSend: function() {
						loader.fadeIn(1000);
					},
					success: function(data) {
						loader.fadeOut(1000);
						success.delay(500).fadeIn(1000);
						failed.fadeOut(500);
					},
					error: function(xhr) { // if error occured
						loader.fadeOut(1000);
						failed.delay(500).fadeIn(1000);
						success.fadeOut(500);
					},
					complete: function() {
						loader.fadeOut(1000);
					}
				});
			} else {
				loader.fadeOut(1000);
				failed.delay(500).fadeIn(1000);
				success.fadeOut(500);
			}
			return false;
		});
	*/
		/******************** 2.12 AJAX MAILCHIMP SUBSCRIBE ********************/
		$("#subscribe-mailchimp").ajaxChimp({
			callback: mailchimpCallback,
			url: "#" // Replace your mailchimp post url inside double quote "".  
		});

		function mailchimpCallback(resp) {
		   var error_msg = $('#subscribe-mailchimp').find('.error-msg');
		   var success_msg = $('#subscribe-mailchimp').find('.success-msg');
		   
		   if(resp.result === 'success') {
			  error_msg.fadeOut(200);
			  success_msg.html(resp.msg).fadeIn(200);
		   } else if(resp.result === 'error') {
			  success_msg.fadeOut(200);
			  error_msg.html(resp.msg).fadeIn(200);
		   }  
		};
		
		/******************** 2.13 LOCAL SUBSCRIPTION FORM ********************/
		$("#subscribe").submit(function (e) {
			e.preventDefault();
			var email = $("#subscriber-email").val();
			var dataString = 'email=' + email;

			function isValidEmail(emailAddress) {
				var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
				return pattern.test(emailAddress);
			};

			if (isValidEmail(email)) {
				$.ajax({
					type: "POST",
					url: "subscribe/subscribe.php",
					data: dataString,
					success: function () {
						$('.success-msg').fadeIn(1000);
						$('.error-msg').fadeOut(500);
						$('.hide-after').fadeOut(500);
					}
				});
			} else {
				$('.error-msg').fadeIn(1000);
			}

			return false;
		});
		
		
	$(function() {
	  $('a[href*="#"]:not([href="#"])').click(function() {
		if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
		  var target = $(this.hash);
		  target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
		  if (target.length) {
			$('html, body').animate({
			  scrollTop: target.offset().top
			}, 1000);
			return false;
		  }
		}
	  });
	});
	
	$('.scrollup').on("click", function() {
		$("html, body").animate({
			scrollTop: 0
		}, 800);
		return false;
	})
		
 });		
})(jQuery);