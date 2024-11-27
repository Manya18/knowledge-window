import { RiRobot3Line } from '@remixicon/react';
import styles from './navBar.module.css';

const NavBar = () => {
    const user = window.sessionStorage.getItem('user');
    const logout = () => {
        window.sessionStorage.removeItem('user');
    }

    return (
        <div className={styles.navBar}>
            <div className={styles.topButtons}>
                <a href='/' className={styles.assistants}>
                    <RiRobot3Line></RiRobot3Line>
                    Ассистенты
                </a>
                <a href='/createAssistant' className={`${styles.create} primary-button`}>+Создать</a>
            </div>
            {user && <button onClick={logout} className={`${styles.create} primary-button`}>Выйти</button>}
        </div>
    )
}

export default NavBar;