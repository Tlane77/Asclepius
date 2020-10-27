import React, { useContext, useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { UserProfileContext, userProfileContext } from "../../providers/UserProfileProvider";
import { Spinner, Card, CardImg, Button, CardBody, CardHeader } from 'reactstrap'

const UserProfileEdit = () => {
    const { getUserById, currentUser, anyuser, users, updateUser, getAllUsers, getCurrentUser } = useContext(UserProfileContext);
    const [isloading, setIsLoading] = useState(false);
    const { id } = useParams();
    const history = useHistory();
    const clientUser = JSON.parse(sessionStorage.getItem('userProfile'));


    useEffect(() => {
        getCurrentUser(clientUser.firebaseUserId);
    }, []);

    useEffect(() => {
        getAllUsers();
    }, []);


    useEffect(() => {
        getUserById(id).then(() => setIsLoading(true))
    }, []);


    const date = new Date(anyuser.createDateTime)
    const formatedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`

    const saveUser = evt => {
        evt.preventDefault();
        const updatedUser =
        {
            id: anyuser.id,
            displayName: anyuser.displayName,
            firstName: anyuser.firstName,
            lastName: anyuser.lastName,
            email: anyuser.email,
            createDateTime: anyuser.createDateTime,
            firebaseUserId: anyuser.firebaseUserId,
            imageLocation: anyuser.imageLocation

        }



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


                        <div>Profile Created on {formatedDate}</div>
                    </CardBody>
                    <div>

                        <Button type="button"
                            className="saveUserButton"
                            onClick={saveUser}>Save
                            </Button>

                        <Button type="button"
                            className="goBackuserButton"
                            onClick={e => {
                                history.goBack()
                            }}>Cancel
                    </Button>
                    </div>
                </Card>
            </div>
        )
    }

}


export default UserProfileEdit;