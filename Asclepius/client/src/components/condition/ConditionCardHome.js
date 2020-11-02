import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ImageContext } from '../../providers/ImageProvider';
import Honey from '../Images/Honey.png'
import "./Condition.css"
const ConditionCardHome = (props) => {
    //Set the image into state so it can be updated if it returns broken
    const [image, setImage] = useState(props.condition.imageLocation)
    const { getImageName } = useContext(ImageContext)

    useEffect(() => {
        if (props.condition.imageLocation !== "" && props.condition.imageLocation !== undefined && props.condition.imageLocation !== null) {
            if (props.condition.imageLocation[0].toLowerCase() !== "h") {
                setImage(getImageName(props.condition.imageLocation))
            }
        }
    }, [])

    //Give each 'Condition card' a div and class to modify
    let classid = `condition_Card_Home${props.index}`
    if (props.index > 2) {
        classid = `condition_Card_Home`
    }

    //update image to a default if error in upload.
    const addDefaultSrc = () => {

        setImage(Honey)
    }

    return (
        <div className={classid}>
            <div>
                <div className="PicOfCondition">
                    <Link to={`/conditions/${props.condition.id}`}>
                        <h4 className="conditionTitle">{props.condition.title}</h4>
                    </Link>
                    <img className="home_Condition_Image" src={image} alt="Condition image" onError={addDefaultSrc} />
                </div>
                <div className="conditionBody">
                    <p>{props.condition.content}</p>
                </div>
            </div>
        </div>
    )
}

export default ConditionCardHome