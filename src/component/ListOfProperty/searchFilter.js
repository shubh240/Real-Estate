import { useEffect, useState } from "react";
import { PUBLICURL } from "../../utils/common.service";
import { useTranslation } from "react-i18next";

const SearchFilter = ({
    handlePropertyType,
    propertyList,
    selectType,
    selectedStatus,
    handleChangeStatus,
    search, setSearch,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice
}) => {

    const { t } = useTranslation();

    useEffect(() => {
        const progress = document.querySelector('.slider .progress');
        progress.style.left = (minPrice / 200000000) * 100 + '%';
        progress.style.right = 100 - (maxPrice / 200000000) * 100 + '%';
    }, [minPrice, maxPrice]);

    const handleMinPriceChange = (e) => {
        const value = Math.max(Math.min(e.target.value, maxPrice - 100));
        setMinPrice(value);
    };

    const handleMaxPriceChange = (e) => {
        const value = Math.min(Math.max(e.target.value, minPrice + 100));
        setMaxPrice(value);
    };

    return (
        <div className="apartment_item">
            <ul className="location_dropdown p-0 apartment_items">

                <li className="location_dropdown">
                    <select
                        id="property-select"
                        className="form-select"
                        onChange={(e) => handlePropertyType(e.target.value)}
                        value={selectType}

                    >
                        <option value="">{t("All Types")}</option>
                        {propertyList && propertyList?.map((item) => (
                            <option key={item?.type_id} value={item?.type_id}>
                                <img
                                    height={18}
                                    width={18}
                                    src={item?.property_type_image_link}
                                    alt="location"
                                    className="me-3"
                                />
                                {item?.property_type}
                            </option>
                        ))}
                    </select>
                </li>

                <li className="location_dropdown">
                    <select
                        id="optionsDropdown"
                        className="form-select"
                        value={selectedStatus}
                        onChange={(e) => handleChangeStatus(e.target.value)}
                    >
                        <option value="">{t("Buy & Rent")}</option>
                        <option value="sale">{t("Buy")}</option>
                        <option value="rent">{t("Rent")}</option>

                    </select>
                </li>

                <li className="nav-item dropdown me-1">
                    <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false" data-bs-offset="0,20">
                        <img src={PUBLICURL + "/assets/imges/icons/budget.svg"} alt="budget" className="me-2" />
                        Budget
                    </a>
                    <ul className="dropdown-menu w-auto p-0" aria-labelledby="dropdownMenuOffset">
                        <li className="lng_menu">
                            <ul className="p-0">
                                <li className="dropdown border-0 p-0">
                                    <div className="wrapper_card">
                                        <div className="price-input">
                                            <div className="field">
                                                <span>{t("Min Price")}</span>
                                                <input
                                                    type="number"
                                                    className="input-min"
                                                    value={minPrice}
                                                    style={{width : "175%"}}
                                                    onChange={(e) => setMinPrice(Math.max(0, Number(e.target.value)))}
                                                />
                                            </div>
                                            <div className="separator">-</div>
                                            <div className="field">
                                                <span>Max Price</span>
                                                <input
                                                    type="number"
                                                    className="input-max"
                                                    value={maxPrice}
                                                    style={{width : "175%"}}
                                                    onChange={(e) => setMaxPrice(Math.min(200000000, Number(e.target.value)))}
                                                />  
                                            </div>
                                        </div>
                                        <div className="slider" style={{ position: "relative", height: "10px", background: "#ddd", borderRadius: "5px", overflow: "hidden" }}>
                                            <div className="progress" style={{ position: "absolute", height: "100%", background: "#0255A3", borderRadius: "5px" }}></div>
                                        </div>
                                        <div className="range-input"
                                            style={{ position: "relative", width: "100%" }}>
                                            <input
                                                type="range"
                                                className="range-min"
                                                min="0"
                                                max="200000000"
                                                value={minPrice}
                                                step="100"
                                                onChange={handleMinPriceChange}
                                            />
                                            <input
                                                type="range"
                                                className="range-max"
                                                min="0"
                                                max="200000000"
                                                value={maxPrice}
                                                step="100"
                                                onChange={handleMaxPriceChange}
                                            />
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </li>

            </ul>
            {/* <div className="d-flex justify-content-end align-items-center">
                <li className="nav-item" style={{ border: '1px solid lightgrey', borderRadius: '5px' }}>
                    <a className="nav-link" href="javascript:void(0);" role="button" aria-expanded="false">
                        <input
                            type="text"
                            name=""
                            className="p-3"
                            style={{ border: 'none', borderRadius: '5px' }}
                            id=""
                            defaultValue={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search"
                        />
                    </a>
                </li>
            </div> */}
        </div>
    )
}

export default SearchFilter;