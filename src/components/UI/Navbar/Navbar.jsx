import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context';
import MyButton from '../button/MyButton';

const Navbar = () => {
    const { isAuth, setIsAuth } = useContext(AuthContext)
    const logout = () => {
        setIsAuth(false);
        localStorage.removeItem('auth')
    }
    return (
        <div className="navbar">
            <MyButton onClick={logout} style={{ padding: '10px', fontSize: '1.5rem' }}>
                Вийти
            </MyButton>
            <div className="navbar__links">
                <Link to="/posts">Пости</Link>
                <Link to="/about">Про сайт</Link>
            </div>
        </div>
    )
}

export default Navbar;