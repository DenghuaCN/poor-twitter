import axios from 'axios';
import { useCallback, useState } from "react";
import { toast } from 'react-hot-toast';
import { signIn } from 'next-auth/react';

import useRegisterModal from "@/hooks/useRegisterModal";
import useLoginModel from "@/hooks/useLoginModel";

import Input from "../Input";
import Model from "../Model";

const RegisterModel = () => {
  const RegisterModel = useRegisterModal();
  const LoginModal = useLoginModel();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState ('');
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  /**
   * @desc 切换注册与登录弹窗
   */
  const onToggle = useCallback(() => {
    // 正在创建用户中或者登录中不允许切换
    if (isLoading) {
      return;
    }

    RegisterModel.onClose();
    LoginModal.onOpen();
  }, [isLoading, RegisterModel, LoginModal])

  /**
   * @desc 注册账号并登录
   */
  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);

      await axios.post('/api/register', {
        email,
        password,
        username,
        name
      });

      toast.success('Account created.');

      signIn('credentials', {
        email,
        password,
      })

      RegisterModel.onClose();
    } catch (error) {
      toast.error('Something went wrong');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [RegisterModel, email, password, username, name])

  /**
   * @desc 弹窗Content Slot渲染内容
   */
  const bodyContent = (
    <div className="flex flex-col gap-4">
      {/* Email */}
      <Input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        disabled={isLoading}
      />
      {/* Name */}
      <Input
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
        value={name}
        disabled={isLoading}
      />
      {/* Username */}
      <Input
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
        value={username}
        disabled={isLoading}
      />
      {/* Password */}
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
      <p>Already have an account?
        <span
          onClick={onToggle}
          className="
            text-white
            cursor-pointer
            hover:underline"> Sign in
        </span>
      </p>
    </div>
  )

  return (
    <Model
      title="Create an account"
      actionLabel="Register"
      disabled={isLoading}
      onSubmit={onSubmit}
      isOpen={RegisterModel.isOpen}
      onClose={RegisterModel.onClose}
      body={bodyContent}
      footer={footerContent}
    />

  )
}

export default RegisterModel;