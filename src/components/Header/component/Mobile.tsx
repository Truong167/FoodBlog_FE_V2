import { Drawer } from "antd"
import React from "react"
import { Link } from "react-router-dom"
import { useQueryClient } from "@tanstack/react-query"
import { LOCAL_STORAGE_TOKEN_NAME } from "../../../contants/constant"

const Mobile = ({ isOpen, setIsOpen, userId, fullName }: { isOpen: boolean, setIsOpen: React.Dispatch<React.SetStateAction<boolean>>, userId: number, fullName: string }) => {
    const queryClient = useQueryClient()
    const logout = () => {
        localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME)
        queryClient.setQueryData(['isAuthenticated'], false)
    }
    return (
        <Drawer
            title={fullName}
            placement='right'
            width={200}
            onClose={() => setIsOpen(false)}
            open={isOpen}
            closable={false}
        >
            <div className="flex flex-col gap-3">
                <Link to={'/create-recipe'} className='hover:text-primary-1 ease-in-out'>
                    Viết món mới
                </Link>
                <Link to={`/user/${userId}`} className='hover:text-primary-1 ease-in-out'>
                    Xem trang cá nhân
                </Link>
                <Link to={'/edit-profile'} className='hover:text-primary-1 ease-in-out'>
                    Chỉnh sửa thông tin
                </Link>
                <span onClick={logout} className='hover:text-primary-1 ease-in-out'>
                    Đăng xuất
                </span>
            </div>
        </Drawer>
    )
}


export default Mobile