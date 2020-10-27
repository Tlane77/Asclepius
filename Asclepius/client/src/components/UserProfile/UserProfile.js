import React from 'react';
import { Card, CardBody, CardTitle, CardText } from 'reactstrap';
import { Link } from "react-router-dom";
import './UserProfile.css';

const UserProfile = ({ user }) => {
    return (
        <>
            <Card className="userProfileCard">
                <CardBody>
                    <CardTitle>

                        <h6>Username: <Link to={`/user/${user.id}/details`}>{user.displayName}</Link></h6>

                    </CardTitle>
                    <CardText>
                        Name: {user.fullName}
                        <br></br>
                        <p>Author</p>
                    </CardText>
                </CardBody>
            </Card>
        </>
    )
};

export default UserProfile;