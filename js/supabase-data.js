async function cargarDesdeSupabase(modo) {
  const { data: torneo, error: torneoError } = await supabaseClient
    .from("torneos")
    .select("*")
    .eq("modo", modo)
    .maybeSingle();

  if (torneoError || !torneo) {
    console.error(torneoError);
    alert("No se encontró el torneo en Supabase");
    return;
  }

  const { data: equipos = [] } = await supabaseClient
    .from("equipos")
    .select("*")
    .eq("torneo_id", torneo.id)
    .order("codigo");

  const { data: jornadas = [] } = await supabaseClient
    .from("jornadas")
    .select("*")
    .eq("torneo_id", torneo.id)
    .order("orden");

  const { data: partidos = [] } = await supabaseClient
    .from("partidos")
    .select("*");

  const { data: playoffs = [] } = await supabaseClient
    .from("playoffs")
    .select("*")
    .eq("torneo_id", torneo.id)
    .order("orden");

  const dataConvertida = {
    clubes: DATA_ORIGINAL.clubes,
    paises: DATA_ORIGINAL.paises
  };

  dataConvertida[modo] = {
    configuracion: {
      playoffsActivos: torneo.playoffs_activos || false
    },

    equipos: equipos.map(e => ({
      id: e.codigo,
      jugador: e.jugador || "",
      equipo: e.equipo || "",
      ratingEquipo: e.rating_equipo || 75,
      jugadorImg: e.jugador_img || "",
      equipoImg: e.equipo_img || "",
      grupo: e.grupo || ""
    })),

    jornadas: jornadas.length > 0
      ? jornadas.map(j => ({
          nombre: j.nombre,
          partidos: partidos
            .filter(p => p.jornada_id === j.id)
            .map(p => ({
              local: p.local_codigo,
              visita: p.visita_codigo,
              gl: p.goles_local,
              gv: p.goles_visita
            }))
        }))
      : [
          {
            nombre: "Jornada 1",
            partidos: []
          }
        ],

    playoffs: {
      octavos: [],
      cuartos: [],
      semis: [],
      final: []
    }
  };

  playoffs.forEach(p => {
    if (dataConvertida[modo].playoffs[p.ronda]) {
      dataConvertida[modo].playoffs[p.ronda].push({
        local: p.local_codigo,
        visita: p.visita_codigo,
        gl: p.goles_local,
        gv: p.goles_visita
      });
    }
  });

  localStorage.setItem("torneoData", JSON.stringify(dataConvertida));
  renderPagina(modo);
}
