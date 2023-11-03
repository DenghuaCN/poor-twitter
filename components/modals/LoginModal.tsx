import { signIn } from 'next-auth/react';

import useLoginModel from "@/hooks/useLoginModel";
import useRegisterModal from "@/hooks/useRegisterModal";

import { useCallback, useState } from "react";

import Input from "../Input";
import Model from "../Model";


const LoginModal = () => {
  const LoginModal = useLoginModel();
  const RegisterModel = useRegisterModal();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  /**
   * @desc 切换注册与登录弹窗
   */
  const onToggle = useCallback(() => {
    // 正在创建用户中或者登录中不允许切换
    if (isLoading) {
      return;
    }

    LoginModal.onClose();
    RegisterModel.onOpen();
  }, [isLoading, RegisterModel, LoginModal])

  /**
   * @desc 登录
   */
  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);

      signIn('credentials', {
        password,
        email,
      })

      LoginModal.onClose();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [LoginModal, email, password])

  /**
   * @desc 弹窗主体渲染内容
   */
  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        disabled={isLoading}
      />
      <Input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        disabled={isLoading}
      />
    </div>
  )

  /**
   * @desc 弹窗Footer Slot渲染内容
   */
  const footerContent = (
    <div className="text-neutral-400 text-center mt-4">
      <p>First time using 😈Poor-Twitter😈?
        <span onClick={onToggle} className="text-white cursor-pointer hover:underline">
            Create an account
        </span>
      </p>
    </div>
  )

  return (
    <Model
      title="Login"
      actionLabel="Sign in"
      disabled={isLoading}
      onSubmit={onSubmit}
      isOpen={LoginModal.isOpen}
      onClose={LoginModal.onClose}
      body={bodyContent}
      footer={footerContent}
    />
  )
}

export default LoginModal;