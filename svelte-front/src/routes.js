import Home from './pages/Home.svelte'
import FormLinks from './pages/FormLinks.svelte'
import FilterLinks from './pages/FilterLinks.svelte'
import  Details from './pages/DetailsLink.svelte'

export const routes ={
  '/': Home,
  '/addLink': FormLinks,
  '/filter/:id': FilterLinks,
  '/details/:id': Details
};