import React, { useState, useEffect } from "react";
import Cardlist from "../components/Cardlist";
import SearchBox from "../components/SearchBox";
import Scroll from '../components/scroll'
import ErrorBoundry from "../components/errorBoundary";

import './App.css';


function App() {
    const [robots, setRobots] = useState([])
    const [searchField, setSearchField] = useState('')
    const [count, setCount] = useState(0)

    useEffect(()=> {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(users => {setRobots(users)})
    }, [])

    useEffect(()=>{
        console.log(count)
    }, [count])

    const onSearchChange = (event) => {
        setSearchField(event.target.value)
    }

    const filteredRobots = robots.filter(robot =>{
        return robot.name.toLowerCase().includes(searchField.toLowerCase()) 
    })

    if( !robots.length) {
        return <h1>Loading</h1>
    }
    else {
        return (
            <div 
            className="tc">
            <h1 className="f1">Robofriends</h1>
            <button onClick={()=>setCount(count +1)}>Click me</button>
            <SearchBox searchChange={onSearchChange}/>
            <Scroll>
                <ErrorBoundry>
                    <Cardlist robots={filteredRobots}/>
                </ErrorBoundry>
            </Scroll>
            </div>
        )
    }
}


export default App;