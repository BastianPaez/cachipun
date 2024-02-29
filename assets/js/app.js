document.addEventListener('DOMContentLoaded',function(){
    //declaramos las variables
    const juego = document.querySelector("#juego");
    const iniciar = document.querySelector("#iniciar")
    const jugadas = document.querySelectorAll('#jugadas button');
    const batalla = document.querySelector('#batalla')
    let cantidadJuegos = 0;
    let jugadaJugadores = ["",""]

    // cargamos los eventlisteners
    cargarEventListeners();
    function cargarEventListeners(){
        iniciar.addEventListener('click', btnIniciar);
        jugadas.forEach(function(jugada) {
            jugada.addEventListener('click', btnJugadas);
        });
        batalla.addEventListener('click', btnBatalla);
    }


    //accedemos al boton que obtiene la cantidad de juegos para poder iniciar el juego
    function btnIniciar (e) {
        e.preventDefault()
        if (e.target.classList.contains('btn')){
            cantidad();
        }
    }

    //obtenemos el número de juegos
    const cantidad = () => {
        const inputCantidad = juego.querySelector('input');

        if (inputCantidad.value === ""){
            if (juego.childElementCount <= 3){
                error();
            }
        }
        else {
            cantidadJuegos = parseInt(inputCantidad.value);
            removerError();
            btnJuegoEstado();
            btnIniciarEstado(inputCantidad);

        }
    }
    
    // error si se da el caso de que el jugador presiona iniciar si no ha escrito algun numero
    const error = () => {
        const error = document.createElement('div');
        error.innerHTML = '<p>Debes ingresar un número para poder comenzar</p>';
        error.classList.add('bg-danger', 'w-auto');
        juego.appendChild(error)
    }
    // remueve el error si se detecta que el jugador ya ingreso un numero
    const removerError = () => {
        if (juego.childElementCount === 4){
            juego.lastChild.remove();
        }
    }

    //Cambia las caracteristicas de el boton con el que se puede jugar
    const btnJuegoEstado = () =>{
        const btn = juego.querySelectorAll('button');
        if (btn[0].classList.contains('btn-secondary')){
            btn[0].classList.remove('btn-secondary', 'disabled');
            btn[0].classList.add('btn-success');
        }else{
            btn[0].classList.remove('btn-success');
            btn[0].classList.add('btn-secondary', 'disabled');  
        }
    }
    //Cambia las caracteristicas de el boton de inicio // reinicia los parametros
    const btnIniciarEstado = (inputCantidad) =>{
        const btn = juego.querySelectorAll('button');
        if (btn[1].classList.contains('btn-success')){
            btn[1].classList.remove('btn-success');
            btn[1].classList.add('btn-danger');
            btn[1].textContent = 'Detener';
            inputCantidad.disabled = true;
            iniciarJugadas(btn);
        }else{
            btn[1].classList.remove('btn-danger');
            btn[1].classList.add('btn-success');
            btn[1].textContent = 'Iniciar';
            inputCantidad.disabled = false;
            inputCantidad.value = "";
            cantidadJuegos=0;
            iniciarJugadas(btn);
        }
    }

    //activa los botones para elegir pidra papel o tijera
    const iniciarJugadas = (btn) =>{
        if (btn[1].classList.contains('btn-danger')){
            for ( i = 0; i < jugadas.length ; i++){
                jugadas[i].classList.remove('disabled');
                jugadas[i].classList.remove('btn-secondary');
                jugadas[i].classList.add('btn-danger');
            }
        }
        if(btn[1].classList.contains('btn-success')){
            for ( i = 0; i < jugadas.length ; i++){
                jugadas[i].classList.add('disabled');
                jugadas[i].classList.remove('btn-danger');
                jugadas[i].classList.remove('btn-success');
                jugadas[i].classList.add('btn-secondary');

            }
        }
    }

    // seleccion de botones piedra papel o tijera
    function btnJugadas (e) {
        e.preventDefault()
        const jugadaSeleccionada = e.target ;
        jugadaJugadores[0] = e.target.id;
        btnJugadaSeleccionada(jugadaSeleccionada)

    }
    
    // funcion para resaltar el boton seleccionado
    const btnJugadaSeleccionada = (jugadaSeleccionada) =>{
        
        jugadas.forEach ((jugada)=>{
            if (jugada.classList.contains('btn-success')){
                jugada.classList.remove('btn-success')
                jugada.classList.add('btn-danger')
            }
        })
        if (jugadaSeleccionada.classList.contains('btn-danger')){
            jugadaSeleccionada.classList.remove('btn-danger')
            jugadaSeleccionada.classList.add('btn-success')
        }
    }
    

    //
    function btnBatalla (e){
        e.preventDefault();
        console.log('ola');
    }
})