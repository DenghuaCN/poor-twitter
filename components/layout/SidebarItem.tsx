import { useRouter } from "next/router";
import { useCallback } from "react";
import { IconType } from "react-icons";

import useCurrentUser from "@/hooks/useCurrentUser";
import useLoginModel from "@/hooks/useLoginModel";
interface SidebarItemProps {
  label: string;
  href?: string;
  icon: IconType;
  clickFn?: () => void;
  isNeedAuth?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  label,
  href,
  icon: Icon,
  clickFn,
  isNeedAuth
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

  return  (
    <div onClick={handleClick} className="flex flex-row items-center">
      {/* mobile */}
      <div
        className="
          lg:hidden
          relative
          rounded-full
          h-14
          w-14
          flex
          items-center
          justify-center
          p-4
          hover:bg-slate-300
          hover:bg-opacity-10
          cursor-pointer
        "
      >
       <Icon size={28} color="white" />
      </div>
      {/* desktop */}
      <div
        className="
          lg:flex
          relative
          hidden
          items-center
          gap-4
          p-4
          rounded-full
          hover:bg-slate-300
          hover:bg-opacity-10
          cursor-pointer
        "
      >
        <Icon size={24} color="white" />
        <p className="hidden lg:block text-white text-xl">
          { label }
        </p>
      </div>
    </div>
  )
}

export default SidebarItem;