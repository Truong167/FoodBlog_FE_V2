import { Button, Modal } from "antd"
import React, { Fragment } from "react"

type TModalDelete = {
    isDeleteModalOpen: boolean,
    setIsDeleteModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
    isLoading: boolean,
    handleConfirm: () => void
}

const ModalDelete: React.FC<TModalDelete> = ({isDeleteModalOpen, setIsDeleteModalOpen, isLoading, handleConfirm}) => {
    return (
        <Modal
      title='Xác nhận xóa công thức'
      open={isDeleteModalOpen}
      onCancel={() => setIsDeleteModalOpen(false)}
      centered
      footer={[
        <Fragment key="footer">
          <Button
            onClick={() => setIsDeleteModalOpen(false)}
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
        <p>
        Bạn có chắc muốn xóa công thức
      </p>
      </Modal>
    )
}

export default ModalDelete