import React, { useEffect, useContext, useState } from "react";
import { Card, CardImg, CardBody, Button, CardSubtitle, } from "reactstrap";
import { ConditionContext } from "../../providers/ConditionProvider";
import { ImageContext } from '../../providers/ImageProvider';
import { useParams, useHistory, Link } from "react-router-dom";
import "./Condition.css"
import "./Condition.css"


const ConditionDetail = () => {
    const { getSingleCondition, condition } = useContext(ConditionContext);
    const [image, setImage] = useState()
    



    const { getImageName } = useContext(ImageContext);
    const { id } = useParams();
    const history = useHistory();




    useEffect(() => {

        getSingleCondition(id)

    }, []);

    useEffect(() => {

        if (condition.imageLocation !== "" && condition.imageLocation !== undefined && condition.imageLocation !== null) {
            if (condition.imageLocation[0].toLowerCase() !== "h") {
                setImage(getImageName(condition.imageLocation))
            }
            else { setImage(condition.imageLocation) }

        }
    }, [condition.id])



    
    
    if (condition.userProfile == undefined) {
        return null;
    }
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
                    <CardImg top src={image} alt={condition.title} />
                }

                <CardBody>
                    <p style={{ whiteSpace: "pre-wrap" }}>{condition.content}</p>
                    <p>{condition.createDateTime}</p>
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

                        onClick={() => { history.push(`/conditions/delete/${id}`) }}>
                        Delete

                </Button >}
                    {JSON.parse(sessionStorage.getItem("userProfile")).id === condition.userProfileId && <Button color="info"
                        style={{ margin: 10 }}

                        onClick={() => { history.push(`/conditions/edit/${id}`) }}>
                        Edit

                </Button >}
                </CardBody >


            </Card >
        </div>
    );
};


export default ConditionDetail;
