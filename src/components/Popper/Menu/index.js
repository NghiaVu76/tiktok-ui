import "tippy.js/dist/tippy.css";
import Tippy from "@tippyjs/react/headless";

import { Wrapper as PopperWrapper } from "~/components/Popper";
import styles from "./Menu.module.scss";
import classNames from "classnames/bind";
import MenuItem from "./MenuItem";
import Header from "./Header";
import { useState } from "react";

const cx = classNames.bind(styles);

const defaultFunction = () => {};

function Menu({ children, items = [], onChange = defaultFunction }) {
  const [history, setHistory] = useState([{ data: items }]); //giá trị khởi tạo là menu đầu tiên
  const currentMenu = history[history.length - 1]; // currentMenu luôn là ptu cuối mảng và đc render ra

  const renderItems = () => {
    return currentMenu.data.map((item, index) => {
      const isParent = !!item.children;
      return (
        <MenuItem
          key={index}
          data={item}
          onClick={() => {
            if (isParent) {
              setHistory((prev) => [...prev, item.children]); //thêm menu con vào mảng
            } else {
              onChange(item);
            }
          }}
        />
      );
    });
  };

  return (
    <Tippy
      interactive={true}
      delay={[0, 700]}
      offset={[12, 8]}
      placement="bottom-end"
      render={(attrs) => (
        <div className={cx("menu-list")} tabIndex="-1" {...attrs}>
          <PopperWrapper className={cx("menu-popper")}>
            {history.length > 1 && (
              <Header
                title="Ngôn ngữ"
                onBack={() => {
                  setHistory((prev) => prev.slice(0, prev.length - 1)); //xóa ptu(Menu) cuối ra khỏi mảng
                }}
              />
            )}
            {renderItems()}
          </PopperWrapper>
        </div>
      )}
      onHide={() => setHistory((prev) => prev.slice(0, 1))} // trở về menu ban đầu khi hover ra ngoài
    >
      {children}
    </Tippy>
  );
}

export default Menu;
