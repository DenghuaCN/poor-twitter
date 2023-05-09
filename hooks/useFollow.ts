import axios from 'axios';
import { useCallback, useMemo } from 'react';
import { toast } from 'react-hot-toast';

import useUser from './useUser';
import useCurrentUser from './useCurrentUser';
import useLoginModel from './useLoginModel';

const useFollow = (userId: string) => {
  const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();
  const { mutate: mutateFetchedUser } = useUser(userId);

  const loginModal = useLoginModel();

  /**
   * @desc 判断此userId是否已经follow
   */
  const isFollowing = useMemo(() => {
    const list = currentUser?.followingIds || [];

    console.log('currentUser.followings', currentUser?.followingIds);

    return list.includes(userId);
  }, [currentUser?.followingIds, userId])


  const toggleFollow = useCallback(async () => {
    // check is log in
    if (!currentUser) {
      return loginModal.onOpen();
    }

    try {
      let request;

      if (isFollowing) { // UnFollow
        request = () => axios.delete('/api/follow', {
          params: {
            userId
          }
        });
      } else { // Follow
        request = () => axios.post('/api/follow', { userId })
      }

      await request();
      mutateCurrentUser();
      mutateFetchedUser();

      toast.success('Success');

    } catch (error) {
      toast.error('Something went wrong')
      console.error(error);
    }

  }, [
      currentUser,
      isFollowing,
      userId,
      mutateFetchedUser,
      mutateCurrentUser,
      loginModal
  ]);

  return {
    isFollowing,
    toggleFollow
  }
}

export default useFollow;