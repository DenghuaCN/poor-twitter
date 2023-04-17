import type { AppProps } from 'next/app'

import Layout from '@/components/Layout'
import LoginModal from '@/components/modals/LoginModal'
import RegisterModel from '@/components/modals/RegisterModal'

import '@/styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      {/* 登录弹窗 */}
      <LoginModal />
      {/* 注册弹窗 */}
      <RegisterModel />

      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}
