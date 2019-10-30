import React from 'react';
import { Grid, Item, Button, Transition, Icon, Divider } from 'semantic-ui-react';
import { connect } from "react-redux";

import NoteEditor from "./NoteEditor";
import NewNote from "./NewNote";
import { addNote, removeNote } from "../actions";
import '../style.css';

class NoteList extends React.Component {
    
    constructor (props) {
        super(props);
        this.state =
            {
                showNewNote: false,
                showEditor: false,
                showNoteOptions: true,
                editingNote_id: null,
                title: '',
                content: ''
            }
    }
    // lifecycle hooks-----------------------------------------
    
    componentDidMount(){
    }
    
    // --------------------------------------------------------

    // mapped props----------------
    
    remove = (id) => {
        this.props.remove(id);    
    };
    
    add = (id, title, content) => {
        this.props.add(id, title, content);
    };
    
    //-------------------------------
    
    // callbacks to child props-------
    
    titleOnEdit = (title) => {
      this.setState({
          title: title,
        })  
    };
    
    contentOnEdit = (content) => {
      this.setState({
          content: content,
        })  
    };

    noteEditorOnSubmitCancel = () => {
        this.setState({
            showEditor: false,
            editingNote_id: null
        });
    };

    //--------------------------------
    
    // event handlers-----------------
    
    handleOnClickEdit = (event, id) => {
        this.setState({showEditor: true});
        
        this.setState({
            editingNote_id: id,
            title: this.props.notes[id].title,
            content: this.props.notes[id].content
        });
    };

    showNewNote = () => {
        this.state.showNewNote ? this.setState({showNewNote: false}) : this.setState({showNewNote: true});
    };

    // ------------------------------
    
    showNoteOptions = (id) => {
        return id !== this.state.editingNote_id;
    };
    
    showEditor = (id) => {
        return (this.state.showEditor && id === this.state.editingNote_id);
    };
    
    renderList() {
        const { showEditor, editingNote_id, title, content } = this.state;
        
        return (
            this.props.notes.map((note, index) => {
                console.log('state of editingNote_id: ', this.state.editingNote_id);
                return (
                    <Item key={index}>
                        <Item.Content verticalAlign='middle'>
                            <Item.Header>
                                {showEditor && note.id === editingNote_id ? title: note.title}
                            </Item.Header>
                            <Item.Meta>
                                {showEditor && note.id === editingNote_id ? content : note.content}
                            </Item.Meta>
                            <Transition visible={this.showNoteOptions(note.id)}
                                        animation='scale'
                                        duration={500}>
                                <Item.Extra>
                                    <Button negative
                                            floated='right'
                                            onClick = { () => { this.remove(note.id, note.title, note.content) } } >
                                        Delete
                                    </Button>
                                    <Button positive
                                            floated='right'
                                            onClick = {(e) => { this.handleOnClickEdit(e, note.id) } } >
                                        Edit
                                    </Button>
                                </Item.Extra>
                            </Transition>
                            <NoteEditor visible={this.showEditor(note.id)}
                                        handleOnChangeTitle = {this.titleOnEdit}
                                        handleOnChangeContent = {this.contentOnEdit}
                                        noteId = {note.id} 
                                        onSubmitCancel = {this.noteEditorOnSubmitCancel} />
                        </Item.Content>
                    </Item>
                )
            })
            
            
        )
    }
    
    render() {
        let { showNewNote } = this.state;
        
        return (
            <Grid centered verticalAlign='middle' padded>
                <Grid.Column width='8'>
                        <Grid.Row>
                            <Button primary
                                    onClick={this.showNewNote}>
                                <Icon name='plus' />
                                Add Note
                            </Button>
                            <NewNote visible={showNewNote}
                                     onSubmit={this.showNewNote}/>
                            <Item.Group divided>
                                {this.renderList()}
                            </Item.Group>
                        </Grid.Row>
                </Grid.Column>
            </Grid>
        )
    }
}

const mapStateToProps = (state) => {
  return {
      notes: state.notes
  };
};

const mapDispatchToProps = {
    add: addNote,
    remove: removeNote
};

export default connect(mapStateToProps, mapDispatchToProps)(NoteList);