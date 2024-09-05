export const buttonStyle = `

  /* Estilos comunes */
  button {
    position: relative;
    display: block;
    margin: 30px auto;
    padding: 0;
    overflow: hidden;
    border-width: 0;
    outline: none;
    border-radius:   
 0.2rem;
    box-shadow: 0 1px 4px rgba(0, 0, 0, .6);
    color: #ecf0f1;
    transition: background-color .5s;
  }

  button > * {
    position: relative;
  }

  button span {
    display: block;
    padding: 12px 24px;
    transition: background-color .5s;
  }

  button:hover > span {
    background-color: rgba(0,0,0,.2); /* Color azul */
  }

  button:before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    display: block;
    width: 0;
    padding-top: 0;
    border-radius: 100%;
    background-color: rgba(250,   
 250, 250, 0.3);
    transform: translate(-50%, -50%);
  }

  button:active:before {
    width: 120%;
    padding-top: 120%;
    transition: width .2s ease-out, padding-top .2s ease-out;   

  }

  /* Estilos específicos */
  .btn {
    background-color: var(--primary-color);
  }

  .btn-outlined {
    background-color: inherit;
    color: var(--primary-color);
    border: 0.14em solid var(--primary-color);
    box-shadow: none;
  }

  .btn-outlined:hover > span {
    background-color: rgba(0,0,0,.1); /* Color azul */
  }

  .btn-outlined::before {
    background-color: rgba(0, 0, 0, 0.13);
  }

  .btn-icon {
    aspect-ratio: 1/1;
    border-radius: 50%;
  }

  .btn-icon span {
    padding: 12px 12px;
    border-radius: 50%;
  }

`;
