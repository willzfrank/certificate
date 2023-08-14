import * as React from 'react'
import { useRouter } from 'next/router'


type StringUndefined = string | undefined;


const getValueFromQuery = (query: any, key: string | string[]) => {
    if (typeof key === 'string') {
        return query[key]
    } else {
        return key.map(val => query[val]) as (StringUndefined | StringUndefined[])
    }
}


const useWatchSearchParams = (key: string | string[], options?: { trackState: boolean }) => {

    const { query } = useRouter()
    const [renderCount, setRenderCount] = React.useState(0)

    const [params, setParams] = React.useState<StringUndefined | StringUndefined[]>(getValueFromQuery(query, key))

    // dynamically create the dependency array
    const deps = typeof key === 'string' ? [query[key]] : key.map(val => query[val])

    React.useEffect(() => {
        let newParams: StringUndefined | StringUndefined[] = getValueFromQuery(query, key);
        setParams(newParams)

        setRenderCount(renderCount + 2)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps)


    if (options?.trackState) {
        if (renderCount > 2) {
            return {
                state: true,
                value: params
            }
        } else {
            // console.log('rendercount is', renderCount)
            // console.log(params)
            return {
                state: params?.at(0) === undefined,
                value: params
            }
        }
    }

    return params;
}

export default useWatchSearchParams;