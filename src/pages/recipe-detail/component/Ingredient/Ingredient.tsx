import { Fragment } from "react";
import Section from "../../../../components/Section/Section";
import { ClockCircleOutlined, UserOutlined } from "@ant-design/icons";
import { formatTime } from "../../../../utils/[format-time]";

const Ingredient: React.FC<Partial<Recipe.TRecipeDetailResponse>> = ({
  amount,
  cookingTime,
  preparationTime,
  DetailIngredients,
}) => {
  let output: JSX.Element[] = [];
  DetailIngredients &&
    DetailIngredients.map((item) => {
      output.push(
        <p key={item.ingredientId} className="mb-3">
          <b>{item.amount + " " + item.unit}</b> {item.name}
        </p>
      );
      output.push(
        <p
          key={item.name}
          className="w-full border-dotted border-stone-200 h-px border mb-3"
        ></p>
      );
    });
  output.pop();
  return (
    <Section>
      <Fragment>
        <h3>Nguyên liệu</h3>
        <div className="flex flex-wrap mb-3">
          <div className="mr-5 flex items-center justify-center">
            <ClockCircleOutlined />
            {preparationTime && (
              <span className="ml-2">
                {formatTime(preparationTime)} chuẩn bị
              </span>
            )}
          </div>
          <div className="mr-5 flex items-center justify-center">
            <UserOutlined />
            {amount && <span className="ml-2">{amount} người</span>}
          </div>
          <div className="mr-5 flex items-center justify-center">
            <ClockCircleOutlined />
            {cookingTime && (
              <span className="ml-2">{formatTime(cookingTime)} nấu nướng</span>
            )}
          </div>
        </div>
        {output.map((item) => item)}
      </Fragment>
    </Section>
  );
};

export default Ingredient;
