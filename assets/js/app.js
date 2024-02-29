document.addEventListener('DOMContentLoaded',function(){
    //declaramos las variables
    const jugador = document.querySelector("#jugador");
    const jugadorPc = document.querySelector("#pc");
    const juego = document.querySelector("#juego");
    const iniciar = document.querySelector("#iniciar");
    const jugadas = document.querySelectorAll('#jugadas button');
    const batalla = document.querySelector('#batalla');
    let contadorJuegos = 0;
    let contadorVictorias = [0,0];
    let contadorDerrotas = [0,0];
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
            removerError();
            btnJuegoEstado();
            btnIniciarEstado(inputCantidad);
            contadorJugadas();
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
            btn[1].textContent = 'Reiniciar';
            inputCantidad.disabled = true;
            iniciarJugadas(btn);
        }else{
            reiniciarImg();
            btn[1].classList.remove('btn-danger');
            btn[1].classList.add('btn-success');
            btn[1].textContent = 'Iniciar';
            inputCantidad.disabled = false;
            inputCantidad.value = "";
            contadorJuegos=0;
            iniciarJugadas(btn);
            reiniciarMarcadores();
        }
    }

    // obtenemos el numero de juegos
    const contadorJugadas = () =>{
        let inputCantidad = juego.querySelector('input').value;
        contadorJuegos = inputCantidad;
    }

    // volvemos las img de los jugadores a como son por defecto
    const reiniciarImg = () =>{
        const imgJugador =jugador.querySelector("img")
        const imgPc =jugadorPc.querySelector("img")
        imgJugador.src = `assets/img/jugador.png`;
        imgPc.src = `assets/img/pc.png`;
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
        guardarJugada(e.target.id);
        btnJugadaSeleccionada(jugadaSeleccionada)
        
    }
    
    //guardamos en memoria lo que selecciono el jugador
    const guardarJugada = (jugada) =>{
        jugadaJugadores[0] = "";
        jugadaJugadores[0] = jugada;
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
            imgJugador();
        }
    }
    
    // inserta la img de jugador
    const imgJugador = ()=>{
        const img =jugador.querySelector("img")
        img.src = `assets/img/${jugadaJugadores[0]}.png`;
    }


    // btn de inicio de batalla
    function btnBatalla (e){
        e.preventDefault();
        if (jugadaJugadores[0] === ""){
            errorJugada();
        }else{
            removerError();
            turnoPc();
            cachipun();
        }
    }

    // eleccion del pc
    
    const turnoPc = () => {
        const pc = Math.floor(Math.random()*3)
        
        switch (pc){
            case 0 :
                jugadaJugadores[1] = "piedra";
                break; 
            case 1 :
                jugadaJugadores[1] = "papel";
                break;
            case 2 :
                jugadaJugadores[1] = "tijera";
                break;
        }
        console.log(jugadaJugadores);
    }

    // error cuando el jugador quiere hacer el cachipun sin seleccionar una jugada
    const errorJugada = () =>{
        removerError();
        const error = document.createElement('div');
        error.innerHTML = '<p>Selecciona tu jugada antes de comenzar</p>';
        error.classList.add('bg-danger', 'w-auto')
        juego.appendChild(error)
    }

    // logica de la victoria
    const cachipun = () => {
        imgPc();
        if (jugadaJugadores[0] === jugadaJugadores[1]){
            console.log('empate');
            disminuirContador();
        }else {
            switch (jugadaJugadores[0]){
                case "piedra":
                    seleccionPiedra();
                    break;
                case "tijera":
                    seleccionTijera();
                    break
                case "papel":
                    seleccionPapel();
                    break
            }
            disminuirContador();
        }
    }

    // cada vez que juegues un turno se disminuira el contador
    const disminuirContador= () =>{
        let inputCantidad = juego.querySelector('input');
        if (contadorJuegos > 0){
            contadorJuegos--;
            inputCantidad.value = contadorJuegos.toString();
        }
    }
    
    // seleccion de jugada logica
    const seleccionPiedra = () =>{
        if (jugadaJugadores[0] === "piedra" && jugadaJugadores[1]==="papel"){
            victoriaPc();
            console.log('perdiste');
        }
        if (jugadaJugadores[0] === "piedra" && jugadaJugadores[1]==="tijera"){
            victoriaJugador();
            console.log('ganaste');
        }
    }
    const seleccionTijera = () =>{
        if (jugadaJugadores[0] === "tijera" && jugadaJugadores[1]==="piedra"){
            victoriaPc();
            console.log('perdista');
        }
        if (jugadaJugadores[0 ]=== "tijera" && jugadaJugadores[1]==="papel"){
            victoriaJugador();
            console.log('ganaste');
        }
    }
    const seleccionPapel = () =>{
        if (jugadaJugadores[0] === "papel" && jugadaJugadores[1]==="tijera"){
            victoriaPc();
            console.log('perdista');
        }
        if (jugadaJugadores[0] === "papel" && jugadaJugadores[1]==="piedra"){
            victoriaJugador();
            console.log('ganaste');
        }
    }

    // inserta la img de la jugada del pc
    const imgPc = ()=>{
        const img =jugadorPc.querySelector("img")
        img.src = `assets/img/${jugadaJugadores[1]}.png`;
    }
    
    
    const victoriaJugador = () => {
        const victoriaP = jugador.querySelectorAll('span');
        const derrotaP = pc.querySelectorAll('span');
        contadorVictorias[0]++;
        contadorDerrotas[1]++;
        victoriaP[0].textContent = contadorVictorias[0];
        derrotaP[1].textContent = contadorDerrotas[1];
    }

    const victoriaPc = () => {
        const derrotaP = pc.querySelectorAll('span');
        const victoriaP = jugador.querySelectorAll('span');
        contadorVictorias[1]++;
        contadorDerrotas[0]++;
        victoriaP[1].textContent = contadorVictorias[1];
        derrotaP[0].textContent = contadorDerrotas[0];
    }

    const reiniciarMarcadores = () =>{
        const marcadorJugador = jugador.querySelectorAll('span');
        const marcadorPc = pc.querySelectorAll('span');
        marcadorJugador[0].textContent = 0;
        marcadorJugador[1].textContent = 0;
        marcadorPc[0].textContent = 0;
        marcadorPc[1].textContent = 0;
        contadorVictorias = [0,0]
        contadorDerrotas = [0,0] 
    }

})
