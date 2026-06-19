const DATA_ORIGINAL = {
  clubes: {
    configuracion: { playoffsActivos: false },

    equipos: [
      // AQUÍ AGREGAS LOS PARTICIPANTES.
      // ratingEquipo = fuerza aproximada del club en FIFA 26.
      // Ejemplo:
      // { id:"c1", jugador:"Stephano", equipo:"River Plate", ratingEquipo:78, jugadorImg:"img/jugadores/stephano.jpg", equipoImg:"img/equipos/river.png" }

      { id:"c1", jugador:"", equipo:"", ratingEquipo:75, jugadorImg:"", equipoImg:"" },
      { id:"c2", jugador:"", equipo:"", ratingEquipo:75, jugadorImg:"", equipoImg:"" },
      { id:"c3", jugador:"", equipo:"", ratingEquipo:75, jugadorImg:"", equipoImg:"" },
      { id:"c4", jugador:"", equipo:"", ratingEquipo:75, jugadorImg:"", equipoImg:"" },
      { id:"c5", jugador:"", equipo:"", ratingEquipo:75, jugadorImg:"", equipoImg:"" },
      { id:"c6", jugador:"", equipo:"", ratingEquipo:75, jugadorImg:"", equipoImg:"" },
      { id:"c7", jugador:"", equipo:"", ratingEquipo:75, jugadorImg:"", equipoImg:"" },
      { id:"c8", jugador:"", equipo:"", ratingEquipo:75, jugadorImg:"", equipoImg:"" }
    ],

    // AQUÍ ESTÁN LAS 7 JORNADAS.
    // Cambia local/visita según el fixture real.
    // Si no hay resultado, deja gl:null y gv:null.
    jornadas: [
      { nombre:"Jornada 1", partidos:[{ local:"c1", visita:"c2", gl:null, gv:null },{ local:"c3", visita:"c4", gl:null, gv:null },{ local:"c5", visita:"c6", gl:null, gv:null },{ local:"c7", visita:"c8", gl:null, gv:null }]},
      { nombre:"Jornada 2", partidos:[{ local:"c1", visita:"c3", gl:null, gv:null },{ local:"c2", visita:"c4", gl:null, gv:null },{ local:"c5", visita:"c7", gl:null, gv:null },{ local:"c6", visita:"c8", gl:null, gv:null }]},
      { nombre:"Jornada 3", partidos:[{ local:"c1", visita:"c4", gl:null, gv:null },{ local:"c2", visita:"c3", gl:null, gv:null },{ local:"c5", visita:"c8", gl:null, gv:null },{ local:"c6", visita:"c7", gl:null, gv:null }]},
      { nombre:"Jornada 4", partidos:[{ local:"c1", visita:"c5", gl:null, gv:null },{ local:"c2", visita:"c6", gl:null, gv:null },{ local:"c3", visita:"c7", gl:null, gv:null },{ local:"c4", visita:"c8", gl:null, gv:null }]},
      { nombre:"Jornada 5", partidos:[{ local:"c1", visita:"c6", gl:null, gv:null },{ local:"c2", visita:"c5", gl:null, gv:null },{ local:"c3", visita:"c8", gl:null, gv:null },{ local:"c4", visita:"c7", gl:null, gv:null }]},
      { nombre:"Jornada 6", partidos:[{ local:"c1", visita:"c7", gl:null, gv:null },{ local:"c2", visita:"c8", gl:null, gv:null },{ local:"c3", visita:"c5", gl:null, gv:null },{ local:"c4", visita:"c6", gl:null, gv:null }]},
      { nombre:"Jornada 7", partidos:[{ local:"c1", visita:"c8", gl:null, gv:null },{ local:"c2", visita:"c7", gl:null, gv:null },{ local:"c3", visita:"c6", gl:null, gv:null },{ local:"c4", visita:"c5", gl:null, gv:null }]}
    ],

    playoffs: {
      octavos: [{ local:null, visita:null, gl:null, gv:null },{ local:null, visita:null, gl:null, gv:null },{ local:null, visita:null, gl:null, gv:null },{ local:null, visita:null, gl:null, gv:null }],
      cuartos: [{ local:null, visita:null, gl:null, gv:null },{ local:null, visita:null, gl:null, gv:null }],
      semis: [{ local:null, visita:null, gl:null, gv:null }],
      final: [{ local:null, visita:null, gl:null, gv:null }]
    }
  },

  paises: {
    configuracion: { playoffsActivos: false },

    equipos: [
      { id:"p1", jugador:"", equipo:"", ratingEquipo:80, jugadorImg:"", equipoImg:"" },
      { id:"p2", jugador:"", equipo:"", ratingEquipo:80, jugadorImg:"", equipoImg:"" },
      { id:"p3", jugador:"", equipo:"", ratingEquipo:80, jugadorImg:"", equipoImg:"" },
      { id:"p4", jugador:"", equipo:"", ratingEquipo:80, jugadorImg:"", equipoImg:"" },
      { id:"p5", jugador:"", equipo:"", ratingEquipo:80, jugadorImg:"", equipoImg:"" },
      { id:"p6", jugador:"", equipo:"", ratingEquipo:80, jugadorImg:"", equipoImg:"" },
      { id:"p7", jugador:"", equipo:"", ratingEquipo:80, jugadorImg:"", equipoImg:"" },
      { id:"p8", jugador:"", equipo:"", ratingEquipo:80, jugadorImg:"", equipoImg:"" }
    ],

    jornadas: [
      { nombre:"Jornada 1", partidos:[{ local:"p1", visita:"p2", gl:null, gv:null },{ local:"p3", visita:"p4", gl:null, gv:null },{ local:"p5", visita:"p6", gl:null, gv:null },{ local:"p7", visita:"p8", gl:null, gv:null }]},
      { nombre:"Jornada 2", partidos:[{ local:"p1", visita:"p3", gl:null, gv:null },{ local:"p2", visita:"p4", gl:null, gv:null },{ local:"p5", visita:"p7", gl:null, gv:null },{ local:"p6", visita:"p8", gl:null, gv:null }]},
      { nombre:"Jornada 3", partidos:[{ local:"p1", visita:"p4", gl:null, gv:null },{ local:"p2", visita:"p3", gl:null, gv:null },{ local:"p5", visita:"p8", gl:null, gv:null },{ local:"p6", visita:"p7", gl:null, gv:null }]},
      { nombre:"Jornada 4", partidos:[{ local:"p1", visita:"p5", gl:null, gv:null },{ local:"p2", visita:"p6", gl:null, gv:null },{ local:"p3", visita:"p7", gl:null, gv:null },{ local:"p4", visita:"p8", gl:null, gv:null }]},
      { nombre:"Jornada 5", partidos:[{ local:"p1", visita:"p6", gl:null, gv:null },{ local:"p2", visita:"p5", gl:null, gv:null },{ local:"p3", visita:"p8", gl:null, gv:null },{ local:"p4", visita:"p7", gl:null, gv:null }]},
      { nombre:"Jornada 6", partidos:[{ local:"p1", visita:"p7", gl:null, gv:null },{ local:"p2", visita:"p8", gl:null, gv:null },{ local:"p3", visita:"p5", gl:null, gv:null },{ local:"p4", visita:"p6", gl:null, gv:null }]},
      { nombre:"Jornada 7", partidos:[{ local:"p1", visita:"p8", gl:null, gv:null },{ local:"p2", visita:"p7", gl:null, gv:null },{ local:"p3", visita:"p6", gl:null, gv:null },{ local:"p4", visita:"p5", gl:null, gv:null }]}
    ],

    playoffs: {
      octavos: [{ local:null, visita:null, gl:null, gv:null },{ local:null, visita:null, gl:null, gv:null },{ local:null, visita:null, gl:null, gv:null },{ local:null, visita:null, gl:null, gv:null }],
      cuartos: [{ local:null, visita:null, gl:null, gv:null },{ local:null, visita:null, gl:null, gv:null }],
      semis: [{ local:null, visita:null, gl:null, gv:null }],
      final: [{ local:null, visita:null, gl:null, gv:null }]
    }
  }
};

function obtenerData(){
  const guardado = localStorage.getItem("torneoData");
  return guardado ? JSON.parse(guardado) : structuredClone(DATA_ORIGINAL);
}

function guardarData(data){
  localStorage.setItem("torneoData", JSON.stringify(data));
}

function resetData(){
  localStorage.removeItem("torneoData");
}
