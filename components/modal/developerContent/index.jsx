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

export default function DeveloperContent() {
  const { pageState, setPageState } = usePageState()
  const [levels, setLevels] = useState([])
  const [levelState, setLevelState] = useState()
  const { dialog } = pageState
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm()

  useEffect(() => {
    if (dialog.data.name_level) {
      setLevelState(dialog.data.name_level)
    }
  }, [dialog.data])

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
      title: `O usuario ${
        Object.keys(dialog.data).length ? 'atualizado' : 'criado'
      } com sucesso`,
    })

  const getLevelsCallback = () =>
    axios
      .get(`http://localhost:3333/level`, {
        params: {
          page: 1,
          limit: 99999,
        },
      })
      .then((res) => setLevels(res.data))

  const onSubmit = async (data) => {
    try {
      if (!Object.keys(dialog.data).length) {
        await axios.post(`http://localhost:3333/developer`, {
          ...data,
          age: Number(data.age),
        })
        successToastCallback()
        return closeModalCallback()
      }
      await axios.put(`http://localhost:3333/developer`, {
        ...data,
        age: Number(data.age),
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

  useEffect(() => getLevelsCallback(), [])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <DialogHeader>
        <DialogTitle id="responsive-dialog-title">
          {`${
            (Object.keys(dialog.data).length && 'Editar') || 'Criar'
          } desenvolvedor`}
        </DialogTitle>
      </DialogHeader>
      <DialogContent>
        <div>
          <label htmlFor="">Nome</label>
          <br />
          <Input
            placeholder="Nome"
            {...register('name', { required: true })}
            defaultValue={dialog.data.name}
          />
          <ErrorMessage>
            {errors.name?.type === 'required' && 'O campo nome é obrigátorio'}
          </ErrorMessage>
        </div>
        <div>
          <label htmlFor="">Idade</label>
          <br />
          <Input
            placeholder="Idade"
            type="number"
            {...register('age', { required: true })}
            defaultValue={dialog.data.age}
          />
          <ErrorMessage>
            {errors.age?.type === 'required' && 'O campo idade é obrigátorio'}
          </ErrorMessage>
        </div>
        <div>
          <label htmlFor="">Hobby</label>
          <br />
          <Input
            defaultValue={dialog.data.hobby}
            placeholder="Hobby"
            {...register('hobby', { required: true })}
          />
          <ErrorMessage>
            {errors.hobby?.type === 'required' && 'O campo hobby é obrigátorio'}
          </ErrorMessage>
        </div>
        {Boolean(levels.data?.length) && (
          <div>
            <label htmlFor="">Nivel</label>
            <br />
            <select
              onClick={(e) => setLevelState(e.target.value)}
              name="nivel"
              id="level"
              {...register('level', { required: true })}
            >
              {levels.data?.map((value) => {
                return (
                  <>
                    <option selected={levelState === value.level}>
                      {value.level}
                    </option>
                  </>
                )
              })}
            </select>
          </div>
        )}
        <div>
          <label htmlFor="">Genero</label>
          <br />
          <select
            name="genero"
            id="genero"
            {...register('gender', { required: true })}
          >
            <option
              value="feminino"
              selected={dialog.data.gender === 'feminino'}
            >
              Feminino
            </option>
            <option
              value="masculino"
              selected={dialog.data.gender === 'masculino'}
            >
              Masculino
            </option>
          </select>
        </div>
        <div>
          <label htmlFor="">Nascimento</label>
          <br />
          <InputDate
            defaultValue={dialog.data.date}
            placeholder="Nascimento"
            mask="9999-99-99"
            {...register('date', {
              required: true,
              pattern: /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/,
            })}
          />
          <ErrorMessage>
            {(errors.date?.type === 'required' &&
              'O campo nascimento é obrigátorio') ||
              (errors.date?.type === 'pattern' && 'Informe uma data válida')}
          </ErrorMessage>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => closeModalCallback()}>Cancelar</Button>
        <InputButton type="submit" />
      </DialogActions>
    </form>
  )
}
