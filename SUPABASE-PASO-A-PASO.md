# Supabase y admin privado

## Admin oculto

El botón `Editar desde admin` ya fue quitado del index.

Para entrar:
- Local: `admin.html`
- En Vercel: `tuweb.vercel.app/admin.html`

Luego con Supabase se agrega login para que solo tú puedas editar.

## Activar/desactivar playoff

Entra a `admin.html`.

1. Elige Clubes o Países.
2. Marca o desmarca `Activar playoffs`.
3. Guarda participantes o eliminatorias.

Si está desactivado:
- tus amigos no ven playoffs.
- las probabilidades no usan playoffs.

Si está activado:
- aparece la sección.
- los resultados de eliminatorias suman bonus a probabilidades.

## Probabilidades FIFA 26

Ahora se calculan con:

- OVR/rating del equipo escogido.
- puntos.
- diferencia de goles.
- goles a favor.
- bonus de playoffs si están activos.

## ¿API de IA para equipos?

Mi consejo: no al inicio.

Lo mejor:
- tú pones manualmente el OVR del equipo.
- es rápido.
- no dependes de una API.
- funciona aunque alguien escoja River Plate, Alianza, Perú, etc.

Más adelante podemos crear una tabla `ratings_equipos` en Supabase para que escribas el equipo y te sugiera el rating si ya existe.

## Pasos Supabase

1. Crea proyecto en Supabase.
2. Ve a SQL Editor.
3. Ejecuta `supabase-schema.sql`.
4. Sube el proyecto a GitHub.
5. Conecta GitHub con Vercel.
6. Luego cambiamos `localStorage` por consultas a Supabase.
