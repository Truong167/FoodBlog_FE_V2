import { useQueryClient } from "@tanstack/react-query";
import { useFollow, useUnfollow } from "../../../services/User/service";
import { notification } from "antd";
import {
  useDislikeRecipe,
  useLikeRecipe,
  useRecipeById,
} from "../../../services/Recipe/service";

const useRecipeDetail = (userId: string, recipeId: string) => {
  const { mutate: follow, isLoading: followLoading } = useFollow();
  const { mutate: unfollow, isLoading: unfollowLoading } = useUnfollow();
  const { mutate: like } = useLikeRecipe();
  const { mutate: dislike } = useDislikeRecipe();
  const {refetch} = useRecipeById(recipeId)
  const queryClient = useQueryClient();

  const handleFollow = () => {
    follow(userId, {
      onSuccess: (data) => {
        if (data.status === 200) {
          notification.success({
            message: "Theo dõi người dùng thành công",
          });
          queryClient.invalidateQueries(["singleRecipe", recipeId]);
        }
      },
    });
  };

  const handleUnFollow = () => {
    unfollow(userId, {
      onSuccess: (data) => {
        if (data.status === 200) {
          notification.success({
            message: "Hủy theo dõi người dùng thành công",
          });
          queryClient.invalidateQueries(["singleRecipe", recipeId]);
        }
      },
    });
  };

  const handleLike = () => {
    like(parseInt(recipeId), {
      onSuccess: (data) => {
        refetch()
      },
    });
  };

  const handleUnLike = () => {
    dislike(parseInt(recipeId), {
      onSuccess: (data) => {
        refetch()
      },
    });
  };

  return {
    handleFollow,
    handleUnFollow,
    followLoading,
    unfollowLoading,
    handleLike,
    handleUnLike,
  };
};

export default useRecipeDetail;
