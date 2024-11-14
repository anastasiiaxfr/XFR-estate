import { useState } from 'react'
import './Navbar.sass'

import iconMenu from '../../assets/img/menuIcon.png'
import iconClose from '../../assets/img/closeIcon.png'

const menu = [
    { url: '/', label: 'Home'},
    { url: '/', label: 'About'},
    { url: '/', label: 'Properties'},
    { url: '/', label: 'Agents'},
    { url: '/', label: 'Blog'},
    { url: '/', label: 'Contacts'},
];


const Navbar = () => {

    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    }

    return (
        <>
            <header className="navbar">
                <div className="navbar-container container">
                    <a href="/" className="logo">
                        <b>Xforeal</b> estate
                    </a>

                    <nav className="navbar-menu">
                        {menu.map((i, ind) => (<a href={i.url} key={ind}>{i.label}</a>))}
                    </nav>

                    <div className="navbar-btns">
                        <a href="/" className="btn">Submit a Property</a>
                        <button className="navbar-toggle" onClick={toggleMenu}>
                            <img src={isMenuOpen ? iconClose : iconMenu } alt="Menu" />
                        </button>
                    </div>

                </div>
            </header>

            <div className={`drawer ${ isMenuOpen ? 'drawer-show' : ''}`}>
                <div className="drawer-header">
                    <a href="/" className="logo" onClick={toggleMenu}>
                        <b>Xforeal</b> estate
                    </a>
                    <button className="navbar-toggle" onClick={toggleMenu}>
                        <img src={iconClose} alt="Menu" />
                    </button>
                </div>
                <nav className="drawer-menu">
                        {menu.map((i, ind) => (<a href={i.url} key={ind} onClick={toggleMenu}>{i.label}</a>))}
                    </nav>
                <a href="/" className="btn" onClick={toggleMenu}>Submit a Property</a>
            </div>
        </>
    )
}

export default Navbar