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
import { ErrorMessages } from '../../../conts/translate/error'
import { api } from '../../../service'

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
        data: {},
        open: false,
      },
    })
  }

  const successToastCallback = () =>
    Toast.fire({
      icon: 'success',
      title: `O nivel ${
        Object.keys(dialog.data).length ? 'foi atualizado' : 'criado'
      } com sucesso`,
    })

  const onSubmit = async (data) => {
    try {
      if (!Object.keys(dialog.data).length) {
        await api.post(`/level`, {
          ...data,
        })
        successToastCallback()
        return closeModalCallback()
      }
      await api.put(`/level`, {
        ...data,
        id: dialog.data.id,
      })
      successToastCallback()
      return closeModalCallback()
    } catch (err) {
      Toast.fire({
        icon: 'error',
        title: err.response.data?.message || 'Ocorreu um erro inesperado',
      })
    }
  }

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
            data-test="input-level-name"
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
        <Button onClick={closeModalCallback} type="button">
          Cancelar
        </Button>
        <InputButton type="submit" data-test="button-submit-level" />
      </DialogActions>
    </form>
  )
}
