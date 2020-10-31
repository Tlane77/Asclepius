import React, { useContext, useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { UserProfileContext, userProfileContext } from "../../providers/UserProfileProvider";
import { Spinner, Card, CardImg, Button, CardBody, CardHeader } from 'reactstrap'

const UserProfileDetails = () => {
    const { getUserById, anyuser, currentUser, getCurrentUser } = useContext(UserProfileContext);
    const [isloading, setIsLoading] = useState(false);
    const { id } = useParams();
    const history = useHistory();
    const clientUser = JSON.parse(sessionStorage.getItem('userProfile'));


    useEffect(() => {
        getCurrentUser(clientUser.firebaseUserId);
    }, []);



    useEffect(() => {
        getUserById(id).then(() => setIsLoading(true))
    }, []);


    const date = new Date(anyuser.createDateTime)
    const formatedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`

    if (!anyuser) {
        return null;
    }

    while (anyuser.status !== 404) {
        if (isloading && currentUser != null) {
            return (
                <div className="d-flex justify-content-center">
                    <Card style={{ border: "none", width: "30%", height: "30%" }} className="smallContainer">

                        {
                            anyuser.imageLocation != null ? <CardImg src={anyuser.imageLocation} alt={anyuser.fullName} className="userdetailsImg" />
                                : <i className="fa-user-circle fa-7x" />
                        }
                        <CardHeader>
                            <h3>{anyuser.fullName}</h3>
                        </CardHeader>
                        <CardBody>
                            <div>Display Name: {anyuser.displayName}</div>
                            <div>Email: {anyuser.email}</div>
                            <div>Profile Type: {anyuser.userType.name}</div>

                            <div>Profile Created on {formatedDate}</div>
                        </CardBody>

                        <Button type="button"
                            className="goBackUserButton"
                            onClick={e => {
                                history.push("/user")
                            }}>Go Back
                    </Button>
                    </Card>
                </div>
            )
        }

        else {
            return <Spinner className="app-spinner dark" />
        }

    }
}

export default UserProfileDetails;