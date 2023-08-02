var secuencia = []; // Array para almacenar la secuencia de colores
var secuenciaJugador = []; // Array para almacenar la secuencia ingresada por el jugador
var nivel = 0; // Nivel inicial del juego
var colores = ['rojo', 'verde', 'azul', 'amarillo']; // Lista de colores disponibles
var btnJugar = document.getElementById('btn-Jugar'); // Botón para iniciar el juego
var btnReiniciarPartida = document.getElementById('btn-reiniciar'); //Botón para reiniciar partida
var txtNombreJugador = document.getElementById('txtNombrejugador');//Botón que muestra nombre del jugador
var Puntaje_Jugador = 0; //Puntaje inicial del juego

window.addEventListener('load', function() {

  var modalContacto = this.document.getElementById('modal-contacto');
  modalContacto.style.display = 'none';

  var modalNombres = document.getElementById('modal-nombres');
  modalNombres.style.display = 'block';

  var btnObtenerNombre = document.getElementById('btn-completar-nombre');
  btnObtenerNombre.addEventListener('click', ocultarModalNombre);

    function ocultarModalNombre(){ //Oculta el modal que solicita el nombre del jugador al iniciar.
      var modalNombres = document.getElementById('modal-nombres');
      var NombredelJugador_text = document.getElementById('nombre-jugador');
      var NombreDelJugador = NombredelJugador_text.value;

      if (NombreDelJugador.length < 3) {
        alert('El nombre debe contener al menos 3 letras');
        return;
      }
      else {
      var btnMuestraNombre = document.getElementById('btn-Nombre');
      modalNombres.style.display = 'none';
      btnMuestraNombre.textContent = 'Jugador: ' + NombreDelJugador; //Le paso al btn el nombre del jugador.
    }

    var btnContacto = document.getElementById('btn-Contacto');
    btnContacto.addEventListener('click', mostrarModalContacto);

    function mostrarModalContacto(){ //Muestra el modal de contacto al usuario.
      modalContacto.style.display = 'block';
    }

    var btnCancelar = document.getElementById('btn-cancelar');
    btnCancelar.addEventListener('click', ocultarModalContacto)

    function ocultarModalContacto(){ //Oculta el modal de contacto cuando se preciona cancelar
      modalContacto.style.display = 'none';
    }

    var btnEnviarCorreo = document.getElementById('btn-enviar');
    btnEnviarCorreo.addEventListener('click', EnviarCorreo) //llama a la funcion enviar correo

    function EnviarCorreo(){
      var txtEmisor = document.getElementById('mail-contacto');
      var Emisor = txtEmisor.value;
      var txtNombre = document.getElementById('nombre-contacto');
      var Nombre = txtNombre.value;
      var txtMensaje = document.getElementById('txt-mensaje');
      var Mensaje = txtMensaje.value;
      var Asunto = 'Comentarios';

      var validaNombre = /^[a-zA-Z0-9\s]+$/;
      if (!validaNombre.test(Nombre)) {
          alert('El nombre debe ser alfanumérico.');
          return;
      }

      var validaMail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!validaMail.test(Emisor)) {
          alert('El correo electrónico no es válido.');
          return;
      }

      if (Mensaje.length <= 5) {
          alert('El mensaje debe tener al menos 5 caracteres.');
          return;
      }

      var Mail = 'mailto:' + Emisor + '?subject=' + encodeURIComponent(Nombre) + '&body=' + encodeURIComponent(Mensaje);

      window.location.href = Mail; 

      modalContacto.style.display = 'none';
    }
      
    }

    var btnComenzar = document.getElementById('btn-comenzar');
    btnComenzar.addEventListener('click', iniciarParpadeo);

    function iniciarParpadeo() { //Parpadeo de prueba 
      btnComenzar.disabled = true;
      btnComenzar.style.backgroundColor = 'gray';
      btnComenzar.textContent='En proceso...';
      
        var botones = document.querySelectorAll('.contenedor_circulos > div'); //obtiene todos los botones
        var intervalo = setInterval(function() {
          var botonAleatorio = botones[Math.floor(Math.random() * botones.length)]; //se genera el aleatorio
          var colorCirculo = botonAleatorio.dataset.color;//accede a data-color
          botonAleatorio.style.backgroundColor = colorCirculo;
          setTimeout(function() {
            botonAleatorio.style.backgroundColor = '';//lo q obtuvo del color
          }, 1000);//el boton debe parpadear durante 1 segundo x 3 segundos
        }, 3000); //cada cuanto cambia
      
        setTimeout(function() {
          clearInterval(intervalo);//limpiarIntervalo
          btnComenzar.disabled = false; //Vuelve a activar el boton del parpadeo
          btnComenzar.style.backgroundColor = 'yellow';//vuelve al color
          btnComenzar.textContent='Parpadeo de Prueba'; //cambiar texto
          
        }, 10000); //10 seg para ejec.
      }
  }
  );
  
  window.addEventListener('load', function() { //Establezco las variables del juego
  var secuencia = [];
  var nivel = 0;
  var botonesCirculos = document.querySelectorAll('.contenedor_circulos > div');
  var btnJugar = document.getElementById('btn-Jugar');
  var secuenciaUsuario = [];
  var esperandoRespuesta = false;

  btnJugar.addEventListener('click', function() {
      iniciarJuego();
  });

  function iniciarJuego() {
      nivel++; //Sumo 1 al nivel, el inicial es 0.
      btnJugar.textContent = 'Nivel ' + nivel;
      var colores = ['red', 'green', 'blue', 'yellow']; //Colores posibles
      var colorAleatorio = colores[Math.floor(Math.random() * colores.length)]; //Genero un color aleatorio por la cantidad de colores posible
      secuencia.push(colorAleatorio); // Agregar el nuevo color aleatorio al final de la secuencia para este nivel
      
      mostrarSecuencia();

  }

  function mostrarSecuencia() {
      var i = 0;   // i servirá como índice para recorrer la secuencia de colores.
      var intervaloMostrarSecuencia = setInterval(function() { //Repetir la función en intervalos de tiempo
          var colorActual = secuencia[i]; //Obtengo valor de la secuencia
          mostrarColorParpadeo(colorActual);
          i++;
          if (i >= secuencia.length) { //Si 'i' alcanza o supera la secuencia, mostramos ya todos los colores
              clearInterval(intervaloMostrarSecuencia); //Limpio el intervalo, para que no siga la repeticion
              esperandoRespuesta = true; // Permitir que el usuario responda después de mostrar la secuencia
          }
      }, 1000);

      
       // Se crea una copia de la secuencia original en la variable 'secuenciaUsuario'.
      // Para comparar la secuencia que el usuario ingrese con la secuencia original para verificar la rta.
      secuenciaUsuario = secuencia.slice(); // Copiar la secuencia para comparar con la respuesta del usuario
  }

  function mostrarColorParpadeo(color) {
      botonesCirculos.forEach(function(circulo) {
          var colorCirculo = circulo.dataset.color; // Se obtiene el color del atributo 'data-color' del circulo actual.
          if (colorCirculo === color) {
              circulo.style.backgroundColor = color; // Si el color del circulo coincide con el color dado como argumento, pinta de ese color el fondo
              setTimeout(function() {
                  circulo.style.backgroundColor = ''; //Despues que finalice el tiempo, vuelvo al color original
              }, 500);
          }
      });
  }

  function verificarSeleccionUsuario(event) {
      if (esperandoRespuesta) { //verifico si estoy aun esperando la rta del usuario
          var colorSeleccionado = event.target.dataset.color; //Se obtiene el color seleccionado por el usuario a partir del atributo 'data-color'
          var colorEsperado = secuenciaUsuario.shift();  // Elimino el primer color de la secuencia del usuario, utilizando shift()

          if (colorSeleccionado === colorEsperado) { //Si es corecto lo que selecciono el usuario..
             //sube el puntaje
              var btnScore = document.getElementById('btn-Score'); //Para mostrar score
              Puntaje_Jugador += 5;
              btnScore.textContent = 'Score: ' + Puntaje_Jugador;
              if (secuenciaUsuario.length === 0) {
                  esperandoRespuesta = false; // Detener la interacción del usuario hasta la próxima secuencia
                  setTimeout(function() {
                      iniciarJuego();
                  }, 1000);
              }
          } else {//Sino
              mostrarModalPerder(nivel, Puntaje_Jugador);
              nivel = 0;
              secuencia = [];
              btnJugar.textContent = 'Jugar!';
              btnJugar.disabled=false;
              var btnScore = document.getElementById('btn-Score'); //Para mostrar score
              btnScore.textContent = 'Puntaje: 0';
              Puntaje_Jugador = 0;
            }
      }
  }

  botonesCirculos.forEach(function(circulo) {
    circulo.addEventListener('click', verificarSeleccionUsuario);
});

  function mostrarModalPerder(nivelAlcanzado, puntaje) {
    var modalPerder = document.getElementById('modal-perder');
    var nivelPerdidoTexto = document.getElementById('nivel-perdido');
    var puntajePerdidoTexto = document.getElementById('puntaje-perdido');
    nivelPerdidoTexto.textContent = nivelAlcanzado;
    puntajePerdidoTexto.textContent = puntaje;
    modalPerder.style.display = 'block';
  
    var btnCerrarModal = document.getElementById('btn-cerrar-modal');
    btnCerrarModal.addEventListener('click', function() {
      modalPerder.style.display = 'none';
    });

    var btnReiniciar = document.getElementById('btn-reiniciar');
    btnReiniciar.addEventListener('click', function(){
      modalPerder.style.display = 'none';
      Puntaje_Jugador = 0;
      nivel = 0;
      secuencia = [];
      iniciarJuego(); //Vuelve a iniciar el juego
    })
  }
});







  