import React from 'react';
import { Card, CardTitle, CardBody, CardText, Button, Row, Col, Table } from 'reactstrap';
import { Link, } from "react-router-dom";
import "./Category.css"

const Category = ({ category }) => {
    return (
        <>
            <div className="container">
                <div className="row justify-content-left">

                    <Table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>

                        <tbody key={category.id}>
                            <tr>
                                <td>{category.name}</td>
                                <td><Link to={`/category/${category.id}/edit`}><Button className="editCategoryButton" color="primary">Edit</Button></Link></td>
                                <td><Link to={`/category/${category.id}/delete`}><Button className="deleteCategoryButton" color="danger">Delete</Button></Link></td>

                            </tr>
                        </tbody>

                    </Table>
                </div>
            </div>



        </>
    );
};

export default Category;