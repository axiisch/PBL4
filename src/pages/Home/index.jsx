import styles from './Home.module.scss';
import classNames from 'classnames/bind';
import Sidebar from '../../components/Sidebar';
import Chat from '../../components/Chat';

const cx = classNames.bind(styles);

function Home() {
    return (
        <div className={cx('container')}>
            <Sidebar />
            <Chat />
        </div>
    );
}

export default Home;
