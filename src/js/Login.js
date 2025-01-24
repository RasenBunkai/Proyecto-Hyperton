document.getElementById('loginForm').addEventListener('submit', function (e) {
        e.preventDefault(); // Evitar recargar la página

        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();
        const errorMessage = document.getElementById('errorMessage');
        // Limpiar mensaje de error
        errorMessage.textContent = '';
        errorMessage.classList.add('hidden');

        // Buscar usuario en localStorage
        const users = Object.keys(localStorage).map(key => JSON.parse(localStorage.getItem(key)));
        const user = users.find(user => user.email === email && user.password === password);

        if (user) {
          // Credenciales correctas, redirigir a index.html
          window.location.href = 'index.html';
        } else {
          // Mostrar mensaje de error
          errorMessage.textContent = 'Correo o contraseña incorrectos.';
          errorMessage.classList.remove('hidden');
        }
    });