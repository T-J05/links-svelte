<script>
  import Router from 'svelte-spa-router';
  import { routes } from './routes.js';
  import Header from './Components/Header.svelte';

 
</script>

<main>
  <Header />
  <Router {routes} />
</main>
