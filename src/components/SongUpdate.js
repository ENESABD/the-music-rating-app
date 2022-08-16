import React, {useState, useEffect} from 'react';
import axios from "axios";

function SongUpdate({ songID, setRightColumn }) {
    const [info, setInfo] = useState({
        song_name : "",
        artist_name : "",
        genre : "",
        year_of_release : "",
        duration_of_song : ""
    });
    const [errorMessage, setErrorMessage] = useState("");
    const [isError, setIsError] = useState(false);
    const [songList,setSongList] = useState([]);

    const handleChange = event => {
        const value = event.target.value;
        setInfo({
            ...info,
            [event.target.name] : value
        });
    }


    useEffect(() => {
        axios.get("http://the-music-rating-app.herokuapp.com/api/songs/")
            .then(res => {
                setSongList(res.data);
            })
            .catch(err => console.log("no"));
    },[songID]);
    
    const getSong = (song_object_id) => {
        return songList.filter(value => value.id == song_object_id)[0];
    }



    const handleSubmit = async (event) => {
        event.preventDefault();     
        try {
            let result0 = await axios.get("http://the-music-rating-app.herokuapp.com/api/details/");
            let detail = result0.data.filter(val => getSong(val.song).id == songID)[0];
            let detailID = detail.id;
            let emptyField = () => {
                if (info.song_name == "" && info.artist_name == "") {
                    return {
                        song_name : getSong(songID).song_name,
                        artist_name : getSong(songID).artist_name,
                    //    genre : info.genre,
                    //    year_of_release : info.year_of_release,
                    //    duration_of_song : info.duration_of_song
                    }
                } else if (info.song_name == "") {
                    return {
                        song_name : getSong(songID).song_name,
                        artist_name : info.artist_name,
                    //    genre : info.genre,
                    //    year_of_release : info.year_of_release,
                    //    duration_of_song : info.duration_of_song
                    }
                } else if (info.artist_name == "") {
                    return {
                        song_name : info.song_name,
                        artist_name : getSong(songID).artist_name,
                    //    genre : info.genre,
                    //    year_of_release : info.year_of_release,
                    //    duration_of_song : info.duration_of_song
                    }
                } else {
                    return {
                        song_name : info.song_name,
                        artist_name : info.artist_name
                    }
                }
            }
            
            let updatedSong = emptyField();
            console.log(updatedSong);


            let result = await axios.put(`http://the-music-rating-app.herokuapp.com/api/songs/${songID}/`, 
                                        updatedSong);
            axios.put(`http://the-music-rating-app.herokuapp.com/api/details/${detailID}/`, {song : result.data.id, genre : info.genre || detail.genre, 
                    year_of_release : info.year_of_release || detail.year_of_release, 
                    duration_of_song : info.duration_of_song || detail.duration_of_song})
                .then(res => {
                    setIsError(false);
                    setRightColumn("Welcome!");
                })       
                .catch(err =>{
                    console.log(err.response);
                    setIsError(false);
                    setRightColumn("Welcome!");
            });    
        } catch (err) {
            console.log(err.response.data);
            if(err.response.data.song_name){
                if(err.response.data.song_name[0] == "song with this song name already exists.") {
                    setIsError(true);
                    setErrorMessage("You can already enjoy information about this song in our website!");
                } else {
                    setIsError(true);
                    setErrorMessage("Please fill in all the fields!");
                }
            } else {
                setIsError(true);
                setErrorMessage("Please fill in all the fields!");
            }
        };  
        }

    return (
        <div>
            <p className = "welcome-msg">If you leave a field empty, its value will stay the same.</p>
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
                <button className = "song-button">Update</button>
            </form>
            <p className = "error-msg">{isError ? errorMessage : null}</p>
            <p className = "error-msg">{errorMessage == undefined ? "Please enter an Artist Name" : null}</p>
            
        </div>
    )
}

export default SongUpdate


// after we add the song, the add song form does not dissapear
// duration_of_song ranking does not work - should we remove it?
//song details 