document.getElementById('registerForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const username = document.getElementById('registerUsername').value.trim();
  const email = document.getElementById('registerEmail').value.trim();
  const password = document.getElementById('registerPassword').value.trim();

  if (localStorage.getItem(username)) {
    showAlert('El nombre de usuario ya existe.', 'error');
    return;
  }

// Guardar usuario como un objeto en localStorage
  const user = { email, username, password };
  localStorage.setItem(username, JSON.stringify(user));

  showAlert('Usuario registrado exitosamente!', 'success');

// Redirigir después de un pequeño retraso (opcional para que el usuario vea el mensaje)
  setTimeout(() => {
    window.location.href = 'LogIn.html';
  }, 1500); // 1.5 segundos para mostrar el mensaje antes de redirigir
});

// Función para mostrar alerta personalizada
function showAlert(message, type = 'success') {
  const alertContainer = document.getElementById('alertContainer');

// Estilos según el tipo de alerta
  const alertStyles = {
    success: 'bg-green-700 text-white',
    error: 'bg-red-700 text-white',
  };

// Crear contenido del alerta
  alertContainer.innerHTML = `
    <div class="flex items-center ${alertStyles[type]} p-4 rounded-lg shadow-lg">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        ${type === 'success' ? 
          `<path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />` : 
          `<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />`}
      </svg>
      <span>${message}</span>
    </div>
  `;
// Mostrar alerta
  alertContainer.classList.remove('hidden');

// Ocultar alerta después de 3 segundos
  setTimeout(() => {
    alertContainer.classList.add('hidden');
  }, 3000);
}
