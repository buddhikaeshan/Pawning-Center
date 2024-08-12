import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const GoogleSignIn = ({ signIn }) => {

    const handleGoogleSignIn = () => {
        signIn();
    };

    return (
        <button
            type="button"
            className="btn btn-primary w-100"
            onClick={handleGoogleSignIn}
        >
            <FontAwesomeIcon icon={faGoogle} /> Sign in with Google
        </button>
    );
}

export default GoogleSignIn;