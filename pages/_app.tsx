import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { UserContextWrapper } from '../useContext/UserContext'
import {ChakraProvider} from '@chakra-ui/react'
import Layout from '../components/layout'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <UserContextWrapper>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </UserContextWrapper>
    </ChakraProvider>
  )
}

export default MyApp