import { useEffect, useState } from 'react'
import Datable from '../../components/datable'
import ModalCreate from '../../components/modal'
import { usePageState } from '../../context/pageState'
import getRecordsByState from '../../service/'

export default function Main() {
  const { pageState, setPageState } = usePageState()
  useEffect(() => {
    getRecordsByState(pageState, setPageState)
  }, [
    pageState.currentPage,
    pageState.reqInfo.page,
    pageState.reqInfo.limit,
    pageState.dialog.open,
  ])

  return (
    <div>
      <Datable />
      <ModalCreate />
    </div>
  )
}
