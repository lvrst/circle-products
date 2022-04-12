import { useState } from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    const [isActive, setActive] = useState(false);

    const handleToggle = () => {
        setActive(!isActive);
    }

    return (
        <nav className={`sidebar${isActive ? ' open' : ''}`}>
            <header className='sidebar__header'>
                <div className='sidebar__header__logo'></div>
            </header>
            <div className='sidebar__toggler' onClick={()=>handleToggle()}>{isActive ? 'X' : '☰'}</div>
            <ul className='sidebar__list'>
                <li className='sidebar__list__item'><Link to='/'>Dashboard</Link></li>
                <li className='sidebar__list__item' data-selected='true'><Link to='/'>Products management</Link></li>
                <li className='sidebar__list__item'><Link to='/'>Employees management</Link></li>
                <li><hr /></li>
                <li className='sidebar__list__item'><Link to='/'>Logout</Link></li>
            </ul>
        </nav>
    )
}

export default Sidebar;