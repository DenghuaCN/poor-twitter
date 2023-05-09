import { NextApiRequest, NextApiResponse } from "next";

import prisma from '@/libs/prismadb';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).end();
  }

  try {
    const { postId } = req.query;

    if (!postId || typeof postId !== 'string') {
      throw new Error('invalid Post ID');
    }

    // 根据postId查找Post表中的该数据项
    const post = await prisma.post.findUnique({
      where: {
        id: postId
      },
      include: {
        user: true,
        comments: { // 查找该post的所有评论
          include: {
            user: true // 创建的评论的user
          },
          orderBy: {
            createdAt: 'desc'
          }
        }
      }
    })

    return res.status(200).json(post);

  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}