import { Avatar, Button, Image, Skeleton } from "antd"
import { useGetUserById } from "../../../../services/User/service"
import { useParams } from "react-router-dom"
import { imageUrl } from "../../../../contants/constant"
import Meta from "antd/es/card/Meta"

const BookMarkList = ({ userId }: { userId: string }) => {
    const { data, isLoading } = useGetUserById(userId || '')
    const check = false
    console.log(data)
    return (
        <div className="mb-5">
            <div >
                    {/* <img src={`${imageUrl + item.image}`} alt={item.name}/>
                    <div id={item.recipeListId} className={classes['over-lay']} onClick={handleClick}>
                    </div>
                    <span>{item.name}</span>
                    <div id={item.recipeListId}>
                        <FontAwesomeIcon icon={faTrashAlt} className={classes.icon} onClick={handleOpenDialog}/>
                    </div> */}
                </div>
        </div>
    )
}

export default BookMarkList