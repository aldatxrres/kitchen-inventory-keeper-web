document.addEventListener('DOMContentLoaded', () => { 
    const table_body_inventory_items = document.getElementById('table_body_inventory_items');
    const inventory_id = localStorage.getItem('inventory_id');
    const inventory_name = localStorage.getItem('inventory_name');
    const inventory_name_element = document.getElementById('inventory_name');
    if (inventory_name_element && inventory_name) {
        inventory_name_element.innerHTML = inventory_name;
    } else {
        console.error('Erro ao recuperar o nome da despensa.');
    } 

    async function loadInventoryItems() { 
        axiosWithToken('http://localhost:8000/api/inventory_items/?inventory='+inventory_id, {
            method: 'GET',
            data: {
                inventory: localStorage.getItem('inventory_id')
            }
        })
        .then(response => {
            const items = response.data; 
            
            items.results.forEach(item => { 
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${item.id}</td>
                    <td>${item.name}</td>
                    <td>${item.qty}</td>
                    <td>${item.expiration_date}</td>
                    <td>
                        <a href="" onclick="deleteInventoryItems('${item.id}')" class="text-danger"><i class="bi bi-trash3"></i> Apagar</a> | 
                        <a href="update_inventory_item.html" onclick="setItemId('${item.id}')" class="text-primary"><i class="bi bi-pencil-square"></i> Editar</a>
                    </td>
                `;
                table_body_inventory_items.appendChild(tr);
            });
        })
        .catch(error => {
            console.error('Erro ao carregar os itens da despensa:', error);
            alert('Erro ao carregar os itens da despensa. Tente novamente mais tarde.');
        });
    }

    loadInventoryItems();
});

function setItemId(inventory_item_id) {
    localStorage.setItem('inventory_item_id', inventory_item_id);
}

function deleteInventoryItems(inventory_items_id) {
    axiosWithToken('http://localhost:8000/api/inventory_items/'+inventory_items_id+'/', {
        method: "DELETE"
    })
    .catch (error => { 
        console.error('Erro ao excluir item:', error);
        document.getElementById('span-error').innerHTML = 'Erro ao excluir item. Tente novamente mais tarde.';
    })
}