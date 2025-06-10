import Modal from "../Modal/Modal";
import PostList from "../PostList/PostList";
import SearchBox from "../SearchBox/SearchBox";
import Pagination from "../Pagination/Pagination";
import { useDebounce } from "use-debounce";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import css from "./App.module.css";
import { useState } from "react";
import { fetchPosts } from "../../services/postService";
import PostForm from "../CreatePostForm/CreatePostForm";
import EditPostForm from "../EditPostForm/EditPostForm";
import { Post } from "../../types/post";

export default function App() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [debouncedSearchQuery] = useDebounce(searchQuery, 300);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [isCreatePost, setIsCreatePost] = useState<boolean>(false);
  const [isEditPost, setIsEditPost] = useState<boolean>(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const limit = 12;
  const { data, isSuccess } = useQuery({
    queryKey: ["postList", debouncedSearchQuery, currentPage],
    queryFn: () => fetchPosts(debouncedSearchQuery, currentPage, limit),
    placeholderData: keepPreviousData,
  });

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };
  const totalPages = isSuccess && data ? Math.ceil(data.total / limit) : 0;

  const updateSearchQuery = (text: string) => {
    setCurrentPage(1);
    setSearchQuery(text);
  };

  const closeModal = () => {
    setIsOpenModal(false);
    setIsCreatePost(false);
    setIsEditPost(false);
    setSelectedPost(null);
  };

  const handleCreatePost = () => {
    setIsCreatePost(true);
    setIsEditPost(false);
    setIsOpenModal(true);
  };
  const handleEditPost = (post: Post) => {
    setSelectedPost(post);
    setIsEditPost(true);
    setIsCreatePost(false);
    setIsOpenModal(true);
  };

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onChange={updateSearchQuery} searchQuery={searchQuery} />
        {totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={onPageChange}
          />
        )}
        <button onClick={handleCreatePost} className={css.button}>
          Create post
        </button>
      </header>
      {isOpenModal && (
        <Modal>
          {isEditPost && selectedPost && <EditPostForm post={selectedPost} onClose={closeModal} />}
          {isCreatePost && <PostForm onClose={closeModal} />}
        </Modal>
      )}
      {isSuccess && data.posts.length > 0 && (
        <PostList onEditPost={handleEditPost} posts={data.posts} />
      )}
      {/* {isOpenModal && <PostForm onClose={closeModal} />} */}
      {/* {isEditPost && <EditPostForm />} */}
    </div>
  );
}
