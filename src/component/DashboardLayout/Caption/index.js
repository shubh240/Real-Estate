import { useTranslation } from "react-i18next";
import SearchLocation from "../../SearchLocation";
const Caption = ({
    address,setAddress,
    handleSearch,
    setToken,
    selectedStatus,
    selectPropCategory,
    handlePropertyType
}) => {

    const { t } = useTranslation();

    return (
        <div className="carousel-caption ">
            <div className="container">
                <div className="row mb-4 d-lg-none">
                    <div className="col-12 text-center text-black">
                        <SearchLocation
                            address={address}
                            setAddress={setAddress}
                            setToken={setToken}
                            selectedStatus={selectedStatus}
                            selectPropCategory={selectPropCategory}
                        />
                    </div>
                </div>
                <div className="row justify-content-center align-items-center">
                    <div className="col-sm-12">
                        <div className="row justify-content-center align-items-center">
                            <div
                                className="col-xxl-8 col-xl-8 col-lg-12  col-md-12 col-sm-12 col-12">
                                <h5>{t('Discover_Your_Dream_Home_Today')}</h5>
                                <p>{t('Are_you_ready_to_find_your_living')}</p>
                            </div>
                            {/* <div className="col-12 nav_tabs_sec ">
                                <ul className="nav nav-pills mb-3" id="pills-tab"
                                    role="tablist">
                                    <li className="nav-item" role="presentation">
                                        <button
                                            className={`nav-link ${selectedStatus === 'sale' ? 'active' : ''}`}
                                            id="pills-home-tab"
                                            data-bs-toggle="pill"
                                            data-bs-target="#pills-home"
                                            type="button"
                                            role="tab"
                                            aria-controls="pills-home"
                                            aria-selected={selectedStatus === 'sale'}
                                            onClick={() => handleSelectStatus('sale')}
                                        >
                                            {t("Buy")}
                                        </button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button
                                            className={`nav-link ${selectedStatus === 'rent' ? 'active' : ''}`}
                                            id="pills-contact-tab"
                                            data-bs-toggle="pill"
                                            data-bs-target="#pills-home"
                                            type="button"
                                            role="tab"
                                            aria-controls="pills-home"
                                            aria-selected={selectedStatus === 'rent'}
                                            onClick={() => handleSelectStatus('rent')}
                                        >
                                            {t("Rent")}
                                        </button>
                                    </li>
                                </ul>
                                <div className="bottom_line"></div>
                                <div className="tab-content" id="pills-tabContent">
                                    <div className="tab-pane fade show active" id="pills-home"
                                        role="tabpanel" aria-labelledby="pills-home-tab">
                                        <div className="container-fluid">
                                            <div className="row">
                                                <div className="col-xl-3 col-lg-4 col-md-12">
                                                    <div className="location_dropdown">
                                                        <h6 className="text-dark mt-2">{t("Property Type")}</h6>
                                                        <select
                                                            id="property-select"
                                                            className="form-select"
                                                            onChange={(e) => handlePropertyType(e.target.value)}
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
                                                    </div>
                                                </div>

                                                <div className="col-xl-6 col-lg-5 col-md-8 col-sm-8 col-12">
                                                    <ul className="location_dropdown">
                                                        <li className="nav-item dropdown mt-5" style={{ border: '1px solid lightgrey', borderRadius: '5px' }}>
                                                            <a className="nav-link dropdown-toggle serch_bar" href="javascript:void(0);" role="button" aria-expanded="false">
                                                                <input
                                                                    type="text"
                                                                    name="" className="mt-3"
                                                                    style={{ border: 'none', borderRadius: '5px' }}
                                                                    id=""
                                                                    onChange={(e)=>setSearchProp(e.target.value)}
                                                                    placeholder={t("search")}
                                                                />
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>

                                                <div
                                                    className="col-lg-3 col-md-4 col-sm-4 col-12  mt-4">
                                                    <div className="serch_box">
                                                        <a className="btn blue_btn"
                                                            onClick={handleSearch}>{t('Search_Now')}</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Caption;