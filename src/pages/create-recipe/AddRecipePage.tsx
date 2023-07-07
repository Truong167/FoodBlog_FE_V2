import React from 'react'
import DefaultLayout from '../../components/layout/DefaultLayout/DefaultLayout'
import { useForm } from 'react-hook-form'
import AntdDragger from '../../components/UI/Upload'
import ImageForm from './components/ImageForm'
import RecipeForm from './components/RecipeForm'

const AddRecipePage = () => {
    const {control, handleSubmit, formState: {errors}} = useForm()
  return (
    <DefaultLayout className="width1">
        <RecipeForm control={control} error={errors}/>
    </DefaultLayout>
  )
}

export default AddRecipePage
