import '../css/styles.css';

document.addEventListener('DOMContentLoaded', () => {
    
    // --- LÓGICA DEL MENÚ DESPLEGABLE ---
    const menuToggle = document.getElementById('menuToggle');
    const navbar = document.getElementById('navbar');

    if (menuToggle && navbar) {
        menuToggle.addEventListener('click', () => {
            navbar.classList.toggle('active');
            menuToggle.textContent = navbar.classList.contains('active') ? '✕' : '☰';
        });
    }

    // --- LÓGICA DEL CARRUSEL AUTOMÁTICO ---
    const track = document.getElementById('carruselTrack');
    if (track) {
        const slides = document.querySelectorAll('.carrusel-slide');
        let index = 0;

        setInterval(() => {
            index = (index + 1) % slides.length;
            track.style.transform = `translateX(-${index * (100 / slides.length)}%)`;
        }, 4000);
    }

    // --- LÓGICA DEL EFECTO ACORDEÓN ---
    const acordeonHeaders = document.querySelectorAll('.acordeon-header');
    acordeonHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const content = header.nextElementSibling;
            const icon = header.querySelector('span');

            if (content.style.maxHeight && content.style.maxHeight !== '0px') {
                content.style.maxHeight = '0px';
                icon.textContent = '+';
            } else {
                document.querySelectorAll('.acordeon-content').forEach(c => c.style.maxHeight = '0px');
                document.querySelectorAll('.acordeon-header span').forEach(i => i.textContent = '+');
                
                content.style.maxHeight = content.scrollHeight + "px";
                icon.textContent = '−';
            }
        });
    });

    // --- INTERACTIVIDAD DE CATEGORÍAS (Solo si existe en la página actual) ---
    const botonesFiltro = document.querySelectorAll('.filtro-btn');
    const productos = document.querySelectorAll('.card-producto[data-item]');

    if (botonesFiltro.length > 0) {
        botonesFiltro.forEach(boton => {
            boton.addEventListener('click', (e) => {
                e.preventDefault();
                botonesFiltro.forEach(b => b.classList.remove('active-filtro'));
                boton.classList.add('active-filtro');

                const categoriaSeleccionada = boton.getAttribute('data-categoria');

                productos.forEach(producto => {
                    const itemCategoria = producto.getAttribute('data-item');
                    if (categoriaSeleccionada === 'todos' || categoriaSeleccionada === itemCategoria) {
                        producto.style.display = 'block';
                    } else {
                        producto.style.display = 'none';
                    }
                });
            });
        });
    }

    // --- SISTEMA DE REGISTRO EN LOCALSTORAGE (Solo si existe el Formulario) ---
    const form = document.getElementById('formRegistro');
    const tablaBody = document.querySelector('#tablaUsuarios tbody');
    const btnLimpiar = document.getElementById('btnLimpiar');

    if (form && tablaBody) {
        function mostrarUsuarios() {
            const usuarios = JSON.parse(localStorage.getItem('usuariosRegistrados')) || [];
            tablaBody.innerHTML = ''; 

            if (usuarios.length === 0) {
                tablaBody.innerHTML = `<tr><td colspan="2" style="text-align:center; color:#999;">No hay usuarios aún.</td></tr>`;
                return;
            }

            usuarios.forEach(user => {
                const fila = document.createElement('tr');
                fila.innerHTML = `<td><strong>${user.nombre}</strong></td><td>${user.correo}</td>`;
                tablaBody.appendChild(fila);
            });
        }

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const nombre = document.getElementById('username').value;
            const correo = document.getElementById('email').value;

            const usuarios = JSON.parse(localStorage.getItem('usuariosRegistrados')) || [];
            usuarios.push({ nombre, correo });
            localStorage.setItem('usuariosRegistrados', JSON.stringify(usuarios));

            form.reset();
            mostrarUsuarios();
        });

        if(btnLimpiar) {
            btnLimpiar.addEventListener('click', () => {
                localStorage.removeItem('usuariosRegistrados');
                mostrarUsuarios();
            });
        }

        mostrarUsuarios();
    }
});