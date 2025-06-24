import React , {useEffect ,useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// This component protects routes based on authentication status. It redirects users if they are not allowed to access a page.

function Protected( { children , authentication = true } ){
    
    const navigate = useNavigate();
    const authStatus = useSelector( (state) => state.auth.status ); //From Redux, tells if the user is authenticated.
     const [loader, setLoader] = useState(true) ;//Shows "Loading..." while checking.

    useEffect(() => {

         // if (authStatus ===true){
        //     navigate("/")
        // } else if (authStatus === false) {
        //     navigate("/login")
        // }
        

        // Check if the user is authenticated
        // If  user is not authenticated, redirect to login , so is user is authenticated then redirect to home.

        // TRUE && TRUE !== TRUE  ==> TRUE && FALSE ==> FALSE 
        if( authentication && authStatus !== authentication){
            //here user is not authenticated
            navigate('/login');
        }else if( !authentication && authStatus !== authentication ){
            //here user is authenticated
            navigate('/');
        }
        setLoader(false);
    } , [ authStatus ,navigate ,authentication]);

  return loader ? <h1>Loading...</h1> : <>{children}</>; 
}

export default Protected;

// Case 1: authentication is true (protected route, needs login)
// If authStatus !== true (user is NOT authenticated), redirect to /login.

// Case 2: authentication is false (public-only route, e.g., login/signup)
// If authStatus !== false (user IS authenticated), redirect to /.

// In simple words:
// If the route requires authentication and the user is not authenticated, send them to the login page.
// If the route should only be accessed by unauthenticated users and the user is authenticated, send them to the home page.