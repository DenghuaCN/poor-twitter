import { useRouter } from "next/router";
import { useCallback, useMemo } from "react";
import { AiOutlineHeart, AiOutlineMessage } from "react-icons/ai";
import { formatDistanceToNowStrict } from "date-fns";

import useLoginModel from "@/hooks/useLoginModel";
import useCurrentUser from "@/hooks/useCurrentUser";

import Avatar from "../Avatar";

interface PostItemProps {
  data: Record<string, any>,
  userId?: string;
}

const PostItem: React.FC<PostItemProps> = ({ data, userId }) => {
  const router = useRouter();
  const loginModal = useLoginModel();

  const { data: currentUser } = useCurrentUser();

  /**
   * @desc click on Avatar
   */
  const goToUser = useCallback((event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    router.push(`/users/${data.user.id}`);
  }, [router, data.user.id]);

  /**
   * @desc click on Post
   */
  const goToPost = useCallback(() => {
    router.push(`/posts/${data.id}`);
  }, [router, data]);

  /**
   * @desc click on like component
   */
  const onLike = useCallback((event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();

    loginModal.onOpen();
  }, [loginModal]);

  /**
   * @desc 创建时间
   */
  const createdAt = useMemo(() => {
    if (!data?.createdAt) {
      return null;
    }

    return formatDistanceToNowStrict(new Date(data.createdAt));
  }, [data?.createdAt]);

  return (
    <div
      onClick={goToPost}
      className="border-b-[1px] border-neutral-800 p-5 cursor-pointer hover:bg-neutral-900 transition"
    >
      <div className="flex flex-row items-start gap-3">
        <Avatar userId={data.user.id} />
        <div>

          <div className="flex flex-row items-center gap-2">
            {/* Name */}
            <p onClick={goToUser} className="text-white font-semibold cursor-pointer hover:underline">{data.user.name}</p>
            {/* UserName */}
            <span onClick={goToUser} className="text-neutral-500 cursor-pointer hover:underline hidden md:block">@{data.user.username}</span>
            {/* CreatedAt */}
            <span className="text-neutral-500 text-sm">
              {createdAt}
            </span>
          </div>

          {/* Post Body */}
          <div className="text-white mt-1">{data.body}</div>

          <div className="flex flex-row items-center mt-3 gap-10">
            {/* Comments */}
            <div className="flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-sky-500">
              <AiOutlineMessage size={20} />
              <p>{data.comments?.length || 0}</p>
            </div>
            {/* Likes */}
            <div
              onClick={onLike}
              className="flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-red-500"
            >
              <AiOutlineHeart size={20} />
              <p>{data.likes?.length || 0}</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default PostItem;