<script>
    import { fetchLink } from "../api";
    import  { push }  from 'svelte-spa-router';
    import { onMount } from "svelte";
    let enlaces = [];

    onMount(async () => {
  try {
    const response = await fetchLink();
    if (response.enlaces) {
      enlaces = [...response.enlaces]; // Copia el array para disparar reactividad
      console.log('Enlaces cargadas:', enlaces);
    }
  } catch (error) {
    console.error('Error al cargar las enlaces:', error);
  }
});
  
  </script>
  
  <main>
    {#if enlaces.length > 0 }
    <h3>Enlaces</h3>
    
        {#each enlaces as enlace}
        <article>
            <h4>{enlace.titulo}</h4>
            <p>Etiqueta: { enlace.etiquetas[0]?.etiqueta.nombre || 'Sin etiqueta'}</p>
            <a href={enlace.url} target="_blank" rel="{enlace.titulo}">URL</a>
            <button on:click={() => push(`/details/${enlace.id}`)}>
                Detalles
                    </button><br>
        </article>
        {/each}
    
    {/if}
    
    
  </main>
  