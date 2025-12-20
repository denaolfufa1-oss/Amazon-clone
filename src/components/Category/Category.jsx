import React from 'react';
import {categoryInfo} from './CatagoryFullInfos'
import CategoryCard from './CategoryCard';
import classes from './catagory.module.css'

// Category.jsx - Fix Option 1 (Implicit Return)
function Category(){
    return (
        <div className={classes.Category_container}>
            {categoryInfo.map((item) => (
                <CategoryCard data={item}/>
            ))}
        </div>
    );
}

export default Category;
