import * as React from 'react';

interface ParentProperties<T, S> {
    children?: React.Component<T, S>[];
}

export default ParentProperties;