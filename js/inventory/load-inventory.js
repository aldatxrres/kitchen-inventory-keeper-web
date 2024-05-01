document.addEventListener('DOMContentLoaded', () => { //Executa o código abaixo quando o documento HTML for carregado
    const table_body_inventory = document.getElementById('table_body_inventory');

    async function loadInventory() { 
        axiosWithToken('http://localhost:8000/api/inventory/', {
            method: 'GET'
        })
        .then(response => {
            const inventories = response.data; 
            
            inventories.results.forEach(inventory => { 
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${inventory.id}</td>
                    <td>${inventory.name}</td>
                    <td>
                        <a href="" class="text-primary"><i class="bi bi-share"></i> Compartilhar</a> | 
                        <a href="" onclick="deleteInventory(`+inventory.id+`)" class="text-danger"><i class="bi bi-trash3"></i> Apagar</a>
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

function deleteInventory(inventory_id) {
    axiosWithToken('http://localhost:8000/api/inventory/'+inventory_id+'/', {
        method: "DELETE"
    })
    .catch (error => { 
        console.error('Erro ao excluir lista de compras:', error);
        document.getElementById('span-error').innerHTML = 'Erro ao excluir lista de compras. Tente novamente mais tarde.';
    })
}