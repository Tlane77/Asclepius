import React, { useState, useContext, useRef } from "react";
import {
    Form,
    FormGroup,
    Card,
    CardBody,
    Label,
    Input,
    Button,
    InputGroup,

} from "reactstrap";
import { ConditionContext } from "../../providers/ConditionProvider";
import { useHistory } from "react-router-dom";


const ConditionForm = () => {
    const { addCondition } = useContext(ConditionContext);
    const [categoryId, setCategoryId] = useState(0);
    const history = useHistory();
    const title = useRef();
    const content = useRef();
    const imageUrl = useRef();




    const submit = () => {
        const condition = {
            title: title.current.value,
            content: content.current.value,
            categoryId,
            userProfileId: JSON.parse(sessionStorage.getItem("userProfile")).id
        };
        condition.categoryId = JSON.parse(condition.categoryId)
        if (condition.title === "") {
            window.alert("Please Add Title")
        }
        if (condition.content === "") {
            window.alert("Please Add Content")
        }
        if (condition.categoryId === 0) {
            window.alert("Please Select A Category")
        }
    }

    return (
        <div className="container pt-4">
            <div className="row justify-content-center">
                <Card className="col-sm-12 col-lg-6">
                    <CardBody>
                        <Form encType="multipart/form-data">
                            <FormGroup>
                                <Label for="title">Title</Label>
                                <Input
                                    id="title"
                                    innerRef={title}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="content">Content</Label>
                                <Input type="textarea" rows="10" id="content" innerRef={content} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="imageUpload">Upload an Image</Label>
                                <Input
                                    type="file"
                                    name="file"
                                    id="imageUpload"

                                    onClick={() => imageUrl.current.value = ""} />
                                <InputGroup className="mt-2">
                                    <Input
                                        type="text"
                                        name="imageUrl"
                                        id="imageUrl" />
                                </InputGroup>
                            </FormGroup>
                            <FormGroup>

                            </FormGroup>

                        </Form>
                        <Button color="info" onClick={submit}>
                            SUBMIT
                        </Button>
                        <Button color="info"
                            onClick={() => { history.push(`/conditions/`) }}>
                            Cancel
                        </Button>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default ConditionForm;