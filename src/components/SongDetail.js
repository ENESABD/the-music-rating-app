import React, {useState, useEffect, useDebugValue} from 'react';
import axios from "axios";

function SongDetail({ songID }) {
    const [songObject,setSongObject] = useState({});
    const [detailObject,setDetailObject] = useState({});
    const [ratingObjectID,setRatingObjectID] = useState(0);
    const [rating,setRating] = useState(0);

    const [errorMessage, setErrorMessage] = useState("");
    const [isError, setIsError] = useState(false);



    useEffect(() => {
        axios.get(`https://the-music-rating-app.herokuapp.com/api/songs/${songID}/`)
            .then(res => setSongObject(res.data))
            .catch(err => console.log(err.response));
    },[songID])

    useEffect(async () => {
        let res = await axios.get("https://the-music-rating-app.herokuapp.com/api/details");
        let detailObjectList = res.data;
        setDetailObject(detailObjectList.filter(value => value.song == songID)[0]);
    },[songID])

    useEffect(async () => {
        let res = await axios.get("https://the-music-rating-app.herokuapp.com/api/ratings");
        let ratingObjectList = res.data;
        let ratingObject = ratingObjectList.filter(value => value.song == songID)[0]
        setRatingObjectID(ratingObject.id);
        setRating(ratingObject.rating);
    },[songID])

/*
    const handleChange = event => {
        const value = event.target.value;
        setSongRating({
            ...songRating,
            [event.target.rating] : value
        });
    }
*/

const handleSubmit = async (event) => {
        event.preventDefault();
        
        let input_rating;
        if (event.target[0].checked) {
            input_rating = 1;
            setIsError(false);
        }
        else if (event.target[1].checked) {
            input_rating = 2;
            setIsError(false);
        }
        else if (event.target[2].checked) {
            input_rating = 3;
            setIsError(false);
        }
        else if (event.target[3].checked) {
            input_rating = 4;
            setIsError(false);
        }
        else if (event.target[4].checked) {
            input_rating = 5;
            setIsError(false);
        }
        else {
            setIsError(true);
            setErrorMessage("Please choose a rating!")
        }


        if (!isError) {  
            axios.put(`https://the-music-rating-app.herokuapp.com/api/ratings/${ratingObjectID}/`, {rating : input_rating, song : songID, username : 19})
                .then(res => {
                    console.log(res.data);
                    if (input_rating){
                        setRating(input_rating);
                    }
                })
                .catch(err => {
                    console.log(err.response);
                })
        }
    }




    

    return (
        <div>
            <h1 className = "details-header">Song Details</h1>
            <ul className = "details-list">
                <li>Song Name: {songObject.song_name}</li>
                <li>Artist Name: {songObject.artist_name}</li>
                <li>Short Description: {detailObject.genre}</li>
                <li>Year of Release: {detailObject.year_of_release}</li>
                <li>Duration of Song: {detailObject.duration_of_song}</li>
                {rating === 0 ? <li>Last Rating: None</li> : <li>Last Rating: {rating}</li>}
            </ul>
            <form className = 'welcome-msg' onSubmit = {handleSubmit}>
                <input type="radio" className="rating-input" name="rating" value={1} ></input>
                <label for="1">1</label>
                <input type="radio" className="rating-input" name="rating" value={2} ></input>
                <label for="2">2</label>
                <input type="radio" className="rating-input" name="rating" value={3} ></input>
                <label for="3">3</label>
                <input type="radio" className="rating-input" name="rating" value={4} ></input>
                <label for="4">4</label>
                <input type="radio" className="rating-input" name="rating" value={5} ></input>
                <label for="5">5</label>
                <button className = "song-button">Rate!</button>
            </form>
            <p className = "error-msg">{isError ? errorMessage : null}</p>
        </div>
        )
}


export default SongDetail
