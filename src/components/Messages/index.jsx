import styles from './Messages.module.scss';
import classNames from 'classnames/bind';
import Message from '../Message';

const cx = classNames.bind(styles);

function Messages() {
    return (
        <div className={cx('messages')}>
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
        </div>
    );
}

export default Messages;
