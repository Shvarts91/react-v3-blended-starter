import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Post } from "../../types/post";
import css from "./PostList.module.css";
import { deletePost } from "../../services/postService";

interface PostListProps {
  posts: Post[];
  onEditPost: (post: Post) => void;
}

export default function PostList({ posts, onEditPost }: PostListProps) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["postList"] });
      alert("Post delleted successfully!");
    },
  });

  return (
    <ul className={css.list}>
      {posts.map((post) => {
        return (
          <li key={post.id} className={css.listItem}>
            <h2 className={css.title}>{post.title}</h2>
            <p className={css.content}>{post.body}</p>
            <div className={css.footer}>
              <button onClick={() => onEditPost(post)} className={css.edit}>
                Edit
              </button>
              <button onClick={() => mutation.mutate(post.id)} className={css.delete}>
                Delete
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
