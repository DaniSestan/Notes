import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Header } from "semantic-ui-react";
import NoteList from "./NoteList";

class App extends React.Component {
    render() {
        console.log();
        return (
            <div>
                <Header textAlign='center' size='huge' className='main hdr'>Notes</Header>
                <NoteList/>
            </div>
        )
    }
}

export default App;