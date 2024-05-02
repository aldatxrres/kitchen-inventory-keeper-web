document.addEventListener('DOMContentLoaded', async () => {
    is_token_valid = await checkTokenValidity();
    if (is_token_valid){
        window.location.href = '/index.html';
    }
});

document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault();

    var email = document.getElementById('email').value;
    var first_name = document.getElementById('first_name').value;
    var last_name = document.getElementById('last_name').value;
    var password = document.getElementById('password').value;
    var re_password = document.getElementById('re_password').value;

    axios.post('http://localhost:8000/auth/users/', {
            email: email,
            first_name: first_name,
            last_name: last_name,
            password: password,
            re_password: re_password
        })
        .then(response => {
            window.location.href = './login.html';
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Um erro ocorreu ao tentar cadastrar. Cheque os dados e tente novamente.');
        });
});