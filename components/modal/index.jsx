import { usePageState } from '../../context/pageState'
import DeveloperContent from './developerContent'
import LevelContent from './levelContent'
import { Dialog } from './styles'

export default function ModalCreate() {
  const { pageState, setPageState } = usePageState()
  const { dialog } = pageState

  return (
    <>
      <Dialog
        open={dialog.open}
        onClose={() =>
          setPageState({
            ...pageState,
            dialog: {
              open: !dialog.open,
              data: {},
            },
          })
        }
        aria-labelledby="responsive-dialog-title"
      >
        {pageState.currentPage === 'dev' && <DeveloperContent />}
        {pageState.currentPage === 'level' && <LevelContent />}
      </Dialog>
    </>
  )
}
