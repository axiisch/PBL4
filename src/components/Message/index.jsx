import styles from './Message.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function Message() {
    return (
        <div className={cx('message')}>
            <div className={cx('message-info')}>
                <img src="https://rdironworks.com/wp-content/uploads/2017/12/dummy-200x200.png" alt="" />
            </div>

            <div className={cx('message-content')}>
                <p>Helloasdoisajdjasdasjdjioasjdasioasjodasojsaiasdijossa</p>
                <img src="https://rdironworks.com/wp-content/uploads/2017/12/dummy-200x200.png" alt="" />
            </div>
        </div>
    );
}

export default Message;
