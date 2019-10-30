import React from 'react';
import { connect } from 'react-redux'
import {Transition, Form, Button, Label} from "semantic-ui-react";

import { editNote } from "../actions";

class NoteEditor extends React.Component {
     
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            content: '',
            titleError: false,
            contentError: false
        };
        
    }

    // lifecycle hooks------------------------------------------

    componentDidMount() {
        this.setState({
            note: this.props.notes[this.props.noteId],
            title: this.props.notes[this.props.noteId].title,
            content: this.props.notes[this.props.noteId].content,
        });
    }

    // ---------------------------------------------------------

    // mapped props----------------
    
    //-------------------------------    
    
    // event handlers-------------------------------------------

    handleOnChange = (val, field) => {
        
        if (field === 'title'){
            this.props.handleOnChangeTitle(val);
            this.setState({title: val});
        } else if (field === 'content'){
            this.props.handleOnChangeContent(val);
            this.setState({content: val});
        }
    };
    
    handleOnSubmit = () => {
        if (this.state.title !== null && this.state.title !== '' 
            && this.state.content !== null && this.state.content !== '') {
            this.setState({
                titleError: false,
                contentError: false
            });
            this.props.edit(this.props.noteId, this.state.title, this.state.content);
            this.props.onSubmitCancel();
        } else {
            if (this.state.title === null || this.state.title === '')
                this.setState({titleError: true});
            else
                this.setState({titleError: false});          
            
            if (this.state.content === null || this.state.content === '')
                this.setState({contentError: true});
            else
                this.setState({contentError: false});
        }
    };
    
    handleOnCancel = () => {
        this.setState({
            title: this.props.notes[this.props.noteId].title,
            content: this.props.notes[this.props.noteId].content,
            titleError: false,
            contentError: false
        });
        this.props.onSubmitCancel();
    };
    
    handleOnSubmitCancel = (action) => {

        if (action === 'submit') {
            this.props.edit(this.props.noteId, this.state.title, this.state.content);
        } else if (action === 'cancel') {
            this.setState({
                title: this.props.notes[this.props.noteId].title,
                content: this.props.notes[this.props.noteId].content
            });
        }
        this.props.onSubmitCancel();
    };
    
    // ---------------------------------------------------------
    
    render() {
        const note = this.props.notes[this.props.noteId];
        const { titleError, contentError } = this.state;
        let titleErrorLabel, contentErrorLabel;

        titleError ? titleErrorLabel =
            <Label basic color='red'
                   pointing>
                Please enter a value
            </Label> : titleErrorLabel = null;

        contentError ? contentErrorLabel =
            <Label basic color='red'
                   pointing>
                Please enter a value
            </Label> : contentErrorLabel = null;

        return (
            <Transition visible={this.props.visible} 
                        animation='scale' 
                        duration={500}>
                <Form>
                    <Form.Field>
                        <label>Title</label>
                        <input placeholder={note.title} 
                               onChange={(e) => this.handleOnChange(e.target.value, 'title')}
                               value={this.state.title} 
                        />
                        { titleErrorLabel }
                    </Form.Field>
                    <Form.Field>
                        <label>Content</label>
                        <input placeholder={note.content} 
                               onChange={e => this.handleOnChange(e.target.value, 'content')}
                               value={this.state.content} 
                        />
                        { contentErrorLabel }
                    </Form.Field>
                    <Button type='submit' onClick={this.handleOnSubmit}>Submit</Button>
                    <Button negative onClick={this.handleOnCancel}>Cancel</Button>
                    <br /><br />
                </Form>
            </Transition>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        notes: state.notes
    };
};

const mapDispatchToProps = {
    edit: editNote
};

export default connect(mapStateToProps, mapDispatchToProps)(NoteEditor);