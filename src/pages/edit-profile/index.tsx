import { Skeleton } from 'antd'
import { useUser } from '../../services/Auth/service'
import EditProfileForm from './components/EditProfileForm'
import { Fragment } from 'react'

const EditProfilePage = () => {
    const {isLoading, data} = useUser()
    return (
        <Fragment>
            {isLoading ? <Skeleton /> : <EditProfileForm user={data}/>}
        </Fragment>
    )
}

export default EditProfilePage
