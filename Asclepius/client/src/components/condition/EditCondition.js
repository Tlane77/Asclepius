import React, { useState, useContext, useEffect, useRef } from "react";
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
import { useHistory, useParams } from "react-router-dom";


const EditCondition = () => {
    const { EditCondition, getSingleCondition } = useContext(ConditionContext);
    const [condition, setCondition] = useState();
    const title = useRef();
    const content = useRef();
    const imageName = useRef();
    const history = useHistory();
    const { conditionId } = useParams();
    const [isLoading, setIsLoading] = useState(false);



    const submit = event => {
        event.preventDefault();
        setIsLoading(true);
        const updatedCondition = {
            id: condition.id,
            title: title.current.value,
            content: content.current.value,

        }
        updatedCondition.categoryId = JSON.parse(updatedCondition.categoryId)
        if (updatedCondition.title === "") {
            updatedCondition.title = condition.title
        }
        if (updatedCondition.content === "") {
            updatedCondition.content = condition.content
        }
        if (updatedCondition.categoryId === 0) {
            updatedCondition.categoryId = condition.categoryId
        }
        EditCondition(updatedCondition)
            .then(() => history.push(`/conditions/${condition.id}`));
    };


    useEffect(() => {
        getSingleCondition(conditionId).then((res) => {
            setCondition(res)
            setIsLoading(false);
        });
    }, []);

    if (!condition) {
        return null;
    }

    if (condition.userProfileId === JSON.parse(sessionStorage.getItem("userProfile")).id) {
        return (
            <div className="container pt-4">
                <div className="row justify-content-center">
                    <Card className="col-sm-12 col-lg-6">
                        <CardBody>
                            <Form>
                                <FormGroup>
                                    <Label for="title">Title</Label>
                                    <Input
                                        id="title"
                                        defaultValue={condition.title}
                                        innerRef={title}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="content">Content</Label>
                                    <Input
                                        id="content"
                                        type="textarea"
                                        rows="10"
                                        defaultValue={condition.content}
                                        innerRef={content} />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="imageUpload">Upload an Image</Label>
                                    <Input
                                        type="file"
                                        name="file"
                                        id="imageUpload"
                                        defaultValue=""
                                        innerRef={imageName}
                                    />
                                    <InputGroup className="mt-2">


                                        <Input
                                            type="text"
                                            name="imageName"
                                            id="imageName" />
                                        defaultValue=""
                                        innerRef={imageName}
                                    </InputGroup>
                                </FormGroup>


                            </Form>
                            <Button
                                color="info"
                                style={{ margin: 10 }}
                                disabled={isLoading}
                                onClick={submit}
                            >Submit
                                </Button>
                            <Button color="info"
                                style={{ margin: 10 }}
                                disabled={isLoading}
                                onClick={() => { history.push(`/conditions/${condition.id}`) }}>
                                Cancel
                            </Button>
                        </CardBody>
                    </Card>
                </div>
            </div>
        );
    } else {
        return (
            <h1>Submission Error</h1>
        )
    }
};

export default EditCondition;
