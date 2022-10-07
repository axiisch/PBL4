import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';

import styles from './Chat.module.scss';
import classNames from 'classnames/bind';
import Messages from '../Messages';
import Input from '../Input';

const cx = classNames.bind(styles);

function Chat() {
    return (
        <div className={cx('chat')}>
            <div className={cx('chat-header')}>
                <div className={cx('user-info')}>
                    <img
                        className={cx('profile-picture')}
                        src="https://ichef.bbci.co.uk/news/999/cpsprodpb/15951/production/_117310488_16.jpg"
                        alt="Profile Picture"
                    />
                    <span className={cx('username')}>Username</span>
                </div>
                <div className={cx('icons')}>
                    <button className={cx('more')}>
                        <FontAwesomeIcon icon={faEllipsisH} />
                    </button>
                </div>
            </div>
            <div className={cx('messages')}>
                <Messages />
            </div>
            <div className={cx('input')}>
                <Input />
            </div>
        </div>
    );
}

export default Chat;
