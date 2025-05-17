const Tablero = (function (){
    let filas = 3;
    let columnas = 3;
    let casillas = 9;
    let tablero = [];

    // Crear un arreglo de filas y columnas de 3x3
    for (let i = 0; i < filas; i++) {
        tablero[i] = [];
        for (let j = 0; j < columnas; j++) {
            tablero[i].push(Celda());
        }
    }

    const obtenerTablero = () => tablero;
    
    const disminuirCasiilas = () => casillas--;

    const casillasDisponibles = () => casillas;

    const borrarTablero = () => {
        tablero = []
        casillas = 9;
        for (let i = 0; i < filas; i++) {
            tablero[i] = [];
            for (let j = 0; j < columnas; j++) {
                tablero[i].push(Celda());
            }
        }
    };


    const puntuar = (fila, columna, jugador) => {
        if (tablero[fila][columna].obtenerValor() !== "") {
            console.log(`Casilla ocupada`);
            return;
        } else {
            tablero[fila][columna].cambiarValor(jugador.obtenerValorDelJugador());
            disminuirCasiilas();
        }
    }

    const imprimirTablero = () => {
        const tableroConValores = tablero.map(fila => fila.map((celda) => celda.obtenerValor()))
        console.table(tableroConValores);
    }

    return { obtenerTablero, puntuar, imprimirTablero, casillasDisponibles, disminuirCasiilas, borrarTablero}
})();






/*
    "": Representa que no hay valor en la celda.
    "X": Representa el valor del jugador 1
    "O": Representa el valor del jugador 2
*/

function Celda() {
    let valor = "";

    const cambiarValor = valorJugador => {
        valor = valorJugador;
    }

    const obtenerValor = () => valor;

    return {
        cambiarValor,
        obtenerValor
    }
}



/*
    Funcion para instanciar jugadores
*/
function crearJugador(nombre, valor) {
    let nombreDelJugador = nombre;
    let valorDelJugador = valor;

    const obtenerNombreDelJugador = () => nombreDelJugador;
    const obtenerValorDelJugador = () => valorDelJugador;

    return {
        obtenerNombreDelJugador,
        obtenerValorDelJugador
    }
}








/*
    Crear juego
*/
const Juego = (function() {
    let jugadorUno = crearJugador("Jugador uno", "X")
    let jugadorDos = crearJugador("Jugador dos", "O")

    const jugadores = [
        jugadorUno,
        jugadorDos
    ]

    let jugadorActivo = jugadores[0];

    const cambiarDeTurno = () => {
        jugadorActivo = jugadorActivo === jugadores[0] ? jugadores[1] : jugadores[0];
    };

    const obtenerJugadorActivo = () => jugadorActivo;

    const nuevaRonda = () => {
        Tablero.imprimirTablero();
        console.log(`Turno de ${obtenerJugadorActivo().obtenerNombreDelJugador()}`)
    }

    // Verificar si se gano o se empato el juego
    const juegoTerminado = () => {
        let tablero = Tablero.obtenerTablero();
        let ganador;
        let juegoFinalizo;

        const obtenerGanador = () => ganador;
        const obtenerResultado =  () => juegoFinalizo;

        // Chequear filas
        for(let i = 0; i < 3; i++) {
            if (tablero[i][0].obtenerValor() !== "" && tablero[i][0].obtenerValor() == tablero[i][1].obtenerValor() && tablero[i][1].obtenerValor() == tablero[i][2].obtenerValor()) {
                ganador = `Se gano el juego, ganador ${tablero[i][0].obtenerValor()}`;
                console.log(ganador);
                Tablero.imprimirTablero();
                juegoFinalizo = true;
            }
        }

        // Chequear columnas
        for(let i = 0; i < 3; i++) {
            if (tablero[0][i].obtenerValor() !== "" && tablero[0][i].obtenerValor() == tablero[1][i].obtenerValor() && tablero[1][i].obtenerValor() == tablero[2][i].obtenerValor()) {
                ganador = `Se gano el juego, ganador ${tablero[0][i].obtenerValor()}`;
                console.log(ganador);
                Tablero.imprimirTablero();
                juegoFinalizo = true;
            }
        }

        // Chequear diagonales
        if (tablero[0][0].obtenerValor() !== "" && tablero[0][0].obtenerValor() == tablero[1][1].obtenerValor() && tablero[1][1].obtenerValor() == tablero[2][2].obtenerValor()) {
            ganador = `Se gano el juego, ganador ${tablero[0][0].obtenerValor()}`;
            console.log(ganador);
            Tablero.imprimirTablero();
            juegoFinalizo = true;
        }

        if (tablero[0][2].obtenerValor() !== "" && tablero[0][2].obtenerValor() == tablero[1][1].obtenerValor() && tablero[1][1].obtenerValor() == tablero[2][0].obtenerValor()) {
            ganador = `Se gano el juego, ganador ${tablero[0][2].obtenerValor()}`
            console.log(ganador);
            Tablero.imprimirTablero();
            juegoFinalizo = true;
        }
        
        // Chequear empate
        if(Tablero.casillasDisponibles() == 0) {
            ganador = `Juego empatado`;
            console.log(ganador);
            Tablero.imprimirTablero();
            juegoFinalizo = true;
        }

        return {
            obtenerGanador,
            obtenerResultado
        }
    }

    const jugarRonda = (fila, columna) => {
        console.log(
            `El jugador ${obtenerJugadorActivo().obtenerNombreDelJugador()} elige la fila ${fila} y la columna ${columna}...`
        );


        // Puntuar
        let casillasActuales = Tablero.casillasDisponibles();
        if(casillasActuales == Tablero.casillasDisponibles()) {
            Tablero.puntuar(fila, columna, obtenerJugadorActivo());
        }

        // Verificar si se termino el juego
        if(juegoTerminado().obtenerResultado()) {
            return;
        }

        // Verificar que el jugador haya puntuado, en caso contrario mantener turno
        if(casillasActuales != Tablero.casillasDisponibles()) {
            cambiarDeTurno();
        }
        nuevaRonda();
    }

    nuevaRonda();

    return {
        nuevaRonda,
        jugarRonda,
        obtenerJugadorActivo,
        juegoTerminado
    };
})();









