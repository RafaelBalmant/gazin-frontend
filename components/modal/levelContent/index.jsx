import { DialogActions, DialogTitle } from '@mui/material'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { usePageState } from '../../../context/pageState'
import {
  Button,
  DialogContent,
  DialogHeader,
  ErrorMessage,
  Input,
  InputButton,
  InputDate,
} from '../styles'
import { useForm } from 'react-hook-form'
import { Toast } from '../../general/Toast'

export default function LevelContent() {
  const { pageState, setPageState } = usePageState()
  const { dialog } = pageState
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm()

  const closeModalCallback = () => {
    return setPageState({
      ...pageState,
      dialog: {
        ...pageState.dialog,
        open: false,
      },
    })
  }

  const successToastCallback = () =>
    Toast.fire({
      icon: 'success',
      title: `O nivel ${
        Object.keys(dialog.data).length ? 'atualizado' : 'criado'
      } com sucesso`,
    })

  const onSubmit = async (data) => {
    try {
      if (!Object.keys(dialog.data).length) {
        await axios.post(`http://localhost:3333/level`, {
          ...data,
        })
        successToastCallback()
        return closeModalCallback()
      }
      await axios.put(`http://localhost:3333/level`, {
        ...data,
        id: dialog.data.id,
      })
      successToastCallback()
      return closeModalCallback()
    } catch (err) {
      Toast.fire({
        icon: 'error',
        title: `Ops... Ocorreu um erro inesperado, verifique os campos!`,
      })
    } finally {
    }
  }

  console.log(dialog.data)
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <DialogHeader>
        <DialogTitle id="responsive-dialog-title">
          {`${(Object.keys(dialog.data).length && 'Editar') || 'Criar'} Nivel`}
        </DialogTitle>
      </DialogHeader>
      <DialogContent>
        <div>
          <label htmlFor="">Nome</label>
          <br />
          <Input
            placeholder="Nome"
            {...register('level', { required: true })}
            defaultValue={dialog.data.level}
          />
          <ErrorMessage>
            {errors.name?.type === 'required' && 'O campo nome é obrigátorio'}
          </ErrorMessage>
        </div>
      </DialogContent>
      <DialogActions>
        <Button
          autoFocus
          onClick={() =>
            setPageState({
              ...pageState,
              dialog: {
                open: false,
                data: {},
              },
            })
          }
        >
          Cancelar
        </Button>
        <InputButton type="submit" />
      </DialogActions>
    </form>
  )
}
