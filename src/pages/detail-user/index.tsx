import { useParams, useSearchParams } from "react-router-dom";
import Section from "../../components/Section/Section";
import DefaultLayout from "../../components/layout/DefaultLayout/DefaultLayout";
import DetailInfo from "./components/Info";
import { Tabs, TabsProps } from "antd";
import Recipe from "./components/Recipe";
import BookMarkList from "./components/BookMarkList";
import { useGetRecipeByUserId, useGetRecipeFavorite } from "../../services/Recipe/service";

const DetailUser = () => {
  const { userId } = useParams();
  const { data, isLoading } = useGetRecipeByUserId(userId || '')
  const { data: recipes, isLoading: recipeFavoriteLoading } = useGetRecipeFavorite()
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: `Công thức`,
      children: <Recipe data={data} isLoading={isLoading}/>,
    },
    {
      key: '2',
      label: `Đã lưu`,
      children: <BookMarkList userId={userId || ''}/>,
    },
    {
      key: '3',
      label: `Yêu thích`,
      children: <Recipe data={recipes} isLoading={recipeFavoriteLoading}/>,
    },
  ];

  return (
    <DefaultLayout className="width">
      <DetailInfo userId={userId || ''}/>
      <Tabs defaultActiveKey="1" items={items} centered size="large"/>
    </DefaultLayout>
  );
};

export default DetailUser;
