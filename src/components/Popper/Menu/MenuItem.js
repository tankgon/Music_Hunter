import classNames from 'classnames/bind';
import styles from './Menu.module.scss';

const cx = classNames.bind(styles);

function MenuItem({ 
    data,
    href,
    leftIcon,
    rightIcon,
    onclick,
    ...props
}) {
    let Comp = 'div';
    
    if (href) {
        props.href = href;
        props.target="_blank"
        Comp = 'a';
    }

    const classes = cx('menu-item');

    return (
        <Comp onClick={onclick} className={classes} {...props} >
            {leftIcon && <span className={cx('icon-left')}>{leftIcon}</span>}
            <span className={cx('title')}>{data.title}</span>
            {rightIcon && <span className={cx('icon-right')}>{rightIcon}</span>}
        </Comp>
    );
}

export default MenuItem;