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
    InputGroupAddon,
    InputGroupText,
    Alert

} from "reactstrap";
import { ConditionContext } from "../../providers/ConditionProvider";
import { CategoryContext } from "../../providers/CategoryProvider";
import { CommentContext } from "../../providers/CommentProvider";
import { ImageContext } from "../../providers/ImageProvider";
import { useHistory, useParams } from "react-router-dom";
import "./Condition.css"


const EditCondition = () => {
    const { EditCondition, getSingleCondition, condition } = useContext(ConditionContext);
    const [editCondition, setEditCondition] = useState();
    const { categories, getAllCategories } = useContext(CategoryContext);
    const { uploadImage } = useContext(ImageContext);
    const [categoryId, setCategoryId] = useState(0);
    const history = useHistory();
    const { conditionId } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);
    const title = useRef();
    const content = useRef();
    const imageName = useRef();

    useEffect(() => {
        getAllCategories()
    }, []);

    const previewImage = evt => {
        if (evt.target.files.length) {
            setImagePreview(URL.createObjectURL(evt.target.files[0]));
        }
    };

    const previewImageUrl = evt => {
        if (evt.target.value.length) {
            setImagePreview(evt.target.value);
        }
    }


    const submit = event => {
        event.preventDefault();
        setIsLoading(true);
        const updatedCondition = {
            id: condition.id,
            title: title.current.value,
            content: content.current.value,
            categoryId,

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

        const file = document.querySelector('input[type="file"]').files[0];
        let newImageName = ""
        if (file !== undefined) {
            const fileType = file.name.split('.').pop();

            const availFileTypes = [
                'png',
                'bmp',
                'jpeg',
                'jpg',
                'gif',
                'PNG',
                'BMP',
                'JPEG',
                'GIF',
                'JPG'
            ];

            if (!availFileTypes.includes(fileType)) {
                alert('Accepted Image File Types: .png, .bmp, .jpeg, .jpg, and .gif');
                return;
            }
            else {
                const newImageName = `${new Date().getTime()}.${fileType}`;

                const formData = new FormData();
                formData.append('file', file, newImageName);

                uploadImage(formData, newImageName);
                updatedCondition.imageLocation = newImageName;
            }
        }
        else if (file === undefined && imageName.current.value !== "") {
            updatedCondition.imageLocation = imageName.current.value;
        }
        else {
            updatedCondition.imageLocation = condition.imageLocation;
        }



        EditCondition(updatedCondition)
            .then(() => history.push(`/conditions/details/${conditionId}`));


    }


    useEffect(() => {
        getSingleCondition(conditionId)
    }, [])

    console.log("condition", condition)

    if (!condition) {
        return null;
    }


    if (condition.userProfileId === JSON.parse(sessionStorage.getItem("userProfile")).id) {

        return (
            <>

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
                                            onChange={e => previewImage(e)}
                                            onClick={() => imageName.current.value = ""}
                                        />
                                        <InputGroup className="mt-2">
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>OR</InputGroupText>
                                            </InputGroupAddon>


                                            <Input
                                                type="text"
                                                name="imageName"
                                                id="imageName"
                                                innerRef={imageName}
                                                placeholder="Input an Image URL"
                                                defaultValue={condition.imageLocation !== null ? (condition.imageLocation.startsWith("http") ? condition.imageLocation : "") : ""}
                                                onChange={previewImageUrl}
                                            />
                                        </InputGroup>
                                    </FormGroup>
                                    <FormGroup>
                                        {
                                            imagePreview === null ?
                                                <Alert color="light">No new image provided.</Alert>
                                                : <img src={imagePreview} alt="preview" className="img-thumbnail" />
                                        }
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="categoryId">category</Label>
                                        <select defaultValue=""
                                            name="categoryId"
                                            id="categoryId"
                                            className="form-control"
                                            onChange={(e) => setCategoryId(e.target.value)}>

                                            <option defaultValue={condition.categoryId} hidden>{condition.category.name}</option>
                                            {categories.map(e => (
                                                <option key={e.id} value={e.id}>
                                                    {e.name}
                                                </option>
                                            ))}
                                        </select>
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
                                    onClick={() => { history.push(`/conditions/details/${condition.id}`) }}>
                                    Cancel
                            </Button>
                            </CardBody>
                        </Card>
                    </div>
                </div>
            </>
        );
    } else {
        return (
            <h1>Submission Error</h1>
        )

    }

};
export default EditCondition;
