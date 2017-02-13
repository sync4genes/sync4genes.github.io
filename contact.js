function showRecaptcha(element) {
  var MyPublicKey = "6LecUBUUAAAAAHQIWeMjN6W8cyOsSEmdqc-l_Tg0";
  Recaptcha.create(MyPublicKey, element, {
    theme: "custom",
    callback: Recaptcha.focus_response_field
  });
}

$(document).ready(function() {
  showRecaptcha('recaptcha_div');

  $(".contact").submit(function(ev) {
    ev.preventDefault();
    if (!$(this).valid()) return;
    $.ajax({
      type: "post",
      url: "/send",
      data: $('.contact').serialize(),
      dataType: "json",
      success: function(response) {
        if (response.message === "success") {
          $.ajax({
            type: "post",
            url: "/send_email",
            data: $('.contact').serialize(),
            dataType: "json",
            success: function(response) {
              $('.contact').html("<div id='message'></div>");
              if (response.message === "success") {
                $('#message').html("<h2>Message successfully sent.</h2>").hide().fadeIn(1500);
              } else {
                $('#message').html("<h2>Error sending the message</h2>").hide().fadeIn(1500);
              }
            },
            error: function(xhr, ajaxOptions, thrownError) {
              $('.contact').html("<div id='message'></div>");
              $('#message').html("<h2>Error sending the message</h2>").hide().fadeIn(1500);
            }
          });
        } else {
          showRecaptcha('recaptcha_div');
          $('.contact').html("<div id='notice'></div>");
          $('#notice').html("Captcha failed!").hide().fadeIn(1500);
        }
      },
      error: function(xhr, ajaxOptions, thrownError) {
        $('.contact').html("<div id='message'></div>");
        $('#message').html("<h2>Error sending the message</h2>").hide().fadeIn(1500);
      }
    });
  });
});