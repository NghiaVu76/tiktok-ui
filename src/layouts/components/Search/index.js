import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleXmark,
  faMagnifyingGlass,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import HeadlessTippy from "@tippyjs/react/headless";
import * as searchService from "~/services/searchService";
import classNames from "classnames/bind";
import styles from "./Search.module.scss";
import { Wrapper as PopperWrapper } from "~/components/Popper";
import AccountItem from "~/components/AccountItem";
import { useDebounce } from "~/hooks";

const cx = classNames.bind(styles);

function Search() {
  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [showResult, setShowResult] = useState(true);
  const [loading, setLoading] = useState(false);

  const inputRef = useRef();

  const debounced = useDebounce(searchValue, 500); //sử dụng useDebounce để lấy giá cuối cùng của search value sau một khoảng trễ khi nhập vào ô input, gán

  useEffect(() => {
    if (!debounced.trim()) {
      setSearchResult([]); //khi xóa hết ô input thì không hiện kết quả tìm kiếm
      return;
    } // thoát hàm useEffect nếu khi searchValue(tức là debounced) là một chuỗi rỗng dẫn tới 'q= rỗng', dùng trim() để xóa chuỗi rỗng đi

    setLoading(true);

    //fetch thông thường
    //fetch(`https://tiktok.fullstack.edu.vn/api/users/search?q=${encodeURIComponent(debounced)}&type=less`)
    // .then((res) => res.json())
    // .then((res) => {
    //   setSearchResult(res.data);
    //   setLoading(false);
    // })
    // .catch(() => {
    //   setLoading(false);
    // })

    // sd axios với hàm async
    // import * as request from "~/utils/request"
    // const fetchApi = async () => {
    //   try {
    //     const res = await request.get("users/search", {
    //       params: {
    //         q: debounced,
    //         type: "less",
    //       }
    //     })
    //     setSearchResult(res.data);
    //     setLoading(false);
    //   } catch (err) {
    //     setLoading(false);
    //   }
    //   fetchApi();
    // }

    //axios với promises
    // import * as request from "~/utils/request"
    // request
    //   .get("users/search", {
    //     params: {
    //       q: debounced,
    //       type: "less",
    //     },
    //   })
    //   .then((res) => {
    //     setSearchResult(res.data);
    //     setLoading(false);
    //   })
    //   .catch(() => {
    //     setLoading(false);
    //   });

    //khi tối ưu code
    const fetchApi = async () => {
      setLoading(true);

      const result = await searchService.search(debounced);
      setSearchResult(result);

      setLoading(false);
    };
    fetchApi();
  }, [debounced]);

  const handleClear = () => {
    setSearchValue("");
    setSearchResult([]);
    inputRef.current.focus();
  }; //hàm xóa

  const handleHideResult = () => {
    setShowResult(false);
  }; //hàm ẩn kết quả tìm kiếm khi blur ra ngoài

  const handleChange = (e) => {
    const searchValue = e.target.value;
    if (searchValue.startsWith(" ")) {
      return; // không cho nhập dấu cách đầu tiên vào ô input
    }
    setSearchValue(searchValue);
  };

  return (
    //Using a wrapper <div> or <span> tag around the reference element solves this by creating a new parentNode context.
    <div>
      <HeadlessTippy
        visible={showResult && searchResult.length > 0}
        interactive={true}
        render={(attrs) => (
          <div className={cx("search-result")} tabIndex="1" {...attrs}>
            <PopperWrapper>
              <h4 className={cx("search-title")}>Tài khoản</h4>
              {searchResult.map((result) => (
                <AccountItem key={result.id} data={result} />
              ))}
            </PopperWrapper>
          </div>
        )}
        onClickOutside={handleHideResult}
      >
        <div className={cx("search")}>
          <input
            ref={inputRef}
            value={searchValue}
            placeholder="Tìm kiếm tài khoản và video"
            spellCheck={false}
            onChange={handleChange}
            onFocus={() => setShowResult(true)}
          />

          {!!searchValue && !loading && (
            <button className={cx("clear")} onClick={handleClear}>
              <FontAwesomeIcon icon={faCircleXmark} />
            </button>
          )}

          {loading && (
            <FontAwesomeIcon className={cx("loading")} icon={faSpinner} />
          )}

          <button
            className={cx("search-btn")}
            onMouseDown={(e) => e.preventDefault()}
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        </div>
      </HeadlessTippy>
    </div>
  );
}

export default Search;
