import * as React from 'react';

const useRerender = (): [ boolean, () => void ] => {
    const [ rerenderProxy, setRerenderProxy ] = React.useState(false);

    const rerender = React.useCallback(() => {
        setRerenderProxy(!rerenderProxy);
    }, [ rerenderProxy ])

    return [ rerenderProxy, rerender ];
}

export default useRerender;