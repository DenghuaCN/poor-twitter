import useSWR from 'swr';

import fetcher from '@/libs/fetcher';

/**
 * @desc 根据userId获取当前用户信息
 * @param {string} userId
 */
const useUser = (userId: string) => {
  const API = userId ? `/api/users/${userId}` : null; // 为null时 useSWR不做请求

  const { data, error, isLoading, mutate } = useSWR(API, fetcher);

  return {
    data,
    error,
    isLoading,
    mutate
  }
}

export default useUser;