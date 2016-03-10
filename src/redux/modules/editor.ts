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
            const {content} = state;

            return {
                content: content
            };
        default:
            return state;
    }
}

export function onChangeContent() {
    return {
        type: CONTENT_CHANGED
    };
}

export default reducer;
