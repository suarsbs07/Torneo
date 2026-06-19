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

  const total = tabla.length;

  return tabla.map((t, i) => ({
    ...t,
    prob: Math.max(5, Math.round(((total - i) / total) * 100))
  }));
}

function textoPlayoff(data, codigo, goles) {
  if (!codigo) return "Por definir";

  const equipo = nombreEquipo(data, codigo);
  const nombre = equipo
    ? nombreVisible(equipo.equipo, codigo)
    : codigo;

  if (goles === null || goles === undefined || goles === "") {
    return nombre;
  }

  return `${nombre} (${goles})`;
}

function renderPlayoffs(data) {
  const semi1 = data.playoffs?.semis?.[0];
  const semi2 = data.playoffs?.semis?.[1];
  const final = data.playoffs?.final?.[0];

  if (semi1) {
    document.getElementById("semi1Local").textContent = textoPlayoff(data, semi1.local, semi1.gl);
    document.getElementById("semi1Visita").textContent = textoPlayoff(data, semi1.visita, semi1.gv);
  }

  if (semi2) {
    document.getElementById("semi2Local").textContent = textoPlayoff(data, semi2.local, semi2.gl);
    document.getElementById("semi2Visita").textContent = textoPlayoff(data, semi2.visita, semi2.gv);
  }

  if (final) {
    document.getElementById("finalLocal").textContent = textoPlayoff(data, final.local, final.gl);
    document.getElementById("finalVisita").textContent = textoPlayoff(data, final.visita, final.gv);
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

  renderTablaGrupo(tabla, "A", "tablaGrupoA", modo);
  renderTablaGrupo(tabla, "B", "tablaGrupoB", modo);

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
        <td data-label="#"><span class="pos">${i + 1}</span></td>

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

        <td data-label="PTS"><strong>${t.pts}</strong></td>
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
  renderFavoritos(probs);
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

function renderTablaGrupo(tabla, grupo, idTabla, modo) {
  const box = document.getElementById(idTabla);
  if (!box) return;

  const equiposGrupo = tabla.filter(t => t.grupo === grupo);

  box.innerHTML = "";

  if (equiposGrupo.length === 0) {
    box.innerHTML = `
      <tr>
        <td colspan="11">Todavía no hay equipos en el Grupo ${grupo}.</td>
      </tr>
    `;
    return;
  }

  equiposGrupo.forEach((t, i) => {
    const clasificado = i < 2 ? "clasificado" : "";

    box.innerHTML += `
      <tr class="${clasificado}">
        <td data-label="#"><span class="pos">${i + 1}</span></td>

        <td data-label="Jugador">
          <div class="player-cell">
            <img src="${t.jugadorImg || ""}" onerror="this.style.display='none'">
            ${nombreVisible(t.jugador, "Jugador")}
          </div>
        </td>

        <td data-label="${modo === "clubes" ? "Club" : "País"}">
          <div class="team-cell">
            <img src="${t.equipoImg || ""}" onerror="this.style.display='none'">
            ${nombreVisible(t.equipo, modo === "clubes" ? "Club por definir" : "País por definir")}
          </div>
        </td>

        <td data-label="PTS"><strong>${t.pts}</strong></td>
        <td data-label="PJ">${t.pj}</td>
        <td data-label="G">${t.g}</td>
        <td data-label="E">${t.emp}</td>
        <td data-label="P">${t.p}</td>
        <td data-label="GF">${t.gf}</td>
        <td data-label="GC">${t.gc}</td>
        <td data-label="DG">${t.dg}</td>
      </tr>
    `;
  });
}

function renderFavoritos(lista) {
  const box = document.getElementById("favoritosContainer");
  if (!box) return;

  box.innerHTML = "";

  const top5 = [...lista]
    .sort((a,b) => b.prob - a.prob)
    .slice(0,5);

  top5.forEach((t, i) => {

    let emoji = "⭐";

    if(i === 0) emoji = "🥇";
    if(i === 1) emoji = "🥈";
    if(i === 2) emoji = "🥉";

    box.innerHTML += `
      <div class="favorito-card">

        <div class="favorito-top">
          <span class="favorito-nombre">
            ${emoji}
            ${nombreVisible(t.equipo, "Por definir")}
          </span>

          <span class="favorito-prob">
            ${t.prob}%
          </span>
        </div>

        <div class="favorito-barra">
          <span style="width:${t.prob}%"></span>
        </div>

      </div>
    `;
  });
}
