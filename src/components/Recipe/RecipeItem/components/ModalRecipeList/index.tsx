import { Button, Form, Modal } from "antd"
import React, { Fragment } from "react"
import AntdCheckbox from "../../../../UI/Checkbox"
import useRecipeList from "./hooks/useRecipeList"
import { useForm } from "antd/es/form/Form";


type TModalRecipeList = {
  isRecipeListModalOpen: boolean,
  setIsRecipeListModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
  bookmarkList: { recipeListId: number, name: string, isBookmarked: boolean }[] | string,
  recipeId: number
}

const ModalRecipeList: React.FC<TModalRecipeList> = ({ bookmarkList, isRecipeListModalOpen, setIsRecipeListModalOpen, recipeId }) => {
  const { control, fields, handleSubmit, onSubmit, isLoading } = useRecipeList(bookmarkList, recipeId, setIsRecipeListModalOpen)
  const [form] = useForm()
  return (
    <Modal
      closable={false}
      title='Danh sách công thức'
      open={isRecipeListModalOpen}
      onCancel={() => setIsRecipeListModalOpen(false)}
      centered
      footer={[
        <Fragment key="footer">
          <Button
            loading={isLoading}
            onClick={() => setIsRecipeListModalOpen(false)}
            key="cancel"
            className="btn-outlined btn-large text-body-1-medium"
          >
            Hủy
          </Button>
          <Button
            onClick={() => form.submit()}
            loading={isLoading}
            key="submit"
            className="btn-filled btn-large text-body-1-medium"
          >
            Xác nhận
          </Button>
        </Fragment>,
      ]}
    >
      <Form className="grid mt-5 mb-5 gap-4" layout="vertical" form={form} onFinish={handleSubmit(onSubmit)}>
        {fields.map((item: { recipeListId: number, name: string, isBookmarked: boolean }, index) => {
          return (
            <AntdCheckbox
              defaultChecked={item.isBookmarked}
              control={control}
              name={`recipeListDetail.${index}.isBookmarked`}
              value={item.name}
              className="text-base"
            />
          )
        })}
      </Form>
    </Modal>
  )
}

export default ModalRecipeList