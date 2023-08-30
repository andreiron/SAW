import Clock from "./Clock";
import User from "./User";
import ToggleLightDark from "./ToggleLightDark";



function Header({ hidden }) {

    return (
        <>
            <div className=" flex justify-between w-full h-full" >
                <Clock />
                <div className="flex items-center justify-center ">

                    <User hidden={hidden} />
                </div>
            </div>
        </>
    );

}

export default Header;