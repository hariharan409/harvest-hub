import { useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { setActiveNav, setScrolled } from "../store/slices/navbarSlice";


const useNavbar = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const {activeNav,scrolled} = useSelector((state) => state.navbar);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            // if scrollTop > 100 then the scrolled is true else false.
            dispatch(setScrolled(scrollTop > 100));
        }
        window.addEventListener("scroll",handleScroll);
        return () => window.removeEventListener("scroll",handleScroll);
    },[dispatch]);

    // Update navbar based on the route change
    useEffect(() => {
        // The navbar name should match the main URL name(1st index) or the '/'.
        dispatch(setActiveNav(location.pathname === "/" ? location.pathname : location.pathname?.split("/")[1]));
    },[location.pathname, dispatch]);

    const onNavClick = (navLink) => {
        dispatch(setActiveNav(navLink));
    }

    return {
        activeNav,
        scrolled,
        onNavClick
    }
}

export default useNavbar;