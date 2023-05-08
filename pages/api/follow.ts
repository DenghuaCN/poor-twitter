import { NextApiRequest, NextApiResponse } from "next";

import serverAuth from "@/libs/serverAuth";
import prisma from '@/libs/prismadb';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {

  if (req.method !== 'POST' && req.method !== 'DELETE') {
    return res.status(405).end();
  }

  try {
    // 当前登录用户
    const { currentUser } = await serverAuth(req, res);

    // 需要follow的user id
    const { userId } = req.method === 'POST'? req.body : req.query; // POST使用req.body，DELETE使用req.query

    if (!userId || typeof userId !== 'string') {
      throw new Error("Invalid ID");
    }

    // 根据此user id查找此用户
    const user = await prisma.user.findUnique({
      where: {
        id: userId
      }
    });
    if (!user) throw new Error('Invalid ID');

    let updatedFollowingIds = [...(user.followingIds || [])];

    console.log('user', user);


    // follow
    if (req.method === 'POST') {
      updatedFollowingIds.push(userId);
    }
    // UnFollow
    if (req.method === 'DELETE') {
      updatedFollowingIds = updatedFollowingIds.filter(followingId => followingId !== userId);
    }

    // 更新followingIds
    const updatedUser = await prisma.user.update({
      where: {
        id: currentUser.id
      },
      data: {
        followingIds: updatedFollowingIds
      }
    })

    return res.status(200).json(updatedUser);

  } catch (error) {
    console.error(error);
    return res.status(400).end();
  }
}
