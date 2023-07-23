
import DefaultLayout from '../../components/layout/DefaultLayout/DefaultLayout'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Form, Skeleton } from 'antd'
import { useUser } from '../../services/Auth/service'
import { useEditProfile } from './hooks/useEditProfile'
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
