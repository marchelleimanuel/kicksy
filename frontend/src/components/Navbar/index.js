import { useNavigate } from 'react-router-dom';
import cartIcon from '../../assets/images/cart-icon.png';

export const NavBar = (props) => {
    const navigate = useNavigate();

    const goToLoginPage = () => {
        navigate('/login');
    }

    const goToHomePage = () => {
        navigate('/home');
    }

    return (
        <>
            <div className="border-b-2 border-black border-opacity-25 h-[100px] flex items-center justify-between px-11 sticky top-0 bg-white z-10">
                <div className="flex flex-col justify-center cursor-pointer">
                    <span className="border-2 border-black w-7"></span>
                    <span className="border-2 border-black w-7 my-1"></span>
                    <span className="border-2 border-black w-7"></span>
                </div>

                <div>
                    <span className="text-[40px] font-jura font-bold cursor-pointer" onClick={goToHomePage}>KICKSY</span>
                </div>

                <div className={`flex flex-row items-center justify-between ${!props.isLoggedIn ? 'w-[130px]' : ''}`}>
                    <div>
                        {!props.isLoggedIn ? 
                            <span className="font-jura font-bold text-2xl cursor-pointer" onClick={goToLoginPage}>Sign In</span>
                        : null}
                    </div>
                    <div>
                        <div className="cursor-pointer" style={{backgroundImage: `url(${cartIcon})`, height: '30px', width: '30px', backgroundPosition: 'center'}}></div>
                    </div>
                </div>
            </div>
        </>
    )
}