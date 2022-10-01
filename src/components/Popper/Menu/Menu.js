import classNames from "classnames/bind";
import Tippy from "@tippyjs/react";
import HeadlessTippy from '@tippyjs/react/headless';

import Wrapper from '~/components/Popper'
import styles from './Menu.module.scss'
import MenuItem from "./MenuItem";

const cx = classNames.bind(styles);

function Menu({ children, items=[],  }) {

    const renderItems = () => {
        return items.map((item, index) => {
            const isParent = !!item.children;
        
            return (
                <MenuItem
                    key={index}
                    data={item}
                    leftIcon={item.leftIcon}
                    rightIcon={item.rightIcon}
                    href={item.href}
                    onclick = {item.onclick}
                />
            )
            
        });
    };

    const renderResult = (attrs) => (
        <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
            <Wrapper className={cx('menu')}>
                {renderItems()}
            </Wrapper>
        </div>
    );

    return (
        <HeadlessTippy
            interactive={true}
            placement="bottom-end"
            render={renderResult}
            trigger="click"
        >
            {children}
        </HeadlessTippy>
    );
}

export default Menu;