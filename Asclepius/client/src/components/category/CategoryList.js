import React, { useContext, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { CategoryContext } from '../../providers/CategoryProvider';
import Category from './Category';
import { Button, ListGroup, Row, Table } from 'reactstrap';
import { Link } from "react-router-dom";
import "./Category.css"

const CategoryList = (props) => {
    const { categories, getAllCategories, getById, deleteCategory } = useContext(CategoryContext);

    useEffect(() => {
        getAllCategories();
    }, []);

    return (
        <div className="container">

            <Row>

                <p><Link to={`/category/add`}>Add New Category</Link></p>

            </Row>
            <br></br>
            <div className="row justify-content-left">

                <Table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    {categories.map((category) => (
                        <tbody key={category.id}>
                            <tr>
                                <td>{category.name}</td>
                                {category.id != 10 ? <td><Link to={`/category/${category.id}/edit`}><Button className="editCategoryButton" color="success">Edit</Button></Link></td> : <td>Edit Not Allowed.</td>}
                                {category.id != 10 ? <td><Link to={`/category/${category.id}/delete`}><Button className="deleteCategoryButton" color="warning">Delete</Button></Link></td> : <td>Delete Not Allowed.</td>}

                            </tr>
                        </tbody>
                    ))}
                </Table>
            </div>




        </div>
    )
}

export default CategoryList;