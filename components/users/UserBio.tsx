import { useMemo } from 'react';
import { format } from 'date-fns';
import { BiCalendar } from 'react-icons/bi';

import useCurrentUser from "@/hooks/useCurrentUser";
import useUser from "@/hooks/useUser";
import useEditModal from '@/hooks/useEditModal';
import useFollow from '@/hooks/useFollow';

import Button from '../Button';

interface UserBioProps {
  userId: string;
}

const UserBio: React.FC<UserBioProps> = ({ userId }) => {
  const { data: currentUser } = useCurrentUser();
  const { data: fetchedUser } = useUser(userId);
  const { isFollowing, toggleFollow } = useFollow(userId);

  const editModel = useEditModal();


  /**
   * @function getCreatedAtFormat
   * @desc <UserBio/>每次 re-Rendered 后都将重新请求接口，获取时间，并格式化。useMemo可缓存之前计算的结果，在其时间无变化时减少格式化开销。
   */
  const getCreatedAtFormat = useMemo(() => {
    if (!fetchedUser?.createdAt) {
      return null;
    }
    return format(new Date(fetchedUser.createdAt), 'MMMM yyyy');
  }, [fetchedUser?.createdAt])

  /**
   * @desc following number of people
   */
  const followingNumber = useMemo(() => {
    return fetchedUser?.followingIds?.length;
  }, [fetchedUser?.followingIds.length])

  /**
   * @desc follower number
   */
  const followerNumber = useMemo(() => {
    return fetchedUser?.followersCount || 0;
  }, [fetchedUser?.followersCount])

  return (
    <div className='border-b-[1px] border-x-neutral-800 pb-4'>
      {/* Edit or Follow */}
      <div className='flex justify-end p-2'>
        {
          currentUser?.id === userId ? (
            // 当前用户，显示编辑
            <Button secondary label="Edit" onClick={editModel.onOpen} />
          ) : (
            // 其他用户，显示Follow/UnFollow
            <Button
              onClick={toggleFollow}
              label={ isFollowing? 'UnFollow' : 'Follow' }
              secondary={!isFollowing}
              outline={isFollowing}
            />
          )
        }
      </div>

      <div className='mt-7 px-4'>
        {/* Name Username */}
        <div className='flex flex-col'>
          <p className='text-white text-2xl font-semibold'>
            { fetchedUser?.name }
          </p>
          <p className='text-md text-neutral-500'>
            @{fetchedUser?.username}
          </p>
        </div>
        {/* Bio and CreatedAt */}
        <div className='flex flex-col mt-4'>
          <p className='text-white'>{ fetchedUser?.bio }</p>
          <div className='flex flex-row items-center gap-2 mt-4 text-neutral-500'>
            <BiCalendar size={24} />
            <p className=''>Joined {getCreatedAtFormat}</p>
          </div>
        </div>

        {/*  */}
        <div className='flex flex-row items-center mt-4 gap-6'>
          {/* Following Number of People */}
          <div className='flex flex-row items-center gap-1'>
            <p className='text-white'>{followingNumber}</p>
            <p className='text-neutral-500'>Following</p>
          </div>
          {/* Follower Number of People */}
          <div className='flex flex-row items-center gap-1'>
            <p className='text-white'>{ followerNumber }</p>
            <p className='text-neutral-500'>Followers</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserBio;