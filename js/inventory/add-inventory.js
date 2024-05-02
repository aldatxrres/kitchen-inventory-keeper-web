document.addEventListener('DOMContentLoaded', () => { 
    const form = document.getElementById('form-inventory');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const inventoryName = document.getElementById('inventoryName').value; 

        axiosWithToken('http://localhost:8000/api/inventory/', {
            method: 'POST',
            data: {
                name: inventoryName
            }
        })
        .then(response => {
            window.location.href  = "./inventory.html"
        })
        .cath(error => {
            console.error('Erro ao cadastrar despensa:', error);
            alert('Erro ao cadastrar despensa. Tente novamente mais tarde');
        });
    });
});