import { Button } from '@mui/material'
import Icon from '@mdi/react'
import { mdiDelete, mdiPencil } from '@mdi/js'
import Swal from 'sweetalert2'
import { usePageState } from '../../../context/pageState'
import { Container } from './styles'
import { ErrorMessages } from '../../../conts/translate/error'
import { Toast } from '../../general/Toast'
import { api } from '../../../service/'
import { EmptyContainer } from '../styles'

export default function LevelsTable() {
  const { pageState, setPageState } = usePageState()
  const { data } = pageState.apiRes

  if (pageState.currentPage !== 'level') {
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

  const showAlert = async (levelId) => {
    await Swal.fire({
      title: 'Você deseja deletar esse nivel?',
      icon: 'warning',
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não',
      showCancelButton: true,
      showLoaderOnConfirm: true,
      allowOutsideClick: () => !Swal.isLoading(),
    }).then(async (event) => {
      try {
        if (event.isConfirmed) {
          await api.delete('/level', {
            data: {
              id: Number(levelId),
            },
          })
          await api
            .get(`/level`)
            .then((res) => setPageState({ ...pageState, apiRes: res.data }))
          Toast.fire({
            icon: 'success',
            title: 'Nivel deletado com sucesso!',
          })
        }
      } catch (e) {
        Toast.fire({
          icon: 'error',
          title:
            ErrorMessages[e.response.data?.message]?.message ||
            'Ocorreu um erro inesperado',
        })
      }
    })
  }
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
              <td>Level</td>
              <td style={{ textAlign: 'end', paddingRight: '50px' }}>Ações</td>
            </tr>
          </thead>
          <tbody>
            {data?.map((value) => {
              return (
                <tr key={value.id}>
                  <td>{value.id}</td>
                  <td>{value.level}</td>
                  <td style={{ textAlign: 'end', marginRight: '1rem' }}>
                    <Button
                      data-test={`button-delete-level-${value.level}`}
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
                      data-test={`button-edit-level-${value.level}`}
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
      )}
    </Container>
  )
}
