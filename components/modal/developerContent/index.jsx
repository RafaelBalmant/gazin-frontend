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
  const { dialog } = pageState
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm()

  const onSubmit = async (data) => {
    try {
      if (!Object.keys(dialog.data).length) {
        await axios.post(`http://localhost:3333/developer`, {
          ...data,
          age: Number(data.age),
        })
        return setPageState({
          ...pageState,
          dialog: {
            ...pageState.dialog,
            open: false,
          },
        })
      }

      await axios.put(`http://localhost:3333/developer`, {
        ...data,
        age: Number(data.age),
        id: dialog.data.id,
      })
      setPageState({
        ...pageState,
        dialog: {
          ...pageState.dialog,
          data: {},
          open: false,
        },
      })
    } catch (err) {
      console.log(err)
    } finally {
      Toast.fire({
        icon: 'success',
        title: `O usuario ${
          Object.keys(dialog.data).length ? 'atualizado' : 'criado'
        } com sucesso`,
      })
    }
  }

  useEffect(() => {
    axios
      .get(`http://localhost:3333/level`, {
        params: {
          page: 1,
          limit: 99999,
        },
      })
      .then((res) => setLevels(res.data))
  }, [])

  console.log(!Object.keys(dialog.data).length)
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
            {errors.age?.type === 'required' && 'O campo nome é obrigátorio'}
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
            {errors.hobby?.type === 'required' && 'O campo nome é obrigátorio'}
          </ErrorMessage>
        </div>
        <div>
          <label htmlFor="">Nivel</label>
          <br />
          <select
            defaultValue={dialog.data.level}
            name="nivel"
            id="level"
            {...register('level', { required: true })}
          >
            {levels.data?.map((value) => (
              <>
                <option
                  value={value.level}
                  selected={dialog.data.level === value.level}
                >
                  {value.level}
                </option>
              </>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="">Genero</label>
          <br />
          <select
            defaultValue={dialog.data.gender}
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
            {...register('date', { required: true })}
          />
          <ErrorMessage>
            {errors.date?.type === 'required' && 'O campo nome é obrigátorio'}
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
