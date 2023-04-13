import type { AppProps } from 'next/app'

import Layout from '@/components/Layout'
import '@/styles/globals.css'
import Model from '@/components/Model'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Model
        isOpen
        title="Test Model"
        actionLabel='Submit'
      />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}
