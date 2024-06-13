document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('modal-container');
    const closeModal = document.getElementById('close');
    const addButton = document.getElementById('boton-enter');
    const addCompraButton = document.getElementById('agregarCompra');
    const productInput = document.getElementById('productoInput');
    const placeSelect = document.getElementById('lugarInput');
    const lista = document.getElementById('lista').getElementsByTagName('tbody')[0];

    const modalSite = document.getElementById('modal-site-container');
    const closeModalSite = document.getElementById('close-site');
    const addSiteButton = document.getElementById('boton-add-site');
    const agregarSitioButton = document.getElementById('agregarSitio');
    const nuevoSitioInput = document.getElementById('nuevoSitioInput');

    const modalEdit = document.getElementById('modal-edit-container');
    const closeModalEdit = document.getElementById('close-edit');
    const saveChangesButton = document.getElementById('guardarCambios');
    const editProductInput = document.getElementById('editProductoInput');
    const editPlaceSelect = document.getElementById('editLugarInput');
    const addSiteButtonEdit = document.getElementById('boton-add-site-edit');

    let sitios = [];
    let currentEditingRow = null;

    const loadSitios = (selectElement) => {
        selectElement.innerHTML = '';
        sitios.forEach(sitio => {
            const option = document.createElement('option');
            option.value = sitio;
            option.textContent = sitio;
            selectElement.appendChild(option);
        });
    };

    const addCompra = (producto, lugar) => {
        const row = lista.insertRow();
        const cellProducto = row.insertCell(0);
        const cellLugar = row.insertCell(1);
        const cellAcciones = row.insertCell(2);

        cellProducto.textContent = producto;
        cellLugar.textContent = lugar;
        cellAcciones.innerHTML = '<i class="fas fa-edit editar"></i> <i class="fas fa-trash eliminar"></i>';

        cellAcciones.querySelector('.editar').addEventListener('click', () => {
            currentEditingRow = row;
            editProductInput.value = cellProducto.textContent;
            editPlaceSelect.value = cellLugar.textContent;
            modalEdit.style.display = 'block';
        });

        cellAcciones.querySelector('.eliminar').addEventListener('click', () => {
            lista.deleteRow(row.rowIndex - 1);
        });
    };

    addButton.addEventListener('click', () => {
        modal.style.display = 'block';
    });

    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    addCompraButton.addEventListener('click', () => {
        const producto = productInput.value;
        const lugar = placeSelect.value;

        if (producto && lugar) {
            addCompra(producto, lugar);
            productInput.value = '';
            placeSelect.value = '';
            modal.style.display = 'none';
        }
    });

    addSiteButton.addEventListener('click', () => {
        modal.style.display = 'none';
        modalSite.style.display = 'block';
    });

    closeModalSite.addEventListener('click', () => {
        modalSite.style.display = 'none';
    });

    agregarSitioButton.addEventListener('click', () => {
        const nuevoSitio = nuevoSitioInput.value;

        if (nuevoSitio) {
            sitios.push(nuevoSitio);
            loadSitios(placeSelect);
            loadSitios(editPlaceSelect);
            nuevoSitioInput.value = '';
            modalSite.style.display = 'none';
            modal.style.display = 'block';
        }
    });

    closeModalEdit.addEventListener('click', () => {
        modalEdit.style.display = 'none';
    });

    saveChangesButton.addEventListener('click', () => {
        const producto = editProductInput.value;
        const lugar = editPlaceSelect.value;

        if (producto && lugar && currentEditingRow) {
            currentEditingRow.cells[0].textContent = producto;
            currentEditingRow.cells[1].textContent = lugar;
            modalEdit.style.display = 'none';
        }
    });

    addSiteButtonEdit.addEventListener('click', () => {
        modalEdit.style.display = 'none';
        modalSite.style.display = 'block';
    });

    window.onclick = (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
        if (event.target == modalSite) {
            modalSite.style.display = 'none';
        }
        if (event.target == modalEdit) {
            modalEdit.style.display = 'none';
        }
    };

    loadSitios(placeSelect);
    loadSitios(editPlaceSelect);
});
