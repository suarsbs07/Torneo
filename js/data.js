const DATA_ORIGINAL = {
  clubes: {
    configuracion: { playoffsActivos: false },

    equipos: [
      { id:"c1", jugador:"", equipo:"", ratingEquipo:75, jugadorImg:"", equipoImg:"", grupo:"A" },
      { id:"c2", jugador:"", equipo:"", ratingEquipo:75, jugadorImg:"", equipoImg:"", grupo:"A" },
      { id:"c3", jugador:"", equipo:"", ratingEquipo:75, jugadorImg:"", equipoImg:"", grupo:"A" },
      { id:"c4", jugador:"", equipo:"", ratingEquipo:75, jugadorImg:"", equipoImg:"", grupo:"A" },

      { id:"c5", jugador:"", equipo:"", ratingEquipo:75, jugadorImg:"", equipoImg:"", grupo:"B" },
      { id:"c6", jugador:"", equipo:"", ratingEquipo:75, jugadorImg:"", equipoImg:"", grupo:"B" },
      { id:"c7", jugador:"", equipo:"", ratingEquipo:75, jugadorImg:"", equipoImg:"", grupo:"B" },
      { id:"c8", jugador:"", equipo:"", ratingEquipo:75, jugadorImg:"", equipoImg:"", grupo:"B" }
    ],

    jornadas: [
      { nombre:"Jornada 1 - Grupo A", partidos:[{ local:"c1", visita:"c2", gl:null, gv:null },{ local:"c3", visita:"c4", gl:null, gv:null }]},
      { nombre:"Jornada 1 - Grupo B", partidos:[{ local:"c5", visita:"c6", gl:null, gv:null },{ local:"c7", visita:"c8", gl:null, gv:null }]},

      { nombre:"Jornada 2 - Grupo A", partidos:[{ local:"c1", visita:"c3", gl:null, gv:null },{ local:"c2", visita:"c4", gl:null, gv:null }]},
      { nombre:"Jornada 2 - Grupo B", partidos:[{ local:"c5", visita:"c7", gl:null, gv:null },{ local:"c6", visita:"c8", gl:null, gv:null }]},

      { nombre:"Jornada 3 - Grupo A", partidos:[{ local:"c1", visita:"c4", gl:null, gv:null },{ local:"c2", visita:"c3", gl:null, gv:null }]},
      { nombre:"Jornada 3 - Grupo B", partidos:[{ local:"c5", visita:"c8", gl:null, gv:null },{ local:"c6", visita:"c7", gl:null, gv:null }]}
    ],

    playoffs: {
      semis: [
        { local:"1A", visita:"2B", gl:null, gv:null },
        { local:"1B", visita:"2A", gl:null, gv:null }
      ],
      final: [
        { local:null, visita:null, gl:null, gv:null }
      ]
    }
  },

  paises: {
    configuracion: { playoffsActivos: false },

    equipos: [
      { id:"p1", jugador:"", equipo:"", ratingEquipo:80, jugadorImg:"", equipoImg:"", grupo:"A" },
      { id:"p2", jugador:"", equipo:"", ratingEquipo:80, jugadorImg:"", equipoImg:"", grupo:"A" },
      { id:"p3", jugador:"", equipo:"", ratingEquipo:80, jugadorImg:"", equipoImg:"", grupo:"A" },
      { id:"p4", jugador:"", equipo:"", ratingEquipo:80, jugadorImg:"", equipoImg:"", grupo:"A" },

      { id:"p5", jugador:"", equipo:"", ratingEquipo:80, jugadorImg:"", equipoImg:"", grupo:"B" },
      { id:"p6", jugador:"", equipo:"", ratingEquipo:80, jugadorImg:"", equipoImg:"", grupo:"B" },
      { id:"p7", jugador:"", equipo:"", ratingEquipo:80, jugadorImg:"", equipoImg:"", grupo:"B" },
      { id:"p8", jugador:"", equipo:"", ratingEquipo:80, jugadorImg:"", equipoImg:"", grupo:"B" }
    ],

    jornadas: [
      { nombre:"Jornada 1 - Grupo A", partidos:[{ local:"p1", visita:"p2", gl:null, gv:null },{ local:"p3", visita:"p4", gl:null, gv:null }]},
      { nombre:"Jornada 1 - Grupo B", partidos:[{ local:"p5", visita:"p6", gl:null, gv:null },{ local:"p7", visita:"p8", gl:null, gv:null }]},

      { nombre:"Jornada 2 - Grupo A", partidos:[{ local:"p1", visita:"p3", gl:null, gv:null },{ local:"p2", visita:"p4", gl:null, gv:null }]},
      { nombre:"Jornada 2 - Grupo B", partidos:[{ local:"p5", visita:"p7", gl:null, gv:null },{ local:"p6", visita:"p8", gl:null, gv:null }]},

      { nombre:"Jornada 3 - Grupo A", partidos:[{ local:"p1", visita:"p4", gl:null, gv:null },{ local:"p2", visita:"p3", gl:null, gv:null }]},
      { nombre:"Jornada 3 - Grupo B", partidos:[{ local:"p5", visita:"p8", gl:null, gv:null },{ local:"p6", visita:"p7", gl:null, gv:null }]}
    ],

    playoffs: {
      semis: [
        { local:"1A", visita:"2B", gl:null, gv:null },
        { local:"1B", visita:"2A", gl:null, gv:null }
      ],
      final: [
        { local:null, visita:null, gl:null, gv:null }
      ]
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
