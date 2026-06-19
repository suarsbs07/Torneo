# Torneo de Amigos FIFA 26

Incluye:

- Index con premios.
- Diseño móvil.
- Clubes y países.
- Admin oculto del index.
- 7 jornadas.
- Playoffs activables/desactivables.
- Probabilidades según rating FIFA + resultados.
- Sin datos reales de ejemplo.

## Importante

Por ahora el admin guarda en el navegador con localStorage.
El siguiente paso es conectar Supabase para editar desde tu móvil y que todos vean los cambios.


## Actualización visual

Ahora la tabla y el dashboard se muestran aunque todavía no hayas llenado jugadores ni equipos.
Aparecen como plantilla con:
- Jugador 1, Jugador 2...
- Equipo por definir
- OVR base
- probabilidades iniciales


## Corrección móvil

Se agregó adaptación móvil real en `clubes.html` y `paises.html`:
- navegación superior móvil por secciones,
- partidos más compactos,
- tabla con scroll horizontal claro,
- dashboard más legible en celular,
- playoffs adaptados para pantalla chica.
