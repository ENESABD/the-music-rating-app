import React, { useState} from 'react'
import axios from "axios";

function AddSongForm({setSongAdded , songAdded, setHideForm, setAddSong}) {
    const [info, setInfo] = useState({
        song_name : "",
        artist_name : "",
        genre : "",
        year_of_release : "",
        duration_of_song : ""
    });
    const [errorMessage, setErrorMessage] = useState("");
    const [isError, setIsError] = useState(false);

    const handleChange = event => {
        const value = event.target.value;
        setInfo({
            ...info,
            [event.target.name] : value
        });
    }
    
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            if (info.year_of_release < 1860 || info.year_of_release > 2030){
                setIsError(true);
                setErrorMessage("Please enter a valid year");
            }
            else {

                let isDurationValid = (!isNaN(info.duration_of_song[0]) && !isNaN(info.duration_of_song[1]) 
                    && !isNaN(info.duration_of_song[3]) && !isNaN(info.duration_of_song[4]) 
                    && (info.duration_of_song[2] === ":") && parseInt(info.duration_of_song[3]) < 6 
                   )

                if (!isDurationValid) {
                    setIsError(true);
                    setErrorMessage("Please enter a valid duration using the required formatting: 00:00");
                }
                else {
                    let result = await axios.post("http://the-music-rating-app.herokuapp.com/api/songs/", 
                                                {song_name : info.song_name, artist_name : info.artist_name});                                        

                    axios.post("http://the-music-rating-app.herokuapp.com/api/details/", {song : result.data.id, genre : info.genre, 
                            year_of_release : info.year_of_release, duration_of_song : info.duration_of_song})
                        .then(res => {
                            setIsError(false);
                            setSongAdded(!songAdded);
                            setHideForm(true);
                            setAddSong(false);
                            axios.post("http://the-music-rating-app.herokuapp.com/api/ratings/", { username : 18, song : result.data.id, rating: 0 })
                        })       
                        .catch(err =>{
                            axios.delete(`http://the-music-rating-app.herokuapp.com/api/songs/${result.data.id}`);
                            console.log("hiii");
                            setIsError(true);
                            setErrorMessage("Please fill in all the fields with valid information!");
                    }); 
                }
            }
        } catch (err) {
            console.log(err.response.data);
            if(err.response.data.song_name){
                if(err.response.data.song_name[0] == "song with this song name already exists.") {
                    setIsError(true);
                    setErrorMessage("You can already enjoy information about this song in our website! It is already in our database!");
                } else {
                    setIsError(true);
                    setErrorMessage("Please fill in all the fields with valid information!");
                }
            } else {
                setIsError(true);
                setErrorMessage("Please fill in all the fields with valid information!");
            }
            
        };       
        }


    return (
        <div>
            <form className = 'song-form' onSubmit = {handleSubmit}>
                <input
                    type = "text" 
                    placeholder = "Song Name" 
                    value = {info.song_name} 
                    name = "song_name" 
                    className = "song-input"
                    onChange = {handleChange}>
                </input>
                <input
                    type = "text" 
                    placeholder = "Artist Name" 
                    value = {info.artist_name} 
                    name = "artist_name" 
                    className = "song-input"
                    onChange = {handleChange}>
                </input>
                <input
                    type = "text" 
                    placeholder = "Short Description" 
                    value = {info.genre} 
                    name = "genre" 
                    className = "song-input"
                    onChange = {handleChange}>
                </input>
                <input
                    type = "number" 
                    placeholder = "Year of Release" 
                    value = {info.year_of_release} 
                    name = "year_of_release" 
                    className = "song-input"
                    onChange = {handleChange}>
                </input>
                <input
                    type = "text" 
                    placeholder = "Duration in Format: 00:00" 
                    value = {info.duration_of_song} 
                    name = "duration_of_song" 
                    className = "song-input"
                    onChange = {handleChange}>
                </input>
                
                <button className = "song-button">Add Song</button>
            </form>
            <p className = "error-msg">{isError ? errorMessage : null}</p>
        </div>
    )
}

export default AddSongForm
