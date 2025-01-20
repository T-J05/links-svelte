import  apiRoutes from "./apiRoutes";

export async function fetchTag() {
    const res = await fetch(apiRoutes.Etiquetas); // Cambia la URL a tu API
    const filters = await res.json();
    return filters;
  }
  
  export async function fetchLink() {
    const res = await fetch(apiRoutes.TODOS); // Cambia la URL a tu API
    const links = await res.json();
    return links;
  }
  
  
  export async function fetchLinkSend(data) {
    try {
      const response = await fetch(apiRoutes.createLink, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
  
      // Verifica si la respuesta es exitosa
      if (response.ok) {
        const result = await response.json();  // Si la respuesta es JSON
        console.log(result);  // Muestra la respuesta del servidor
        return result;
      } else {
        console.error('Error al enviar datos:', response.statusText);
        return null;
      }
    } catch (error) {
      console.error('Error al hacer la solicitud:', error);
      return null;
    }
  }
  

  export async function fetchLinkTag(idTag) {
    const res = await fetch(`${apiRoutes.getLinksByTag}${idTag}`); // Cambia la URL a tu API
    const links = await res.json();
    return links;
  }
  

  export async function fetchLinkDetails(id) {
    const res = await fetch(`${apiRoutes.getLinkById}${id}`); // Cambia la URL a tu API
    const links = await res.json();
    return links;
  }

  export async function fetchLinkVote(id) {
    const res = await fetch(`${apiRoutes.SumarVotos}${id}`,{
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
          },
        body: null,

    }); // Cambia la URL a tu API
    const links = await res.json();
    return links;
  }

  export async function fetchLinkComment(idTag) {
    const res = await fetch(`${apiRoutes.CommentsById}${idTag}`); // Cambia la URL a tu API
    const links = await res.json();
    return links;
  }

  export async function addComentario(id, data) {
    // Asegúrate de que data esté en formato de cadena
    if (typeof data !== 'string') {
        throw new Error('El comentario debe ser una cadena de texto');
    }

    let bodyy = {
        contenido: data,
        enlaceId: id
    };

    try {
        const res = await fetch(`${apiRoutes.Comentar}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bodyy)
        });

        if (res.ok) {
            const linkC = await res.json()
            console.log(linkC)
            return linkC;
        } else {
            throw new Error(`Error al agregar comentario: ${res.statusText}`);
        }
    } catch (error) {
        console.error('Error al enviar comentario:', error);
        return null;
    }
}


