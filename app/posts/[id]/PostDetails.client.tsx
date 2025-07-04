'use client';

import { useParams, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

import { fetchPostById, fetchUserById } from '@/lib/api';

import css from './PostDetails.module.css';
import { useEffect, useState } from 'react';
import { User } from '@/types/user';
// import { User } from '@/types/user';

export default function PostDetailsClient() {
  const route = useRouter();
  const { id } = useParams<{ id: string }>();
  const parsedId = Number(id);
  const [user, setUser] = useState<User | null>(null);

  const handleClickBack = () => {
    route.back();
  };

  const {
    data: post,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['post', parsedId],
    queryFn: () => fetchPostById(parsedId),
  });

  useEffect(() => {
    if (!post) return;
    const fn = async () => {
      const response = await fetchUserById(post.userId);
      setUser(response);
    };
    fn();
  }, [post]);

  if (isLoading) <p>Loading... Please wait...</p>;
  if (error || !post) <p>Something went wrong...</p>;

  return (
    <>
      <div className={css.container}>
        <div className={css.item}>
          <button onClick={handleClickBack} className={css.backBtn}>
            ← Back
          </button>

          <div className={css.post}>
            <div className={css.wrapper}>
              <div className={css.header}>
                <h2>{post?.title}</h2>
              </div>

              <p className={css.content}>{post?.body}</p>
            </div>
            {user && <p className={css.user}>Author: {user.name}</p>}
          </div>
        </div>
      </div>
    </>
  );
}
