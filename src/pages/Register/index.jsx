import styles from './Register.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function Register() {
    return (
        <div className={cx('container')}>
            <form className={cx('form-wrapper')}>
                <div className={cx('form')}>
                    <label className={cx('title')}>Register</label>
                    <div className={cx('input-wrapper')}>
                        <label className={cx('label')}>Username</label>
                        <input className={cx('input')} type="text" placeholder="Type in your username"></input>
                    </div>
                    <div className={cx('input-wrapper')}>
                        <label className={cx('label')}>Password</label>
                        <input className={cx('input')} type="password" placeholder="Type in your Password"></input>
                    </div>
                    <div className={cx('input-wrapper')}>
                        <label className={cx('label')}>Email</label>
                        <input className={cx('input')} type="email" placeholder="Type in your Email"></input>
                    </div>
                    {/* UPLOAD AVATAR */}
                    <button className={cx('button')}>REGISTER</button>
                    <label className={cx('label-bottom')}>
                        Already a User? Try
                        <span className={cx('link')}> Login </span>
                    </label>
                </div>
            </form>
        </div>
    );
}

export default Register;
