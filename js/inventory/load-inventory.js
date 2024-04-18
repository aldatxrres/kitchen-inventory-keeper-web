document.addEventListener('DOMContentLoaded', () => { //Executa o código abaixo quando o documento HTML for carregado
    const table_body_inventory = document.getElementById('table_body_inventory');

    async function loadInventory() { 
        try {
            const response = await axios.get('http://localhost:8000/inventory');
            const inventories = response.data; 
            console.log(inventories);
            
            inventories.forEach(inventory => { 
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>
                        <div class="icon"></div>
                    </td>
                    <td>${inventory.id}</td>
                    <td>${inventory.name}</td>
                    <td>${inventory.owner}</td>
                    <td>
                        <a href="" class="text-primary"><i class="bi bi-share"></i> Compartilhar</a> | 
                        <a href="" class="text-danger"><i class="bi bi-trash3"></i> Apagar</a>
                    </td>
                `;
                table_body_inventory.appendChild(tr);
            });

        } catch (error) { 
            console.error('Erro ao carregar despensas:', error);
            alert('Erro ao carregar as despensas. Tente novamente mais tarde.');
        }
    }

    loadInventory();
});