// Função para adicionar o token JWT em cada requisição
function axiosWithToken(url, options, data={}) {
    var token = localStorage.getItem('accessToken');
    options.headers = {
        'Authorization': 'JWT ' + token,
        'Content-Type': 'application/json'
    };
    return axios(url, options, data);
}

async function checkTokenValidity() {
    var accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
        try{
            const response = await axios.post('http://localhost:8000/auth/jwt/verify/', {
                token: accessToken
            });
            if (response.status === 200) {
                return true;
            }
            return false;
        }
        catch{
            localStorage.removeItem('accessToken');
            console.log("returning false...")
            return false;
        };
    } else {
        return false;
    }
}