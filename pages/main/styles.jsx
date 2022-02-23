import { darken, transparentize } from 'polished'
import styled from 'styled-components'

export const Container = styled.div`
  /* border-radius: 0.5rem; */
  width: 900px;
  margin: 2rem auto 0 auto;
`

export const OptionsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: flex;
`
export const Button = styled.button`
  border: 0;
  background-color: ${(props) =>
    (props.pageState && '#8770fe') || transparentize(0.3, '#8770fe')};
  color: white;
  padding: 0.5rem;
  min-width: 12rem;
  height: 3rem;
  font-weight: 500;
  &:hover {
    background-color: ${darken(0.9, '#8770fe')};
  }
`

export const DataContainer = styled.div``
