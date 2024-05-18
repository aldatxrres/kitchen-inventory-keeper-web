document.addEventListener('DOMContentLoaded', () => { 
    const form = document.getElementById('form-inventory-item');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const itemName = document.getElementById('inventoryItemName').value; 
        const itemQuantity = document.getElementById('inventoryItemQuantity').value;
        const itemExpirationDate = document.getElementById('inventoryItemExpirationDate').value;
        const inventory_id = localStorage.getItem('inventory_id');

        axiosWithToken('http://localhost:8000/api/inventory_items/', {
            method: 'POST',
            data: {
                name: itemName,
                qty: parseInt(itemQuantity),
                expiration_date: itemExpirationDate, 
                inventory: parseInt(inventory_id)
            }
        })
        .then(response => { 
            window.location.href  = "./inventory_items.html"
        })
        .cath(error => {
            console.error('Erro ao cadastrar item:', error);
            alert('Erro ao cadastrar item. Tente novamente mais tarde');
        });
    });
});