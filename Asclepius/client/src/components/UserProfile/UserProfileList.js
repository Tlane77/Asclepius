import React, { useContext, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import UserProfile from './UserProfile';
import { Row, Table, Button, Spinner } from 'reactstrap';
import { UserProfileContext } from '../../providers/UserProfileProvider';

const UserProfileList = (props) => {
    const { users, getAllUsers, currentUser, getCurrentUser } = useContext(UserProfileContext);
    const history = useHistory();
    const clientUser = JSON.parse(sessionStorage.getItem('userProfile'));

    useEffect(() => {
        getCurrentUser(clientUser.firebaseUserId);
    }, []);

    useEffect(() => {
        getAllUsers();
    }, []);


    return (

        <div className="container">
            <div className="row justify-content-left">
                <div className="row justify-content-center">
                    <h3>Users</h3>
                </div>
                <Table>

                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Name</th>
                            <th>User Type</th>
                        </tr>
                    </thead>

                    {activeUsers.map((user) => (
                        <tbody key={user.id}>
                            <tr>
                                <th scope="row">
                                    <Link to={`/user/${user.id}/details`}>
                                        {user.displayName}
                                    </Link>
                                </th>
                                <td>{user.fullName}</td>

                                <td>
                                    <Button type="button"
                                        className="editUserButton"
                                        onClick={e => {
                                            history.push(`/user/${user.id}/edit`)
                                        }}>Edit
                                    </Button>
                                </td>
                            </tr>

                        </tbody>

                    ))}
                </Table>

            </div>
        </div>
    )
}


export default UserProfileList;