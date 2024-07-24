"use strict";
import { match } from "./util.js"; // Importa la función match de util.js

export default class Router extends HTMLElement {
  /**
   * El router busca una etiqueta `my-outlet` para actualizar las vistas
   * en cambios del historial.
   * Ejemplo:
   *
   * ```html
   * <my-router>
   *   <my-outlet>
   *     *   </my-outlet>
   * </my-router>
   * ```
   */
  get outlet() {
    return this.querySelector("my-outlet"); // Obtiene el elemento `my-outlet`
  }

  get root() {
    return window.location.pathname; // Obtiene la ruta actual
  }

  /**
   * Obtiene todas las rutas del elemento hijo directo `my-route`.
   * El título del documento se puede actualizar proporcionando un atributo
   * `title` a la etiqueta `my-route`
   */
  get routes() {
    return Array.from(this.querySelectorAll("my-route")) // Convierte en arreglo
      .filter((node) => node.parentNode === this) // Filtra por hijos directos
      .map((r) => ({
        path: r.getAttribute("path"), // Obtiene el atributo `path`
        // Opcional: título del documento
        title: r.getAttribute("title"),
        // Nombre del componente web que se debe mostrar
        component: r.getAttribute("component"),
        // Ruta del bundle si se carga el componente de forma perezosa
        resourceUrl: r.getAttribute("resourceUrl"),
      }));
  }

  connectedCallback() {
    this.updateLinks(); // Actualiza los enlaces
    this.navigate(window.location.pathname); // Navega a la ruta inicial

    window.addEventListener("popstate", this._handlePopstate); // Escucha cambios de historial
  }

  disconnectedCallback() {
    window.removeEventListener("popstate", this._handlePopstate); // Deja de escuchar cambios
  }

  _handlePopstate = () => {
    this.navigate(window.location.pathname); // Navega en cambios de historial
  };

  updateLinks() {
    /**
     * Busca todos los elementos `a` hijos con el atributo `route` para actualizar el
     * `href` con el valor del atributo `route`.
     *
     * Agrega un manejador de eventos `click` personalizado para evitar el comportamiento
     * predeterminado y navegar a la ruta registrada al hacer clic.
     */
    this.querySelectorAll("a[route]").forEach((link) => {
      const target = link.getAttribute("route"); // Obtiene el valor del atributo `route`
      link.setAttribute("href", target); // Actualiza el `href` del enlace
      link.onclick = (e) => {
        e.preventDefault(); // Evita el comportamiento predeterminado
        this.navigate(target); // Navega a la ruta específica
      };
    });
  }

  navigate(url) {
    // Navega a una URL específica
    const matchedRoute = match(this.routes, url); // Busca la ruta coincidente con la URL
    if (matchedRoute !== null) {
      // Si se encuentra una ruta coincidente:
      this.activeRoute = matchedRoute; // Almacena la ruta activa
      window.history.pushState(null, null, url); // Actualiza el historial del navegador (pushState)
      this.update(); // Actualiza el DOM en base a la ruta activa
    }
  }

  /**
   * Actualiza el DOM bajo el elemento `outlet` basado en la ruta seleccionada activa.
   */
  update() {
    // Desestructura la información de la ruta activa
    const {
      component, // Nombre del componente a cargar
      title, // Título opcional para la página
      params = {}, // Objeto de parámetros dinámicos de la ruta (vacío por defecto)
      resourceUrl = null, // Ruta para carga perezosa del componente (null por defecto)
    } = this.activeRoute;

    if (component) {
      // Si hay un componente definido en la ruta:

      // Limpiar el elemento `outlet`
      while (this.outlet.firstChild) {
        this.outlet.removeChild(this.outlet.firstChild); // Elimina todos los hijos existentes
      }

      const updateView = () => {
        const view = document.createElement(component); // Crea un elemento del componente

        // Actualizar el título del documento
        document.title = title || document.title; // Usa el título de la ruta o el título actual

        // Recorrer los parámetros de la ruta
        for (let key in params) {
          if (key !== "*") {
            // Excluye el parámetro especial "*"
            view.setAttribute(key, params[key]); // Asignar parámetros como atributos al elemento
          }
        }

        // Agregar el elemento del componente al `outlet`
        this.outlet.appendChild(view);

        // Actualizar los enlaces de la ruta después de actualizar el DOM
        this.updateLinks();
      };

      if (resourceUrl !== null) {
        // Si se usa carga perezosa:
        import(resourceUrl).then(updateView); // Carga el componente de forma dinámica y luego ejecuta updateView
      } else {
        // Si el componente está cargado estáticamente:
        updateView(); // Ejecuta updateView directamente
      }
    }
  }

  go(url) {
    // Función auxiliar para llamar a navigate
    this.navigate(url); // Navega a la URL especificada
  }

  back() {
    window.history.go(-1);
  }
}

customElements.define("my-router", Router);
