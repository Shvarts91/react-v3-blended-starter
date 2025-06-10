import * as Yup from "yup";
import { Field, Form, Formik, FormikHelpers, ErrorMessage } from "formik";

import css from "./CreatePostForm.module.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost } from "../../services/postService";
import { PostFormValues } from "../../types/post";

interface PostFormProps {
  onClose: () => void;
}

const PostSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, "Title must be at least 3 characters")
    .max(50, "Content must be less than 50 characters")
    .required("Title is required"),
  body: Yup.string()
    .max(500, "Content must be less than 500 characters")
    .required("Content is required"),
});

const initialValues: PostFormValues = {
  title: "",
  body: "",
};

export default function PostForm({ onClose }: PostFormProps) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["postList"] });
      alert("Post created successfully!");
      onClose();
    },
  });

  const handleSubmit = async (values: PostFormValues, actions: FormikHelpers<PostFormValues>) => {
    const response = await mutation.mutateAsync(values);
    if (response) {
      actions.resetForm();
    }
  };
  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={PostSchema}>
      <Form className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor="title">Title</label>
          <Field id="title" type="text" name="title" className={css.input} />
          <ErrorMessage name="title" component="span" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="body">Content</label>
          <Field id="body" as="textarea" name="body" rows="8" className={css.textarea} />
          <ErrorMessage name="body" component="span" className={css.error} />
        </div>

        <div className={css.actions}>
          <button onClick={onClose} type="button" className={css.cancelButton}>
            Cancel
          </button>
          <button type="submit" className={css.submitButton} disabled={mutation.isPending}>
            Create post
          </button>
        </div>
      </Form>
    </Formik>
  );
}
