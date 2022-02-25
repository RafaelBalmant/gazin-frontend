import { DialogActions, DialogTitle } from '@mui/material'
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
import { api } from '../../../service'
import CircularProgress from '@mui/material/CircularProgress'

export default function DeveloperContent() {
  const { pageState, setPageState } = usePageState()
  const [levels, setLevels] = useState([])
  const [levelState, setLevelState] = useState()
  const [isLoading, setIsLoading] = useState(false)
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
    api
      .get(`/level`, {
        params: {
          page: 1,
          limit: 99999,
        },
      })
      .then((res) => setLevels(res.data))

  const onSubmit = async (data) => {
    setIsLoading(true)
    try {
      if (!Object.keys(dialog.data).length) {
        await api.post(`/developer`, {
          ...data,
          age: Number(data.age),
        })
        successToastCallback()
        return closeModalCallback()
      }
      await api.put(`/developer`, {
        ...data,
        age: Number(data.age),
        id: dialog.data.id,
      })
      successToastCallback()
      return closeModalCallback()
    } catch (err) {
      Toast.fire({
        icon: 'error',
        title: err.response.data?.message || 'Ocorreu um erro inesperado',
      })
    } finally {
      setIsLoading(false)
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
            data-test="input-name-developer"
            placeholder="Nome"
            {...register('name', { required: true, maxLength: 30 })}
            defaultValue={dialog.data.name}
          />
          <ErrorMessage>
            {(errors.name?.type === 'required' &&
              'O campo nome é obrigátorio') ||
              (errors?.name && 'Informe um nome valido')}
          </ErrorMessage>
        </div>
        <div>
          <label htmlFor="">Idade</label>
          <br />
          <Input
            data-test="input-age-developer"
            placeholder="Idade"
            type="number"
            {...register('age', {
              required: true,
              min: 18,
              max: 99,
              maxLength: 2,
            })}
            defaultValue={dialog.data.age}
          />
          <ErrorMessage>
            {(errors.age?.type === 'required' &&
              'O campo idade é obrigátorio') ||
              (errors?.age && 'Informe uma idade valida')}
          </ErrorMessage>
        </div>
        <div>
          <label htmlFor="">Hobby</label>
          <br />
          <Input
            data-test="input-hobby-developer"
            defaultValue={dialog.data.hobby}
            placeholder="Hobby"
            {...register('hobby', { required: true, maxLength: 20 })}
          />
          <ErrorMessage>
            {(errors.hobby?.type === 'required' &&
              'O campo hobby é obrigátorio') ||
              (errors.hobby?.type === 'maxLength' && 'Informe menos letras')}
          </ErrorMessage>
        </div>
        {Boolean(levels.data?.length) && (
          <div>
            <label htmlFor="">Nivel</label>
            <br />
            <select
              data-test="select-level-developer"
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
            data-test="select-gender-developer"
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
            data-test="input-date-developer"
            defaultValue={dialog.data.date}
            placeholder="Nascimento"
            mask="9999-99-99"
            {...register('date', {
              required: true,
              pattern: /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/,
            })}
          />
          <ErrorMessage>
            {errors?.date && 'Informe uma data válida'}
          </ErrorMessage>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => closeModalCallback()} type="button">
          Cancelar
        </Button>
        {isLoading && <CircularProgress color="secondary" />}
        {!isLoading && (
          <InputButton type="submit" data-test="button-submit-developer" />
        )}
      </DialogActions>
    </form>
  )
}
