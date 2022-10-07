import styles from './Search.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function Search() {
    return (
        <div className={cx('search')}>
            <div className={cx('wrapper')}>
                <div className={cx('title')}>Chats</div>
                <div className={cx('search-box')}>
                    <input className={cx('input')} placeholder="Find Someone" type="text" />
                </div>
                <div className={cx('chat-card')}>
                    <img
                        className={cx('user-picture')}
                        src="https://i1.sndcdn.com/avatars-twM1pq6gSk4YzN4F-N4zKuw-t240x240.jpg"
                    />
                    <div className={cx('user-chat-info')}>
                        <span className={cx('username')}>Stranger</span>
                        <span className={cx('message')}>Hello There</span>
                    </div>
                </div>
                <div className={cx('chat-card')}>
                    <img
                        className={cx('user-picture')}
                        src="https://i1.sndcdn.com/avatars-twM1pq6gSk4YzN4F-N4zKuw-t240x240.jpg"
                    />
                    <div className={cx('user-chat-info')}>
                        <span className={cx('username')}>Stranger</span>
                        <span className={cx('message')}>Hello There</span>
                    </div>
                </div>
                <div className={cx('chat-card')}>
                    <img
                        className={cx('user-picture')}
                        src="https://i1.sndcdn.com/avatars-twM1pq6gSk4YzN4F-N4zKuw-t240x240.jpg"
                    />
                    <div className={cx('user-chat-info')}>
                        <span className={cx('username')}>Stranger</span>
                        <span className={cx('message')}>Hello There</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Search;
