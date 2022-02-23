import styled from 'styled-components'

export const Container = styled.div`
  /* border-radius: 0.5rem; */
  width: 900px;
  margin: 0 auto 0 auto;
  table {
    width: 100%;
    border-collapse: collapse;
    border: 0;
  }

  thead {
    background-color: #8770fe;
    color: white;
    font-size: 0.875rem;
    text-transform: uppercase;
    letter-spacing: 2%;
    font-weight: 500;
  }

  tbody tr:nth-child(odd) {
    background-color: #d8d2fc;
  }

  tbody tr:nth-child(even) {
    background-color: #eee;
  }

  thead th {
    width: 25%;
  }

  thead,
  tbody {
    padding: 2rem;
  }

  th,
  td {
    padding: 8px;
    border: 0;
  }

  h3 {
    background-color: #8770fe;
    color: white;
    display: inline-block;
    padding: 0.1rem 1rem 0 1rem;
  }

  .binIcon {
    color: #ff6b6b;
  }

  .button-delete {
    color: #ffa8a8;
  }
`
