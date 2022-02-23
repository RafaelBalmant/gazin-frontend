import { createContext, useContext, useState } from 'react'

const PageStateContext = createContext()

export default function PageStateProvider({ children }) {
  const [pageState, setPageState] = useState({
    currentPage: 'level',
    reqInfo: {
      isLoading: false,
      page: 1,
      limit: 10,
    },
    apiRes: {},
    dialog: {
      open: false,
      data: {},
    },
  })
  return (
    <PageStateContext.Provider value={{ pageState, setPageState }}>
      {children}
    </PageStateContext.Provider>
  )
}

export function usePageState() {
  return useContext(PageStateContext)
}
