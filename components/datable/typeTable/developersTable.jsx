import { Button } from '@mui/material'
import moment from 'moment'
import { Container } from './styles'
import { mdiDelete } from '@mdi/js'
import Icon from '@mdi/react'
import Swal from 'sweetalert2'
import axios from 'axios'
import { usePageState } from '../../../context/pageState'
import { Toast } from '../../general/Toast'
import { mdiPencil } from '@mdi/js'
import { useCallback } from 'react'

export default function DevelopersTable(props) {
  const { pageState, setPageState } = usePageState()
  const { data } = pageState.apiRes

  if (pageState.currentPage !== 'dev') {
    return null
  }

  console.log(pageState)

  const openModalEditCallback = (data) => {
    setPageState({
      ...pageState,
      dialog: {
        ...pageState.dialog,
        open: true,
        data: data,
      },
    })
  }

  const showAlert = async (userId) => {
    await Swal.fire({
      title: 'Você deseja deletar esse usuário?',
      icon: 'warning',
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não',
      showCancelButton: true,
      showLoaderOnConfirm: true,
      allowOutsideClick: () => !Swal.isLoading(),
      preConfirm: async () => {
        await axios
          .delete('http://localhost:3333/developer', {
            data: {
              id: Number(userId),
            },
          })
          .then((res) => {
            if (!res.ok) {
              Toast.fire({
                icon: 'Error',
                title: 'Ocorreu um erro inesperado',
              })
            }
          })
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios
          .get(`http://localhost:3333/developer`)
          .then((res) => setPageState({ ...pageState, apiRes: res.data }))
        Toast.fire({
          icon: 'success',
          title: 'Usuario deletado com sucesso',
        })
      }
    })
  }
  return (
    <Container>
      <table>
        <thead>
          <tr>
            <td>id</td>
            <td>Nivel</td>
            <td>Nome</td>
            <td>Genero</td>
            <td>Data</td>
            <td>Idade</td>
            <td>Hobby</td>
            <td style={{ textAlign: 'center' }}>Excluir</td>
            <td>
              <td style={{ textAlign: 'center' }}>Editar</td>
            </td>
          </tr>
        </thead>
        <tbody>
          {data?.map((value) => {
            return (
              <tr key={value.id}>
                <td>{value.id}</td>
                <td>{value.name_level}</td>
                <td>{value.name}</td>
                <td>{value.gender}</td>
                <td>{moment(value.date).format('DD/MM/yyyy')}</td>
                <td>{value.age}</td>
                <td>{value.hobby}</td>
                <td style={{ textAlign: 'center' }}>
                  <Button
                    className="button-delete"
                    value={value.id}
                    onClick={(e) => showAlert(e.currentTarget.value)}
                  >
                    <Icon
                      path={mdiDelete}
                      title="bin"
                      size={1}
                      className="binIcon"
                    />
                  </Button>
                </td>
                <td style={{ textAlign: 'center' }}>
                  <Button
                    className="button-edit"
                    value={value.id}
                    onClick={() => openModalEditCallback(value)}
                  >
                    <Icon
                      path={mdiPencil}
                      title="pencil"
                      size={1}
                      class="pencilIcon"
                    />
                  </Button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </Container>
  )
}
