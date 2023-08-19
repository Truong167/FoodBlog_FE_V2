import React, { ChangeEvent, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Popover } from "antd";
import logo from "../../assets/images/logo2.png";
import { Link } from "react-router-dom";
import { useSearch } from "./hooks/useSearch";

const SearchContainer: React.FC = () => {
  const { handleChangeSearch, data, value } = useSearch();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isPopoverClicked, setIsPopoverClicked] = useState<boolean>(false);
  const isValid = data && Array.isArray(data) && value;
  const handleBlur = () => {
    if (isPopoverClicked) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  };
  const result = (
    <div>
      {isValid ? (
        data.map((item, index) => {
          return (
            <Link
              key={index}
              className="hover:text-black"
              onMouseDown={() => setIsPopoverClicked(true)}
              to={`search/${item.recipeName}`}
            >
              <p className="py-1 pl-2 cursor-pointer hover:bg-[rgba(248,246,242,1)] hover:text-black">
                {item.recipeName}
              </p>
            </Link>
          );
        })
      ) : (
        <p>Không có kết quả ....</p>
      )}
    </div>
  );
  return (
    <div className="flex justify-center mt-3 w-full">
      <div className="flex justify-center flex-col w-[50%] max-sm:w-[100%] gap-8">
        <div className="flex justify-center">
          <img src={logo} alt={logo} className="w-[40%]" />
        </div>
        <div className="w-full">
          <Popover
            open={value && isOpen ? true : false}
            content={result}
            arrow={false}
            placement="bottom"
            overlayClassName='w-[31%] max-sm:w-[90%]'
            zIndex={1}
          >
            <Input
              onFocus={() => setIsOpen(true)}
              onBlur={handleBlur}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleChangeSearch(e)
              }
              placeholder="Gõ vào tên công thức..."
              prefix={<SearchOutlined />}
              style={{ caretColor: "#f93" }}
              size="large"
              className="focus hover caret-primary-1"
              suffix={<Link
                className="hover:text-black"
                onMouseDown={() => setIsPopoverClicked(true)}
                to={`search/${value}`}
              >
                <Button disabled={!value} className='btn-filled'>Tìm kiếm</Button>
              </Link>}
            />
          </Popover>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default SearchContainer;
