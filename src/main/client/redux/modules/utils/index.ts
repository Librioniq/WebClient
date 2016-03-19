export function reduceReducers(...reducers: Redux.Reducer[]): Redux.Reducer {
    return (state, action) =>
        reducers.reduce(
            (s, r) => r(s, action),
            state
        );
}