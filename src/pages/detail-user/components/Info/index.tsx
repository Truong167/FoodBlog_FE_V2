import { Button, Skeleton } from "antd"
import { useGetUserById } from "../../../../services/User/service"
import useInfo from "./hooks/useInfo"

const DetailInfo = ({ userId, isMyProfile }: { userId: string, isMyProfile: boolean }) => {
    const { data, isLoading } = useGetUserById(userId || '')
    const {handleFollow, handleUnFollow, followLoading, unfollowLoading} = useInfo(userId)
    return (
        <div className="mb-5">
            {isLoading ?
                <Skeleton active />
                :
                <div className="flex justify-center mt-5 gap-10">
                    <img
                        src={data.avatar}
                        alt={userId}
                        className="object-cover rounded-full w-[150px] h-[150px]"
                    />
                    <div className="grid grid-rows-4">
                        <div className="flex gap-3 items-center">
                            <h4>{data?.fullName}</h4>
                            {!isMyProfile && (data?.isFollow ?
                                <Button onClick={handleUnFollow} loading={unfollowLoading} size="middle" className="btn-filled">Đang theo dõi</Button> :
                                <Button onClick={handleFollow} loading={followLoading} size="middle" className="btn-outlined">Theo dõi</Button>
                            )}
                        </div>
                        <div className="grid grid-cols-3">
                            <span><b>{data?.countRecipe}</b> công thức</span>
                            <span><b>{data?.countFollowed}</b> người theo dõi</span>
                            <span><b>{data?.countFollowing}</b> người đang theo dõi</span>
                        </div>
                        <div>Hiện đang sinh sống tại {data?.address}</div>
                        <div>
                            <p>{data?.introduce && data?.introduce}</p>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default DetailInfo