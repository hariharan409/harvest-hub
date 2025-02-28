import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { setActiveNav, setScrolled, setToggleNav } from "../store/slices/navbarSlice";

const useNavbar = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const { activeNav, scrolled,toggleNav } = useSelector((state) => state.navbar);

    // Scroll event handler with useCallback to prevent unnecessary re-creations
    const handleScroll = useCallback(() => {
        dispatch(setScrolled(window.scrollY > 100));
    }, [dispatch]);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [handleScroll]);

    // Update navbar based on route change
    useEffect(() => {
        const newNav = location.pathname === "/" ? "/" : location.pathname.split("/")[1] || "/";
        if (activeNav !== newNav) {
            dispatch(setActiveNav(newNav));
        }
    }, [location.pathname, activeNav, dispatch]);

    const onNavClick = (navLink) => {
        if (activeNav !== navLink) {
            dispatch(setActiveNav(navLink));
        }
    };

    const onNavToggle = (toggle) => {
        dispatch(setToggleNav(toggle));
    };

    return {
        activeNav,
        scrolled,
        toggleNav,
        onNavClick,
        onNavToggle
    };
};

export default useNavbar;
