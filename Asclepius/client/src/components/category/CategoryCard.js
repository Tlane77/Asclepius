import React from 'react';
import category from "./Category"

const CategoryCard = (props) => {
  return (
    <div className={"category-card " + category.name}>
      <span className="category-card__name">
        {props.category.name}
      </span>
    </div>
  );
};

export default CategoryCard;