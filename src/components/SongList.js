import React, { useState, useEffect } from "react";
import axios from "axios";




function Songlist({songAdded, setRightColumn, setSongID, rightColumn}) {
    const [list,setList] = useState([]); // List of Detail Objects
    const [songList,setSongList] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortValue, setSortValue] = useState('');

    const handleSelectChange = event => {
        const value = event.target.value;
        setSortValue(value);
    }

    
   
  
    useEffect(() => {
      axios.get("https://the-music-rating-app.herokuapp.com/api/details/") 
        .then(res => {
            setList(res.data);
        })
        .catch(err =>console.log(err)); 
    },[songAdded,rightColumn]);


    useEffect(() => {
        axios.get("https://the-music-rating-app.herokuapp.com/api/songs/")
            .then(res => {
                setSongList(res.data);
            })
            .catch(err => console.log("no"));
    }, [songAdded,rightColumn]);

    const getSong = (song_object_id) => {
        return songList.filter(value => value.id == song_object_id)[0];
    }

    
    

    const handleClickDetails = (song_id) => {
        setRightColumn("song_details");
        setSongID(song_id);
    }

    const handleClickUpdate = (song_id) => {
        setRightColumn("song_update");
        setSongID(song_id);
    }

    const handleClickDelete = (song_id) => {
        setRightColumn("song_delete");
        setSongID(song_id);
    }

    const handleChangeSearch = event => {
        setSearchTerm(event.target.value)
    }


    return (
        <div className = "container">
            <input type = "text" className = "search-bar" placeholder = "Search by Song Name or Artist Name" onChange = {handleChangeSearch} />
            <p className = "sort-by">Sort By:</p>
            <select className = "sort-by-select" onChange = {handleSelectChange}>
                <option value = "none">None</option>
                <option value = "song_name">Song Name</option>
                <option value = "rating">Rating</option>
                <option value = "year_of_release">Year of Release</option>
            </select>
            <ul className = "list-container">
                {list.filter(value => {
                if (searchTerm == "") {
                    return getSong(value.song)
                } else if (getSong(value.song).song_name.toLowerCase().includes(searchTerm.toLowerCase()) || getSong(value.song).artist_name.toLowerCase().includes(searchTerm.toLowerCase())) {
                    return value
                }
                }).sort((a, b) => {
                    if (sortValue == "song_name") {
                        //console.log(a.song.song_name);
                        return getSong(a.song).song_name.localeCompare(getSong(b.song).song_name);
                    } 
                    else if (sortValue == "rating") {
                        return a.rating - b.rating 
                    } else if (sortValue == "year_of_release") {
                        return a.year_of_release - b.year_of_release
                    } 
                }).map(value => (
                    <li className = "song-list">
                        <button className = "song-name-button" onClick = {(e) => handleClickDetails(value.song, e)}>{getSong(value.song).song_name}</button>
                        <p className = "song-para">{getSong(value.song).artist_name}</p>
                        <div className = "align-right">
                            <button className = "song-update-button" onClick = {(e) => handleClickUpdate(value.song, e)}>Update</button> 
                            <button className = "song-delete-button" onClick = {(e) => handleClickDelete(value.song, e)}>Delete</button>
                        </div> 
                    </li>))}
            </ul>
        </div>

    )
}

export default Songlist
