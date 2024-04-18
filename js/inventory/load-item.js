document.addEventListener('DOMContentLoaded', () => { //Executa o código abaixo quando o documento HTML for carregado
    const table_body_inventory_items = document.getElementById('table_body_inventory_items');

    async function loadInventoryItems() { 
        try {
            const response = await axios.get('http://localhost:8000/inventory-items');
            const items = response.data; 
            console.log(items);
            
            items.forEach(item => { 
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>
                        <div class="icon"></div>
                    </td>
                    <td>${item.id}</td>
                    <td>${item.name}</td>
                    <td>${item.quantity}</td>
                    <td>
                        <a href="" class="text-primary"><i class="bi bi-pencil-square"></i> Editar</a> | 
                        <a href="" class="text-danger"><i class="bi bi-trash3"></i> Apagar</a>
                    </td>
                `;
                table_body_inventory_items.appendChild(tr);
            });

        } catch (error) { 
            console.error('Erro ao carregar itens:', error);
            alert('Erro ao carregar os itens. Tente novamente mais tarde.');
        }
    }

    loadInventoryItems();
});