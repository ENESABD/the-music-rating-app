import React, { useState } from 'react';
import  axios from "axios";

function SongDelete( { songID , setRightColumn } ) {

    const [errorMessage, setErrorMessage] = useState("");
    const [isError, setIsError] = useState(false);

    const handleClickYes = () => {
        axios.delete(`http://the-music-rating-app.herokuapp.com/api/songs/${songID}/`)
            .then(res => {
                setIsError(false);
                setRightColumn("Welcome!");
            })       
            .catch(err =>{
                setIsError(true);
                setErrorMessage(err.response.data.song_name);
            });            
    }

    const handleClickNo = () => {
        setRightColumn("Welcome!");
    }



    return (
        <div>
            <div className = "are-you-sure">
                <p>Are you sure you want to delete this song?</p>
                <button className = "delete-yes" onClick = {handleClickYes} >Yes</button>
                <button className = "delete-no" onClick = {handleClickNo} >No</button>
            </div>
            <p className = "error-msg">{isError ? errorMessage : null}</p>
        </div>
    )
}

export default SongDelete
