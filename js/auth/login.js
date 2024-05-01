document.addEventListener('DOMContentLoaded', async () => {
    is_token_valid = await checkTokenValidity();
    if (is_token_valid){
        window.location.href = '/index.html';
    }
});

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;


    axios.post('http://localhost:8000/auth/jwt/create/', {
            email: email,
            password: password
        })
        .then(response => {
            if (response.data
                .access) {
                // Armazena o token de acesso no localStorage
                localStorage.setItem('accessToken', response.data.access);
                
                axiosWithToken('http://localhost:8000/auth/users/me/', {
                        method: "GET"
                    })
                    .then(response => {
                        console.log(response.data)
                        localStorage.setItem('userData', JSON.stringify(response.data));
                        // Redireciona ou executa outras ações após o login
                        window.location.href = './index.html';
                    })
                    .catch(error => {
                        console.error('Error:', error);
                        // Exibe um alerta em caso de erro ao obter os dados do usuário
                        alert('An error occurred while fetching user data.');
                    });
                    
            } else {
                alert('Login failed. Please check your credentials.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred. Please try again later.');
        });
});