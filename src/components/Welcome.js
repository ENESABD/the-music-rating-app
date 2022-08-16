import React from 'react'

function Welcome() {
    return (
        <div className = "welcome-msg">
            <h1>Welcome to our Song Rating Site!</h1>
            <h2>Let me run you through the functionality of our app!</h2>
            <p>You can add any song to our database through the 'Add a New Song' button.</p>
            <p>You can Update any song, and any field you leave blank in the update form will retain its original value.</p>
            <p>If you find you don't like any of the songs, you can delete them using the delete button.</p>
            <p>We believe in a different type of democracy here. If one person wants a song to be deleted, they can delete it
                without any need for any authority or authorization. </p>
            <p>If you click on the song name, our app will display the details of that song, including its
                last rating (Yes, last rating! We don't believe in averages!). Using the add rating field, you can add your rating.
            </p>
            <p>Using our Search Bar, you can search for songs through either the Song name or the Artist name.</p>
            <p>You can also sort the list of songs by song name, rating and the year of release.</p>
            
        </div>
    )

}

export default Welcome
