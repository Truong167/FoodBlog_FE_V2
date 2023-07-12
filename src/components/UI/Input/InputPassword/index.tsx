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
    error,
    placeholder,
    prefix,
    className,
}) => {
    const isError = error.hasOwnProperty(name) ? `error` : `focus hover`;
    return (
      <Fragment>
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <Input.Password
              {...field}
              type={type}
              size={size}
              placeholder={placeholder}
              prefix={prefix}
              className={classNames(isError, className)}
            />
          )}
        />
        <ValidateError error={error} name={name} />
      </Fragment>
    );
}

export default InputPassword