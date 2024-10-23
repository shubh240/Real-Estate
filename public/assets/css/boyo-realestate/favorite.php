<!DOCTYPE html>
<html lang="zxx">

<head>
    <meta charset="utf-8">
    <meta name="description" content="Traip">
    <meta name="keywords" content="HTML,CSS,JavaScript">
    <meta name="author" content="EnvyTheme">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta http-equiv="X-UA-Compatible" content="IE=Edge" />
    <title>Boyo Realestate</title>
    <!-- -------stylesheet-------- -->
    <?php
    include("inc/stylesheet.php");
    ?>
</head>

<body>
    <!-- -------Header-------- -->
    <?php
    include("inc/inner-header.php");
    ?>
    <!-- --------------------main content start----------------------- -->
    <main class="page_wrepper">
        <section class="favorite-view_sec px-80">
            <div class="fav_view">
                <h2>View Favorite Properties</h2>
                <p>Users will receive notifications about property details and messages, as well as
                    admin alerts.</p>
            </div>
        </section>
        <section class="place_sec px-80 pb-100">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-12 d-flex align-items-baseline justify-content-between realeast_headline">
                        <h2 class="headline_txt fs-24">100 Favorite results</h2>
                        <li class="lng_menu ">
                            <ul class="lng_dropdown ">
                                <li class="nav-item dropdown">
                                    <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                                        data-bs-offset="0,10" aria-expanded="false"><span class="Gray">Sort by
                                            :</span> Price High to low
                                    </a>
                                    <ul class="dropdown-menu">
                                        <li><a class="dropdown-item dark" href="#">All</a></li>
                                        <li><a class="dropdown-item dark" href="#">Buy</a></li>
                                        <li><a class="dropdown-item dark" href="#">Rent</a></li>
                                        <li><a class="dropdown-item dark" href="#">Sale</a></li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                    </div>
                </div>
                <div class="row justify-content-center align-items-center">
                    <div class="col-xl-3 col-lg-4 col-md-6 col-sm-12 ">
                        <div class="card">
                            <div class="place_imges place_slider">
                                <img src="assets/imges/place/place-1.png" class="card-img-top" alt="place">
                                <img src="assets/imges/place/place-2.png" class="card-img-top" alt="place">
                                <img src="assets/imges/place/place-3.png" class="card-img-top" alt="place">
                                <img src="assets/imges/place/place-4.png" class="card-img-top" alt="place">
                            </div>
                            <div class="card-body">
                                <a href="#" class="btn blue_btn px-2 py-0">Bunglow</a>
                                <a href="fav-property-details.php">
                                    <h5 class="card-title mt-2">Sinomen Studio Palace.</h5>
                                </a>
                                <p class="card-text"><img src="assets/imges/icons/location.svg" alt="location"
                                        class="me-1">
                                    2546 Westfall Avenue Fairmont, MN 56031</p>
                                <div class="facility_item">
                                    <h6><img src="assets/imges/icons/sq.svg" alt="sq" class="me-1"> 1230
                                        <span>Sq.fit</span>
                                    </h6>
                                    <h6><img src="assets/imges/icons/bed.svg" alt="bed" class="me-1"> 3 <span>Bed</span>
                                    </h6>
                                    <h6><img src="assets/imges/icons/bath.svg" alt="bath" class="me-1"> 3
                                        <span>Bath</span>
                                    </h6>
                                </div>
                                <div class="card_footer d-flex justify-content-between align-items-center">
                                    <span>$ 253560</span>
                                    <div class="card_footer_btn">
                                        <a class="btn blue_btn" href="javascript:void(0)"><img
                                                src="assets/imges/icons/edit.svg" alt="edit" class="me-1">Edit</a>
                                        <a href="#"><img src="assets/imges/icons/favorite.svg" alt="heart"
                                                class="heart_btn favorite"></a>
                                    </div>
                                </div>
                            </div>
                            <div class="rent_btn">
                                <a href="javascript:void(0)" class="red_btn">For Rent</a>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-3 col-lg-4 col-md-6 col-sm-12 ">
                        <div class="card">
                            <div class="place_imges place_slider">
                                <img src="assets/imges/place/place-1.png" class="card-img-top" alt="place">
                                <img src="assets/imges/place/place-2.png" class="card-img-top" alt="place">
                                <img src="assets/imges/place/place-3.png" class="card-img-top" alt="place">
                                <img src="assets/imges/place/place-4.png" class="card-img-top" alt="place">
                            </div>
                            <div class="card-body">
                                <a href="#" class="btn blue_btn px-2 py-0">Vila</a>
                                <h5 class="card-title mt-2">Sinomen Studio Palace.</h5>
                                <p class="card-text"><img src="assets/imges/icons/location.svg" alt="location"
                                        class="me-1">
                                    2546 Westfall Avenue Fairmont, MN 56031</p>
                                <div class="facility_item">
                                    <h6><img src="assets/imges/icons/sq.svg" alt="sq" class="me-1"> 1230
                                        <span>Sq.fit</span>
                                    </h6>
                                    <h6><img src="assets/imges/icons/bed.svg" alt="bed" class="me-1"> 3 <span>Bed</span>
                                    </h6>
                                    <h6><img src="assets/imges/icons/bath.svg" alt="bath" class="me-1"> 3
                                        <span>Bath</span>
                                    </h6>
                                </div>
                                <div class="card_footer d-flex justify-content-between align-items-center">
                                    <span>$ 253560</span>
                                    <div class="card_footer_btn">
                                        <a class="btn blue_btn" href="javascript:void(0)"><img
                                                src="assets/imges/icons/edit.svg" alt="edit" class="me-1">Edit</a>
                                        <a href="#"><img src="assets/imges/icons/favorite.svg" alt="heart"
                                                class="heart_btn favorite"></a>
                                    </div>
                                </div>
                            </div>
                            <div class="rent_btn">
                                <a href="javascript:void(0)" class="red_btn">For Rent</a>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-3 col-lg-4 col-md-6 col-sm-12 ">
                        <div class="card">
                            <div class="place_imges place_slider">
                                <img src="assets/imges/place/place-1.png" class="card-img-top" alt="place">
                                <img src="assets/imges/place/place-2.png" class="card-img-top" alt="place">
                                <img src="assets/imges/place/place-3.png" class="card-img-top" alt="place">
                                <img src="assets/imges/place/place-4.png" class="card-img-top" alt="place">
                            </div>
                            <div class="card-body">
                                <a href="#" class="btn blue_btn px-2 py-0">Vila</a>
                                <h5 class="card-title mt-2">Sinomen Studio Palace.</h5>
                                <p class="card-text"><img src="assets/imges/icons/location.svg" alt="location"
                                        class="me-1">
                                    2546 Westfall Avenue Fairmont, MN 56031</p>
                                <div class="facility_item">
                                    <h6><img src="assets/imges/icons/sq.svg" alt="sq" class="me-1"> 1230
                                        <span>Sq.fit</span>
                                    </h6>
                                    <h6><img src="assets/imges/icons/bed.svg" alt="bed" class="me-1"> 3 <span>Bed</span>
                                    </h6>
                                    <h6><img src="assets/imges/icons/bath.svg" alt="bath" class="me-1"> 3
                                        <span>Bath</span>
                                    </h6>
                                </div>
                                <div class="card_footer d-flex justify-content-between align-items-center">
                                    <span>$ 253560</span>
                                    <div class="card_footer_btn">
                                        <a class="btn blue_btn" href="javascript:void(0)"><img
                                                src="assets/imges/icons/edit.svg" alt="edit" class="me-1">Edit</a>
                                        <a href="#"><img src="assets/imges/icons/favorite.svg" alt="heart"
                                                class="heart_btn favorite"></a>
                                    </div>
                                </div>
                            </div>
                            <div class="rent_btn">
                                <a href="javascript:void(0)" class="red_btn">For Rent</a>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-3 col-lg-4 col-md-6 col-sm-12 ">
                        <div class="card">
                            <div class="place_imges place_slider">
                                <img src="assets/imges/place/place-1.png" class="card-img-top" alt="place">
                                <img src="assets/imges/place/place-2.png" class="card-img-top" alt="place">
                                <img src="assets/imges/place/place-3.png" class="card-img-top" alt="place">
                                <img src="assets/imges/place/place-4.png" class="card-img-top" alt="place">
                            </div>
                            <div class="card-body">
                                <a href="#" class="btn blue_btn px-2 py-0">Vila</a>
                                <h5 class="card-title mt-2">Sinomen Studio Palace.</h5>
                                <p class="card-text"><img src="assets/imges/icons/location.svg" alt="location"
                                        class="me-1">
                                    2546 Westfall Avenue Fairmont, MN 56031</p>
                                <div class="facility_item">
                                    <h6><img src="assets/imges/icons/sq.svg" alt="sq" class="me-1"> 1230
                                        <span>Sq.fit</span>
                                    </h6>
                                    <h6><img src="assets/imges/icons/bed.svg" alt="bed" class="me-1"> 3 <span>Bed</span>
                                    </h6>
                                    <h6><img src="assets/imges/icons/bath.svg" alt="bath" class="me-1"> 3
                                        <span>Bath</span>
                                    </h6>
                                </div>
                                <div class="card_footer d-flex justify-content-between align-items-center">
                                    <span>$ 253560</span>
                                    <div class="card_footer_btn">
                                        <a class="btn blue_btn" href="javascript:void(0)"><img
                                                src="assets/imges/icons/edit.svg" alt="edit" class="me-1">Edit</a>
                                        <a href="#"><img src="assets/imges/icons/favorite.svg" alt="heart"
                                                class="heart_btn favorite"></a>
                                    </div>
                                </div>
                            </div>
                            <div class="rent_btn">
                                <a href="javascript:void(0)" class="red_btn">For Rent</a>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-3 col-lg-4 col-md-6 col-sm-12 ">
                        <div class="card">
                            <div class="place_imges place_slider">
                                <img src="assets/imges/place/place-1.png" class="card-img-top" alt="place">
                                <img src="assets/imges/place/place-2.png" class="card-img-top" alt="place">
                                <img src="assets/imges/place/place-3.png" class="card-img-top" alt="place">
                                <img src="assets/imges/place/place-4.png" class="card-img-top" alt="place">
                            </div>
                            <div class="card-body">
                                <a href="#" class="btn blue_btn px-2 py-0">Bunglow</a>
                                <h5 class="card-title mt-2">Sinomen Studio Palace.</h5>
                                <p class="card-text"><img src="assets/imges/icons/location.svg" alt="location"
                                        class="me-1">
                                    2546 Westfall Avenue Fairmont, MN 56031</p>
                                <div class="facility_item">
                                    <h6><img src="assets/imges/icons/sq.svg" alt="sq" class="me-1"> 1230
                                        <span>Sq.fit</span>
                                    </h6>
                                    <h6><img src="assets/imges/icons/bed.svg" alt="bed" class="me-1"> 3 <span>Bed</span>
                                    </h6>
                                    <h6><img src="assets/imges/icons/bath.svg" alt="bath" class="me-1"> 3
                                        <span>Bath</span>
                                    </h6>
                                </div>
                                <div class="card_footer d-flex justify-content-between align-items-center">
                                    <span>$ 253560</span>
                                    <div class="card_footer_btn">
                                        <a class="btn blue_btn" href="javascript:void(0)"><img
                                                src="assets/imges/icons/edit.svg" alt="edit" class="me-1">Edit</a>
                                        <a href="#"><img src="assets/imges/icons/favorite.svg" alt="heart"
                                                class="heart_btn favorite"></a>
                                    </div>
                                </div>
                            </div>
                            <div class="rent_btn">
                                <a href="javascript:void(0)" class="red_btn">For Rent</a>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-3 col-lg-4 col-md-6 col-sm-12 ">
                        <div class="card">
                            <div class="place_imges place_slider">
                                <img src="assets/imges/place/place-1.png" class="card-img-top" alt="place">
                                <img src="assets/imges/place/place-2.png" class="card-img-top" alt="place">
                                <img src="assets/imges/place/place-3.png" class="card-img-top" alt="place">
                                <img src="assets/imges/place/place-4.png" class="card-img-top" alt="place">
                            </div>
                            <div class="card-body">
                                <a href="#" class="btn blue_btn px-2 py-0">Vila</a>
                                <h5 class="card-title mt-2">Sinomen Studio Palace.</h5>
                                <p class="card-text"><img src="assets/imges/icons/location.svg" alt="location"
                                        class="me-1">
                                    2546 Westfall Avenue Fairmont, MN 56031</p>
                                <div class="facility_item">
                                    <h6><img src="assets/imges/icons/sq.svg" alt="sq" class="me-1"> 1230
                                        <span>Sq.fit</span>
                                    </h6>
                                    <h6><img src="assets/imges/icons/bed.svg" alt="bed" class="me-1"> 3 <span>Bed</span>
                                    </h6>
                                    <h6><img src="assets/imges/icons/bath.svg" alt="bath" class="me-1"> 3
                                        <span>Bath</span>
                                    </h6>
                                </div>
                                <div class="card_footer d-flex justify-content-between align-items-center">
                                    <span>$ 253560</span>
                                    <div class="card_footer_btn">
                                        <a class="btn blue_btn" href="javascript:void(0)"><img
                                                src="assets/imges/icons/edit.svg" alt="edit" class="me-1">Edit</a>
                                        <a href="#"><img src="assets/imges/icons/favorite.svg" alt="heart"
                                                class="heart_btn favorite"></a>
                                    </div>
                                </div>
                            </div>
                            <div class="rent_btn">
                                <a href="javascript:void(0)" class="red_btn">For Rent</a>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-3 col-lg-4 col-md-6 col-sm-12 ">
                        <div class="card">
                            <div class="place_imges place_slider">
                                <img src="assets/imges/place/place-1.png" class="card-img-top" alt="place">
                                <img src="assets/imges/place/place-2.png" class="card-img-top" alt="place">
                                <img src="assets/imges/place/place-3.png" class="card-img-top" alt="place">
                                <img src="assets/imges/place/place-4.png" class="card-img-top" alt="place">
                            </div>
                            <div class="card-body">
                                <a href="#" class="btn blue_btn px-2 py-0">Vila</a>
                                <h5 class="card-title mt-2">Sinomen Studio Palace.</h5>
                                <p class="card-text"><img src="assets/imges/icons/location.svg" alt="location"
                                        class="me-1">
                                    2546 Westfall Avenue Fairmont, MN 56031</p>
                                <div class="facility_item">
                                    <h6><img src="assets/imges/icons/sq.svg" alt="sq" class="me-1"> 1230
                                        <span>Sq.fit</span>
                                    </h6>
                                    <h6><img src="assets/imges/icons/bed.svg" alt="bed" class="me-1"> 3 <span>Bed</span>
                                    </h6>
                                    <h6><img src="assets/imges/icons/bath.svg" alt="bath" class="me-1"> 3
                                        <span>Bath</span>
                                    </h6>
                                </div>
                                <div class="card_footer d-flex justify-content-between align-items-center">
                                    <span>$ 253560</span>
                                    <div class="card_footer_btn">
                                        <a class="btn blue_btn" href="javascript:void(0)"><img
                                                src="assets/imges/icons/edit.svg" alt="edit" class="me-1">Edit</a>
                                        <a href="#"><img src="assets/imges/icons/favorite.svg" alt="heart"
                                                class="heart_btn favorite"></a>
                                    </div>
                                </div>
                            </div>
                            <div class="rent_btn">
                                <a href="javascript:void(0)" class="red_btn">For Rent</a>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-3 col-lg-4 col-md-6 col-sm-12 ">
                        <div class="card">
                            <div class="place_imges place_slider">
                                <img src="assets/imges/place/place-1.png" class="card-img-top" alt="place">
                                <img src="assets/imges/place/place-2.png" class="card-img-top" alt="place">
                                <img src="assets/imges/place/place-3.png" class="card-img-top" alt="place">
                                <img src="assets/imges/place/place-4.png" class="card-img-top" alt="place">
                            </div>
                            <div class="card-body">
                                <a href="#" class="btn blue_btn px-2 py-0">Vila</a>
                                <h5 class="card-title mt-2">Sinomen Studio Palace.</h5>
                                <p class="card-text"><img src="assets/imges/icons/location.svg" alt="location"
                                        class="me-1">
                                    2546 Westfall Avenue Fairmont, MN 56031</p>
                                <div class="facility_item">
                                    <h6><img src="assets/imges/icons/sq.svg" alt="sq" class="me-1"> 1230
                                        <span>Sq.fit</span>
                                    </h6>
                                    <h6><img src="assets/imges/icons/bed.svg" alt="bed" class="me-1"> 3 <span>Bed</span>
                                    </h6>
                                    <h6><img src="assets/imges/icons/bath.svg" alt="bath" class="me-1"> 3
                                        <span>Bath</span>
                                    </h6>
                                </div>
                                <div class="card_footer d-flex justify-content-between align-items-center">
                                    <span>$ 253560</span>
                                    <div class="card_footer_btn">
                                        <a class="btn blue_btn" href="javascript:void(0)"><img
                                                src="assets/imges/icons/edit.svg" alt="edit" class="me-1">Edit</a>
                                        <a href="#"><img src="assets/imges/icons/favorite.svg" alt="heart"
                                                class="heart_btn favorite"></a>
                                    </div>
                                </div>
                            </div>
                            <div class="rent_btn">
                                <a href="javascript:void(0)" class="red_btn">For Rent</a>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-3 col-lg-4 col-md-6 col-sm-12 ">
                        <div class="card">
                            <div class="place_imges place_slider">
                                <img src="assets/imges/place/place-1.png" class="card-img-top" alt="place">
                                <img src="assets/imges/place/place-2.png" class="card-img-top" alt="place">
                                <img src="assets/imges/place/place-3.png" class="card-img-top" alt="place">
                                <img src="assets/imges/place/place-4.png" class="card-img-top" alt="place">
                            </div>
                            <div class="card-body">
                                <a href="#" class="btn blue_btn px-2 py-0">Bunglow</a>
                                <h5 class="card-title mt-2">Sinomen Studio Palace.</h5>
                                <p class="card-text"><img src="assets/imges/icons/location.svg" alt="location"
                                        class="me-1">
                                    2546 Westfall Avenue Fairmont, MN 56031</p>
                                <div class="facility_item">
                                    <h6><img src="assets/imges/icons/sq.svg" alt="sq" class="me-1"> 1230
                                        <span>Sq.fit</span>
                                    </h6>
                                    <h6><img src="assets/imges/icons/bed.svg" alt="bed" class="me-1"> 3 <span>Bed</span>
                                    </h6>
                                    <h6><img src="assets/imges/icons/bath.svg" alt="bath" class="me-1"> 3
                                        <span>Bath</span>
                                    </h6>
                                </div>
                                <div class="card_footer d-flex justify-content-between align-items-center">
                                    <span>$ 253560</span>
                                    <div class="card_footer_btn">
                                        <a class="btn blue_btn" href="javascript:void(0)"><img
                                                src="assets/imges/icons/edit.svg" alt="edit" class="me-1">Edit</a>
                                        <a href="#"><img src="assets/imges/icons/favorite.svg" alt="heart"
                                                class="heart_btn favorite"></a>
                                    </div>
                                </div>
                            </div>
                            <div class="rent_btn">
                                <a href="javascript:void(0)" class="red_btn">For Rent</a>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-3 col-lg-4 col-md-6 col-sm-12 ">
                        <div class="card">
                            <div class="place_imges place_slider">
                                <img src="assets/imges/place/place-1.png" class="card-img-top" alt="place">
                                <img src="assets/imges/place/place-2.png" class="card-img-top" alt="place">
                                <img src="assets/imges/place/place-3.png" class="card-img-top" alt="place">
                                <img src="assets/imges/place/place-4.png" class="card-img-top" alt="place">
                            </div>
                            <div class="card-body">
                                <a href="#" class="btn blue_btn px-2 py-0">Vila</a>
                                <h5 class="card-title mt-2">Sinomen Studio Palace.</h5>
                                <p class="card-text"><img src="assets/imges/icons/location.svg" alt="location"
                                        class="me-1">
                                    2546 Westfall Avenue Fairmont, MN 56031</p>
                                <div class="facility_item">
                                    <h6><img src="assets/imges/icons/sq.svg" alt="sq" class="me-1"> 1230
                                        <span>Sq.fit</span>
                                    </h6>
                                    <h6><img src="assets/imges/icons/bed.svg" alt="bed" class="me-1"> 3 <span>Bed</span>
                                    </h6>
                                    <h6><img src="assets/imges/icons/bath.svg" alt="bath" class="me-1"> 3
                                        <span>Bath</span>
                                    </h6>
                                </div>
                                <div class="card_footer d-flex justify-content-between align-items-center">
                                    <span>$ 253560</span>
                                    <div class="card_footer_btn">
                                        <a class="btn blue_btn" href="javascript:void(0)"><img
                                                src="assets/imges/icons/edit.svg" alt="edit" class="me-1">Edit</a>
                                        <a href="#"><img src="assets/imges/icons/favorite.svg" alt="heart"
                                                class="heart_btn favorite"></a>
                                    </div>
                                </div>
                            </div>
                            <div class="rent_btn">
                                <a href="javascript:void(0)" class="red_btn">For Rent</a>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-3 col-lg-4 col-md-6 col-sm-12 ">
                        <div class="card">
                            <div class="place_imges place_slider">
                                <img src="assets/imges/place/place-1.png" class="card-img-top" alt="place">
                                <img src="assets/imges/place/place-2.png" class="card-img-top" alt="place">
                                <img src="assets/imges/place/place-3.png" class="card-img-top" alt="place">
                                <img src="assets/imges/place/place-4.png" class="card-img-top" alt="place">
                            </div>
                            <div class="card-body">
                                <a href="#" class="btn blue_btn px-2 py-0">Vila</a>
                                <h5 class="card-title mt-2">Sinomen Studio Palace.</h5>
                                <p class="card-text"><img src="assets/imges/icons/location.svg" alt="location"
                                        class="me-1">
                                    2546 Westfall Avenue Fairmont, MN 56031</p>
                                <div class="facility_item">
                                    <h6><img src="assets/imges/icons/sq.svg" alt="sq" class="me-1"> 1230
                                        <span>Sq.fit</span>
                                    </h6>
                                    <h6><img src="assets/imges/icons/bed.svg" alt="bed" class="me-1"> 3 <span>Bed</span>
                                    </h6>
                                    <h6><img src="assets/imges/icons/bath.svg" alt="bath" class="me-1"> 3
                                        <span>Bath</span>
                                    </h6>
                                </div>
                                <div class="card_footer d-flex justify-content-between align-items-center">
                                    <span>$ 253560</span>
                                    <div class="card_footer_btn">
                                        <a class="btn blue_btn" href="javascript:void(0)"><img
                                                src="assets/imges/icons/edit.svg" alt="edit" class="me-1">Edit</a>
                                        <a href="#"><img src="assets/imges/icons/favorite.svg" alt="heart"
                                                class="heart_btn favorite"></a>
                                    </div>
                                </div>
                            </div>
                            <div class="rent_btn">
                                <a href="javascript:void(0)" class="red_btn">For Rent</a>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-3 col-lg-4 col-md-6 col-sm-12 ">
                        <div class="card">
                            <div class="place_imges place_slider">
                                <img src="assets/imges/place/place-1.png" class="card-img-top" alt="place">
                                <img src="assets/imges/place/place-2.png" class="card-img-top" alt="place">
                                <img src="assets/imges/place/place-3.png" class="card-img-top" alt="place">
                                <img src="assets/imges/place/place-4.png" class="card-img-top" alt="place">
                            </div>
                            <div class="card-body">
                                <a href="#" class="btn blue_btn px-2 py-0">Vila</a>
                                <h5 class="card-title mt-2">Sinomen Studio Palace.</h5>
                                <p class="card-text"><img src="assets/imges/icons/location.svg" alt="location"
                                        class="me-1">
                                    2546 Westfall Avenue Fairmont, MN 56031</p>
                                <div class="facility_item">
                                    <h6><img src="assets/imges/icons/sq.svg" alt="sq" class="me-1"> 1230
                                        <span>Sq.fit</span>
                                    </h6>
                                    <h6><img src="assets/imges/icons/bed.svg" alt="bed" class="me-1"> 3 <span>Bed</span>
                                    </h6>
                                    <h6><img src="assets/imges/icons/bath.svg" alt="bath" class="me-1"> 3
                                        <span>Bath</span>
                                    </h6>
                                </div>
                                <div class="card_footer d-flex justify-content-between align-items-center">
                                    <span>$ 253560</span>
                                    <div class="card_footer_btn">
                                        <a class="btn blue_btn" href="javascript:void(0)"><img
                                                src="assets/imges/icons/edit.svg" alt="edit" class="me-1">Edit</a>
                                        <a href="#"><img src="assets/imges/icons/favorite.svg" alt="heart"
                                                class="heart_btn favorite"></a>
                                    </div>
                                </div>
                            </div>
                            <div class="rent_btn">
                                <a href="javascript:void(0)" class="red_btn">For Rent</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>


    </main>
    <!-- --------------------main content end----------------------- -->


    <!-- -------Footer-------- -->
    <?php
    include("inc/footer.php");
    ?>
    <!-- --------Js--------->
    <?php
    include("inc/script.php");
    ?>
</body>


</html>