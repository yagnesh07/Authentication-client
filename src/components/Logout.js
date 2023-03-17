import Cookies from 'js-cookie';
import React from 'react'
import { toast } from 'react-toastify';
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom';

const toastOptions = {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
};

function Logout() {
    const navigate = useNavigate()
    const handleLogout = async () => {
        Cookies.remove("adriux_test")
        if (!Cookies.get("adriux_test")) {
            toast.success("Logout Successful", toastOptions);
            navigate("/login");
        } else {
            toast.error("Enable to logut user", toastOptions);
        }
    }

    return (
        <ButtonLg onClick={handleLogout}>Logout</ButtonLg>
    )
}

const ButtonLg = styled.button`
    border: 0;
    background: transparent;
    padding: 0;
    font-size: 16px;
    line-height: normal;
    height: auto;
`

export default Logout