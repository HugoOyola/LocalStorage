// Variables
const formulario = document.querySelector("#formulario");
const listaTweets = document.querySelector("#lista-tweets");
let tweets = [];

// Event Listeners
eventListeners();

function eventListeners() {
  // Cuando un usuario agrega un nuevo tweet
  formulario.addEventListener("submit", agregarTweet);

  // Cuando el documento está listo
  document.addEventListener("DOMContentLoaded", () => {
    tweets = JSON.parse(localStorage.getItem("tweets")) || [];
    crearHTML();
  });
}

// Functions
function agregarTweet(e) {
  e.preventDefault();

  // Textarea donde el usuario escribe
  const tweet = document.querySelector("#tweet").value;
  // Validación
  if (tweet === "") {
    mostrarError("Un mensaje no puede ir vacío");
    return; // Evita que se ejecuten más líneas de código
  }

  const tweetObj = {
    id: Date.now(),
    tweet,
  };

  // Añadir al arreglo de tweets
  tweets = [...tweets, tweetObj];

  // Crear HTML
  crearHTML();

  // Reiniciar el formulario
  formulario.reset();
}

// Mostar un error si el tweet está vacío
function mostrarError(error) {
  const mensajeError = document.createElement("p");
  mensajeError.textContent = error;
  mensajeError.classList.add("error");
  // Insertar en el contenido
  const contenido = document.querySelector("#contenido");
  contenido.appendChild(mensajeError);
  // Elimina la alerta después de 3 segundos
  setTimeout(() => {
    mensajeError.remove();
  }, 3000);
}

// Muestra un listado de los tweets
function crearHTML() {
  limpiarHTML();

  if (tweets.length > 0) {
    tweets.forEach((tweet) => {
      // Agregar un botón de eliminar
      const btnEliminar = document.createElement("a");
      btnEliminar.classList.add("borrar-tweet");
      btnEliminar.innerText = "X";

      // Añadir la función de eliminar
      btnEliminar.onclick = () => {
        borrarTweet(tweet.id);
      };

      // Crear el HTML
      const li = document.createElement("li");

      // Añadir el texto
      li.innerText = tweet.tweet;

      // Asignar el botón
      li.appendChild(btnEliminar);

      // Insertarlo en el HTML
      listaTweets.appendChild(li);
    });
  }
  sincronizarStorage();
}

// Sincronizar localStorage
function sincronizarStorage() {
  localStorage.setItem("tweets", JSON.stringify(tweets));
}

// Elimina un tweet
function borrarTweet(id) {
  tweets = tweets.filter((tweet) => tweet.id !== id);
  crearHTML();
}

// Limpiar el HTML
function limpiarHTML() {
  while (listaTweets.firstChild) {
    listaTweets.removeChild(listaTweets.firstChild);
  }
}