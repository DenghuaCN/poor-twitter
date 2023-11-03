import { useRouter } from "next/router";
import { useCallback } from "react";
import { IconType } from "react-icons";
import { BsDot } from "react-icons/bs";

import useCurrentUser from "@/hooks/useCurrentUser";
import useLoginModel from "@/hooks/useLoginModel";
interface SidebarItemProps {
  label: string;
  href?: string;
  icon: IconType;
  clickFn?: () => void;
  isNeedAuth?: boolean;
  alert?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  label,
  href,
  icon: Icon,
  clickFn,
  isNeedAuth,
  alert
}) => {
  const loginModal = useLoginModel();
  const router = useRouter();
  const { data: currentUser } = useCurrentUser();

  const handleClick = useCallback(() => {
    // 存在click回调函数，则调用
    if (clickFn) {
      return clickFn();
    }

    // 如果这个路由需要登录才能使用 并且当前没有登录，则打开登录弹窗
    if (isNeedAuth && !currentUser) {
      loginModal.onOpen();
    } else if (href) {
      router.push(href);
    }
  }, [router, clickFn, href, isNeedAuth, currentUser, loginModal])

  return (
    <div onClick={handleClick} className="flex flex-row items-center">
      {/* mobile */}
      <div className="lg:hidden relative rounded-full h-14 w-14 flex items-center justify-center p-4 hover:bg-slate-300 hover:bg-opacity-10 cursor-pointer">
        <Icon size={28} color="white" />
        { alert ? <BsDot className="text-sky-500 absolute -top-2 left-1.5" size={55} /> : null }
      </div>
      {/* desktop */}
      <div className="lg:flex relative hidden items-center gap-4 p-4 rounded-full hover:bg-slate-300 hover:bg-opacity-10 cursor-pointer">
        <Icon size={24} color="white" />
        <p className="hidden lg:block text-white text-xl">
          {label}
        </p>
        { alert ? <BsDot className="text-sky-500 absolute -top-1.5 left-1.5" size={55} /> : null }
      </div>
    </div>
  )
}

export default SidebarItem;