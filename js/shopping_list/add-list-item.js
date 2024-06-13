document.addEventListener('DOMContentLoaded', () => { 
    const form = document.getElementById('form-shopping-list');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const name = document.getElementById('itemName').value; 
        const quantity = document.getElementById('itemQty').value;

        axiosWithToken('http://localhost:8000/api/shopping_list_items/', {
            method: 'POST',
            data: {
                name: name,
                qty: quantity,
                purchased: false,
                shopping_list: localStorage.getItem('list_id')
            }
        })
        .then(response => { 
            window.location.href  = "./shopping_list_items.html"
        })
        .cath(error => {
            console.error('Erro ao cadastrar item na lista de compras:', error);
            alert('Erro ao cadastrar item na lista de compras. Tente novamente mais tarde');
        });
    });
});