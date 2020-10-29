import React, { useState, useContext, useRef, useEffect } from "react";
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
import { useHistory } from "react-router-dom";
import { CategoryContext } from "../../providers/CategoryProvider";
import { ImageContext } from "../../providers/ImageProvider";



const ConditionForm = () => {
    const { addCondition } = useContext(ConditionContext);
    const [categoryId, setCategoryId] = useState(0);
    const { categories, getAllCategories } = useContext(CategoryContext);
    const history = useHistory();
    const title = useRef();
    const content = useRef();
    const imageName = useRef();
    const [imagePreview, setImagePreview] = useState(null);
    const [imageLocation, setImageLocation] = useState("");
    const { uploadImage } = useContext(ImageContext);
    const [isLoading, setIsLoading] = useState(false);



    useEffect(() => {
        getAllCategories()
    }, []);

    const previewImage = evt => {
        if (evt.target.files.length) {
            setImagePreview(URL.createObjectURL(evt.target.files[0]));
        }
    };

    const previewImageName = evt => {
        if (evt.target.value.length) {
            setImagePreview(evt.target.value);
        }
    }







    const submit = () => {
        const condition = {
            title: title.current.value,
            content: content.current.value,
            categoryId,

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
        //     // Image Upload
        const file = document.querySelector('input[type="file"]').files[0];

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
                condition.imageLocation = newImageName;
            }
        }

        else if (file === undefined && imageName.current.value == "") {///Removed ! to test-tl
            condition.imageLocation = imageName.current.value;
        }

        if (condition.title !== "" && condition.content !== "" && condition.categoryId !== 0) {
            addCondition(condition).then((condition) => {
                history.push(`/conditions`);
            });
        }

    };


    return (
        <div className="container pt-4">
            <div className="row justify-content-center">
                <Card className="col-sm-12 col-lg-6">
                    <h3 className="mt-3 text-primary text-center card-title">Condition Topic?</h3>
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
                                <Label for="imageUpload">Upload an File</Label>
                                <Input
                                    type="file"
                                    name="file"
                                    id="imageUpload"

                                    onChange={previewImage}
                                    onClick={() => imageName.current.value = ""} />
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
                                        onChange={previewImageName} />
                                </InputGroup>
                            </FormGroup>
                            <FormGroup>
                                {
                                    imagePreview === null ?
                                        <Alert color="dark">No image provided.</Alert>
                                        : <img src={imagePreview} alt="preview" className="img-thumbnail" />
                                }
                            </FormGroup>
                            <FormGroup>
                                <Label for="categoryId">Category</Label>
                                <select defaultValue="" name="categoryId" id="categoryId" className="form-control" onChange={(e) => setCategoryId(e.target.value)}>
                                    <option value="0">Select a Category</option>
                                    {categories.map(e => (
                                        <option key={e.id} value={e.id}>
                                            {e.name}
                                        </option>
                                    ))}
                                </select>
                            </FormGroup>

                        </Form>
                        <Button color="info" type="submit" onClick={submit}>
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