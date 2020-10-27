import React, { useContext, useState } from "react";
import { Button, Form, FormGroup, Label, Input, Card, CardBody } from "reactstrap";
import { useHistory, useParams, Link } from "react-router-dom"
import { CommentContext } from "../../providers/CommentProvider";
import "./Comment.css"


const CommentForm = () => {

    const { addComment } = useContext(CommentContext);
    const [userProfileId, setUserProfileId] = useState("");
    const [subject, setSubject] = useState("");
    const [content, setContent] = useState("");
    const [createDateTime, setCreateDateTime] = useState("");
    const history = useHistory();
    const { conditionId } = useParams();
    const submit = (evt) => {
        const comment = {
            userProfileId,
            conditionId,
            subject,
            content,
            createDateTime
        };
        const user = JSON.parse(sessionStorage.getItem("userProfile")).id
        comment.userProfileId = user
        comment.conditionId = parseInt(conditionId);
        comment.createDateTime = new Date();

        addComment(comment).then((evt) => {
            history.push(`/conditions/${conditionId}/comments`);
        });
    };

    return (
        <div className="container pt-4">
            <div className="row justify-content-center">
                <Card className="col-sm-12 col-lg-6">
                    <CardBody>
                        <Form>
                            <FormGroup>
                                <Label for="conditionId">New Comment</Label>
                                <Input type="hidden"
                                    id="conditionId"
                                    value={conditionId}

                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="subject">Subject</Label>
                                <Input id="subject" onChange={(e) => setSubject(e.target.value)} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="content">Content</Label>
                                <Input
                                    className="contentTextArea"
                                    type="textarea"
                                    rows="4"
                                    id="content"
                                    onChange={(e) => setContent(e.target.value)}
                                />
                            </FormGroup>

                        </Form>
                        <Button color="info" onClick={submit} className="commentButton">
                            Submit
              </Button>
                        <Link to={`/conditions/${conditionId}/comments`}>
                            <Button color="secondary" className="commentButton">Back</Button>
                        </Link>
                    </CardBody>
                </Card>
            </div>
        </div>
    )
}
export default CommentForm;