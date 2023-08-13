import { notification } from "antd"
import { useFollow, useUnfollow } from "../../../../../services/User/service"
import { useQueryClient } from "@tanstack/react-query"

const useInfo = (userId: string) => {
    const {mutate: follow, isLoading: followLoading} = useFollow()
    const {mutate: unfollow, isLoading: unfollowLoading} = useUnfollow()
    const queryClient = useQueryClient()

    const handleFollow = () => {
        follow(userId, {
            onSuccess: (data) => {
                if(data.status === 200){
                    notification.success({
                        message: 'Theo dõi người dùng thành công'
                    })
                    queryClient.invalidateQueries(['userById', userId]);
                }
            }
        })
    }

    const handleUnFollow = () => {
        unfollow(userId, {
            onSuccess: (data) => {
                if(data.status === 200){
                    notification.success({
                        message: 'Hủy theo dõi người dùng thành công'
                    })
                    queryClient.invalidateQueries(['userById', userId]);
                }
            }
        })
    }
    return {
        handleFollow,
        handleUnFollow,
        followLoading,
        unfollowLoading
    }
}

export default useInfo