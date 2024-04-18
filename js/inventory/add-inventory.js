document.addEventListener('DOMContentLoaded', () => { 
    const form = document.getElementById('form-inventory');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const name = document.getElementById('name').value; 

        try {
            await axios.post('http://localhost:8000/inventory', { 
                name: productName
            });

       
            alert('Despensa cadastrada com sucesso.');

        } catch (error) {
            console.error('Erro ao cadastrar despensa:', error);
            alert('Erro ao cadastrar despensa. Tente novamente mais tarde');
        }
    });
});