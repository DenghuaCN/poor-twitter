import { BsBellFill, BsHouseFill } from 'react-icons/bs';
import { FaUser } from 'react-icons/fa';
import { BiLogOut } from 'react-icons/bi';
import { signOut } from 'next-auth/react';

import useCurrentUser from '@/hooks/useCurrentUser';

import SidebarLogo from './SidebarLogo';
import SidebarItem from './SidebarItem';
import SidebarTweetButton from './SidebarTweetButton';

const Sidebar = () => {
  // find current User
  const { data: currentUser } = useCurrentUser();

  const items = [
    {
      label: 'Home',
      href: '/',
      icon: BsHouseFill,
    },
    {
      label: 'Notifications',
      href: '/notifications',
      icon: BsBellFill,
      isNeedAuth: true,
    },
    {
      label: 'Profile',
      href: `/users/${ currentUser?.id }`,
      icon: FaUser,
      isNeedAuth: true
    }
  ]

  return (
    <div className='col-span-1 h-full pr-4 md:pr-6'>
      <div className='flex flex-col items-end'>
        <div className='space-y-2 lg:w-[230px]'>
          <SidebarLogo />
          {items.map((item) => (
            <SidebarItem
              key={item.href}
              href={item.href}
              label={item.label}
              icon={item.icon}
              isNeedAuth={item.isNeedAuth}
            />
          ))}

          {/* only logged status show logout button */}
          {currentUser && <SidebarItem clickFn={() => signOut()} icon={BiLogOut} label="Logout" />}

          <SidebarTweetButton />
        </div>
      </div>
    </div>
  )
}

export default Sidebar;