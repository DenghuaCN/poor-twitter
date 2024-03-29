import { NextApiRequest, NextApiResponse } from "next";

import serverAuth from "@/libs/serverAuth";
import prisma from "@/libs/prismadb";
import createNewNotification from "./common/createNewNotification";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  try {
    // publish comments
    const { currentUser } = await serverAuth(req, res);
    const { body } = req.body;
    const { postId } = req.query;

    if (!postId || typeof postId !== 'string') {
      throw new Error("Invalid ID");
    }

    const comment = await prisma.comment.create({
      data: {
        body,
        userId: currentUser.id,
        postId
      }
    });

    // 添加新的通知
    createNewNotification(postId, 'COMMENT');

    return res.status(200).json(comment);


  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }

}