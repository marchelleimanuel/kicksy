import { useNavigate } from "react-router-dom";

export const AdminHome = () => {
    const navigate = useNavigate();
    
    const goToLoginPage = () => {
        navigate('/login');
    }

    return(
        <>
            <h1 className="text-4xl">ini home admin</h1>
            <button 
                onClick={goToLoginPage}
            >
                Login
            </button>
        </>
    )
}