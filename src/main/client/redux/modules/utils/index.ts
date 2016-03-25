export function reduceReducers(...reducers: Redux.Reducer[]): Redux.Reducer {
    return (state, action) =>
        reducers.reduce(
            (s, r) => r(s, action),
            state
        );
}

// export function mapToCollection(reducer: Redux.Reducer): Redux.Reducer {
//     return (state = [], action: { payload: { filter: (val, index, collection) => boolean } }) => {
//         if (!action.payload || !action.payload.filter) {
//             const result = reducer(undefined, action);

//             return isEmpty(result) ? [...state] : [result, ...state];
//         }

//         const filter = action.payload.filter;
//         const [elementState] = state.filter(filter);

//         if (elementState === undefined) {
//             throw `incorrect filter was given`;
//         }

//         const result = reducer(elementState, action);

//         return isEmpty(result) ? [...state.filter((v, i, c) => !filter(v, i, c))] : [result, ...state.filter((v, i, c) => !filter(v, i, c))];
//     };
// }

// export function mergeState(reducer: Redux.Reducer): Redux.Reducer {
//     return (state, action) => assign({}, state, reducer(state, action));
// }