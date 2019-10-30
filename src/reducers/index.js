import types from "../constants";

const initialState = {
    notes: [
        
    ],
    removedNotes: [],
    newId: 0
};

const rootReducer = (state = initialState, action) => {
    
    switch (action.type) {
        case types.ADD_NOTE:
            return {
                ...state,
                notes: [
                    ...state.notes,
                    {
                        id: action.id,
                        title: action.title,
                        content: action.content
                    }
                ],
                newId: state.newId + 1
            };
            
        case types.EDIT_NOTE:
            let index;
            
            for (var [note, i] of state.notes.entries()) {
                if (note.id === action.id) {
                    return index =  i;       
                }
            }
            
            const notesArr = state.notes.filter(note => note.id !== action.id);
            
            return {
                ...state,
                notes: [
                    ...notesArr.splice(0, index),
                    {
                        id: action.id,
                        title: action.title,
                        content: action.content
                    },
                    ...notesArr.splice(index)
                ]
            };
            
        case types.REMOVE_NOTE:
            return {
                ...state,
                notes: [
                    ...state.notes.filter(note => note.id !== action.id) ],
                removedNotes:  [
                    ...state.removedNotes,
                    {
                        id: action.id,
                        title: action.title,
                        content: action.content
                    }
                ]
            };
            
        default:
            return state;
    }
};

export default rootReducer;
