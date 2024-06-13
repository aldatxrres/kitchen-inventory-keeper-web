document.addEventListener('DOMContentLoaded', () => { 
    const table_body_inventory = document.getElementById('table_body_inventory');

    if (localStorage.getItem('inventory_name') != null) {
        localStorage.removeItem('inventory_name');
        localStorage.removeItem('inventory_id');
        localStorage.removeItem('inventory_item_id');
    }

    async function loadInventory() { 
        axiosWithToken('http://localhost:8000/api/inventory/', {
            method: 'GET'
        })
        .then(response => {
            const inventories = response.data; 

            inventories.results.forEach(inventory => { 
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td><a href="inventory_items.html" onclick="setSelectedInventoryName('${inventory.name}', '${inventory.id}')">${inventory.id}</a></td>
                    <td><a href="inventory_items.html" onclick="setSelectedInventoryName('${inventory.name}', '${inventory.id}')">${inventory.name}</a></td>
                    <td>
                        <a href="" class="text-primary"><i class="bi bi-share"></i> Compartilhar</a> | 
                        <a href="" onclick="deleteInventory(${inventory.id})" class="text-danger"><i class="bi bi-trash3"></i> Apagar</a>
                    </td>
                `;
                table_body_inventory.appendChild(tr);
            });
        })
        .catch(error => {
            console.error('Erro ao carregar despensas:', error);
            alert('Erro ao carregar as despensas. Tente novamente mais tarde.');
        });
    }

    loadInventory();
});

async function setSelectedInventoryName(inventory_name, inventory_id){
    localStorage.setItem('inventory_name', inventory_name);
    localStorage.setItem('inventory_id', inventory_id); 
}

function deleteInventory(inventory_id) {
    axiosWithToken('http://localhost:8000/api/inventory/'+inventory_id+'/', {
        method: "DELETE"
    })
    .catch (error => { 
        console.error('Erro ao excluir lista de compras:', error);
        document.getElementById('span-error').innerHTML = 'Erro ao excluir lista de compras. Tente novamente mais tarde.';
    })
}