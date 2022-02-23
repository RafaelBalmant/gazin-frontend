import styled from 'styled-components'
import { transparentize, darken } from 'polished'

export const Container = styled.div`
  /* border-radius: 0.5rem; */
  width: 900px;
  margin: 2rem auto 0 auto;

  .button-edit,
  .pencilIcon {
    color: #8770fe !important;
  }
`
export const HeaderButton = styled.button`
  border-style: none;
  background: ${(props) =>
    (props.pageState && '#8770fe') || transparentize(0.3, '#8770fe')};
  padding: 0.8rem;
  color: white;
  min-width: 16rem;
  &:hover {
    background-color: '#8770fe' !important;
  }
`

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
`

export const IconContainer = styled.div`
  width: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${transparentize(0.3, '#8770fe')};
  color: white;
  cursor: pointer;

  &:hover {
    transition: 1;
    background-color: #8770fe;
  }
`
export const FooterTable = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #8770fe;
  height: 2.5rem;
  color: white;
`

export const ArrowsContainer = styled.div`
  display: flex;
  .button-arrow {
    color: white;
  }
`

export const ItemItensPerPageContainer = styled.div`
  margin-left: 1rem;
  .select-itens-per-page {
    color: white;
    margin-top: 4px;
    height: 2rem;
    background-color: ${transparentize(0.3, '#8770fe')};
  }
`
