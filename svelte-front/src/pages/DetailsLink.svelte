<script>
  import { onMount } from "svelte";
  import { fetchLinkDetails, fetchLinkVote, addComentario, fetchLinkComment } from "../api";
  import { location } from "svelte-spa-router";

  let enlace = null; // Detalles del enlace
  let comentarios = []; // Lista de comentarios
  let nuevoComentario = ''; // Comentario nuevo a enviar
  let error = null; // Mensaje de error
  let id = null; // ID del enlace extraído de la URL

  onMount(async () => {
    try {
      // Obtener ID de la URL
      const parts = $location.split("/");
      id = parts[2] || null;

      if (!id) throw new Error("ID no encontrado en la URL.");

      // Cargar los detalles del enlace y sus comentarios
      await cargarDatos(id);
    } catch (err) {
      error = err.message || "Error desconocido al cargar los datos.";
      console.error(error);
    }
  });

  const cargarDatos = async (id) => {
    try {
      const enlaceResponse = await fetchLinkDetails(id);
      const comentariosResponse = await fetchLinkComment(id);
      console.log("bh",enlaceResponse)
      console.log("d",comentariosResponse)
      if (enlaceResponse.enlace) enlace = enlaceResponse.enlace;
      if (comentariosResponse.comentarios) comentarios = comentariosResponse.comentarios;
      console.log("hasoma",comentarios)
    } catch (err) {
      throw new Error("Error al cargar los datos del enlace y comentarios.");
    }
  };

  const votar = async () => {
    try {
      await fetchLinkVote(enlace.id); // Llama a la API para votar
      enlace.votos += 1; // Incrementa los votos en el frontend
    } catch (err) {
      console.error("Error al votar:", err);
    }
  };

  const agregarComentario = async () => {
    if (!nuevoComentario.trim()) return; // Evitar comentarios vacíos

    try {
      const comentarioEnviado = await addComentario(enlace.id, nuevoComentario);
      console.log({kji:comentarioEnviado})
      comentarios = [comentarioEnviado.comentario, ...comentarios]; // Agregar al principio
      nuevoComentario = ''; // Limpiar el campo de texto
    } catch (err) {
      console.error("Error al agregar el comentario:", err);
    }
  };
</script>

<main>
  {#if error}
    <p class="error">{error}</p>
  {:else if enlace}
    <h1>Detalles del Enlace</h1>
    <h2>{enlace.titulo}</h2>
    <p><strong>URL:</strong> <a href={enlace.url} target="_blank">{enlace.url}</a></p>
    <p><strong>Descripción:</strong> {enlace.descripcion}</p>
    <p><strong>Votos:</strong> {enlace.votos}</p>
    <p><strong>Fecha de creación:</strong> {new Date(enlace.fechaCreacion).toLocaleDateString()}</p>

    <button on:click={votar}>Votar</button>

    <h3>Etiquetas</h3>
    {#if enlace.etiquetas.length > 0}
      <ul>
        <li>{enlace.etiquetas[0]?.etiqueta?.nombre || "Sin etiquetas"}</li>
      </ul>
    {:else}
      <p>Este enlace no tiene etiquetas.</p>
    {/if}

    <section>
      <h3>Agregar Comentario</h3>
      <textarea bind:value={nuevoComentario} placeholder="Escribe tu comentario..." required></textarea>
      <button on:click={agregarComentario}>Comentar</button>
    </section>

    <h3>Comentarios</h3>
    {console.log("fakin",comentarios)}
    {#if comentarios.length > 0}
      <ul>
        {console.log("fakin",comentarios)}
        {#each comentarios as comentario}
          <li>
            <p>{comentario.contenido}</p>
          </li>
        {/each}
      </ul>
    {:else}
      <p>No hay comentarios en este enlace.</p>
    {/if}
  {:else}
    <p>Cargando los detalles del enlace...</p>
  {/if}
</main>
