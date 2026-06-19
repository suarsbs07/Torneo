function nombreEquipo(data, id) {
  return data.equipos.find(e => e.id === id);
}

function nombreVisible(valor, fallback) {
  return valor && valor.trim() !== "" ? valor : fallback;
}

function equiposActivos(data) {
  return data.equipos;
}

function calcularTabla(data) {
  const activos = equiposActivos(data);

  const tabla = activos.map(e => ({
    ...e,
    pts: 0,
    pj: 0,
    g: 0,
    emp: 0,
    p: 0,
    gf: 0,
    gc: 0,
    dg: 0,
    playoffBonus: 0
  }));

  function fila(id) {
    return tabla.find(t => t.id === id);
  }

  data.jornadas.forEach(j => {
    j.partidos.forEach(m => {
      if (m.gl === null || m.gv === null || m.gl === "" || m.gv === "") return;

      const local = fila(m.local);
      const visita = fila(m.visita);
      if (!local || !visita) return;

      const gl = Number(m.gl);
      const gv = Number(m.gv);

      local.pj++;
      visita.pj++;

      local.gf += gl;
      local.gc += gv;

      visita.gf += gv;
      visita.gc += gl;

      if (gl > gv) {
        local.g++;
        visita.p++;
        local.pts += 3;
      } else if (gl < gv) {
        visita.g++;
        local.p++;
        visita.pts += 3;
      } else {
        local.emp++;
        visita.emp++;
        local.pts++;
        visita.pts++;
      }
    });
  });

  const playoffsActivos = data.configuracion?.playoffsActivos === true;
  const bonusPorRonda = {
    octavos: 4,
    cuartos: 8,
    semis: 14,
    final: 24
  };

  if (playoffsActivos && data.playoffs) {
    Object.entries(data.playoffs).forEach(([ronda, partidos]) => {
      partidos.forEach(m => {
        if (!m.local || !m.visita || m.gl === null || m.gv === null || m.gl === "" || m.gv === "") return;

        const local = fila(m.local);
        const visita = fila(m.visita);
        if (!local || !visita) return;

        const gl = Number(m.gl);
        const gv = Number(m.gv);

        if (gl > gv) local.playoffBonus += bonusPorRonda[ronda] || 0;
        if (gv > gl) visita.playoffBonus += bonusPorRonda[ronda] || 0;
      });
    });
  }

  tabla.forEach(t => {
    t.dg = t.gf - t.gc;
  });

  return tabla.sort((a, b) =>
    b.pts - a.pts ||
    b.dg - a.dg ||
    b.gf - a.gf ||
    Number(b.ratingEquipo || 0) - Number(a.ratingEquipo || 0) ||
    a.equipo.localeCompare(b.equipo)
  );
}

function calcularProbabilidades(tabla) {
  if (tabla.length === 0) return [];

  const maxPJ = Math.max(...tabla.map(t => t.pj), 1);

  const scores = tabla.map(t => {
    const rating = Number(t.ratingEquipo || 75);
    const fuerzaEquipo = Math.max(1, (rating - 50) * 1.6);
    const rendimiento = t.pj === 0 ? 0 : (t.pts / (t.pj * 3)) * 45;
    const diferencia = Math.max(-10, t.dg) * 3;
    const ataque = t.gf * 1.8;
    const bonusPartidosPendientes = (maxPJ - t.pj) * 1.5;
    const bonusPlayoffs = t.playoffBonus || 0;

    return {
      ...t,
      scoreProb: Math.max(
        5,
        fuerzaEquipo +
        rendimiento +
        diferencia +
        ataque +
        bonusPartidosPendientes +
        bonusPlayoffs
      )
    };
  });

  const total = scores.reduce((sum, t) => sum + t.scoreProb, 0);

  return scores
    .map(t => ({
      ...t,
      prob: Math.round((t.scoreProb / total) * 100)
    }))
    .sort((a, b) => b.prob - a.prob);
}

function renderPlayoffs(data) {
  const playoffsBox = document.getElementById("playoffs");
  const panel = document.getElementById("playoffsPanel");

  if (!playoffsBox || !panel) return;

  const playoffsActivos = data.configuracion?.playoffsActivos === true;

  if (!playoffsActivos) {
    panel.style.display = "none";
    return;
  }

  panel.style.display = "block";

  const nombresRonda = {
    octavos: "Octavos",
    cuartos: "Cuartos",
    semis: "Semifinal",
    final: "Final"
  };

  let hayDatos = false;
  playoffsBox.innerHTML = "";

  Object.entries(data.playoffs).forEach(([ronda, partidos]) => {
    const partidosActivos = partidos.filter(m => m.local && m.visita);

    if (partidosActivos.length === 0) return;

    hayDatos = true;

    let html = `<div class="playoff-round"><h3>${nombresRonda[ronda] || ronda}</h3>`;

    partidosActivos.forEach(m => {
      const local = nombreEquipo(data, m.local);
      const visita = nombreEquipo(data, m.visita);
      const score = `${m.gl ?? "-"} - ${m.gv ?? "-"}`;

      html += `
        <div class="playoff-match">
          <div class="team">
            <img src="${local?.equipoImg || ""}" onerror="this.style.display='none'">
            ${nombreVisible(local?.equipo || "", "Por definir")}
          </div>

          <div class="score">${score}</div>

          <div class="team">
            <img src="${visita?.equipoImg || ""}" onerror="this.style.display='none'">
            ${nombreVisible(visita?.equipo || "", "Por definir")}
          </div>
        </div>
      `;
    });

    html += `</div>`;
    playoffsBox.innerHTML += html;
  });

  if (!hayDatos) {
    playoffsBox.innerHTML = `
      <div class="empty-playoffs">
        Playoffs activados, pero todavía no agregaste partidos.
      </div>
    `;
  }
}

