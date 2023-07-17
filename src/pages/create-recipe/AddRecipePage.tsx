
import DefaultLayout from '../../components/layout/DefaultLayout/DefaultLayout'
import { SubmitHandler, useForm } from 'react-hook-form'
import RecipeForm from './components/RecipeForm'
import IngredientForm from './components/IngredientForm'
import StepForm from './components/StepForm'
import { Form } from 'antd'

const AddRecipePage = () => {
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      ingredients: [{name: '', amount: ''}],
      steps: [{description: '', image: []}]
    }
  })

  const onSubmit: SubmitHandler<any> = (values) => {
    console.log(values)
  };

  
  return (
    <DefaultLayout className="width1" type='edit' text='Lên sóng'>
      <Form onFinish={handleSubmit(onSubmit)}>
        <RecipeForm control={control} error={errors} />
        <IngredientForm control={control} error={errors} />
        <StepForm control={control} error={errors}/>
      </Form>
    </DefaultLayout>
  )
}

export default AddRecipePage
