import { store, wrapper } from '@/stores/store'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'

export function App({ Component, pageProps }: AppProps) {
  return (
    <Component {...pageProps} />
  )
}

export default wrapper.withRedux(App)