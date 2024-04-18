document.addEventListener('DOMContentLoaded', () => { 
    const form = document.getElementById('form-inventory-items');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const name = document.getElementById('name').value; 
        const quantity = document.getElementById('quantity').value;

        try {
            await axios.post('http://localhost:8000/inventory-items', { 
                name: name,
                quantity: quantity
            });

       
            alert('Item cadastrado com sucesso.');

        } catch (error) {
            console.error('Erro ao cadastrar item:', error);
            alert('Erro ao cadastrar item. Tente novamente mais tarde');
        }
    });
});