import { Link, useLocation } from "react-router-dom";
import { manikandan } from "../../assets";
import { NAV_LINKS } from "../../constants";
import {styles} from "../../styles";
import { useDispatch, useSelector } from "react-redux";
import { setActiveNav } from "../../store/slices/navbarSlice";
import { useEffect } from "react";


const NavBar = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const {activeNav} = useSelector((state) => state.navbar);

    useEffect(() => {
        dispatch(setActiveNav(location.pathname));
    },[])

    return(
        <nav className={`${styles.paddingX} w-full flex items-center py-5 fixed top-0 z-20`}>
            <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
                {/* left hand side element - column 1 */}
                <div className="flex items-center gap-2">
                    <img src={manikandan} alt="profile-picture" className="w-9 h-9 object-contain rounded-[20%]" />
                    <div className="animate-pulse">
                        <p className='text-white text-[18px] font-bold cursor-pointer flex '>
                            Manikandan
                        </p>
                        <p className="text-white-100 text-xs uppercase">dk farms</p>
                    </div>
                </div>
                {/* right hand side element - column 2 */}
                <ul className="relative list-none hidden lg:flex flex-row gap-10">
                    {
                        NAV_LINKS.map((nav) => (
                            <li key={nav.id} className={`${activeNav === nav.navLink ? 'text-white' : 'text-secondary'} hover:text-white text-[18px] font-medium cursor-pointer transition-all group`}>
                                <Link to={nav.navLink} onClick={() => dispatch(setActiveNav(nav.navLink))} className="relative">
                                    {nav.navName}
                                    <span className="absolute left-0 bottom-0 w-full h-0.5 bg-white scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
                                </Link>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </nav>
    )
}

export default NavBar;