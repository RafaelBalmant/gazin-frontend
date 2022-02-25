import { Button } from '@mui/material'
import moment from 'moment'
import { Container } from './styles'
import { mdiDelete } from '@mdi/js'
import Icon from '@mdi/react'
import Swal from 'sweetalert2'
import { usePageState } from '../../../context/pageState'
import { Toast } from '../../general/Toast'
import { mdiPencil } from '@mdi/js'
import Image from 'next/image'
import { api } from '../../../service'
import { EmptyContainer } from '../styles'

export default function DevelopersTable(props) {
  const { pageState, setPageState } = usePageState()
  const { data } = pageState.apiRes

  if (pageState.currentPage !== 'dev') {
    return null
  }

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
        await api
          .delete('/developer', {
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
        await api
          .get(`/developer`)
          .then((res) => setPageState({ ...pageState, apiRes: res.data }))
        Toast.fire({
          icon: 'success',
          title: 'Usuario deletado com sucesso',
        })
      }
    })
  }

  console.log('state', Boolean(Object.keys(data?.map).length))
  return (
    <Container>
      {!Boolean(Object.keys(data || {}).length) && (
        <EmptyContainer>
          <h2>Não existem registros</h2>
        </EmptyContainer>
      )}
      {Boolean(Object.keys(data || {}).length) && (
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
              <td style={{ textAlign: 'center' }}>Ações</td>
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
                      data-test={`button-delete-developer-${value.name}`}
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
                    <Button
                      data-test={`button-edit-developer-${value.name}`}
                      className="button-edit"
                      value={value.id}
                      onClick={() => openModalEditCallback(value)}
                    >
                      <Icon
                        path={mdiPencil}
                        title="pencil"
                        size={1}
                        className="pencilIcon"
                      />
                    </Button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      )}
    </Container>
  )
}
