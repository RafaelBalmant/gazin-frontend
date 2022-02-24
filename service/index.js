import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://localhost:3333/',
})

export default function getRecordsByState(pageState, setPageState) {
  try {
    api
      .get(`${pageState.currentPage === 'level' ? 'level' : 'developer'}`, {
        params: {
          page: pageState.reqInfo.page,
          limit: pageState.reqInfo.limit,
        },
      })
      .then((res) => setPageState({ ...pageState, apiRes: res.data }))
  } catch (e) {
    console.log(e)
  }
}
