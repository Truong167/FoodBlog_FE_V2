import { Button, Form, Modal } from "antd"
import React, { Fragment } from "react"
import AntdRadio from "../../../../UI/Radio"
import { GlobalOutlined, LockOutlined } from "@ant-design/icons";
import useSubmit from "./hooks/useSubmit";
import { useForm } from "antd/es/form/Form";


type TModalPrivacy = {
  isPrivacyModalOpen: boolean,
  setIsPrivacyModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
  isLoading?: boolean,
  handleConfirm?: () => void
  status: string
  recipeId: number
}

const PRIVACY_RADIO = [
  {
    value: 'CK',
    label: (
      <div className="ml-3 flex items-center gap-5 mb-3">
        <GlobalOutlined className="text-2xl"/>
        <div className='text-left w-full text-lg'>
          <h6>Công khai</h6>
          <p>Bất kì ai đều có thể thấy công thức của bạn</p>
        </div>
      </div>
    )
  },
  {
    value: 'RT',
    label: (
      <div className="ml-3 flex items-center gap-5 mb-3">
        <LockOutlined className="text-2xl" />
        <div className='text-left w-full text-lg'>
          <h6>Riêng tư</h6>
          <p>Ẩn công thức của bạn với mọi người</p>
        </div>
      </div>
    )
  },
]


const ModalPrivacy: React.FC<TModalPrivacy> = ({ isPrivacyModalOpen, setIsPrivacyModalOpen, status, recipeId }) => {
  const [form] = useForm()
  const {control, reset, handleSubmit, onSubmit, isLoading, handleConfirm} = useSubmit(recipeId, status, form, setIsPrivacyModalOpen)
  const handleCancel = () => {
    reset()
    setIsPrivacyModalOpen(false)
  }

  return (
    <Modal
      title='Thay đổi quyền riêng tư'
      open={isPrivacyModalOpen}
      onCancel={handleCancel}
      centered
      footer={[
        <Fragment key="footer">
          <Button
            loading={isLoading}
            onClick={handleCancel}
            key="cancel"
            className="btn-outlined btn-large text-body-1-medium"
          >
            Hủy
          </Button>
          <Button
            loading={isLoading}
            key="submit"
            className="btn-filled btn-large text-body-1-medium"
            onClick={handleConfirm}
          >
            Xác nhận
          </Button>
        </Fragment>,
      ]}
    >
      <Form onFinish={handleSubmit(onSubmit)} form={form}>
          <AntdRadio 
            className="mt-3 mb-3"
            size="large"
            control={control}
            name="status"
            options={PRIVACY_RADIO}
          />
      </Form>
    </Modal>
  )
}

export default ModalPrivacy