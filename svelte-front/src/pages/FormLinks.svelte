<script>
    // Aquí se incluiría la lógica para un formulario de enlaces
    import { fetchLinkSend, fetchTag } from "../api";
    import { push } from 'svelte-spa-router';
    import { onMount } from "svelte";

    let tags = [];
    let dataLink = {
        titulo: '',
        url: '',
        etiquetas: { nombre: '' },
        descripcion: ''
    };

    // Cargar etiquetas cuando el componente se monta
    onMount(async () => {
        try {
            const response = await fetchTag();
            if (response.etiquetas) {
                tags = [...response.etiquetas]; // Copia el array para disparar reactividad
                console.log('Etiquetas cargadas:', tags);
            }
        } catch (error) {
            console.error('Error al cargar las etiquetas:', error);
        }
    });

    // Función para manejar el envío del formulario
    let handleSummit = async () => {
        let dataSend = await fetchLinkSend(dataLink);
        console.log(dataSend);
        alert('Enlace Creado exitosamente')
        setTimeout(() => {
                push('/')
            }, 1000);
        
    };
</script>

<main>
    <fieldset >Formulario
        <form on:submit|preventDefault={handleSummit}>
            <label for="titulo">Titulo</label>
            <input type="text" id="titulo" placeholder="Ej: Google" bind:value={dataLink.titulo} required><br>

            <label for="url">Url</label>
            <input type="url" id="url" placeholder="Ej: https://www.google.com" bind:value={dataLink.url} required><br>

            <label for="descripcion">Descripcion</label>
            <textarea id="descripcion" placeholder="Ej: Pagina de busqueda google" bind:value={dataLink.descripcion} required></textarea><br>

            <label for="etiqueta"> Etiqueta</label>
                <select name="etiqueta" id="etiqueta" bind:value={dataLink.etiquetas.nombre}>
                    {#each tags as tag}
                        <option value={tag.nombre}>{tag.nombre}</option>
                    {/each}
                </select>
           <br>

            <button type="submit">Crear enlace</button><br>
        </form>
    </fieldset>
</main>
