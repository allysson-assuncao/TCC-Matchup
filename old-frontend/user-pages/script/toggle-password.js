$('#btn-toggle-password').on('click', function() {
    togglePassword(this, $('#txt-password'));
});

$('#btn-toggle-confirmed-password').on('click', function() {
    togglePassword(this, $('#txt-confirmed-password'));
});


function togglePassword(btn, input){
    var passwordInput = input;
    if (passwordInput.attr('type') === 'password') {
        passwordInput.attr('type', 'text');
        $(btn).find('i').removeClass('bi-eye-slash-fill').addClass('bi-eye-fill');
    } else {
        passwordInput.attr('type', 'password');
        $(btn).find('i').removeClass('bi-eye-fill').addClass('bi-eye-slash-fill');
    }
}
