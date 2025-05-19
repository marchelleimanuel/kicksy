import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { validateUser } from "../../services/Login";
import { registerNewUser } from "../../services/Register";


export const Register = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [isUsernameEmpty, setIsUsernameEmpty] = useState(true);
    const [isUsernameValid, setIsUsernameValid] = useState(true);
    
    const [email, setEmail] = useState('');
    const [isEmailEmpty, setIsEmailEmpty] = useState(true);
    const [isEmailValid, setIsEmailValid] = useState(true);
    // const [isEmailCorrect, setIsEmailCorrect] = useState(true);
    
    const [password, setPassword] = useState('');
    const [isPasswordEmpty, setIsPasswordEmpty] = useState(true);
    const [isPasswordValid, setIsPasswordValid] = useState(true);
    
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isConfirmPasswordEmpty, setIsConfirmPasswordEmpty] = useState(true);

    const [message, setMessage] = useState('');
    
    
    const onChangeEmail = (event) => {
        const email = event.target.value;
        setEmail(email);
        email.trim() === '' ? setIsEmailEmpty(true) : setIsEmailEmpty(false);
    }

    const onChangePassword = (event) => {
        const password = event.target.value;
        setPassword(password);
        password.trim() === '' ? setIsPasswordEmpty(true) : setIsPasswordEmpty(false);
    }

    const onChangeUsername = (event) => {
        const username = event.target.value;
        setUsername(username);
        username.trim() === '' ? setIsUsernameEmpty(true) : setIsUsernameEmpty(false);
    }

    const onChangeConfirmPassword = (event) => {
        const confirmPassword = event.target.value;
        setConfirmPassword(confirmPassword);
        confirmPassword.trim() === '' ? setIsConfirmPasswordEmpty(true) : setIsConfirmPasswordEmpty(false);
    }

    const goToLogin = () => {
        navigate('/login')
    }

    const onClickRegister = async () => {

        const params = {
            username: username,
            email: email,
            password: password,
            confirmPassword: confirmPassword
        }

        try {
            const response = await registerNewUser(params)
            if(response.status !== 200) {
                throw response;
            }

            setIsEmailValid(true);
            setIsPasswordValid(true);
            setIsUsernameValid(true);

            navigate('/login')
        } catch (error) {
            const errorMessage = error.response.data.messages.toLowerCase();

            if(errorMessage) {
                errorMessage.includes('email') ? setIsEmailValid(false) : setIsEmailValid(true);
                errorMessage.includes('password') ? setIsPasswordValid(false) : setIsPasswordValid(true);
                errorMessage.includes('username') ? setIsUsernameValid(false) : setIsUsernameValid(true);
                setMessage(error.response.data.messages);
            }
        }
        
    }

    return(
        <>  
            <div className="flex justify-center items-center min-h-screen">

                <div className="absolute left-0 right-0 bottom-0 top-0 overflow-hidden">
                    <svg className="hidden w-[70%] 2xl:w-7/12 xl:w-[65%] lg:max-[1106px]:w-[81%] lg:w-[75%] lg:block" viewBox="0 0 975 1024" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M938 124L961 59.5C966.919 38.2467 971.314 18.7943 974 0L930.5 -38H-55.5L-53.5 1032.74H2H312.911L332.039 963.271L348.589 915.272L367.75 867.745L398.143 807.663L433.676 750.082L469.5 699.158L506.5 655.217L540.857 620.245L581.821 582.582L641.286 523.397L706 464.5L761 405.5L793.5 365.5L823 327.5L859 270.5L889.5 219L915 173L938 124Z" fill="black"/>
                        <path d="M303 1100L306.964 1067.72L312.911 1032.74M312.911 1032.74L332.039 963.271L348.589 915.272L367.75 867.745L398.143 807.663L433.676 750.082L469.5 699.158L506.5 655.217L540.857 620.245L581.821 582.582L641.286 523.397L706 464.5L761 405.5L793.5 365.5L823 327.5L859 270.5L889.5 219L915 173L938 124L961 59.5C966.919 38.2467 971.314 18.7943 974 0L930.5 -38H-55.5L-53.5 1032.74H2H312.911Z" stroke="white"/>
                    </svg>
                </div>

                <div className="w-full flex justify-center items-center lg:justify-end">
                    <div className="flex flex-col items-center pt-10 pb-4 px-4 rounded-md z-50 w-72 lg:mr-[10%] lg:max-[1106px]:mr-[5%]">
                        <h1 className="font-bold text-4xl">
                            REGISTER
                        </h1>
                        <div className="flex flex-col my-6 w-full">
                            <input 
                                type="text" 
                                className= {`focus:outline-none py-1 px-2 ${!isEmailValid ? 'border-b-2 border-red-500 text-red-500' : 'mb-2 border-b-2 border-black'}`}
                                placeholder="Input your email"
                                onChange={onChangeEmail}
                            />
                            {!isEmailValid && (
                                    <p className="text-sm text-red-500 ml-1">{message}</p>
                                ) 
                            }

                            <input 
                                type="text" 
                                className= {` focus:outline-none py-1 px-2 ${!isUsernameValid ? 'border-b-2 border-red-500 text-red-500' : 'mb-2 border-b-2 border-black'}`}
                                placeholder="Input your username"
                                onChange={onChangeUsername}
                            />
                            {!isUsernameValid && (
                                    <p className="text-sm text-red-500 ml-1">{message}</p>
                                ) 
                            }

                            <input 
                                type="password" 
                                className={`focus:outline-none py-1 px-2 ${!isPasswordValid ? 'border-b-2 border-red-500 text-red-500' : 'mb-2 border-b-2 border-black'}`}
                                placeholder="Input your password"
                                onChange={onChangePassword}
                            />
                            {!isPasswordValid && <p className="text-sm text-red-500 ml-1 ">{message}</p>}

                            <input 
                                type="password" 
                                className={`focus:outline-none py-1 px-2 ${!isPasswordValid ? 'border-b-2 border-red-500 text-red-500' : 'border-b-2 border-black'}`}
                                placeholder="Confirm your password"
                                onChange={onChangeConfirmPassword}
                            />
                            {!isPasswordValid && <p className="text-sm text-red-500 ml-1 ">{message}</p>}
                        </div>
                        <button 
                            className={`py-2 px-4 font-semibold rounded-lg text-white  bg-black w-full ${isEmailEmpty || isPasswordEmpty || isUsernameEmpty || isConfirmPasswordEmpty ? 'opacity-75' : 'hover:opacity-75'}`}
                            onClick={onClickRegister}
                            disabled={isEmailEmpty || isPasswordEmpty || isUsernameEmpty || isConfirmPasswordEmpty}
                        >
                            Sign Up
                        </button>

                        <div className="mt-2">
                            <p className="text-[16px]">Already have an account? <span className="italic underline font-bold hover:cursor-pointer" onClick={goToLogin}>Sign In</span> </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};