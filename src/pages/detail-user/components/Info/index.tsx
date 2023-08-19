import { Button, Skeleton } from "antd"
import { useGetUserById } from "../../../../services/User/service"
import useInfo from "./hooks/useInfo"
import no_avatar from '../../../../assets/images/no_avatar.png'

const DetailInfo = ({ userId, isMyProfile }: { userId: string, isMyProfile: boolean }) => {
    const { data, isLoading } = useGetUserById(userId || '')
    const { handleFollow, handleUnFollow, followLoading, unfollowLoading } = useInfo(userId)
    return (
        <div className="mb-5">
            {isLoading ?
                <Skeleton active />
                :
                <div className="flex justify-center flex-wrap mt-5 gap-10 max-sm:gap-4">
                    <img
                        src={data.avatar ? data.avatar : no_avatar}
                        alt={userId}
                        className="object-cover rounded-full w-[150px] h-[150px]"
                    />
                    <div className="grid grid-rows-4">
                        <div className="flex gap-3 items-center max-sm:justify-center">
                            <h4>{data?.fullName}</h4>
                            {!isMyProfile && (data?.isFollow ?
                                <Button onClick={handleUnFollow} loading={unfollowLoading} size="middle" className="btn-filled">Đang theo dõi</Button> :
                                <Button onClick={handleFollow} loading={followLoading} size="middle" className="btn-outlined">Theo dõi</Button>
                            )}
                        </div>
                        <div className="grid grid-cols-3 gap-3 mb-3">
                            <div className="flex flex-wrap gap-1 max-sm:flex-col max-sm:items-center">
                                <b>{data?.countRecipe}</b>
                                <span>công thức</span>
                            </div>
                            <div className="flex flex-wrap gap-1 max-sm:flex-col max-sm:items-center">
                                <b>{data?.countFollowed}</b>
                                <span>người theo dõi</span>
                            </div>
                            <div className="flex flex-wrap gap-1 max-sm:flex-col max-sm:items-center">
                                <b>{data?.countFollowing}</b>
                                <span>người đang theo dõi</span>
                            </div>
                        </div>
                        {data?.address && <span>Hiện đang sinh sống tại {data?.address}</span>}
                        <span>{data?.introduce && data?.introduce}</span>
                    </div>
                </div>
            }
        </div>
    )
}

export default DetailInfo