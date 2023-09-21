import { useParams } from "react-router-dom";
import Section from "../../components/Section/Section";
import DefaultLayout from "../../components/layout/DefaultLayout/DefaultLayout";
import { useSearchResultRecipe } from "../../services/Recipe/service";
import { Empty, Skeleton } from "antd";
import { Fragment } from "react";
import RecipeCard from "../../components/Recipe/RecipeItem/RecipeCard";

const SearchResult = () => {
  const { recipeName } = useParams();
  const { data, isLoading } = useSearchResultRecipe(recipeName || "");
  
  return (
    <DefaultLayout className="width">
      <Section>
        {isLoading ? (
          <Skeleton active />
        ) : data ?
          <Fragment>
            <h4>Kết quả tìm kiếm với từ khóa {`"${recipeName}"`}</h4>
            <div className="grid grid-cols-4 gap-y-4 gap-x-1 mt-4">
              {data.map((item: any) => (
                <RecipeCard {...item} key={item.recipeId} />
              ))}
            </div>
          </Fragment> : 
            <Empty description={`Không có kết quả với từ khóa "${recipeName}"`}/>
        }
      </Section>
    </DefaultLayout>
  );
};

export default SearchResult;
