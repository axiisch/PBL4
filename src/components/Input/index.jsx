import styles from './Input.module.scss';
import classNames from 'classnames/bind';

import { faPaperclip, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const cx = classNames.bind(styles);

function Input() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('upload')}>
                <label className={cx('upload-icon')} htmlFor="attach">
                    <FontAwesomeIcon icon={faPaperclip} />
                </label>
                <input className={cx('attach')} type="file" />
            </div>
            <input className={cx('input')} type="text" placeholder="Type a Message Here" />

            <button className={cx('send')}>
                <span className={cx('send-icon')}>
                    <FontAwesomeIcon icon={faPaperPlane} />
                </span>
            </button>
        </div>
    );
}

export default Input;
