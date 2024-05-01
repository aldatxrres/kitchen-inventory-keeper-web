document.addEventListener('DOMContentLoaded', () => { //Executa o código abaixo quando o documento HTML for carregado
    const table_body_shopping_list = document.getElementById('table_body_shopping_list');

    async function loadInventory() { 
        axiosWithToken('http://localhost:8000/api/shopping_list/', {
            method: 'GET'
        })
        .then(response => {
            const shopping_lists = response.data; 
            
            shopping_lists.results.forEach(shopping_list => { 
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${shopping_list.id}</td>
                    <td>${shopping_list.name}</td>
                    <td>
                        <a href="" class="text-primary"><i class="bi bi-share"></i> Compartilhar</a> | 
                        <a href="" onclick="deleteShoppingList(`+shopping_list.id+`)" class="text-danger"><i class="bi bi-trash3"></i> Apagar</a>
                    </td>
                `;
                table_body_shopping_list.appendChild(tr);
            });
        })
        .catch(error => {
            console.error('Erro ao carregar listas de compras:', error);
            alert('Erro ao carregar as listas de compras. Tente novamente mais tarde.');
        });
    }

    loadInventory();
});

function deleteShoppingList(shopping_list_id) {
    axiosWithToken('http://localhost:8000/api/shopping_list/'+shopping_list_id+'/', {
        method: "DELETE"
    })
    .catch (error => { 
        console.error('Erro ao excluir lista de compras:', error);
        document.getElementById('span-error').innerHTML = 'Erro ao excluir lista de compras. Tente novamente mais tarde.';
    })
}