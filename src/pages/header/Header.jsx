import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import style from './Header.module.css';
import { CiMenuBurger } from 'react-icons/ci';
import { FaSun, FaMoon } from 'react-icons/fa'; // Import sun/moon icons

function Header() {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [isDarkMode, setIsDarkMode] = useState(false); // New state for dark mode
	const navigate = useNavigate();

	useEffect(() => {
		const token = localStorage.getItem('token');
		setIsAuthenticated(!!token);

		// Check saved theme preference
		const savedTheme = localStorage.getItem('theme');
		if (savedTheme) {
			setIsDarkMode(savedTheme === 'dark');
			document.body.classList.toggle('dark', savedTheme === 'dark');
		}
	}, []);

	const toggleDropdown = () => {
		setIsDropdownOpen(!isDropdownOpen);
	};

	const handleSignOut = () => {
		localStorage.removeItem('token');
		setIsAuthenticated(false);
		navigate('/login');
	};

	const handleSignIn = () => {
		navigate('/login');
	};

	const toggleTheme = () => {
		const newTheme = isDarkMode ? 'light' : 'dark';
		setIsDarkMode(!isDarkMode);
		localStorage.setItem('theme', newTheme);
		document.body.classList.toggle('dark', newTheme === 'dark');
	};

	return (
		<div>
			<section className={style.header_container}>
				<div className={style.logo}>
					<Link to={'https://www.evangadi.com'}>
						<img
							src="https://www.evangadi.com/themes/humans/assets/hammerlook/img/misc/evangadi-logo-black.png"
							alt="Evangadi Logo"
						/>
					</Link>
				</div>

				{/* Theme Toggle Button */}
				<p className={style.themeToggle} onClick={toggleTheme}>
					{isDarkMode ? <FaSun /> : <FaMoon />}
				</p>

				<p className={style.menuButton} onClick={toggleDropdown}>
					<CiMenuBurger />
				</p>

				<div className={style.menu}>
					<div
						className={`${style.dropdown} ${
							isDropdownOpen ? style.dropdownVisible : ''
						}`}
					>
						<Link to={'#'} style={{ paddingTop: '10px' }}>
							Home
						</Link>
						<Link style={{ paddingTop: '10px' }}>How it works</Link>
						{isAuthenticated ? (
							<button className={style.btn} onClick={handleSignOut}>
								Sign Out
							</button>
						) : (
							<button className={style.btn} onClick={handleSignIn}>
								Sign In
							</button>
						)}
					</div>
				</div>
			</section>
		</div>
	);
}

export default Header;
