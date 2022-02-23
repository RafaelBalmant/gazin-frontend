import { Button } from '@mui/material'
import Icon from '@mdi/react'
import { mdiDelete } from '@mdi/js'
import axios from 'axios'
import Swal from 'sweetalert2'
import { usePageState } from '../../../context/pageState'
import { Container } from './styles'
import { ErrorMessages } from '../../../conts/translate/error'
import { Toast } from '../../general/Toast'

export default function LevelsTable() {
  const { pageState, setPageState } = usePageState()
  const { data } = pageState.apiRes

  if (pageState.currentPage !== 'level') {
    return null
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
          await axios.delete('http://localhost:3333/level', {
            data: {
              id: Number(levelId),
            },
          })
          await axios
            .get(`http://localhost:3333/level`)
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
            ErrorMessages[e.response.data?.message].message ||
            'Ocorreu um erro inesperado',
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
            <td>Level</td>
            <td style={{ textAlign: 'end', paddingRight: '16px' }}>Excluir</td>
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
              </tr>
            )
          })}
        </tbody>
      </table>
    </Container>
  )
}