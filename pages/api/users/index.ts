import { NextApiResponse, NextApiRequest } from 'next';

import prisma from '@/libs/prismadb';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).end();
  }

  try {

    // 查找与过滤器匹配的零个或更多用户
    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: 'desc' // 根据创建时间降序
      }
    });

    return res.status(200).json(users);

  } catch (error) {
    console.error(error);
    return res.status(400).end();
  }
}