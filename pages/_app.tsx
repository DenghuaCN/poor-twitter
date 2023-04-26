import type { AppProps } from 'next/app'
import { Toaster } from 'react-hot-toast'

import Layout from '@/components/Layout'
import LoginModal from '@/components/modals/LoginModal'
import RegisterModel from '@/components/modals/RegisterModal'
import EditModal from '@/components/modals/EditModal'

import '@/styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      {/* react-hot-toast组件 */}
      <Toaster />
      {/* 登录弹窗 */}
      <LoginModal />
      {/* 注册弹窗 */}
      <RegisterModel />
      {/* 编辑弹窗 */}
      <EditModal />

      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}
