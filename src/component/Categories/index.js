import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { PUBLICURL } from "../../utils/common.service";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategoryList } from "../../store/slice/categorySlice";
import { useTranslation } from "react-i18next";
import { setLoader } from "../../store/slice/masterSlice";
import Pagination from "../Pagination";

const Categories = () => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const [page, setPage] = useState(1);
    const handlePageChange = (newPage) => { setPage(newPage); };
    const { categoryList: { data: categoryList } } = useSelector((state) => state.category);
    const { selectedStatus } = useOutletContext();
    useEffect(() => {
        handleCategoryAPI();
    }, [page]);

    const handleCategoryAPI = () => {
        dispatch(setLoader(true));
        let submitData = {
            page: page
        }
        dispatch(getCategoryList(submitData));
        dispatch(setLoader(false));
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <main className="page_wrepper">
            <section className="favorite-view_sec px-80">
                <div className="fav_view">
                    <h2>{t("Properties_Categories")}</h2>
                    <p>{t("including residential and commercial, to suit your needs")}</p>
                </div>
            </section>
            <section className="Properties_sec px-80 pb-100 mb-400">
                <div className="container-fluid">
                    <div className="row align-items-center">
                        {
                            categoryList && categoryList?.map((category) =>
                                <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6  col-12">
                                    <Link
                                        className="nav-link Secondary-Black"
                                        to={{
                                            pathname: '/boyo-realestate/list-of-property',
                                            search: selectedStatus ? `?selectedStatus=${selectedStatus}&property_category_id=${category?.category_id}` :
                                                `?property_category_id=${category?.category_id}`
                                        }}
                                    >
                                        <div className="category_card">
                                            <div className="cetegory_content">
                                                <h6 className="dark">{category?.category_name}</h6>
                                                <p className="dark">{category?.count} {t("Properties")}</p>
                                            </div>
                                            <img src={category?.category_image_link} alt="house" />
                                        </div>
                                    </Link>
                                </div>
                            )
                        }
                    </div>
                </div>
            </section>
            {
                categoryList?.length > 0 && categoryList[0]?.per_page < categoryList[0]?.category_count &&
                <Pagination per_page={categoryList[0]?.per_page} pageCount={categoryList[0]?.category_count} onPageChange={handlePageChange} page={page} lableName={t('Property Category')} />
            }

        </main>
    )
}

export default Categories;