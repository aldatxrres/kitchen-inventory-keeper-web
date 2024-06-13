document.addEventListener('DOMContentLoaded', () => { 
    const table_body_shopping_list = document.getElementById('table_body_shopping_list');

    if (localStorage.getItem('list_name') !== null) {
        localStorage.removeItem('list_name');
        localStorage.removeItem('list_id');
        localStorage.removeItem('list_item_id');
    }

    async function loadShoppingList() { 
        axiosWithToken('http://localhost:8000/api/shopping_list/', {
            method: 'GET'
        })
        .then(response => { 
            const shopping_lists = response.data; 
            
            shopping_lists.results.forEach(shopping_list => { 
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td><a href="shopping_list_items.html" onclick="setSelectedListName('${shopping_list.name}', '${shopping_list.id}')">${shopping_list.id}</a></td>
                    <td><a href="shopping_list_items.html" onclick="setSelectedListName('${shopping_list.name}', '${shopping_list.id}')">${shopping_list.name}</a></td>
                    <td>
                        <a href="" onclick="deleteShoppingList(${shopping_list.id})" class="text-danger"><i class="bi bi-trash3"></i> Apagar</a>
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

    loadShoppingList();
});

async function setSelectedListName(list_name, list_id){
    localStorage.setItem('list_name', list_name);
    localStorage.setItem('list_id', list_id);
}

function deleteShoppingList(shopping_list_id) {
    axiosWithToken('http://localhost:8000/api/shopping_list/'+shopping_list_id+'/', {
        method: "DELETE"
    })
    .catch (error => { 
        console.error('Erro ao excluir lista de compras:', error);
        document.getElementById('span-error').innerHTML = 'Erro ao excluir lista de compras. Tente novamente mais tarde.';
    })
}