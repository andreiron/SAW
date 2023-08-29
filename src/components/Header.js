import Clock from "./Clock";
import User from "./User";
import ToggleLightDark from "./ToggleLightDark";



function Header() {

    return (
        <>
            <div className=" flex justify-between w-full h-full" >
                <Clock />
                <div className="flex items-center justify-center ">

                    <User />
                </div>
            </div>
        </>
    );

}

export default Header;