/**
 * [Dynamic Routes] https://nextjs.org/docs/routing/dynamic-routes
 *
 * '/api/users[userid]' 可以匹配 '/api/users/abc', '/api/users/1' 等
  */
import { NextApiRequest, NextApiResponse } from 'next';

import prisma from '@/libs/prismadb';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).end();
  }

  try {
    const { userId } = req.query;

    if (!userId || typeof userId !== 'string') {
      throw new Error("Invalid ID 无效的用户");
    }

    // find the user
    const existingUser = await prisma.user.findUnique({
      where: {
        id: userId
      }
    })

    // find the followers of current user
    const followersCount = await prisma.user.count({
      // 从user表中查询followingIds字段中存在当前用户的用户个数
      where: {
        followingIds: {
          has: userId
        }
      }
    })

    return res.status(200).json({
      ...existingUser, // 根据querystring的userId查询此user并返回信息
      followersCount   // 当前user的订阅者
    })

  } catch (error) {
    console.error(error);
    return res.status(400).end();
  }
}