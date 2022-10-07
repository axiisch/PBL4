import styles from './Navbar.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function Navbar() {
    return (
        <div className={cx('user')}>
            <div className={cx('wrapper')}>
                <span>
                    <img
                        className={cx('profile-picture')}
                        src="https://ichef.bbci.co.uk/news/999/cpsprodpb/15951/production/_117310488_16.jpg"
                        alt="Profile Picture"
                    />
                </span>
                <span>Username</span>
            </div>
        </div>
    );
}

export default Navbar;
