import { Form } from "antd"



const FormItem: React.FC<Partial<Recipe.TPropsForm>> = ({
    label,
    children,
    className,
}) => {
    return (
        <Form.Item label={label} className={className}>
            {children}
        </Form.Item>
    )
}

export default FormItem