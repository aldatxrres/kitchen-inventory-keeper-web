document.addEventListener('DOMContentLoaded', () => { 
    const table_body_shopping_list_items = document.getElementById('table_body_shopping_list_items');
    const shopping_list_id = localStorage.getItem('list_id');
    const shopping_list_name = localStorage.getItem('list_name');
    console.log('list_name:', shopping_list_name);
    console.log('list_id:', shopping_list_id);

    const shopping_list_name_element = document.getElementById('shopping_list_name');
    if (shopping_list_name_element && shopping_list_name) {
        shopping_list_name_element.innerHTML = shopping_list_name;
    } else { 
        console.error('Erro ao recuperar o nome da lista de compra.');
    } 

    async function loadShoppingListItems() { 
        axiosWithToken('http://localhost:8000/api/shopping_list_items/?shopping_list='+shopping_list_id, {
            method: 'GET'
        })
        .then(response => {
            const items = response.data; 
            
            items.results.forEach(item => { 
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td><a href="" onclick="setListItemId('${item.id}')"></a>${item.id}</td> 
                    <td>${item.name}</td>
                    <td>${item.qty}</td>
                    <td>
                        <a href="" onclick="deleteShoppingListItems('${item.id}')" class="text-danger"><i class="bi bi-trash3"></i> Apagar</a>
                    </td>
                `;
                table_body_shopping_list_items.appendChild(tr);
            });
        })
        .catch(error => {
            console.error('Erro ao carregar os itens da lista de compra:', error);
            alert('Erro ao carregar os itens da lista de compra. Tente novamente mais tarde.');
        });
    }

    loadShoppingListItems();
});

function setListItemId(list_item_id) {
    localStorage.setItem('list_item_id', list_item_id);
}

function deleteShoppingListItems(list_item_id) {
    axiosWithToken('http://localhost:8000/api/shopping_list_items/'+list_item_id+'/', {
        method: "DELETE"
    })
    .catch (error => { 
        console.error('Erro ao excluir item:', error);
        document.getElementById('span-error').innerHTML = 'Erro ao excluir item. Tente novamente mais tarde.';
    })
}