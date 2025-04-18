import React, { useState, useEffect } from "react";
import { Menu, X, Moon, Sun } from "lucide-react";
import Logo from "../../assets/Logo.png"

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);

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

    return (
        <header className="relative">
            {/* Upper section */}
            <div className="w-full flex border-black border-b-2">
                {/* Search section with logo */}
                <div className="flex-1 bg-blue-500 flex items-center">
                    {/* Responsive logo image */}
                    <img 
                        src={Logo} 
                        alt="Logo" 
                        className="w-12 h-auto sm:w-16 md:w-20 mx-2 sm:mx-3 md:mx-4 my-2 rounded-md object-contain"
                    />
                    <div className="flex-1 py-2 pr-2">
                        <input
                            type="text"
                            placeholder="Search Images"
                            className="w-full bg-white py-1 sm:py-2 px-3 sm:px-6 rounded-full border-white"
                        />
                    </div>
                </div>

                {/* Button section */}
                <div className="w-24 sm:w-28 md:w-32 bg-red-500 flex items-center justify-center">
                    {/* Dark mode button - always visible */}
                    <button
                        onClick={toggleDarkModeUI}
                        className="p-2 focus:outline-none"
                        aria-label="Toggle dark mode"
                    >
                        {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                    </button>

                    {/* Hamburger menu button - mobile only */}
                    <button
                        onClick={toggleMenu}
                        className="sm:hidden p-2 ml-1 focus:outline-none"
                        aria-label="Open menu"
                    >
                        <Menu size={24} />
                    </button>

                    {/* Text label - desktop only */}
                    <span className="hidden sm:inline font-medium text-sm md:text-base ml-1">
                        {isDarkMode ? "Light" : "Dark"}
                    </span>
                </div>
            </div>

            {/* Navigation items */}
            <div className="bg-green-300 w-full overflow-x-auto">
                <div className="flex justify-evenly min-w-max px-2 py-2">
                    {navItems.map((item, index) => (
                        <div key={index} className="px-3 py-2 text-sm sm:text-base">
                            <button>{item.name}</button>
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
                className={`fixed top-0 right-0 w-64 h-full bg-white z-50 transform transition-transform duration-150 ease-out shadow-lg flex flex-col ${isMenuOpen ? "translate-x-0" : "translate-x-full"
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
                        <span className="text-lg font-medium">
                            {isDarkMode ? "Light Mode" : "Dark Mode"}
                        </span>
                        <button
                            onClick={toggleDarkModeUI}
                            className="focus:outline-none"
                        >
                            {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
                        </button>
                    </div>
                </div>

                {/* Scrollable categories section */}
                <div className="p-4 overflow-y-auto flex-1">
                    <h3 className="text-lg font-medium mb-3">Categories</h3>
                    <ul className="space-y-3 pb-4">
                        {navItems.map((item, index) => (
                            <li key={index}>
                                <button className="text-base">{item.name}</button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

        </header>
    );
}