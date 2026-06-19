let data = obtenerData();

const modoSelect = document.getElementById("modo");
const jornadaSelect = document.getElementById("jornada");
const editor = document.getElementById("editorPartidos");
const guardarBtn = document.getElementById("guardar");
const resetBtn = document.getElementById("reset");

const playoffsActivos = document.getElementById("playoffsActivos");
const editorEquipos = document.getElementById("editorEquipos");
const guardarEquiposBtn = document.getElementById("guardarEquipos");

const rondaSelect = document.getElementById("ronda");
const editorPlayoffs = document.getElementById("editorPlayoffs");
const guardarPlayoffsBtn = document.getElementById("guardarPlayoffs");

function equipoNombre(modo, id){
  const equipo = data[modo].equipos.find(e=>e.id===id);
  if(!equipo) return id || "Vacío";
  return equipo.equipo.trim() !== "" ? equipo.equipo : equipo.id;
}

function opcionesEquipos(modo, seleccionado){
  let html = `<option value="">Sin equipo</option>`;
  data[modo].equipos.forEach(e=>{
    const nombre = e.equipo.trim() !== "" ? e.equipo : e.id;
    const jugador = e.jugador.trim() !== "" ? e.jugador : "sin jugador";
    html += `<option value="${e.id}" ${e.id === seleccionado ? "selected" : ""}>${nombre} - ${jugador}</option>`;
  });
  return html;
}

function cargarTodo(){
  const modo = modoSelect.value;
  playoffsActivos.checked = data[modo].configuracion?.playoffsActivos === true;
  cargarJornadas();
  cargarEditorEquipos();
  cargarEditorPlayoffs();
}

function cargarJornadas(){
  const modo = modoSelect.value;
  jornadaSelect.innerHTML = "";

  data[modo].jornadas.forEach((j,i)=>{
    const op = document.createElement("option");
    op.value = i;
    op.textContent = j.nombre;
    jornadaSelect.appendChild(op);
  });

  cargarEditor();
}

function cargarEditorEquipos(){
  const modo = modoSelect.value;
  editorEquipos.innerHTML = "";

  data[modo].equipos.forEach((e,i)=>{
    editorEquipos.innerHTML += `
      <div class="team-edit">
        <h3>Participante ${i+1} (${e.id})</h3>

        <label>Nombre del jugador</label>
        <input value="${e.jugador}" data-eq="${i}" data-field="jugador" placeholder="Ejemplo: Stephano">

        <label>Equipo escogido</label>
        <input value="${e.equipo}" data-eq="${i}" data-field="equipo" placeholder="Ejemplo: River Plate">

        <div class="two-cols">
          <div>
            <label>Imagen jugador</label>
            <input value="${e.jugadorImg}" data-eq="${i}" data-field="jugadorImg" placeholder="img/jugadores/...">
          </div>
          <div>
            <label>OVR</label>
            <input type="number" min="1" max="99" value="${e.ratingEquipo || 75}" data-eq="${i}" data-field="ratingEquipo">
          </div>
        </div>

        <label>Imagen equipo</label>
        <input value="${e.equipoImg}" data-eq="${i}" data-field="equipoImg" placeholder="img/equipos/...">
      </div>
    `;
  });
}

function cargarEditor(){
  const modo = modoSelect.value;
  const jornadaIndex = Number(jornadaSelect.value);
  const jornada = data[modo].jornadas[jornadaIndex];

  editor.innerHTML = "";

  jornada.partidos.forEach((p,i)=>{
    editor.innerHTML += `
      <div class="match-edit">
        <strong>Partido ${i+1}</strong>
        <div class="match-grid">
          <span>${equipoNombre(modo,p.local)}</span>
          <input type="number" min="0" value="${p.gl ?? ""}" data-i="${i}" data-side="gl">
          <input type="number" min="0" value="${p.gv ?? ""}" data-i="${i}" data-side="gv">
          <span>${equipoNombre(modo,p.visita)}</span>
        </div>
      </div>
    `;
  });
}

function cargarEditorPlayoffs(){
  const modo = modoSelect.value;
  const ronda = rondaSelect.value;
  const partidos = data[modo].playoffs[ronda];

  editorPlayoffs.innerHTML = "";

  partidos.forEach((p,i)=>{
    editorPlayoffs.innerHTML += `
      <div class="match-edit">
        <strong>${ronda.toUpperCase()} ${i+1}</strong>

        <label>Local</label>
        <select class="team-select" data-po="${i}" data-field="local">${opcionesEquipos(modo, p.local)}</select>

        <label>Visita</label>
        <select class="team-select" data-po="${i}" data-field="visita">${opcionesEquipos(modo, p.visita)}</select>

        <div class="match-grid">
          <span>${equipoNombre(modo,p.local)}</span>
          <input type="number" min="0" value="${p.gl ?? ""}" data-po="${i}" data-field="gl">
          <input type="number" min="0" value="${p.gv ?? ""}" data-po="${i}" data-field="gv">
          <span>${equipoNombre(modo,p.visita)}</span>
        </div>
      </div>
    `;
  });
}

guardarEquiposBtn.onclick = () => {
  const modo = modoSelect.value;

  document.querySelectorAll("[data-eq]").forEach(input=>{
    const i = Number(input.dataset.eq);
    const field = input.dataset.field;
    data[modo].equipos[i][field] = field === "ratingEquipo" ? Number(input.value || 75) : input.value;
  });

  data[modo].configuracion.playoffsActivos = playoffsActivos.checked;

  guardarData(data);
  cargarTodo();
  alert("Participantes guardados ✅");
};

guardarBtn.onclick = () => {
  const modo = modoSelect.value;
  const jornadaIndex = Number(jornadaSelect.value);

  document.querySelectorAll("input[data-i]").forEach(input=>{
    const i = Number(input.dataset.i);
    const side = input.dataset.side;
    const value = input.value === "" ? null : Number(input.value);
    data[modo].jornadas[jornadaIndex].partidos[i][side] = value;
  });

  guardarData(data);
  alert("Resultados guardados ✅");
};

guardarPlayoffsBtn.onclick = () => {
  const modo = modoSelect.value;
  const ronda = rondaSelect.value;

  data[modo].configuracion.playoffsActivos = playoffsActivos.checked;

  document.querySelectorAll("[data-po]").forEach(input=>{
    const i = Number(input.dataset.po);
    const field = input.dataset.field;
    const value = input.value === "" ? null : (field === "gl" || field === "gv" ? Number(input.value) : input.value);
    data[modo].playoffs[ronda][i][field] = value;
  });

  guardarData(data);
  cargarEditorPlayoffs();
  alert("Eliminatorias guardadas ✅");
};

playoffsActivos.onchange = () => {
  const modo = modoSelect.value;
  data[modo].configuracion.playoffsActivos = playoffsActivos.checked;
  guardarData(data);
};

resetBtn.onclick = () => {
  resetData();
  data = obtenerData();
  cargarTodo();
  alert("Datos restaurados ✅");
};

modoSelect.onchange = cargarTodo;
jornadaSelect.onchange = cargarEditor;
rondaSelect.onchange = cargarEditorPlayoffs;

cargarTodo();
