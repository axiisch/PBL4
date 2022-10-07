import styles from './Sidebar.module.scss';
import classNames from 'classnames/bind';
import Search from '../Search';
import Navbar from '../Navbar';

const cx = classNames.bind(styles);

function Sidebar() {
    return (
        <div className={cx('sidebar')}>
            <Navbar />
            <Search />
        </div>
    );
}

export default Sidebar;
