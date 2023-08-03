import { Button, Image, Skeleton } from "antd"
import { useGetUserById } from "../../../../services/User/service"
import { useParams } from "react-router-dom"
import { imageUrl } from "../../../../contants/constant"

const DetailInfo = ({ userId }: { userId: string }) => {
    const { data, isLoading } = useGetUserById(userId || '')
    const check = false
    console.log(data)
    return (
        <div className="mb-5">
            {isLoading ?
                <Skeleton active />
                :
                <div className="flex justify-center mt-5 gap-10">
                    <img
                        src={`${imageUrl}/${data.avatar}`}
                        className="object-cover rounded-full w-[150px] h-[150px]"
                    />
                    <div className="grid grid-rows-4">
                        <div className="flex gap-3 items-center">
                            <h4>{data?.fullName}</h4>
                            {check && (data?.isFollow ?
                                <Button size="middle" className="btn-filled">Đang theo dõi</Button> :
                                <Button size="middle" className="btn-outlined">Theo dõi</Button>
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