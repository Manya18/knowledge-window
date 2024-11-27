import NavBar from '../navBar/NavBar';
import styles from './Layout.module.css'

const Layout = ({children} : {children: React.ReactNode}) => {
    return (
        <div className={styles.Layout}>
            <NavBar></NavBar>
            {children}
        </div>
    )
}

export default Layout;