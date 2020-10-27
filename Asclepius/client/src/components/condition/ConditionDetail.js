import React, { useEffect, useContext, useState } from "react";
import { ListGroup, ListGroupItem, Card, CardImg, CardBody, Button, CardTitle, CardSubtitle, Container } from "reactstrap";
import { ConditionContext } from "../../providers/ConditionProvider"
import { ImageContext } from '../../providers/ImageProvider';
import { useParams, useHistory, Link } from "react-router-dom";
import "./Condition.css"


const ConditionDetail = () => {
    const [condition, setCondition] = useState();
    const { getSingleCondition } = useContext(ConditionContext);
    const { getImageUrl } = useContext(ImageContext)
    const { conditionId } = useParams();
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(false)
    const [isAuthor, setIsAuthor] = useState(false)
    const imageUrl = getImageUrl(condition.imageLocation);

    useEffect(() => {
        getSingleCondition(conditionId).then(setCondition);
    });

    useEffect(() => {
        //verify there condition is not undefined before getting subscriptions
        condition(JSON.parse(sessionStorage.getItem("userProfile")).id, condition.userProfileId)
    }, [condition]);

    useEffect(() => {
        //ensure condition is not undefined
        if (condition) {
            //determine if current use is condition author
            if (JSON.parse(sessionStorage.getItem("userProfile")).id == condition.userProfileId) {
                setIsAuthor(true)
            }

        }

    });


    //formated publication date to MM / DD / YYYY

    const createDate = new Date(condition.createDateTime)
    const formatedDate = `${createDate.getMonth() + 1}/${createDate.getDate()}/${createDate.getFullYear()}`


    return (
        <div className="conditionDetailsCardContainer">
            <Card className="m-auto">
                <CardBody>
                    <div className="condition_Detail">
                        <div>
                            <h2>{condition.title}</h2>
                            <CardSubtitle>By {condition.userProfile.displayName}</CardSubtitle>
                        </div>

                    </div>
                </CardBody>
                {condition.imageLocation === "" || condition.imageLocation === null ?
                    <CardImg top />
                    :
                    <CardImg top src={condition.imageLocation[0] === "h" ? condition.imageLocation : imageUrl} alt={condition.title} />
                }
                <CardBody>
                    <p style={{ whiteSpace: "pre-wrap" }}>{condition.content}</p>
                    <p>{formatedDate}</p>
                    <Button type="button"
                        style={{ margin: 10 }}
                        onClick={() => { history.goBack() }}>
                        Back
                </Button>
                    <Link to={`/conditions/${condition.id}/comments`}><Button className="conditionCommentButton" style={{ margin: 10 }}
                    >Comments</Button></Link>

                    <Button type="button"
                        style={{ margin: 10 }}
                        onClick={() => { history.push(`/conditions/`) }}>
                        Condition List
                </Button>


                    {JSON.parse(sessionStorage.getItem("userProfile")).id === condition.userProfileId && <Button color="danger"
                        style={{ margin: 10 }}

                        onClick={() => { history.push(`/conditions/delete/${conditionId}`) }}>
                        Delete

                </Button >}
                    {JSON.parse(sessionStorage.getItem("userProfile")).id === condition.userProfileId && <Button color="info"
                        style={{ margin: 10 }}

                        onClick={() => { history.push(`/conditions/edit/${conditionId}`) }}>
                        Edit

                </Button >}
                </CardBody >
            </Card >
        </div>
    );
};


export default ConditionDetail;
