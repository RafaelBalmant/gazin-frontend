import axios from 'axios'

export default function getRecordsByState(pageState, setPageState) {
  try {
    axios
      .get(
        `http://localhost:3333/${
          pageState.currentPage === 'level' ? 'level' : 'developer'
        }`,
        {
          params: {
            page: pageState.reqInfo.page,
            limit: pageState.reqInfo.limit,
          },
        }
      )
      .then((res) => setPageState({ ...pageState, apiRes: res.data }))
  } catch (e) {
    console.log(e)
  }
}
