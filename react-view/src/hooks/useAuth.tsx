import { useEffect, useState } from 'react';

export function useAuth() {
    const [auth, setAuth] = useState<boolean>(window.localStorage.getItem('authenticated') === 'true');
    const tokenFromStorage = window.localStorage.getItem('access_token');

    let isAuthenticated = false;    
    if(auth){
        isAuthenticated = true;
    }

    return {
        isAuthenticated,
        accessToken: tokenFromStorage
    }
}
