import styles from './Login.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function Login() {
    return (
        <div className={cx('container')}>
            <form className={cx('form-wrapper')}>
                <div className={cx('form')}>
                    <label className={cx('title')}>Login</label>
                    <div className={cx('input-wrapper')}>
                        <label className={cx('label')}>Username</label>
                        <input className={cx('input')} type="text" placeholder="Type in your username"></input>
                    </div>
                    <div className={cx('input-wrapper')}>
                        <label className={cx('label')}>Password</label>
                        <input className={cx('input')} type="password" placeholder="Type in your Password"></input>
                    </div>
                    <span className={cx('forgot-password', 'link')}>Forgot Password?</span>
                    <button className={cx('button')}>LOGIN</button>
                    <label className={cx('label-bottom')}>
                        Become A User
                        <span className={cx('link')}> Register </span>
                    </label>
                </div>
            </form>
        </div>
    );
}

export default Login;
