import React, { useContext, useEffect, useState } from 'react';
import CategoryCard from './CategoryCard';
import { CategoryContext } from '../providers/CategoryProvider';

const CategorySearch = () => {
    const { category, searchCategory } = useContext(CategoryContext);
    const [name, setName] = useState("");

    useEffect(() => {
        searchCategory(name);
    }, []);

    return (
        <>
            <h1>Category Search</h1>
            <div className="instrument-search__form">
                <input id="search" value={name} onChange={e => setName(e.target.value)} />
                <button onClick={() => searchCategory(name)}>Search</button>
            </div>
            <div className="category-list">
                {category.map(category =>
                    <CategoryCard
                        key={category.id}
                        category={category}
                        allowEdit={false} />
                )}
            </div>
        </>
    );
}

export default CategorySearch;