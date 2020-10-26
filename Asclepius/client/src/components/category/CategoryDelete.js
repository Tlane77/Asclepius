import React, { useEffect, useContext, useState } from "react";
import { CategoryContext } from '../../providers/CategoryProvider';
import { useParams, useHistory } from 'react-router-dom';
import Category from './Category';
import { Button, Row } from 'reactstrap';
import "./Category.css"

const CategoryDelete = () => {
    const [category, setCategory] = useState();
    const { getById, deleteCategory } = useContext(CategoryContext);
    const { id } = useParams();
    const history = useHistory();

    useEffect(() => {
        getById(id).then(setCategory);
    }, []);

    const handleDelete = (id) => {
        deleteCategory(category.id)
            .then(() => history.push("/category"))

    }

    if (!category) {
        return null;
    }

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col">
                    <h3>Are you sure you want to delete this Category?: "{category.name}"?</h3>
                    <br></br>
                    <Row >
                        <Button
                            className="deleteCategoryButton"
                            color="danger"
                            onClick={handleDelete}>
                            Delete</Button>
                        <Button type="button"
                            className="goBackCategoryButton"
                            onClick={e => {
                                history.push("/category")
                            }}>Go Back</Button>
                    </Row>
                </div>
            </div>
        </div>
    )
}

export default CategoryDelete;