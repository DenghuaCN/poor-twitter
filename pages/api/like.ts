import { NextApiRequest, NextApiResponse } from 'next';

import serverAuth from '@/libs/serverAuth';
import prisma from '@/libs/prismadb';
import createNewNotification from './common/createNewNotification';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST' && req.method !== 'DELETE') {
    return res.status(405).end();
  }

  try {
    const { postId } = req.method === 'POST'? req.body : req.query; // POST使用req.body，DELETE使用req.query

    const { currentUser } = await serverAuth(req, res);

    if (!postId || typeof postId !== 'string') {
      throw new Error("Invalid Post Id");
    }

    const post = await prisma.post.findUnique({
      where: {
        id: postId
      }
    });

    if (!post) {
      throw new Error("Invalid Post");
    }

    let updatedLikeIds = [...(post.likedIds || [])];

    if (req.method === 'POST') {
      updatedLikeIds.push(currentUser.id);

      // 添加新的通知
      createNewNotification(postId, 'LIKE');

    } else if (req.method === 'DELETE') {
      updatedLikeIds = updatedLikeIds.filter((likedId) => likedId !== currentUser.id);
    }

    const updatedPost = await prisma.post.update({
      where: {
        id: postId
      },
      data: {
        likedIds: updatedLikeIds
      }
    });

    return res.status(200).json(updatedPost);

  } catch (error) {
    console.error(error);
    return res.status(400).end();
  }

}