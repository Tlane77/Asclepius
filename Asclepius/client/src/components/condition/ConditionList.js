import React, { useContext, useEffect, } from "react";
import { ConditionContext } from "../../providers/ConditionProvider";
import { useHistory, Link } from "react-router-dom";
import { Button, Table } from "reactstrap";
import "./Condition.css"
// import { CategoryContext } from "../../providers/CategoryProvider";
// import CategorySearch from "../Category/CategorySearch";
//import CategoryCard from "../Category/CategoryCard";



const ConditionList = () => {
    const { conditions, getAllConditions } = useContext(ConditionContext);
    //  const { categories, getAllCategories } = useContext(ConditionContext);
    const history = useHistory();
    // const [categorySearch, setCategorySearch] = useState([])
    // const [search, setSearch] = useState("")


    useEffect(() => {
        getAllConditions();
    }, []);
    // useEffect(() => {
    //     getAllCategories();
    // }, []);

    // useEffect(() => {
    //     setCategorySearch(
    //       categories.filter(category =>
    //         category.name.toLowerCase().includes(search.toLowerCase())
    //       )
    //     )
    //   }, [search, categories]);



    return (
        <>

            <div className="container mt-4">
                <div className="row justify-content-left">

                    <Button outline color="warning" className="mb-3"
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
                {/* <div>

                <section className="section-content">
        <input className="searchBar"
          type="text" 
          placeholder="Search Categories here..." 
          //getting value and setting it into state
          onChange={e => setSearch(e.target.value)}/>
          </section>
     
                </div> */}
            </div>
        </>
    );
};

export default ConditionList;


