import { darken, transparentize } from 'polished'
import styled from 'styled-components'
import { DialogContent as DialogContentDefault } from '@mui/material'
import InputMask from 'react-input-mask'

export const InputDate = styled(InputMask)`
  width: 100%;
  height: 2rem;
  padding: 2px;
  color: #8770fe;
  border: #8770fe 2px solid;

  &::placeholder {
    color: #8770fe;
  }
`

export const DialogHeader = styled.div`
  background-color: #8770fe;
  color: white;
`

export const Button = styled.button`
  border: 0;
  background-color: ${transparentize(0.3, '#8770fe')};
  color: white;
  padding: 0.5rem;
  min-width: 6rem;
  height: 3rem;
  font-weight: 500;
  &:hover {
    transition: 1s;
    background-color: #8973ff;
  }
`

export const DialogContent = styled(DialogContentDefault)`
  display: flex;
  flex-wrap: wrap;
  label {
    color: #8770fe;
    font-weight: 500;
  }
  div {
    width: 48%;
    margin-bottom: 1rem;
    &:last-child {
      margin-bottom: 0 !important;
    }

    &:nth-child(even) {
      margin-left: auto !important;
    }
  }
  select,
  option {
    width: 100%;
    height: 2rem;
    padding: 2px;
    color: #8770fe;
    border: #8770fe 2px solid;

    &::placeholder {
      color: #8770fe;
    }
  }
`

export const Input = styled.input`
  width: 100%;
  height: 2rem;
  padding: 2px;
  color: #8770fe;
  border: #8770fe 2px solid;

  &::placeholder {
    color: #8770fe;
  }
`

export const InputButton = styled.input`
  cursor: pointer;
  margin-left: 1rem;
  border: 0;
  background-color: ${transparentize(0.3, '#8770fe')};
  color: white;
  padding: 0.5rem;
  min-width: 6rem;
  height: 3rem;
  font-weight: 500;
  &:hover {
    transition: 1s;
    background-color: #8973ff;
  }
`

export const ErrorMessage = styled.span`
  font-size: 9px;
  color: red;
`