/* LOGICA DOM */

const logicaDOM = (function() {
    const contenedor = document.querySelector(".contenedor")
    const tablero = document.querySelector(".tablero");
    
    const botonInicio = document.querySelector(".botonInicio");
    botonInicio.addEventListener("click", () => {
        console.log("click")
        tablero.classList.remove("tablero")
        tablero.classList.add("tableroVisible")
    })

    const botonReinciar = document.querySelector(".botonReinciar");
    botonReinciar.addEventListener("click", () => {
        Tablero.borrarTablero();
        let casillasTablero = document.querySelectorAll(".casilla");
        casillasTablero.forEach(el => {
            el.textContent = "";
        })
    })

    // Agregar casillas al DOM
    for (let i = 0; i < 9; i++) {
        let casilla = document.createElement("div");
        casilla.classList.add("casilla");
        casilla.textContent = ""

        if(i <= 2) {
            casilla.setAttribute("fila", `0`)
            casilla.setAttribute("columna", `${i}`)
        }

        if(i >= 3 && i <= 5) {
            casilla.setAttribute("fila", `1`)
            casilla.setAttribute("columna", `${i - 3}`)
        }

        if(i >= 6 && i <= 9) {
            casilla.setAttribute("fila", `2`)
            casilla.setAttribute("columna", `${i - 6}`)
        }

        tablero.appendChild(casilla);
    }

    // Seleccionar casillas y agregar eventos
    let casillasTablero = document.querySelectorAll(".casilla");
    
    casillasTablero.forEach(el => {
        el.addEventListener("click", ()=> {
            // Obtener valor del jugador
            let jugadorTablero = Juego.obtenerJugadorActivo();
            if(el.textContent == "") {
                el.textContent = jugadorTablero.obtenerValorDelJugador();
            }

            // Jugar ronda
            let elFila = el.getAttribute("fila");
            let elColumna = el.getAttribute("columna");
            Juego.jugarRonda(elFila, elColumna);

            if(Juego.juegoTerminado().obtenerResultado()) {
                let resultado = document.createElement("div");
                resultado.textContent = Juego.juegoTerminado().obtenerGanador();

                casillasTablero.forEach(el => {
                    el.classList.remove("casilla");
                    el.classList.add("casillaDesactivada");
                })

                contenedor.appendChild(resultado)
            }
        })
    })

})();

