import { GlobalStyle } from '../styles/globals'
import Head from 'next/head'
import PageStateProvider from '../context/pageState'
function MyApp({ Component, pageProps }) {
  return (
    <>
      <PageStateProvider>
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,500;0,600;1,400&display=swap"
            rel="stylesheet"
          />
        </Head>
        <GlobalStyle />
        <Component {...pageProps} />
      </PageStateProvider>
    </>
  )
}

export default MyApp
