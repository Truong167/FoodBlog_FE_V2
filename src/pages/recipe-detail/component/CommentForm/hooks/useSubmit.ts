import { EmojiClickData } from "emoji-picker-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useCreateComment } from "../../../../../services/Recipe/service";
import { notification } from "antd";
import { useQueryClient } from "@tanstack/react-query";

const useSubmitComment = (recipeId: string) => {
  const queryClient = useQueryClient();
  const { control, watch, setValue, handleSubmit, resetField } =
    useForm<Recipe.TComment>();
  const { mutate } = useCreateComment();
  const watchComment = watch("comment");
  const onEmojiClick = (emojiData: EmojiClickData, event: MouseEvent) => {
    setValue("comment", watchComment + emojiData.emoji);
  };

  const onSubmit: SubmitHandler<Recipe.TComment> = (values) => {
    if (values.comment?.trim() === "") {
      return;
    }
    const validateData = values.comment?.replace(/\s+/g, " ").trim();

    mutate(
      {
        params: {
          recipeId,
          body: {
            comment: validateData
          },
        },
      },
      {
        onSuccess: (data) => {
          if (data.status === 200) {
            resetField("comment");
            queryClient.invalidateQueries(["comment", recipeId]);
            notification.success({
              message: "Thêm bình luận thành công",
            });
          }
        },
        onError: (error) => {},
      }
    );
  };

  return {
    control,
    onEmojiClick,
    handleSubmit,
    onSubmit,
  };
};

export default useSubmitComment;
