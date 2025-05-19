import { AdminHome } from "./adminHome";
import { UserHome } from "./userHome";

export const Home = () => {
    if(JSON.parse(localStorage.getItem('token'))?.user_role === 'admin') {
        return <AdminHome/>;
    }
    else if(JSON.parse(localStorage.getItem('token'))?.user_role === 'user') {
        return <UserHome/>;
    }
    else {
        return <UserHome/>;
    }
}