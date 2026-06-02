"use client"
import { useCallback, useMemo } from 'react'
import { formatDistanceToNowStrict } from 'date-fns'
import { useRouter } from 'next/navigation'
import React from 'react'
import Avatar from '../Avatar'
interface CommentItemProps {
  data: Record<string, any>
}

const CommentItem: React.FC<CommentItemProps> = ({ data }) => {
  const router = useRouter();

  const goToUser = useCallback((event: any) => {
    event.stopPropagation();

    router.push(`/users/${data?.authorId}`);
  }, [router, data?.authorId]);

  const createdAt = useMemo(() => {
    if (!data?.createdAt) return null;

    return formatDistanceToNowStrict(new Date(data?.createdAt));
  }, [data?.createdAt]);

  return (
    <div className="border-b border-neutral-800 p-5 cursor-pointer hover:bg-neutral-900 transition">
      <div className="flex items-start gap-3">
        {/* FIX: Avatar never shrinks */}
        <div className="shrink-0">
          <Avatar userId={data?.authorId} />
        </div>

        {/* FIX: Content takes remaining width */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <p
              onClick={goToUser}
              className="text-white font-semibold cursor-pointer hover:underline"
            >
              {data?.author?.name}
            </p>

            <span className="text-neutral-500 hidden md:block">
              @{data?.author?.username}
            </span>

            <span className="text-neutral-500 text-sm">{createdAt}</span>
          </div>

          <div className="text-white mt-1 whitespace-pre-wrap wrap-break-word">
            {data?.body}
          </div>
        </div>
      </div>
    </div>
  );
}


export default CommentItem
