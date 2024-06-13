document.addEventListener('DOMContentLoaded', () => { 
    const form = document.getElementById('form-inventory-update-item');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const itemName = document.getElementById('inventoryItemName').value; 
        const itemQuantity = document.getElementById('inventoryItemQuantity').value;
        const itemExpirationDate = document.getElementById('inventoryItemExpirationDate').value;
        const inventory_id = localStorage.getItem('inventory_id');
        const inventory_item_id = localStorage.getItem('inventory_item_id');

        axiosWithToken('http://localhost:8000/api/inventory_items/'+inventory_item_id+'/', {
            method: 'PUT',
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
            console.error('Erro ao atualizar item:', error);
            alert('Erro ao atualizar item. Tente novamente mais tarde');
        });
    });
});