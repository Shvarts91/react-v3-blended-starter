import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";

import css from "./EditPostForm.module.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PostFormValues, Post } from "../../types/post";
import { editPost } from "../../services/postService";

interface EditPostFormProps {
  onClose: () => void;
  post: Post;
}

const EditPostSchema = Yup.object().shape({
  title: Yup.string().min(3, "Title must be at least 3 characters").required("Title is required"),
  body: Yup.string()
    .max(500, "Content must be less than 500 characters")
    .required("Content is required"),
});

export default function EditPostForm({ onClose, post }: EditPostFormProps) {
  const initialValues: PostFormValues = {
    title: post.title,
    body: post.body,
    id: post.id,
  };
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: editPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["postList"] });
      alert("Post edited successfully!");
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
    <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={EditPostSchema}>
      <Form className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor="title">Title</label>
          <Field id="title" type="text" name="title" className={css.input} />
          <ErrorMessage name="title" component="span" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="body">Content</label>
          <Field id="body" as="textarea" name="body" rows={8} className={css.textarea} />
          <ErrorMessage name="body" component="span" className={css.error} />
        </div>

        <div className={css.actions}>
          <button onClick={onClose} type="button" className={css.cancelButton}>
            Cancel
          </button>
          <button type="submit" className={css.submitButton}>
            Edit post
          </button>
        </div>
      </Form>
    </Formik>
  );
}
