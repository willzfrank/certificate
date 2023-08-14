import * as React from 'react'

const useElementDimension = (ref: React.RefObject<HTMLElement>): { height: number, width: number } => {

    const [elementDimensions, setElementDimensions] = React.useState<{ height: number, width: number }>({ height: 0, width: 0 });

    React.useEffect(() => {
        if (ref.current) {
            const refDimensions = ref.current.getBoundingClientRect();
            setElementDimensions({ height: refDimensions.height, width: refDimensions.width })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ref.current]);

    return elementDimensions;
}

export default useElementDimension;