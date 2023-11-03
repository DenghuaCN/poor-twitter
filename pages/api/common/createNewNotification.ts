import prisma from '@/libs/prismadb';

const createNewNotification = async (
    postId: string,
    operation: string = 'unknow operation'
  ) => {

  if (!postId) {
    throw new Error("create new notification fail!");
  }

  const operationTextMap = new Map([
    ['LIKE', 'liked'],
    ['COMMENT', 'replied to'],
  ])

  try {
    // 根据postId获取post
    const post = await prisma.post.findUnique({
      where: {
        id: postId
      }
    })

    if (post?.userId) {
      // 通知表 创建新的通知
      await prisma.notification.create({
        data: {
          body: `Someone ${operationTextMap.get(operation)} your tweet!`,
          userId: post.userId
        }
      })

      // 更新user表的通知状态
      await prisma.user.update({
        where: {
          id: post.userId
        },
        data: {
          hasNotification: true,
        }
      })
    }

  } catch (error) {
    console.log(error);
  }

}

export default createNewNotification;