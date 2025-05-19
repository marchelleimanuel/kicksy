import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { validateUser } from "../../services/Login";
import { Loading } from "../../components/CustomLoading";


export const Login = () => {
    const navigate = useNavigate();

    const [emailOrUsername, setEmailOrUsername] = useState('');
    const [password, setPassword] = useState('');

    const [isEmailOrUsernameEmpty, setIsEmailOrUsernameEmpty] = useState(true);
    const [isEmailOrUsernameExist, setIsEmailOrUsernameExist] = useState(true);

    const [isPasswordEmpty, setIsPasswordEmpty] = useState(true);
    const [isPasswordValid, setIsPasswordValid] = useState(true);

    const [message, setMessage] = useState('');

    const [loading, setLoading] = useState(false);

    // useEffect(() => {
    //     localStorage.removeItem('token');
    //     localStorage.removeItem('isLoggedIn');
    // });

    const onChangeEmailOrUsername = (event) => {
        const emailOrUsername = event.target.value;
        setEmailOrUsername(emailOrUsername);
        emailOrUsername.trim() === '' ? setIsEmailOrUsernameEmpty(true) : setIsEmailOrUsernameEmpty(false);
    }

    const onChangePassword = (event) => {
        const password = event.target.value;
        setPassword(password);
        password.trim() === '' ? setIsPasswordEmpty(true) : setIsPasswordEmpty(false);
    }

    const goToRegister = () => {
        navigate('/register');
    }

    const onClickLogin = async () => {
        setLoading(true);
        const params = {
            emailOrUsername: emailOrUsername,
            password: password
        }

        try {
            const response = await validateUser(params)
            if(response.status !== 200) {
                throw response;
            }

            setIsEmailOrUsernameExist(true);
            setIsPasswordValid(true);

            localStorage.setItem('token', JSON.stringify(response.data.data));
            localStorage.setItem('isLoggedIn', JSON.stringify(true));
            navigate('/home')
        } catch (error) {
            const errorMessage = error.response.data.messages.toLowerCase();

            if(errorMessage) {
                errorMessage.includes('email') ? setIsEmailOrUsernameExist(false) : setIsEmailOrUsernameExist(true);
                errorMessage.includes('password') ? setIsPasswordValid(false) : setIsPasswordValid(true);
                setMessage(error.response.data.messages);
            }
        } finally {
            setLoading(false);
        }
    }

    return(
        <div className="flex justify-between items-center min-h-screen">

            <div className="absolute left-0 right-0 bottom-0 top-0 overflow-hidden">
                <svg className="hidden w-[70%] 2xl:w-7/12 xl:w-[65%] lg:max-[1106px]:w-[81%] lg:w-[75%] lg:block"  viewBox="0 0 975 1024" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M938 124L961 59.5C966.919 38.2467 971.314 18.7943 974 0L930.5 -38H-55.5L-53.5 1032.74H2H312.911L332.039 963.271L348.589 915.272L367.75 867.745L398.143 807.663L433.676 750.082L469.5 699.158L506.5 655.217L540.857 620.245L581.821 582.582L641.286 523.397L706 464.5L761 405.5L793.5 365.5L823 327.5L859 270.5L889.5 219L915 173L938 124Z" fill="black"/>
                    <path d="M303 1100L306.964 1067.72L312.911 1032.74M312.911 1032.74L332.039 963.271L348.589 915.272L367.75 867.745L398.143 807.663L433.676 750.082L469.5 699.158L506.5 655.217L540.857 620.245L581.821 582.582L641.286 523.397L706 464.5L761 405.5L793.5 365.5L823 327.5L859 270.5L889.5 219L915 173L938 124L961 59.5C966.919 38.2467 971.314 18.7943 974 0L930.5 -38H-55.5L-53.5 1032.74H2H312.911Z" stroke="white"/>
                </svg>
            </div>

            <div className="w-full flex justify-center items-center lg:justify-end">
                <div className="flex flex-col items-center pt-10 pb-4 px-4 rounded-md z-50 w-72 lg:mr-[10%] lg:max-[1106px]:mr-[6%]">
                    <h1 className="font-bold text-4xl">
                        SIGN IN
                    </h1>
                    <div className="flex flex-col my-6 w-full">
                        <input 
                            type="text" 
                            className= {`focus:outline-none py-1 px-2 ${!isEmailOrUsernameExist ? 'border-b-2 border-red-500 text-red-500' : 'mb-2 border-b-2 border-black'}`}
                            placeholder="Email/Username"
                            onChange={onChangeEmailOrUsername}
                        />
                        {!isEmailOrUsernameExist && (
                                <p className="text-sm text-red-500 ml-1">{message}</p>
                            ) 
                        }
                        <input 
                            type="password" 
                            className={`focus:outline-none py-1 px-2 ${!isPasswordValid ? 'border-b-2 border-red-500 text-red-500' : 'border-b-2 border-black mb-6'}`}
                            placeholder="Password"
                            onChange={onChangePassword}
                        />
                        {!isPasswordValid && <p className="text-sm text-red-500 ml-1 mb-6">{message}</p>}
                        
                        <button 
                            className={`py-2 px-4 font-semibold rounded-lg text-white bg-black w-full ${isEmailOrUsernameEmpty || isPasswordEmpty ? 'opacity-75' : 'hover:opacity-75'}`}
                            onClick={onClickLogin}
                            disabled={isEmailOrUsernameEmpty || isPasswordEmpty}
                        >
                            Login
                        </button>
                    </div>

                    <div className="mt-2">
                        <p className="text-[16px]">Don't have an account? <span className="italic underline font-bold hover:cursor-pointer" onClick={goToRegister}>Sign Up</span> </p>
                    </div>
                </div>
            </div>
            
        </div>
    )
};