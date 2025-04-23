import React, { useState, useEffect } from "react";
import { Menu, X, Moon, Sun } from "lucide-react";
import Logo from "../../assets/Logo.png"
import Logo2 from "../../assets/Logo2.png"
import { useNavigate, Link, useLocation } from "react-router-dom";

export default function Header() {
    const location = useLocation();


    const navigate = useNavigate();

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(() => {
        const savedMode = localStorage.getItem("darkMode");
        return savedMode === "true"; // returns true if savedMode is "true", else false
    });

    const [activeItem, setActiveItem] = useState('');


    // For Search Button Functionality
    const [searchInput, setSearchInput] = useState('')
    const removeFocus = () => { document.getElementById('search-bar')?.blur() }

    const searchSubmitHandler = (e) => {
        e.preventDefault()
        navigate(`/photos/${searchInput}`)
        setActiveItem('')
        removeFocus()
    }

    useEffect(() => {
        if (isDarkMode) {
            document.querySelector('html').classList.add('dark')
        } else {
            document.querySelector('html').classList.remove('dark')
        }

        localStorage.setItem("darkMode", isDarkMode); // Save preference
    }, [isDarkMode])




    // Lock/unlock scroll when menu opens/closes
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isMenuOpen]);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const toggleDarkModeUI = () => {
        setIsDarkMode(!isDarkMode);
        // No actual functionality beyond toggling the button state
    };

    const navItems = [
        { name: 'Nature', slug: 'nature' },
        { name: 'Animals', slug: 'animals' },
        { name: 'Travel', slug: 'travel' },
        { name: 'Food', slug: 'food' },
        { name: 'Architecture', slug: 'architecture' },
        { name: 'Sports', slug: 'sports' },
        { name: 'Abstract', slug: 'abstract' },
        { name: 'Portrait', slug: 'portrait' },
        { name: 'Black & White', slug: 'black-white' },
        { name: 'Fashion', slug: 'fashion' },
        { name: 'Business', slug: 'business' },
        { name: 'Technology', slug: 'technology' },
        { name: 'Vintage', slug: 'vintage' },
        { name: 'Art', slug: 'art' }
    ];




    // Effect to sync searchInput with URL on mount and when URL changes
    useEffect(() => {
        // Extract the path without slash
        const path = location.pathname.substring(1);

        // Check if the path matches any of our nav items
        const matchingItem = navItems.find(item => {
            // For the home page
            if (path === '') {
                setSearchInput('');
                return false;
            }
            // For photos pages
            if (path === item.slug) return false;

            // Check if path matches item slug
            return path.startsWith('photos/')
        });

        // Set the active item if we found a match
        if (matchingItem) {
            setSearchInput(path.slice(7));
        } else {
            // Reset if no match (home page or search results)
            setSearchInput('');
        }
    }, [location.pathname]); // Re-run when pathname changes



    // Effect to sync activeItem with URL on mount and when URL changes
    useEffect(() => {
        // Extract the path without slash
        const path = location.pathname.substring(1);

        // Check if the path matches any of our nav items
        const matchingItem = navItems.find(item => {
            // For the home page
            if (path === '') {
                setSearchInput('');
                return false;
            }
            // For photos pages
            if (path.startsWith('photos/')) return false;

            // Check if path matches item slug
            return path === item.slug;
        });

        // Set the active item if we found a match
        if (matchingItem) {
            setActiveItem(matchingItem.slug);
        } else {
            // Reset if no match (home page or search results)
            setActiveItem('');
        }
    }, [location.pathname]); // Re-run when pathname changes

    return (
        <header className="relative border-b-2 border-gray-200 dark:border-black dark:border-b-1">
            {/* Upper section */}
            <div className="w-full flex border-gray-200 dark:border-black dark:border-b-1 border-b-2">
                {/* Search section with logo */}
                <div className="flex-1 flex items-center">
                    {/* Responsive logo image */}
                    <Link to='/' onClick={() => setActiveItem('')}>
                        <img
                            src={Logo}
                            alt="Logo"
                            className="w-12 dark:hidden h-auto sm:w-16 md:w-20 mx-2 sm:mx-3 md:mx-4 my-2 rounded-md object-contain"
                        />
                    </Link>
                    <Link to='/' onClick={() => setActiveItem('')}>
                        <img
                            src={Logo2}
                            alt="Logo"
                            className="w-12 hidden dark:inline h-auto sm:w-16 md:w-20 mx-2 sm:mx-3 md:mx-4 my-2 rounded-md object-contain"
                        />
                    </Link>
                    <div className="flex-1 py-2 pr-2">
                        <form onSubmit={searchSubmitHandler} autoComplete="off" className="flex">
                            <input
                                type="text"
                                autoComplete="off"
                                id="search-bar"
                                placeholder="Search Images"
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)}
                                className="w-full text-sm sm:text-md bg-gray-200 dark:bg-[#424040] py-2 px-3 sm:px-6 rounded-full"
                            />
                            <button type="submit" className="cursor-pointer dark:bg-[#424040] dark:hover:bg-[#514f4f] bg-gray-200 border-0 py-2 px-6 focus:outline-none hover:bg-gray-300 rounded-full ml-2 font-medium text-sm md:text-base hidden sm:inline">Search</button>
                        </form>
                    </div>
                </div>

                {/* Button section */}
                <div className="w-24 sm:w-28 md:w-32 flex items-center justify-center mr-1">
                    {/* Dark mode button - always visible */}
                    <button
                        onClick={toggleDarkModeUI}
                        className="p-2 focus:outline-none w-28 flex items-center justify-center cursor-pointer bg-gray-200 hover:bg-gray-300 dark:bg-[#424040] dark:hover:bg-[#514f4f] rounded-full"
                        aria-label="Toggle dark mode"
                    >
                        {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                        {/* Text label - desktop only */}
                        <span className="hidden sm:inline font-medium text-base ml-2">
                            {isDarkMode ? "Light" : "Dark"}
                        </span>
                    </button>

                    {/* Hamburger menu button - mobile only */}
                    <button
                        onClick={toggleMenu}
                        className="sm:hidden p-2 mx-1 focus:outline-none"
                        aria-label="Open menu"
                    >
                        <Menu size={24} />
                    </button>


                </div>
            </div>

            {/* Navigation items */}
            <div className=" w-full overflow-x-auto">
                <div className="flex justify-evenly min-w-max px-2">
                    {navItems.map((item, index) => (
                        <div key={index} className="px-3 py-4 hover:bg-gray-200 dark:hover:bg-[#474545b7] text-sm sm:text-base cursor-pointer">
                            {/* <Link to={`/${item.slug}`}></Link> */}
                            <button className={`cursor-pointer ${activeItem === item.slug ? 'text-blue-500' : 'text-black dark:text-white'}`} onClick={() => {
                                setActiveItem(item.slug)
                                navigate(item.slug)
                            }}>{item.name}</button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Mobile menu overlay */}
            <div
                className={`fixed inset-0 bg-black z-40 transition-opacity duration-150 ${isMenuOpen ? "opacity-70" : "opacity-0 pointer-events-none"
                    }`}
                onClick={toggleMenu}
            />

            {/* Mobile menu sidebar - now with scrollable content */}
            <div
                className={`fixed top-0 right-0 w-64 h-full bg-white dark:bg-[#343434] z-50 transform transition-transform duration-150 ease-out shadow-lg flex flex-col ${isMenuOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                {/* Fixed header section */}
                <div className="p-4 border-b flex justify-between items-center">
                    <span className="text-xl font-bold">Menu</span>
                    <button onClick={toggleMenu} className="p-1 focus:outline-none">
                        <X size={24} />
                    </button>
                </div>

                {/* Fixed dark mode section */}
                <div className="p-4 border-b">
                    <div className="flex items-center justify-between">

                        <button

                            onClick={toggleDarkModeUI}
                            className="focus:outline-none flex items-center justify-between"
                        >
                            <span className="text-lg font-medium mx-2">
                                {isDarkMode ? "Light Mode" : "Dark Mode"}
                            </span>
                            <div>{isDarkMode ? <Sun size={24} className="ml-22" /> : <Moon size={24} className="ml-22" />}</div>
                        </button>
                    </div>
                </div>

                {/* Scrollable categories section */}
                <div className="p-4 overflow-y-auto flex-1">
                    <h3 className="text-lg font-medium mb-3">Categories</h3>
                    <ul className="space-y-3 pb-4">
                        {navItems.map((item, index) => (
                            <li key={index}>
                                <button className={`text-base ${activeItem === item.slug ? 'text-blue-500' : 'text-black dark:text-white'}`} onClick={() => {
                                    setActiveItem(item.slug)
                                    navigate(item.slug)
                                }}>{item.name}</button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

        </header>
    );
}