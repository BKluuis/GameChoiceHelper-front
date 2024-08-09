import { createContext, useContext, useEffect } from "react";

const AuthContext = createContext({
    user: null, 
    setUser: () => {}
});

/**
 * Fetches the user from backend if no user is currently logged in. 
 * If onSuccess is provided, executes right after setting the user
 * If the user is not logged in, executes onFail.
 * If onFail is not provided, redirects to landing page.
 * If the api is processing the request, the user will be null.
 */
export function useAuthentication(callbacks = {onFail: () => {window.location.replace(process.env.REACT_APP_API_STEAM_AUTH)}, onSuccess: null}){
    const {user, setUser} = useContext(AuthContext);
    
    /** This is really clunky and i don't like it, but i don't know any other way of allowing object destructuring with optional parameters and default values */
    callbacks.onFail = callbacks.onFail || function() {window.location.replace(process.env.REACT_APP_API_STEAM_AUTH)};
    callbacks.onSuccess = callbacks.onSuccess || function() {};   


    useEffect(() => {
        async function getUser(){

            /** Extremely necessary that credentials = include, this way cookies can be sent to backend */
            const response = await fetch(process.env.REACT_APP_API_USER, {credentials: "include"});
            if(response.ok){
                const data = await response.json();
                setUser(data);

                if(callbacks.onSuccess){
                    callbacks.onSuccess();
                }
            } else {
                callbacks.onFail();
            }
        }

        if(!user){
           getUser()
        } else if(callbacks.onSuccess){
            callbacks.onSuccess();
        }
    }, []);

    return user;
}

export default AuthContext;