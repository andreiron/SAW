import Clock from "./Clock";
import User from "./User";



function Header() {    

        return (
            <>
            <div className="bg-red-500 relative flex justify-between" >
                <Clock />
                <User />
            </div>
            </>
        );
    
}

export default Header;