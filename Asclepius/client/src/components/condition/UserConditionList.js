import React, { useContext, useEffect, useState, useRef } from "react";
import { ConditionContext } from "../../providers/ConditionProvider";
import { useHistory, Link } from "react-router-dom";
import {
    Button, Table
} from "reactstrap";

const UserConditionList = () => {
    const { conditions, getAllUserConditions } = useContext(ConditionContext);
    const history = useHistory();



    useEffect(() => {
        getAllUserConditions(JSON.parse(sessionStorage.getItem("userProfile")).id);
    }, []);

    return (
        <div className="container">
            <div className="row justify-content-left">
                <Button color="danger"
                    onClick={() => { history.push(`/conditionForm/`) }}>
                    Add Condition
                    </Button>
                <Table>

                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Category</th>
                        </tr>
                    </thead>

                    {conditions.map((condition) => (
                        <tbody key={condition.id}>
                            <tr>
                                <th scope="row">
                                    <Link to={`/conditions/${condition.id}`}>
                                        {condition.title}
                                    </Link>
                                </th>
                                <td>
                                    {condition.userProfile.firstName} {condition.userProfile.lastName}
                                </td>
                                <td>{condition.category.name}</td>
                            </tr>
                        </tbody>
                    ))}
                </Table>
            </div>
        </div>
    );
};

export default UserConditionList;