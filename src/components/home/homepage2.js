import React from 'react'
import {useSelector} from "react-redux";




function HomePage2() {
    const user = useSelector(state => state.session.user)
    console.log(user.data)
    return (
        <div id='home-display'>
            <h1 id='home-right-header'>Welcome to Car Pooling Scheduler</h1>
        </div>
    )

}

export default HomePage2