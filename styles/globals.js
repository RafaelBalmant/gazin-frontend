import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`

  :root {
    --background: #eae6fd;
  }
  .swal2-container {
    z-index: 20000 !important;
  }
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  html {
     @media (max-width: 1080px){
       font-size: 93.75%;
     }

     @media (max-width: 720px){
       font-size: 87.5%;
     }
   }

   body, input, textarea, button {
    font-family: 'Poppins', sans-serif;
    font-weight: 400;
  }

  h1, h2, h3, h4, h5, h6, strong {
    font-weight: 600;
  }

   body {
     background-color: var(--background);
   }

   button {
     cursor: pointer;
   }

`
