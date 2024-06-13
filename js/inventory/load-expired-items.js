document.addEventListener('DOMContentLoaded', () => {
    const table_body_expired_items = document.getElementById('table_body_expired_items');

    async function loadExpiredItems() {
        axiosWithToken('http://localhost:8000/api/inventory_items/get_expired_items', {
            method: 'GET',
        })
            .then(response => {
                const items = response.data;

                items.results.forEach(item => {
                    const tr = document.createElement('tr');
                    tr.innerHTML = `
                        <td>${item.name}</td>
                        <td>${item.inventory}</td>
                        <td>${item.qty}</td>
                        <td>${item.expiration_date}</td>
                        <td>
                            <a href="" onclick="deleteExpiredItems('${item.id}')" class="text-danger"><i class="bi bi-trash3"></i> Apagar</a>
                        </td>
                    `;
                    table_body_expired_items.appendChild(tr);
                });
            })
            .catch(error => {
                console.error('Erro ao carregar os itens da despensa:', error);
                alert('Erro ao carregar os itens da despensa. Tente novamente mais tarde.');
            });
    }

    loadExpiredItems();
});

function deleteExpiredItems(inventory_items_id) {
    axiosWithToken('http://localhost:8000/api/inventory_items/' + inventory_items_id + '/', {
        method: "DELETE"
    })
        .catch(error => {
            console.error('Erro ao excluir item:', error);
            document.getElementById('span-error').innerHTML = 'Erro ao excluir item. Tente novamente mais tarde.';
        })
}