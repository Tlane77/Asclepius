import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Columns from "react-columns";
import NumberFormat from "react-number-format";
import ReactTooltip from "react-tooltip";
import RingLoader from "react-spinners/RingLoader";
import Toggle from "react-toggle";
import "react-toggle/style.css";
import FormControl from "form-control-react";



import {
    Card,
    CardDeck,
    CardBody,
    CardText,
    CardImg,
    CardTitle,
    CardFooter,
    Form,
    FormGroup,
} from "reactstrap";

function Covid() {
    const [latest, setLatest] = useState([]);
    const [results, setResults] = useState([]);
    const [searchCountries, setSearchCountries] = useState("");
    const [loading, setLoading] = useState(true);
    const [darkTheme, setDarkTheme] = useState(false);

    useEffect(() => {
        axios
            .all([
                axios.get("https://corona.lmao.ninja/v2/all"),
                axios.get("https://corona.lmao.ninja/v2/countries"),
            ])
            .then((responseArr) => {
                setLatest(responseArr[0].data);
                setResults(responseArr[1].data);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const date = new Date(parseInt(latest.updated));
    const lastUpdated = date.toString();

    const filterCountries = results.filter((item) => {
        return searchCountries !== ""
            ? item.country.toLowerCase().includes(searchCountries.toLowerCase())
            : item;
    });

    const countries = filterCountries.map((data, i) => {
        return (
            <Card
                key={i}
                bg={darkTheme ? "dark" : "light"}
                text={darkTheme ? "light" : "dark"}
                className="text-center"
                style={{ margin: "10px" }}
            >
                <CardImg variant="top" src={data.countryInfo.flag} />
                <CardBody>
                    <CardTitle>{data.country}</CardTitle>
                    <CardText>Cases {data.cases}</CardText>
                    <CardText>Deaths {data.deaths}</CardText>
                    <CardText>Recovered {data.recovered}</CardText>
                    <CardText>Today's cases {data.todayCases}</CardText>
                    <CardText>Today's deaths {data.todayDeaths}</CardText>
                    <CardText>Active {data.active}</CardText>
                    <CardText>Critical {data.critical}</CardText>
                </CardBody>
            </Card>
        );
    });

    var queries = [
        {
            columns: 2,
            query: "min-width: 500px",
        },
        {
            columns: 3,
            query: "min-width: 1000px",
        },
    ];

    const handleDarkThemeChange = () => {
        setDarkTheme(!darkTheme);
    };

    return (
        <div
            style={{
                backgroundColor: darkTheme ? "black" : "white",
                color: darkTheme ? "white" : "black",
            }}
        >
            <br />
            <div style={{ display: "flex", justifyContent: "center" }}>
                <RingLoader size={50} color={"green"} loading={loading} />
            </div>
            <br />
            <h2
                data-tip="Last modified date: 07/01/2020 - v2.2"
                style={{ textAlign: "center" }}
            >
                Asclepius
      </h2>
            <ReactTooltip effect="solid" />
            <br />
            <div style={{ textAlign: "center" }}>
                <Toggle
                    defaultChecked={false}
                    icons={{
                        checked: "✅",
                        unchecked: "⭕",
                    }}
                    onChange={handleDarkThemeChange}
                />
            </div>
            <br />
            <CardDeck>
                <Card
                    bg="secondary"
                    text="white"
                    className="text-center"
                    style={{ margin: "10px" }}
                >
                    <CardBody>
                        <CardTitle>Cases</CardTitle>
                        <CardText>{latest.cases}</CardText>
                        <NumberFormat
                            value={latest.cases}
                            displayType={"text"}
                            thousandSeparator={true}
                            style={{ fontSize: "30px" }}
                        />
                    </CardBody>
                    <CardFooter>
                        <small>Last updated {lastUpdated}</small>
                    </CardFooter>
                </Card>
                <Card
                    bg="danger"
                    text={"white"}
                    className="text-center"
                    style={{ margin: "10px" }}
                >
                    <CardBody>
                        <CardTitle>Deaths</CardTitle>
                        <CardText>
                            {" "}
                            <NumberFormat
                                value={latest.deaths}
                                displayType={"text"}
                                thousandSeparator={true}
                                style={{ fontSize: "30px" }}
                            />
                        </CardText>
                    </CardBody>
                    <CardFooter>
                        <small>Last updated {lastUpdated}</small>
                    </CardFooter>
                </Card>
                <Card
                    bg="success"
                    text={"white"}
                    className="text-center"
                    style={{ margin: "10px" }}
                >
                    <CardBody>
                        <CardTitle>Recovered</CardTitle>
                        <CardText>
                            {" "}
                            <NumberFormat
                                value={latest.recovered}
                                displayType={"text"}
                                thousandSeparator={true}
                                style={{ fontSize: "30px" }}
                            />
                        </CardText>
                    </CardBody>
                    <CardFooter>
                        <small>Last updated {lastUpdated}</small>
                    </CardFooter>
                </Card>
            </CardDeck>
            <br />
            <Form>
                <FormGroup controlId="formGroupSearch">
                    <FormControl>
                        bg="dark"
                        type="text"
                        placeholder="Search for countries"
                        onChange={(e) => setSearchCountries(e.target.value)}
                    </FormControl>
                </FormGroup>
            </Form>
            <Columns queries={queries}>{countries}</Columns>
        </div>
    );
}

export default Covid;