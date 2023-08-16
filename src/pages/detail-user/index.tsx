import { useParams } from "react-router-dom";
import DefaultLayout from "../../components/layout/DefaultLayout/DefaultLayout";
import DetailInfo from "./components/Info";
import { Tabs, TabsProps } from "antd";
import Recipe from "./components/Recipe";
import BookMarkList from "./components/BookMarkList";
import {useGetMyRecipe, useGetRecipeByUserId, useGetRecipeFavorite } from "../../services/Recipe/service";
import { useQueryClient } from "@tanstack/react-query";
import { useRecipeList } from "../../services/RecipeList/service";

const DetailUser = () => {
  const { userId } = useParams();
  const queryClient = useQueryClient()
  const currentUser: AUTH.TUser | undefined = queryClient.getQueryData(['currentUser'])
  const { data, isLoading } = useGetMyRecipe()
  const {data: recipeByUserId, isLoading: recipeByUserIdLoading} = useGetRecipeByUserId(userId || '')
  const { data: recipes, isLoading: recipeFavoriteLoading } = useGetRecipeFavorite()
  const {data: recipeList, isLoading: recipeListLoading} = useRecipeList()
  const isMyProfile = currentUser?.userId === parseInt(userId || '') ? true : false
  const itemDiffProfile: TabsProps['items'] = [
    {
      key: '1',
      label: `Công thức`,
      children: <Recipe data={recipeByUserId} isLoading={recipeByUserIdLoading}/>,
    },
    {
      key: '2',
      label: `Được gắn thẻ`,
      children: 'Waitting to development',
    },
  ]
  const itemMyProfile: TabsProps['items'] = [
    {
      key: '1',
      label: `Công thức`,
      children: <Recipe data={data} isLoading={isLoading}/>,
    },
    {
      key: '2',
      label: `Đã lưu`,
      children: <BookMarkList recipeList={recipeList} recipeListLoading={recipeListLoading}/>,
    },
    {
      key: '3',
      label: `Yêu thích`,
      children: <Recipe data={recipes} isLoading={recipeFavoriteLoading}/>,
    },
  ];

  return (
    <DefaultLayout className="width">
      <DetailInfo userId={userId || ''} isMyProfile={isMyProfile}/>
      <Tabs defaultActiveKey="1" items={isMyProfile ? itemMyProfile : itemDiffProfile} centered size="large"/>
    </DefaultLayout>
  );
};

export default DetailUser;
