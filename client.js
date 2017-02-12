function showRecaptcha(element) {
  Recaptcha.create('6LecUBUUAAAAAHQIWeMjN6W8cyOsSEmdqc-l_Tg0', element, {
    theme: 'custom', // you can pick another at https://developers.google.com/recaptcha/docs/customization
    custom_theme_widget: 'recaptcha_widget'
  });
}

function setupRecaptcha() {
  var contactFormHost = 'http://s4g.herokuapp.com/',
      form = $('.contact'),
      notice = form.find('#notice');

  if (form.length) {
    showRecaptcha('recaptcha_widget');

    form.submit(function(ev){
      ev.preventDefault();

      $.ajax({
        type: 'POST',
        url: contactFormHost + 'send_email',
        data: form.serialize(),
        dataType: 'json',
        success: function(response) {
          switch (response.message) {
            case 'success':
              form.fadeOut(function() {
                form.html('<h4>' + form.data('success') + '</h4>').fadeIn();
              });
              break;

            case 'failure_captcha':
              console.log('failure_captcha');
              break;

            case 'failure_email':
              console.log('failure_email');
          }
        },
        error: function(xhr, ajaxOptions, thrownError) {
          console.log('error');
        }
      });
    });
  }
}