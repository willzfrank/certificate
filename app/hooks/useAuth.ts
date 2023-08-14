import * as React from 'react';
import { useAppSelector } from 'app/hooks'

export default function useAuth() {
    
    const { token } = useAppSelector(store => store.user);

    return Boolean(token);
    
}