const CONTENT_CHANGED = 'editor/CONTENT_CHANGED';

interface EditorState {
    content: string;
}

const initialState: EditorState = {
    content: ""
};

export function reducer(state: EditorState = initialState, action: any = {}): EditorState {
    switch (action.type) {
        case CONTENT_CHANGED:
            return {
                content: action.content
            };
        default:
            return state;
    }
}

export function onChangeContent(content: string) {
    return {
        type: CONTENT_CHANGED,
        content
    };
}

export default reducer;
