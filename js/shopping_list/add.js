document.addEventListener('DOMContentLoaded', () => { 
    const form = document.getElementById('form-shopping-list');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const shoppingListName = document.getElementById('shoppingListName').value; 

        axiosWithToken('http://localhost:8000/api/shopping_list/', {
            method: 'POST',
            data: {
                name: shoppingListName
            }
        })
        .then(response => {
            window.location.href = "./shopping_list.html"
        })
        .cath(error => {
            console.error('Erro ao cadastrar lista de compras:', error);
            alert('Erro ao cadastrar lista de compras. Tente novamente mais tarde');
        });
    });
});