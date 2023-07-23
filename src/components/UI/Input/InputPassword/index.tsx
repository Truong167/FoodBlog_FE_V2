import { Input } from "antd";
import classNames from "classnames";
import { Fragment } from "react";
import { Controller } from "react-hook-form";
import ValidateError from "../../ValidateError";

const InputPassword: React.FC<Recipe.TPropsForm> = ({
  name,
  control,
  type,
  size,
  placeholder,
  prefix,
  className,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Fragment>
          <Input.Password
            {...field}
            type={type}
            size={size}
            placeholder={placeholder}
            prefix={prefix}
            className={classNames(error ? `error` : `focus hover`, className)}
          />
          <ValidateError error={error} />
        </Fragment>
      )}
    />
  );
}

export default InputPassword