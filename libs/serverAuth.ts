import { NextApiRequest, NextApiResponse } from "next"
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';

import prisma from '@/libs/prismadb';

/**
 * @desc 这个server将会检查当前session是否登录，以及从email中找到当前登录用户
 * @param {NextApiRequest} req
 * @returns {currentUser}
 */
const serverAuth = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions);

  console.log('当前登录用户: session:', session);

  // if the user is not logged in
  if (!session?.user?.email) {
    throw new Error('Not signed in 未登录');
  }

  const currentUser = await prisma.user.findUnique({
    where: {
      email: session.user.email
    }
  })

  if (!currentUser) {
    throw new Error('Not signed in 未登录');
  }

  return { currentUser };
}

export default serverAuth;