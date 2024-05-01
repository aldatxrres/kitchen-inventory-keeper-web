document.addEventListener('DOMContentLoaded', async () => {
    is_token_valid = await checkTokenValidity();
    if (!is_token_valid){
        window.location.href = '/login.html';
    }
    
    function displayUserData() {
        var userData = JSON.parse(localStorage.getItem('userData'));

        var usernameSpan = document.querySelector('div.username span');
        var emailSpan = document.querySelector('div.email span');

        if (userData) {
            usernameSpan.textContent = userData.first_name;
            emailSpan.textContent = userData.email;
        }
    }

    displayUserData();    
});

document.getElementById('logoutBtn').addEventListener('click', function(event) {
    event.preventDefault();

    localStorage.clear();
    // Redireciona para a tela do login
    window.location.href = './login.html';                    
});