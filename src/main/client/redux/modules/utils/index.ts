export function reduceReducers(...reducers: Redux.Reducer[]): Redux.Reducer {
    return (state, action) =>
        reducers.reduce(
            (s, r) => r(s, action),
            state
        );
}

export function mapToCollection(reducer: Redux.Reducer): Redux.Reducer {
    return (state = [], action: { payload: { filter: (val, index, collection) => boolean } }) => {
        if (!action.payload || !action.payload.filter) {
            throw `action must contains property 'payload.filter' with value type '(val, index, collection) => boolean'`;
        }

        const filter = action.payload.filter;
        const [elementState] = state.filter(filter);

        if (elementState === undefined) {
            throw `incorrect filter was given`;
        }

        return [reducer(elementState, action), ...state.filter((v, i, c) => !filter(v, i, c))];
    };
}