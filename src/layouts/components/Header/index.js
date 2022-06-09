import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleQuestion,
  faCoins,
  faEarthAsia,
  faEllipsisVertical,
  faGear,
  faKeyboard,
  faPlus,
  faSignOut,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

import styles from "./Header.module.scss";
import classNames from "classnames/bind";
import images from "~/assets/images";
import routesConfig from "~/configs/routes";
import Menu from "~/components/Popper/Menu";
import Button from "~/components/Button";
import { InboxIcon, MessageIcon } from "~/components/Icons";
import Image from "~/components/Image";
import Search from "../Search";

const cx = classNames.bind(styles);

const MENU_ITEMS = [
  {
    icon: <FontAwesomeIcon icon={faEarthAsia} />,
    title: "Tiếng Việt",
    children: {
      title: "Ngôn ngữ",
      data: [
        {
          code: "vi",
          title: "Tiếng Việt",
        },
        {
          code: "en",
          title: "English",
        },
      ],
    },
  },
  {
    icon: <FontAwesomeIcon icon={faCircleQuestion} />,
    title: "Phản hồi và trợ giúp",
    to: "/feedback",
  },
  {
    icon: <FontAwesomeIcon icon={faKeyboard} />,
    title: "Phím tắt",
  },
];

function Header() {
  const currentUser = true;

  //Handle logic
  const handleMenuChange = (menuItem) => {
    switch (menuItem.type) {
      case "Ngôn ngữ":
        //Handle change
        break;
      default:
    }
  };

  const userMenu = [
    {
      icon: <FontAwesomeIcon icon={faUser} />,
      title: "Xem hồ sơ",
      to: "/hoaa",
    },
    {
      icon: <FontAwesomeIcon icon={faCoins} />,
      title: "Nhận xu",
      to: "/coin",
    },
    {
      icon: <FontAwesomeIcon icon={faGear} />,
      title: "Cài đặt",
      to: "/settings",
    },
    ...MENU_ITEMS,
    {
      icon: <FontAwesomeIcon icon={faSignOut} />,
      title: "Đăng xuất",
      to: "/logout",
      separate: true,
    },
  ];

  return (
    <header className={cx("wrapper")}>
      <div className={cx("inner")}>
        <Link to={routesConfig.home} className={cx("logo")}>
          <Image src={images.logo} alt="Tiktok" />
        </Link>

        <Search />

        <div className={cx("actions")}>
          {currentUser ? (
            <>
              <Button text leftIcon={<FontAwesomeIcon icon={faPlus} />}>
                Tải lên
              </Button>
              <Tippy
                offset={[12, 8]}
                content="Tải lên video"
                placement="bottom"
              >
                <button className={cx("action-button", "action-btn-message")}>
                  <MessageIcon />
                </button>
              </Tippy>

              <Tippy offset={[12, 8]} content="Hộp thư" placement="bottom">
                <button className={cx("action-button")}>
                  <InboxIcon />
                  <span className={cx("badge")}>12</span>
                </button>
              </Tippy>
            </>
          ) : (
            <>
              <Button text leftIcon={<FontAwesomeIcon icon={faPlus} />}>
                Tải lên
              </Button>
              <Button primary>Đăng nhập</Button>
            </>
          )}
          <Menu
            items={currentUser ? userMenu : MENU_ITEMS}
            onChange={handleMenuChange}
          >
            {currentUser ? (
              <Image
                className={cx("user-avatar")}
                src="https://scontent.fhan2-3.fna.fbcdn.net/v/t39.30808-6/285340184_1640361699690120_3074360572988614177_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=fqxoi-bN_IQAX8A4Jfv&_nc_ht=scontent.fhan2-3.fna&oh=00_AT_jeCMQXcwt2wyhrgtNEcMevQFuVMlkn4rmPflTXSTgHw&oe=629C7276"
                alt="titok"
              />
            ) : (
              <button className={cx("more-button")}>
                <FontAwesomeIcon icon={faEllipsisVertical} />
              </button>
            )}
          </Menu>
        </div>
      </div>
    </header>
  );
}

export default Header;
