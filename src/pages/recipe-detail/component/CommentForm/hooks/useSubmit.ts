import { EmojiClickData } from "emoji-picker-react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  useCreateComment,
  useDeleteComment,
  useUpdateComment,
} from "../../../../../services/Recipe/service";
import { notification } from "antd";
import { useQueryClient } from "@tanstack/react-query";

const useSubmitComment = (
  recipeId: string,
  commentId: string,
  type: string,
  setIsDeleteModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setType: React.Dispatch<React.SetStateAction<string>>
) => {
  const queryClient = useQueryClient();
  const { control, watch, setValue, handleSubmit, resetField, setFocus, getValues } =
    useForm<Recipe.TComment>();
  const { mutate } = useCreateComment();
  const { mutate: deleteComment, isLoading: deleteCommentLoading } =
    useDeleteComment();
  const { mutate: updateComment} = useUpdateComment();
  const watchComment = watch("comment");
  const onEmojiClick = (emojiData: EmojiClickData, event: MouseEvent) => {
    setValue("comment", getValues('comment') + emojiData.emoji);
  };

  const handleConfirm = () => {
    deleteComment(commentId, {
      onSuccess: (data) => {
        if (data.status === 200) {
          queryClient.invalidateQueries(["comment", recipeId]);
          notification.success({
            message: "Xóa bình luận thành công",
          });
        }
        setIsDeleteModalOpen(false);
      },
    });
  };

  const onSubmit: SubmitHandler<Recipe.TComment> = (values) => {
    if (values.comment?.trim() === "") {
      return;
    }
    const validateData = values.comment?.replace(/\s+/g, " ").trim();
    if (type === "update") {
      updateComment(
        {
          params: {
            commentId,
            body: {
              comment: validateData,
            },
          },
        },
        {
          onSuccess: (data) => {
            if (data.status === 200) {
              resetField("comment");
              setValue('comment', '')
              queryClient.invalidateQueries(["comment", recipeId]);
              notification.success({
                message: "Sửa bình luận thành công",
              });
            }
            setType('')
          },
        }
      );
    } else {
      mutate(
        {
          params: {
            recipeId,
            body: {
              comment: validateData,
            },
          },
        },
        {
          onSuccess: (data) => {
            if (data.status === 200) {
              resetField("comment");
              setValue('comment', '')
              queryClient.invalidateQueries(["comment", recipeId]);
              notification.success({
                message: "Thêm bình luận thành công",
              });
            }
          },
          onError: (error) => {},
        }
      );
    }
  };

  return {
    control,
    onEmojiClick,
    handleSubmit,
    onSubmit,
    setValue,
    watch,
    handleConfirm,
    deleteCommentLoading,
    setFocus
  };
};

export default useSubmitComment;
