import DefaultLayout from '../../components/layout/DefaultLayout/DefaultLayout'
import RecipeForm from '../../components/RecipeForm'
import IngredientForm from '../../components/IngredientForm'
import StepForm from '../../components/StepForm'
import { Form } from 'antd'
import ImageForm from '../../components/ImageForm'
import { useSubmit } from './hooks/useSubmit'

const AddRecipePage = () => {
  const {control, handleSubmit, onSubmit, isLoading} = useSubmit()
  const [form] = Form.useForm();

  return (
    <DefaultLayout className="width1" type='edit' text='Lên sóng' form={form} isLoading={isLoading}>
      <Form form={form} onFinish={handleSubmit(onSubmit)}>
        <ImageForm control={control} />
        <RecipeForm control={control} />
        <IngredientForm control={control} />
        <StepForm control={control} />
      </Form>
    </DefaultLayout>
  )
}

export default AddRecipePage
