import React, { useEffect, useState } from 'react'
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import classes from './RecipeList.module.css'
import RecipeCard from './RecipeItem/RecipeCard';
import useViewport from '../../hooks/useViewPort';

const RecipeList = ({ recipes }: { recipes: any }) => {
  const { width: deviceWidth } = useViewport()
  const [settings, setSettings] = useState({
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 2
  })
  useEffect(() => {
    if (deviceWidth <= 476) setSettings({ ...settings, slidesToShow: 1, slidesToScroll: 1 });
  }, [deviceWidth]);
  return (
    <div className={classes.container}>
      {recipes && Array.isArray(recipes) && recipes.length > 0 ? (recipes.length > 4 ?
        <Slider {...settings}>
          {recipes.map((item: any) => (
            <RecipeCard {...item} key={item.recipeId} />
          ))}
        </Slider>
        :
        <div className={classes.content}>
          {recipes.map((item: any) => (
            <RecipeCard {...item} key={item.recipeId} />
          ))}
        </div>
      ) : <h3>Không có công thức phù hợp</h3>
      }
    </div>

  )
}

export default RecipeList
