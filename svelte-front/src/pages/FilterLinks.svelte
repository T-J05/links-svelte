<script>
    import { location } from "svelte-spa-router";
    import { onMount } from "svelte";
    import { fetchLinkTag } from "../api";
    // Variable reactiva para el ID
    let id = null;
    let enlaces = [];
    // Reacciona a cambios en $location
   
    $: {
      if ($location) {
        const parts = $location.split("/");
        id = parts[2] || null;
  
        if (!id) {
          console.error("ID no encontrado en la URL.");
        } else {
            onMount(async () => {
        try {
        const response = await fetchLinkTag(id);
        if (response.enlaces) {
            enlaces = [...response.enlaces]; // Copia el array para disparar reactividad
            console.log('Enlaces cargadas:', enlaces);
         }
        } 
        catch (error) {
        console.error('Error al cargar las enlaces:', error);
  }
});
        }
      }
    }

  </script>
  
  <main>
    <h1>Enlaces filtrados por el id: {id}</h1>
   <ul>
        {#each enlaces as enlace}
          <li>
            <h2>{enlace.titulo}</h2>
            <p><strong>URL:</strong> <a href={enlace.url} target="_blank">{enlace.url}</a></p>
            <p><strong>Etiquetas:</strong> 
              {#each enlace.etiquetas as etiqueta}
                <span>{etiqueta.nombre}</span>
              {/each}
            </p>
          </li>
          <hr />
        {/each}
      </ul>
  </main>
  