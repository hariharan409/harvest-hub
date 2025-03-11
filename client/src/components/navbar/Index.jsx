import { Link } from "react-router-dom";
import { closeIcon, manikandan, menuIcon } from "../../assets";
import { NAV_LINKS } from "../../constants";
import {styles} from "../../styles";
import {useNavbar} from "../../custom-hooks";


const NavBar = () => {
    const {activeNav,toggleNav,scrolled,onNavClick,onNavToggle} = useNavbar();

    return(
        <nav className={`${styles.paddingX} w-full flex items-center py-5 fixed top-0 z-20 ${scrolled ? "bg-primary" : "bg-transparent"}`}>
            <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
                {/* left hand side element - column 1 */}
                <div className="flex items-center gap-2">
                    <img src={manikandan} alt="profile-picture" className="w-9 h-9 object-contain rounded-[20%]" />
                    <div>
                        <p className='text-white text-[12px] font-bold cursor-pointer flex uppercase'>
                            Hariharan
                        </p>
                        <p className="text-gray-200 text-xs capitalize">dk farms</p>
                    </div>
                </div>
                {/* right hand side element - column 2 - only for web view */}
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
                {/* right hand side element - column 2 - only for mobile view */}
                <div className='lg:hidden relative'>
                    <img src={toggleNav ? closeIcon : menuIcon} alt='menu' className='w-[20px] h-[20px] object-contain cursor-pointer' onClick={() => onNavToggle(!toggleNav)} />
                    <div className={`${!toggleNav ? "hidden" : "flex"} black-gradient absolute top-10 right-0 min-w-[200px] z-10 rounded-xl`}>
                        <ul className='p-3 flex justify-end items-start flex-1 flex-col gap-4 bg-black-100 rounded-md'>
                            {
                                NAV_LINKS.map((nav) => (
                                    <li key={nav.id} className={`${[nav.navLink,nav.navName].includes(activeNav) ? 'text-white bg-tertiary rounded-md' : 'text-secondary hover:text-white'} text-[18px] font-medium cursor-pointer transition-all group px-3 py-2`}>
                                        <Link to={nav.navLink} onClick={() => {onNavClick(nav.navLink);onNavToggle(!toggleNav)}} className="relative">
                                            {nav.navName}
                                            <span className="absolute left-0 bottom-0 w-full h-0.5 bg-white scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
                                        </Link>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default NavBar;