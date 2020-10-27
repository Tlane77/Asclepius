import React, { useContext } from 'react';
import { UserProfileContext } from '../providers/UserProfileProvider';

export const ImageContext = React.createContext();

export const ImageProvider = (props) => {

    const { getToken } = useContext(UserProfileContext);

    const uploadImage = (info) =>
        getToken().then((token) =>
            fetch('/api/image', {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: info
            }).then(resp => {
                if (resp.ok) {
                    return;
                }
                throw new Error("Upload Image Error.")
            }));

    const getImageUrl = (imageUrl) => {
        const getUrl = `/api/image/${imageUrl}`
        return (getUrl)
    };




    return (
        <ImageContext.Provider value={{ getImageUrl, uploadImage }}>
            {props.children}
        </ImageContext.Provider>
    );
};
