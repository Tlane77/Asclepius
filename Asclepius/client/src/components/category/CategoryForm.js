import React, { useContext, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { Form, FormGroup, Label, Input, Button, Row, Container } from "reactstrap";
import { CategoryContext } from "../../providers/CategoryProvider";
import "./Category.css"
export default function CategoryForm() {
    const [nameText, setNameText] = useState("");
    const history = useHistory();
    const { addCategory } = useContext(CategoryContext);




    const submitForm = (evt) => {
        evt.preventDefault();
        addCategory({ name: nameText })
            .then(() => history.push("/category"))
            .catch((err) => alert(`An error ocurred: ${err.message}`));
    };


    return (
        <>
            <Container>
                <div className="justify-content-center">
                    <h3 className="row">Add a Category</h3>
                    <Form onSubmit={submitForm}>
                        <FormGroup className="CategoryFormInput">
                            <Label for="nameText">Name</Label>
                            <Input id="nameText" type="text" onChange={evt => setNameText(evt.target.value)} />
                        </FormGroup>
                        <Row>
                            <FormGroup>
                                <Button color="danger">Add Category</Button>
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
            </Container>
        </>
    )
};