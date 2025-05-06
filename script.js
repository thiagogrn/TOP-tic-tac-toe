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


    const puntuar = (fila, columna, jugador) => {
        if (tablero[fila][columna].obtenerValor() !== "") return;
        tablero[fila][columna].cambiarValor(jugador.obtenerValorDelJugador());
        disminuirCasiilas();
    }

    const imprimirTablero = () => {
        const tableroConValores = tablero.map(fila => fila.map((celda) => celda.obtenerValor()))
        console.table(tableroConValores);
    }

    return { obtenerTablero, puntuar, imprimirTablero, casillasDisponibles, disminuirCasiilas}
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
    const juegoTerminado = (tablero) => {

        // Chequear filas
        for(let i = 0; i < 3; i++) {
            if (tablero[i][0].obtenerValor() !== "" && tablero[i][0].obtenerValor() == tablero[i][1].obtenerValor() && tablero[i][1].obtenerValor() == tablero[i][2].obtenerValor()) {
                console.log(`Se gano el juego, ganador ${tablero[i][0].obtenerValor()}`);
                Tablero.imprimirTablero();
                return true;
            }
        }

        // Chequear columnas
        for(let i = 0; i < 3; i++) {
            if (tablero[0][i].obtenerValor() !== "" && tablero[0][i].obtenerValor() == tablero[1][i].obtenerValor() && tablero[1][i].obtenerValor() == tablero[2][i].obtenerValor()) {
                console.log(`Se gano el juego, ganador ${tablero[0][i].obtenerValor()}`)
                Tablero.imprimirTablero();
                return true;
            }
        }

        // Chequear diagonales
        if (tablero[0][0].obtenerValor() !== "" && tablero[0][0].obtenerValor() == tablero[1][1].obtenerValor() && tablero[1][1].obtenerValor() == tablero[2][2].obtenerValor()) {
            console.log(`Se gano el juego, ganador ${tablero[0][0].obtenerValor()}`)
            Tablero.imprimirTablero();
            return true;
        }

        if (tablero[0][2].obtenerValor() !== "" && tablero[0][2].obtenerValor() == tablero[1][1].obtenerValor() && tablero[1][1].obtenerValor() == tablero[2][0].obtenerValor()) {
            console.log(`Se gano el juego, ganador ${tablero[0][2].obtenerValor()}`)
            Tablero.imprimirTablero();
            return true;
        }
        
        // Chequear empate
        if(Tablero.casillasDisponibles() == 0) {
            console.log(`Juego empatado`)
            Tablero.imprimirTablero();
            return true;
        }
    }

    const jugarRonda = (fila, columna) => {
        console.log(
            `El jugador ${obtenerJugadorActivo().obtenerNombreDelJugador()} elige la fila ${fila} y la columna ${columna}...`
        );
        Tablero.puntuar(fila, columna, obtenerJugadorActivo());

        // Verificar si se termino el juego
        if(juegoTerminado(Tablero.obtenerTablero())) {
            juegoTerminado(Tablero.obtenerTablero())
            return;
        }

        cambiarDeTurno();
        nuevaRonda();
    }

    nuevaRonda();

    return {
        nuevaRonda,
        jugarRonda,
        obtenerJugadorActivo
    };
})();