function renderPagina(modo) {
  const allData = obtenerData();
  const data = allData[modo];

  const jornadasBox = document.getElementById("jornadas");
  const partidosBox = document.getElementById("partidos");
  const tablaBox = document.getElementById("tabla");
  const probBox = document.getElementById("probabilidades");

  function renderPartidos(index) {
    document.querySelectorAll(".jornadas button").forEach((b, i) => {
      b.classList.toggle("active", i === index);
    });

    partidosBox.innerHTML = "";

    if (!data.jornadas[index] || data.jornadas[index].partidos.length === 0) {
      partidosBox.innerHTML = `
        <div class="empty-playoffs">
          Todavía no agregaste partidos para esta jornada.
        </div>
      `;
      return;
    }

    data.jornadas[index].partidos.forEach(m => {
      const local = nombreEquipo(data, m.local);
      const visita = nombreEquipo(data, m.visita);
      const score = `${m.gl ?? "-"} - ${m.gv ?? "-"}`;

      partidosBox.innerHTML += `
        <div class="match">
          <div class="team">
            <img src="${local?.equipoImg || ""}" onerror="this.style.display='none'">
            ${nombreVisible(local?.equipo || "", "Equipo")}
          </div>

          <div class="score">${score}</div>

          <div class="team">
            <img src="${visita?.equipoImg || ""}" onerror="this.style.display='none'">
            ${nombreVisible(visita?.equipo || "", "Equipo")}
          </div>
        </div>
      `;
    });
  }

  jornadasBox.innerHTML = "";

  data.jornadas.forEach((j, i) => {
    const btn = document.createElement("button");
    btn.textContent = j.nombre;
    btn.onclick = () => renderPartidos(i);
    jornadasBox.appendChild(btn);
  });

  const tabla = calcularTabla(data);

  tablaBox.innerHTML = "";

  if (tabla.length === 0) {
    tablaBox.innerHTML = `
      <tr>
        <td colspan="12">Todavía no agregaste participantes.</td>
      </tr>
    `;
  }

  tabla.forEach((t, i) => {
    tablaBox.innerHTML += `
      <tr>
        <td data-label="#">
          <span class="pos">${i + 1}</span>
        </td>

        <td data-label="Jugador">
          <div class="player-cell">
            <img src="${t.jugadorImg || ""}" onerror="this.style.display='none'">
            ${nombreVisible(t.jugador, "Jugador " + (i + 1))}
          </div>
        </td>

        <td data-label="${modo === "clubes" ? "Club" : "País"}">
          <div class="team-cell">
            <img src="${t.equipoImg || ""}" onerror="this.style.display='none'">
            ${nombreVisible(t.equipo, modo === "clubes" ? "Club por definir" : "País por definir")}
          </div>
        </td>

        <td data-label="PTS">
          <strong>${t.pts}</strong>
        </td>

        <td data-label="PJ">${t.pj}</td>
        <td data-label="G">${t.g}</td>
        <td data-label="E">${t.emp}</td>
        <td data-label="P">${t.p}</td>
        <td data-label="GF">${t.gf}</td>
        <td data-label="GC">${t.gc}</td>
        <td data-label="DG">${t.dg}</td>
        <td data-label="OVR">${t.ratingEquipo || "-"}</td>
      </tr>
    `;
  });

  renderPlayoffs(data);

  const probs = calcularProbabilidades(tabla);

  probBox.innerHTML = "";

  if (probs.length === 0) {
    probBox.innerHTML = `
      <div class="empty-playoffs">
        Agrega participantes para calcular probabilidades.
      </div>
    `;
  }

  probs.forEach(t => {
    probBox.innerHTML += `
      <div class="prob-card">
        <div class="prob-top">
          <span class="prob-name">
            ${nombreVisible(t.jugador, "Jugador")} - 
            ${nombreVisible(t.equipo, modo === "clubes" ? "Club por definir" : "País por definir")}
          </span>
          <strong>${t.prob}%</strong>
        </div>

        <div class="bar">
          <span style="width:${t.prob}%"></span>
        </div>
      </div>
    `;
  });

  renderPartidos(0);
}
