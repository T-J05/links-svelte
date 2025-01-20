<script>
    
    import { writable } from 'svelte/store';
    import { onMount } from 'svelte';
    import { location } from 'svelte-spa-router';  // Importa location de svelte-spa-router
    import { fetchTag } from '../api';  // Importamos la función que obtiene los filtros
    import  { push }  from 'svelte-spa-router';
    let filters = [];
    let showNavForHomeAndFilterLinks = writable(false);
  
    // Usamos onMount para obtener los filtros cuando el componente se monte
    onMount(async () => {
  try {
    const response = await fetchTag();
    if (response.etiquetas) {
      filters = [...response.etiquetas]; // Copia el array para disparar reactividad
      console.log('Etiquetas cargadas:', filters);
    }
  } catch (error) {
    console.error('Error al cargar las etiquetas:', error);
  }
});
  
    // Usamos un bloque reactivo para manejar la visibilidad según la ruta actual
    $: {
      // Verificamos que $location y $location.pathname existan
      if ($location && $location.includes('/')) {  // Verifica si la URL contiene "/"
        const pathname = new URL($location, window.location.href).pathname;
        console.log({path:pathname})
        if (pathname === '/' || pathname.startsWith('/filter/:id')) {
          showNavForHomeAndFilterLinks.set(true);
        } else {
          showNavForHomeAndFilterLinks.set(false);
        }
      } else {
        showNavForHomeAndFilterLinks.set(false);
      }
    }
  </script>
  
  
  <header>
    <h1>AlLinks</h1>
  
    <!-- Primer nav: visible en todas las rutas -->
    <nav>
      <button on:click={() => push('/')}>Inicio</button>
      <button on:click={() => push('/addLink')}>Agregar Enlace</button>
    </nav>
  
    <!-- Segundo nav: solo visible en Home y FilterLinks -->
    {#if $showNavForHomeAndFilterLinks}
    {console.log('Renderizando filtros', filters)}
        <h3>Etiquetas</h3>
        <nav>
            {#each filters as etiqueta}
                <button on:click={() => push(`/filter/${etiqueta.id}`)}>
            {etiqueta.nombre}
                </button><br>
            {/each}
      </nav>
    {/if}
  </header>
  