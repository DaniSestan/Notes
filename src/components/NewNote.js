import React from 'react';
import { connect } from 'react-redux'
import {Button, Form, Header, Grid, Transition, Input, Label} from "semantic-ui-react";
import { addNote } from "../actions";

class NewNote extends React.Component {
    
    constructor(props) {
        
        super(props);
        this.state = {
            title: '',
            content: '',
            titleError: false,
            contentError: false
        }
    }
    
    add = (title, content) => {
        const id = this.props.id;
        this.props.add(id, title, content)
    };
    
    handleOnSubmit = (title, content) => {
        if (title !== null && title !== '' && content !== null && content !== '') {
            this.add(title, content);
            this.setState({
                title: '',
                content: '',
                titleError: false,
                contentError: false
            });
            
            this.props.onSubmit();
        } else {
            if (title !== null && title !== '' )
                this.setState({titleError: false});
            else
                this.setState({titleError: true});             

            if (content !== null && content !== '')
                this.setState({contentError: false});
            else
                this.setState({contentError: true});
        }
        
        
    };
    
    handleCancel = () => {
        this.setState({
            title: '',
            content: '',
            titleError: false,
            contentError: false
        });
        this.props.onSubmit();  
    };
    
    render() {
        const { title, content, titleError, contentError } = this.state;
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
                    <Grid padded centered>
                        <Grid.Column>
                            <Grid.Row>
                                <Header textAlign='center'>Create New Note</Header>
                            </Grid.Row>
                            <br />
                            <Grid.Row>
                                <Form.Field>
                                    <label>Title : </label>
                                    <Input placeholder='Enter title here'
                                           onChange={(e) => { this.setState({title: e.target.value})}}
                                           value={title}/>;
                                    {titleErrorLabel}
                                </Form.Field>
                            </Grid.Row>
                            <br />
                            <Grid.Row>
                                <Form.Field>
                                    <label>Content : </label>
                                    <Input placeholder='Enter content here'
                                           onChange={(e) => { this.setState({content: e.target.value})}}
                                           value={content}/>;
                                    {contentErrorLabel}
                                </Form.Field>
                            </Grid.Row>
                            <br />
                            <Grid.Row>
                                <Button type='submit'
                                        onClick={() => {this.handleOnSubmit(title, content)}}>
                                    Submit
                                </Button>
                                <Button negative
                                        onClick={() => this.handleCancel()}>
                                    Cancel
                                </Button>
                            </Grid.Row>
                            <br />
                        </Grid.Column>
                    </Grid>
                </Form>
            </Transition>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        notes: state.notes,
        id: state.newId
    };
};

const mapDispatchToProps = {
    add: addNote
};

export default connect(mapStateToProps, mapDispatchToProps)(NewNote);