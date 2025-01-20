<script>
    import { onMount } from "svelte";
    import { fetchLinkDetails, fetchLinkVote,addComentario } from "../api";
    import { location } from "svelte-spa-router";

    let enlace = null; // Aquí se almacenarán los detalles del enlace
    let error = null;
    let id = null;
    let nuevoComentario = '';
    let comentarios = [];
    $: {
      if ($location) {
        const parts = $location.split("/");
        id = parts[2] || null;
  
        if (!id) {
          console.error("ID no encontrado en la URL.");
        } else {
            onMount(async () => {
        try {
        const response = await fetchLinkDetails(id);
        if (response.enlace) {
            enlace = response.enlace; // Copia el array para disparar reactividad
            console.log('Enlaces cargadas details:', enlace);
         }
        } 
        catch (error) {
        console.error('Error al cargar las enlaces:', error);
  }
});
        }
      }
    }
   
  
    // Función para votar (incremetar votos)
    let votar = async () => {
      try {
        // Aquí llamas a la función que actualizará los votos en tu API
        console.log(enlace.id,"antes de entrar")
        await actualizarVotosEnAPI(enlace.id); // Reemplaza con tu función de API
        enlace.votos += 1; // Incrementa el número de votos en el frontend
      } catch (err) {
        console.error("Error al votar:", err);
      }
    }
  
    // Espacio reservado para la función que actualiza los votos en la API
    const actualizarVotosEnAPI = async (id) => {
      let fech = await fetchLinkVote(id)
      console.log(fech) 
    }

    let agregarComentario = async () => {
    if (!nuevoComentario.trim()) return; // Evitar comentarios vacíos

    try {
      const comentarioEnviado = await addComentario(enlace.id, nuevoComentario); // Llama a la API para agregar el comentario
      console.log(comentarioEnviado,'sueno',nuevoComentario)

      comentarios = [...comentarios, nuevoComentario] // Agrega el comentario a la lista sin recargar
     
      nuevoComentario = ''; // Limpia el campo de entrada
    } catch (error) {
      console.error("Error al agregar comentario:", error);
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
      {console.log(enlace.etiquetas[0].etiqueta.nombre,"cd")}
        <ul>
            <p>{enlace.etiquetas[0].etiqueta.nombre || 'Sin etiquetas'  }</p>
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
      {#if enlace.comentarios.length > 0}
        <ul>
          {#each enlace.comentarios as comentario}
            <li>
              <p>{comentario.contenido}</p>
              <p><small><strong>Fecha:</strong> {new Date(comentario.fechaComentario).toLocaleDateString()}</small></p>
            </li>
          {/each}
        </ul>
      {:else}
        <p>No hay comentarios en este enlace.</p>
      {/if}
      
    {:else}
      <p>Cargando los detalles del enlace...</p>
      <!-- Formulario para agregar comentario -->
     
    {/if}
      
  </main>
  