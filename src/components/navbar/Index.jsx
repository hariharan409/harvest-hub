import { Link } from "react-router-dom";
import { manikandan } from "../../assets";
import { NAV_LINKS } from "../../constants";
import {styles} from "../../styles";
import {useNavbar} from "../../custom-hooks";


const NavBar = () => {
    const {activeNav,scrolled,onNavClick} = useNavbar();

    return(
        <nav className={`${styles.paddingX} w-full flex items-center py-5 fixed top-0 z-20 ${scrolled ? "bg-primary" : "bg-transparent"}`}>
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
                            <li key={nav.id} className={`${[nav.navLink,nav.navName].includes(activeNav) ? 'text-white bg-tertiary rounded-md' : 'text-secondary hover:text-white'} text-[18px] font-medium cursor-pointer transition-all group px-3 py-2`}>
                                <Link to={nav.navLink} onClick={() => onNavClick(nav.navLink)} className="relative">
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