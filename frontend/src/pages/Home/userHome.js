import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loading } from "../../components/CustomLoading";
import { NavBar } from "../../components/Navbar";
import arrow from "../../assets/images/arrow.png"
import pinkShoes from "../../assets/images/sepatu_1.png"
import redShoes from "../../assets/images/sepatu_2.png"
import beigeShoes from "../../assets/images/sepatu_3.png"
import Carousel3D from "../../Carousel3D";

export const UserHome = () => {
    const navigate = useNavigate();
    
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const [loading, setLoading] = useState(true);
    
    const username = JSON.parse(localStorage.getItem('token'))?.username;
    
    const goToLoginPage = () => {
        navigate('/login');
    }

    const onLogOut = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('isLoggedIn');

        navigate('/login');
    }

    useEffect(() => {
        const isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn')) ? JSON.parse(localStorage.getItem('isLoggedIn')) : null;
        
        if(isLoggedIn) {
            setIsLoggedIn(true);
        }
    });

    useEffect(() => {   
        setTimeout(() => {
            setLoading(false);
        }, 500);
    }, []);

    if(loading) {
        return <Loading/>
    }

    const shoesImage = (shoes) => {
        return <div 
                className="hover:scale-125"
                style={{
                    backgroundImage: `url(${shoes})`, 
                    width: '200px', 
                    height: '200px', 
                    backgroundPosition: 'center', 
                    backgroundRepeat: 'no-repeat', 
                    backgroundSize: 'cover',
                    cursor: 'pointer',
                }}>
            </div>
    }
    
    return(
        <>  
            <NavBar isLoggedIn={isLoggedIn}/>
            <div className="h-[calc(100vh-100px)] flex justify-between items-center px-12">
                {/* <div className="cursor-pointer" style={{backgroundImage: `url(${arrow})`, width: '36px', height: '72px', backgroundPosition: 'center' , rotate: '180deg'}}></div> */}

                {/* <div className="flex items-center justify-center w-3/4"> */}
                    <div>
                        <p className="font-jura font-bold text-[32px] text-[#DC6249] mb-3">Best Seller</p>
                        <div className="font-jura font-bold"> 
                            <p className="text-[64px]">Nike Air Max Dn8</p>
                            <p className="text-2xl mb-10">Stability. Zoom Air. Nice Shoes.</p>
                        </div>
                        <button className="font-jura font-bold text-2xl border-2 border-black py-3 px-2 mb-7 hover:bg-black hover:text-white">SHOP NOW</button>

                        <div className="flex">
                            {shoesImage(pinkShoes)}
                            {shoesImage(redShoes)}
                            {shoesImage(beigeShoes)}
                        </div>
                    </div>
                    <div className="mr-12 -mt-16" 
                        style={{border: 'black 1px solid',backgroundImage: `url(${pinkShoes})`, width: '650px', height: '650px', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}}></div>
                {/* </div> */}
                {Carousel3D}

                {/* <div className="cursor-pointer" style={{backgroundImage: `url(${arrow})`, width: '36px', height: '72px', backgroundPosition: 'center'}}></div> */}
            </div>
        </>
    )
}