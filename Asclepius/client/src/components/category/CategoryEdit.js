import React, { useState, useContext, useEffect } from 'react';
import { CategoryContext } from "../../providers/CategoryProvider";
import { useParams, useHistory } from 'react-router-dom';
import { Button, Form, FormGroup, Row } from 'reactstrap';
import "./Category.css"

const CategoryEdit = () => {
    const [category, setCategory] = useState();
    const [updatedCategory, setUpdatedCategory] = useState();
    const { getById, updateCategory } = useContext(CategoryContext);
    const { id } = useParams();
    const history = useHistory();

    useEffect(() => {
        getById(id).then(setCategory);
    }, []);

    const handleEdit = (evt) => {
        const stateToChange = { ...category }
        stateToChange[evt.target.name] = evt.target.value;
        setCategory(stateToChange);
    }

    const editCategory = () => {
        if (category.id !== 0 || category.id !== 10) {
            updateCategory({
                id: parseInt(category.id),
                name: category.name
            })
                .then(() => history.push("/category"))
                .catch((err) => alert(`An error ocurred: ${err.message}`));
        }
    }

    if (!category) {
        return null;
    }

    return (
        <>
            <div className="container">
                <div className="justify-content-center">
                    <Row>
                        <h4>Edit Category</h4>
                    </Row>
                    <br></br>
                    <Form>
                        <Row>
                            <FormGroup>
                                <label htmlFor="name">Name</label>
                                <input type="text"
                                    name="name"
                                    required
                                    className="form-control"
                                    defaultValue={category.name}
                                    onChange={handleEdit} />
                            </FormGroup>
                        </Row>
                        <Row>
                            <FormGroup>
                                <Button type="button"
                                    color="success"
                                    onClick={e => {
                                        e.preventDefault()
                                        editCategory()
                                    }}>Save Changes</Button>
                            </FormGroup>
                            <FormGroup>
                                <Button type="button"
                                    className="goBackEditCategory"
                                    onClick={e => {
                                        history.push("/category")
                                    }}>Go Back</Button>
                            </FormGroup>
                        </Row>
                    </Form>
                </div>
            </div>
        </>
    )
}

export default CategoryEdit;