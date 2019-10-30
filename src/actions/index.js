import types from "../constants";

export const addNote = (id, title, content) => {
  return {
      id: id,
      type: types.ADD_NOTE,
      title: title,
      content: content
  }  
};

export const removeNote = (id, title, content) => {
  return {
      type: types.REMOVE_NOTE,
      id: id,
      title: title,
      content: content
  }  
};

export const editNote = (id, title, content) => {
    return {
        type: types.EDIT_NOTE,
        id: id,
        title: title,
        content: content
    }
};