import React, { useContext, useEffect, } from "react";
import { ConditionContext } from "../../providers/ConditionProvider";
import { useHistory, Link } from "react-router-dom";
import { Button, Table } from "reactstrap";
import { ListGroup, ListGroupItem, Card, Row, Col, CardImg, CardBody, CardTitle, CardSubtitle, Container } from "reactstrap";



const ConditionList = () => {
    const { conditions, getAllConditions } = useContext(ConditionContext);
    const history = useHistory();

    useEffect(() => {
        getAllConditions();
    }, []);

    return (
        <>

            <div className="container">
                <div className="row justify-content-left">
                    <Button color="danger"
                        onClick={() => { history.push(`/add/`) }}>
                        Add a Condition
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
                                        <Link to={`/conditions/details/${condition.id}`}>
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
        </>
    );
};

export default ConditionList;


