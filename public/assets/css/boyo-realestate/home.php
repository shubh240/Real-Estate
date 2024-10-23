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
        <section class="banner_sec">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-12 g-0">
                        <div id="carouselExampleDark" class="carousel slide carousel-fade" data-bs-ride="carousel">
                            <div class="carousel-indicators">
                                <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0"
                                    class="active" aria-current="true" aria-label="Slide 1"></button>
                                <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1"
                                    aria-label="Slide 2"></button>
                                <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2"
                                    aria-label="Slide 3"></button>
                            </div>
                            <div class="carousel-inner">
                                <div class="carousel-item active" data-bs-interval="1000">
                                    <img src="assets/imges/banner/banner-1.png" class="d-block w-100" alt="property">
                                    <div class="carousel-caption ">
                                        <div class="container">
                                            <div class="row justify-content-center align-items-center">
                                                <div class="col-sm-12">
                                                    <div class="row justify-content-center align-items-center">
                                                        <div
                                                            class="col-xxl-8 col-xl-8 col-lg-12  col-md-12 col-sm-12 col-12">
                                                            <h5>Discover Your Dream Home Today!</h5>
                                                            <p>Are you ready to find your living space? Discover how to
                                                                envision
                                                                your dream
                                                                home makeover and make it a reality!</p>
                                                        </div>
                                                        <div class="col-12 nav_tabs_sec  d_none_sm">
                                                            <ul class="nav nav-pills mb-3" id="pills-tab"
                                                                role="tablist">
                                                                <li class="nav-item" role="presentation">
                                                                    <button class="nav-link active " id="pills-home-tab"
                                                                        data-bs-toggle="pill"
                                                                        data-bs-target="#pills-home" type="button"
                                                                        role="tab" aria-controls="pills-home"
                                                                        aria-selected="true">Buy</button>
                                                                </li>
                                                                <li class="nav-item" role="presentation">
                                                                    <button class="nav-link" id="pills-profile-tab"
                                                                        data-bs-toggle="pill"
                                                                        data-bs-target="#pills-profile" type="button"
                                                                        role="tab" aria-controls="pills-profile"
                                                                        aria-selected="false">Sell</button>
                                                                </li>
                                                                <li class="nav-item" role="presentation">
                                                                    <button class="nav-link" id="pills-contact-tab"
                                                                        data-bs-toggle="pill"
                                                                        data-bs-target="#pills-contact" type="button"
                                                                        role="tab" aria-controls="pills-contact"
                                                                        aria-selected="false">Rent</button>
                                                                </li>
                                                            </ul>
                                                            <div class="bottom_line"></div>
                                                            <div class="tab-content" id="pills-tabContent">
                                                                <div class="tab-pane fade show active" id="pills-home"
                                                                    role="tabpanel" aria-labelledby="pills-home-tab">
                                                                    <div class="container-fluid">
                                                                        <div class="row">
                                                                            <div class="col-xl-3 col-lg-4 col-md-12">
                                                                                <ul class="location_dropdown ">
                                                                                    <li
                                                                                        class="nav-item dropdown light_GRay">
                                                                                        <h6>Property Type</h6>
                                                                                        <a class="nav-link dropdown-toggle"
                                                                                            href="#" role="button"
                                                                                            data-bs-toggle="dropdown"
                                                                                            aria-expanded="false"><img
                                                                                                src="assets/imges/icons/home.svg"
                                                                                                alt="location"
                                                                                                class="me-2">
                                                                                            All Types
                                                                                        </a>
                                                                                        <ul class="dropdown-menu">
                                                                                            <li><a class="dropdown-item dark"
                                                                                                    href="#"><img
                                                                                                        src="assets/imges/icons/home.svg"
                                                                                                        alt="location"
                                                                                                        class="me-3">
                                                                                                    All Types</a></li>
                                                                                            <li><a class="dropdown-item dark"
                                                                                                    href="#"><img
                                                                                                        src="assets/imges/icons/home.svg"
                                                                                                        alt="location"
                                                                                                        class="me-3">
                                                                                                    Apartments</a></li>
                                                                                            <li><a class="dropdown-item dark"
                                                                                                    href="#"><img
                                                                                                        src="assets/imges/icons/home.svg"
                                                                                                        alt="location"
                                                                                                        class="me-3">
                                                                                                    Villa</a></li>
                                                                                            <li><a class="dropdown-item dark"
                                                                                                    href="#"><img
                                                                                                        src="assets/imges/icons/home.svg"
                                                                                                        alt="location"
                                                                                                        class="me-3">
                                                                                                    Bungalow</a></li>
                                                                                            <li><a class="dropdown-item dark"
                                                                                                    href="#"><img
                                                                                                        src="assets/imges/icons/home.svg"
                                                                                                        alt="location"
                                                                                                        class="me-3">
                                                                                                    Row House</a></li>
                                                                                            <li><a class="dropdown-item dark"
                                                                                                    href="#"><img
                                                                                                        src="assets/imges/icons/home.svg"
                                                                                                        alt="location"
                                                                                                        class="me-3">
                                                                                                    Land</a></li>
                                                                                            <li><a class="dropdown-item dark"
                                                                                                    href="#"><img
                                                                                                        src="assets/imges/icons/home.svg"
                                                                                                        alt="location"
                                                                                                        class="me-3">
                                                                                                    Office</a></li>
                                                                                        </ul>
                                                                                    </li>
                                                                                </ul>
                                                                            </div>
                                                                            <div
                                                                                class="col-xl-6 col-lg-5 col-md-8 col-sm-8 col-12">
                                                                                <ul class="location_dropdown ">
                                                                                    <li class="nav-item dropdown ">
                                                                                        <h6>Location</h6>
                                                                                        <a class="nav-link dropdown-toggle serch_bar"
                                                                                            href="#" role="button"
                                                                                            data-bs-toggle="dropdown"
                                                                                            aria-expanded="false"><img
                                                                                                src="assets/imges/icons/search.svg"
                                                                                                alt="location"
                                                                                                class="me-2">
                                                                                            <input type="text" name=""
                                                                                                id=""
                                                                                                placeholder="Search your village, city, region, or zip code">
                                                                                        </a>
                                                                                        <ul class="dropdown-menu">
                                                                                            <li>
                                                                                                <h6
                                                                                                    class="dropdown-item dark">
                                                                                                    <img src="assets/imges/icons/c-location.svg"
                                                                                                        alt="location"
                                                                                                        class="me-2">Current
                                                                                                    Location
                                                                                                </h6>
                                                                                            <li>
                                                                                                <hr
                                                                                                    class="dropdown-divider">
                                                                                            </li>
                                                                                            <li>
                                                                                                <h6
                                                                                                    class="dropdown-item dark mb-2">
                                                                                                    Recent Search</h6>
                                                                                            </li>
                                                                                            <li><a class="dropdown-item dark"
                                                                                                    href="#"><img
                                                                                                        src="assets/imges/icons/location_icon.svg"
                                                                                                        alt="location"
                                                                                                        class="me-2">
                                                                                                    Bengaluru, KS
                                                                                                    56010</a>
                                                                                            </li>
                                                                                            <li><a class="dropdown-item dark"
                                                                                                    href="#"><img
                                                                                                        src="assets/imges/icons/location_icon.svg"
                                                                                                        alt="location"
                                                                                                        class="me-2">
                                                                                                    Bengaluru, KS
                                                                                                    56010</a>
                                                                                            </li>
                                                                                            <li><a class="dropdown-item dark"
                                                                                                    href="#"><img
                                                                                                        src="assets/imges/icons/location_icon.svg"
                                                                                                        alt="location"
                                                                                                        class="me-2">
                                                                                                    Bengaluru, KS
                                                                                                    56010</a>
                                                                                            </li>

                                                                                        </ul>
                                                                                    </li>
                                                                                </ul>
                                                                            </div>
                                                                            <div
                                                                                class="col-lg-3 col-md-4 col-sm-4 col-12 ">
                                                                                <div class="serch_box">
                                                                                    <a class="btn blue_btn"
                                                                                        href="javascript:void(0)">Search
                                                                                        Now</a>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="tab-pane fade" id="pills-profile"
                                                                    role="tabpanel" aria-labelledby="pills-profile-tab">
                                                                    <div class="container-fluid">
                                                                        <div class="row">
                                                                            <div class="col-xl-3 col-lg-4 col-md-12">
                                                                                <ul class="location_dropdown ">
                                                                                    <li
                                                                                        class="nav-item dropdown light_GRay">
                                                                                        <h6>Property Type</h6>
                                                                                        <a class="nav-link dropdown-toggle"
                                                                                            href="#" role="button"
                                                                                            data-bs-toggle="dropdown"
                                                                                            aria-expanded="false"><img
                                                                                                src="assets/imges/icons/home.svg"
                                                                                                alt="location"
                                                                                                class="me-2">
                                                                                            All Types
                                                                                        </a>
                                                                                        <ul class="dropdown-menu">
                                                                                            <li><a class="dropdown-item dark"
                                                                                                    href="#"><img
                                                                                                        src="assets/imges/icons/home.svg"
                                                                                                        alt="location"
                                                                                                        class="me-3">
                                                                                                    All Types</a></li>
                                                                                            <li><a class="dropdown-item dark"
                                                                                                    href="#"><img
                                                                                                        src="assets/imges/icons/home.svg"
                                                                                                        alt="location"
                                                                                                        class="me-3">
                                                                                                    Apartments</a></li>
                                                                                            <li><a class="dropdown-item dark"
                                                                                                    href="#"><img
                                                                                                        src="assets/imges/icons/home.svg"
                                                                                                        alt="location"
                                                                                                        class="me-3">
                                                                                                    Villa</a></li>
                                                                                            <li><a class="dropdown-item dark"
                                                                                                    href="#"><img
                                                                                                        src="assets/imges/icons/home.svg"
                                                                                                        alt="location"
                                                                                                        class="me-3">
                                                                                                    Bungalow</a></li>
                                                                                            <li><a class="dropdown-item dark"
                                                                                                    href="#"><img
                                                                                                        src="assets/imges/icons/home.svg"
                                                                                                        alt="location"
                                                                                                        class="me-3">
                                                                                                    Row House</a></li>
                                                                                            <li><a class="dropdown-item dark"
                                                                                                    href="#"><img
                                                                                                        src="assets/imges/icons/home.svg"
                                                                                                        alt="location"
                                                                                                        class="me-3">
                                                                                                    Land</a></li>
                                                                                            <li><a class="dropdown-item dark"
                                                                                                    href="#"><img
                                                                                                        src="assets/imges/icons/home.svg"
                                                                                                        alt="location"
                                                                                                        class="me-3">
                                                                                                    Office</a></li>
                                                                                        </ul>
                                                                                    </li>
                                                                                </ul>
                                                                            </div>
                                                                            <div
                                                                                class="col-xl-6 col-lg-5 col-md-8 col-sm-8 col-12">
                                                                                <ul class="location_dropdown ">
                                                                                    <li class="nav-item dropdown ">
                                                                                        <h6>Location</h6>
                                                                                        <a class="nav-link dropdown-toggle serch_bar"
                                                                                            href="#" role="button"
                                                                                            data-bs-toggle="dropdown"
                                                                                            aria-expanded="false"><img
                                                                                                src="assets/imges/icons/search.svg"
                                                                                                alt="location"
                                                                                                class="me-2">
                                                                                            <input type="text" name=""
                                                                                                id=""
                                                                                                placeholder="Search your village, city, region, or zip code">
                                                                                        </a>
                                                                                        <ul class="dropdown-menu">
                                                                                            <li>
                                                                                                <h6
                                                                                                    class="dropdown-item dark">
                                                                                                    <img src="assets/imges/icons/c-location.svg"
                                                                                                        alt="location"
                                                                                                        class="me-2">Current
                                                                                                    Location
                                                                                                </h6>
                                                                                            <li>
                                                                                                <hr
                                                                                                    class="dropdown-divider">
                                                                                            </li>
                                                                                            <li>
                                                                                                <h6
                                                                                                    class="dropdown-item dark mb-2">
                                                                                                    Recent Search</h6>
                                                                                            </li>
                                                                                            <li><a class="dropdown-item dark"
                                                                                                    href="#"><img
                                                                                                        src="assets/imges/icons/location_icon.svg"
                                                                                                        alt="location"
                                                                                                        class="me-2">
                                                                                                    Bengaluru, KS
                                                                                                    56010</a>
                                                                                            </li>
                                                                                            <li><a class="dropdown-item dark"
                                                                                                    href="#"><img
                                                                                                        src="assets/imges/icons/location_icon.svg"
                                                                                                        alt="location"
                                                                                                        class="me-2">
                                                                                                    Bengaluru, KS
                                                                                                    56010</a>
                                                                                            </li>
                                                                                            <li><a class="dropdown-item dark"
                                                                                                    href="#"><img
                                                                                                        src="assets/imges/icons/location_icon.svg"
                                                                                                        alt="location"
                                                                                                        class="me-2">
                                                                                                    Bengaluru, KS
                                                                                                    56010</a>
                                                                                            </li>

                                                                                        </ul>
                                                                                    </li>
                                                                                </ul>
                                                                            </div>
                                                                            <div
                                                                                class="col-lg-3 col-md-4 col-sm-4 col-12 ">
                                                                                <div class="serch_box">
                                                                                    <a class="btn blue_btn"
                                                                                        href="javascript:void(0)">Search
                                                                                        Now</a>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="tab-pane fade" id="pills-contact"
                                                                    role="tabpanel" aria-labelledby="pills-contact-tab">
                                                                    <div class="container-fluid">
                                                                        <div class="row">
                                                                            <div class="col-xl-3 col-lg-4 col-md-12">
                                                                                <ul class="location_dropdown ">
                                                                                    <li
                                                                                        class="nav-item dropdown light_GRay">
                                                                                        <h6>Property Type</h6>
                                                                                        <a class="nav-link dropdown-toggle"
                                                                                            href="#" role="button"
                                                                                            data-bs-toggle="dropdown"
                                                                                            aria-expanded="false"><img
                                                                                                src="assets/imges/icons/home.svg"
                                                                                                alt="location"
                                                                                                class="me-2">
                                                                                            All Types
                                                                                        </a>
                                                                                        <ul class="dropdown-menu">
                                                                                            <li><a class="dropdown-item dark"
                                                                                                    href="#"><img
                                                                                                        src="assets/imges/icons/home.svg"
                                                                                                        alt="location"
                                                                                                        class="me-3">
                                                                                                    All Types</a></li>
                                                                                            <li><a class="dropdown-item dark"
                                                                                                    href="#"><img
                                                                                                        src="assets/imges/icons/home.svg"
                                                                                                        alt="location"
                                                                                                        class="me-3">
                                                                                                    Apartments</a></li>
                                                                                            <li><a class="dropdown-item dark"
                                                                                                    href="#"><img
                                                                                                        src="assets/imges/icons/home.svg"
                                                                                                        alt="location"
                                                                                                        class="me-3">
                                                                                                    Villa</a></li>
                                                                                            <li><a class="dropdown-item dark"
                                                                                                    href="#"><img
                                                                                                        src="assets/imges/icons/home.svg"
                                                                                                        alt="location"
                                                                                                        class="me-3">
                                                                                                    Bungalow</a></li>
                                                                                            <li><a class="dropdown-item dark"
                                                                                                    href="#"><img
                                                                                                        src="assets/imges/icons/home.svg"
                                                                                                        alt="location"
                                                                                                        class="me-3">
                                                                                                    Row House</a></li>
                                                                                            <li><a class="dropdown-item dark"
                                                                                                    href="#"><img
                                                                                                        src="assets/imges/icons/home.svg"
                                                                                                        alt="location"
                                                                                                        class="me-3">
                                                                                                    Land</a></li>
                                                                                            <li><a class="dropdown-item dark"
                                                                                                    href="#"><img
                                                                                                        src="assets/imges/icons/home.svg"
                                                                                                        alt="location"
                                                                                                        class="me-3">
                                                                                                    Office</a></li>
                                                                                        </ul>
                                                                                    </li>
                                                                                </ul>
                                                                            </div>
                                                                            <div
                                                                                class="col-xl-6 col-lg-5 col-md-8 col-sm-8 col-12">
                                                                                <ul class="location_dropdown ">
                                                                                    <li class="nav-item dropdown ">
                                                                                        <h6>Location</h6>
                                                                                        <a class="nav-link dropdown-toggle serch_bar"
                                                                                            href="#" role="button"
                                                                                            data-bs-toggle="dropdown"
                                                                                            aria-expanded="false"><img
                                                                                                src="assets/imges/icons/search.svg"
                                                                                                alt="location"
                                                                                                class="me-2">
                                                                                            <input type="text" name=""
                                                                                                id=""
                                                                                                placeholder="Search your village, city, region, or zip code">
                                                                                        </a>
                                                                                        <ul class="dropdown-menu">
                                                                                            <li>
                                                                                                <h6
                                                                                                    class="dropdown-item dark">
                                                                                                    <img src="assets/imges/icons/c-location.svg"
                                                                                                        alt="location"
                                                                                                        class="me-2">Current
                                                                                                    Location
                                                                                                </h6>
                                                                                            <li>
                                                                                                <hr
                                                                                                    class="dropdown-divider">
                                                                                            </li>
                                                                                            <li>
                                                                                                <h6
                                                                                                    class="dropdown-item dark mb-2">
                                                                                                    Recent Search</h6>
                                                                                            </li>
                                                                                            <li><a class="dropdown-item dark"
                                                                                                    href="#"><img
                                                                                                        src="assets/imges/icons/location_icon.svg"
                                                                                                        alt="location"
                                                                                                        class="me-2">
                                                                                                    Bengaluru, KS
                                                                                                    56010</a>
                                                                                            </li>
                                                                                            <li><a class="dropdown-item dark"
                                                                                                    href="#"><img
                                                                                                        src="assets/imges/icons/location_icon.svg"
                                                                                                        alt="location"
                                                                                                        class="me-2">
                                                                                                    Bengaluru, KS
                                                                                                    56010</a>
                                                                                            </li>
                                                                                            <li><a class="dropdown-item dark"
                                                                                                    href="#"><img
                                                                                                        src="assets/imges/icons/location_icon.svg"
                                                                                                        alt="location"
                                                                                                        class="me-2">
                                                                                                    Bengaluru, KS
                                                                                                    56010</a>
                                                                                            </li>

                                                                                        </ul>
                                                                                    </li>
                                                                                </ul>
                                                                            </div>
                                                                            <div
                                                                                class="col-lg-3 col-md-4 col-sm-4 col-12 ">
                                                                                <div class="serch_box">
                                                                                    <a class="btn blue_btn"
                                                                                        href="javascript:void(0)">Search
                                                                                        Now</a>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="carousel-item " data-bs-interval="1000">
                                    <img src="assets/imges/banner/banner-3.png" class="d-block w-100" alt="property">
                                    <div class="carousel-caption ">
                                        <div class="container">
                                            <div class="row justify-content-center align-items-center">
                                                <div class="col-sm-12">
                                                    <div class="row justify-content-center align-items-center">
                                                        <div
                                                            class="col-xxl-8 col-xl-8 col-lg-12  col-md-12 col-sm-12 col-12">
                                                            <h5>Discover Your Dream Home Today!</h5>
                                                            <p>Are you ready to find your living space? Discover how to
                                                                envision
                                                                your dream
                                                                home makeover and make it a reality!</p>
                                                        </div>
                                                        <div class="col-12 nav_tabs_sec  d_none_sm">
                                                            <ul class="nav nav-pills mb-3" id="pills-tab"
                                                                role="tablist">
                                                                <li class="nav-item" role="presentation">
                                                                    <button class="nav-link active " id="pills-home-tab"
                                                                        data-bs-toggle="pill"
                                                                        data-bs-target="#pills-home" type="button"
                                                                        role="tab" aria-controls="pills-home"
                                                                        aria-selected="true">Buy</button>
                                                                </li>
                                                                <li class="nav-item" role="presentation">
                                                                    <button class="nav-link" id="pills-profile-tab"
                                                                        data-bs-toggle="pill"
                                                                        data-bs-target="#pills-profile" type="button"
                                                                        role="tab" aria-controls="pills-profile"
                                                                        aria-selected="false">Sell</button>
                                                                </li>
                                                                <li class="nav-item" role="presentation">
                                                                    <button class="nav-link" id="pills-contact-tab"
                                                                        data-bs-toggle="pill"
                                                                        data-bs-target="#pills-contact" type="button"
                                                                        role="tab" aria-controls="pills-contact"
                                                                        aria-selected="false">Rent</button>
                                                                </li>
                                                            </ul>
                                                            <div class="bottom_line"></div>
                                                            <div class="tab-content" id="pills-tabContent">
                                                                <div class="tab-pane fade show active" id="pills-home"
                                                                    role="tabpanel" aria-labelledby="pills-home-tab">
                                                                    <div class="row">
                                                                        <div class="col-xl-3 col-lg-4 col-md-12">
                                                                            <ul class="location_dropdown ">
                                                                                <li
                                                                                    class="nav-item dropdown light_GRay">
                                                                                    <h6>Property Type</h6>
                                                                                    <a class="nav-link dropdown-toggle"
                                                                                        href="#" role="button"
                                                                                        data-bs-toggle="dropdown"
                                                                                        aria-expanded="false"><img
                                                                                            src="assets/imges/icons/home.svg"
                                                                                            alt="location" class="me-2">
                                                                                        All Types
                                                                                    </a>
                                                                                    <ul class="dropdown-menu">
                                                                                        <li><a class="dropdown-item dark"
                                                                                                href="#"><img
                                                                                                    src="assets/imges/icons/home.svg"
                                                                                                    alt="location"
                                                                                                    class="me-3">
                                                                                                All Types</a></li>
                                                                                        <li><a class="dropdown-item dark"
                                                                                                href="#"><img
                                                                                                    src="assets/imges/icons/home.svg"
                                                                                                    alt="location"
                                                                                                    class="me-3">
                                                                                                Apartments</a></li>
                                                                                        <li><a class="dropdown-item dark"
                                                                                                href="#"><img
                                                                                                    src="assets/imges/icons/home.svg"
                                                                                                    alt="location"
                                                                                                    class="me-3">
                                                                                                Villa</a></li>
                                                                                        <li><a class="dropdown-item dark"
                                                                                                href="#"><img
                                                                                                    src="assets/imges/icons/home.svg"
                                                                                                    alt="location"
                                                                                                    class="me-3">
                                                                                                Bungalow</a></li>
                                                                                        <li><a class="dropdown-item dark"
                                                                                                href="#"><img
                                                                                                    src="assets/imges/icons/home.svg"
                                                                                                    alt="location"
                                                                                                    class="me-3">
                                                                                                Row House</a></li>
                                                                                        <li><a class="dropdown-item dark"
                                                                                                href="#"><img
                                                                                                    src="assets/imges/icons/home.svg"
                                                                                                    alt="location"
                                                                                                    class="me-3">
                                                                                                Land</a></li>
                                                                                        <li><a class="dropdown-item dark"
                                                                                                href="#"><img
                                                                                                    src="assets/imges/icons/home.svg"
                                                                                                    alt="location"
                                                                                                    class="me-3">
                                                                                                Office</a></li>
                                                                                    </ul>
                                                                                </li>
                                                                            </ul>
                                                                        </div>
                                                                        <div
                                                                            class="col-xl-6 col-lg-5 col-md-8 col-sm-8 col-12">
                                                                            <ul class="location_dropdown ">
                                                                                <li class="nav-item dropdown ">
                                                                                    <h6>Location</h6>
                                                                                    <a class="nav-link dropdown-toggle serch_bar"
                                                                                        href="#" role="button"
                                                                                        data-bs-toggle="dropdown"
                                                                                        aria-expanded="false"><img
                                                                                            src="assets/imges/icons/search.svg"
                                                                                            alt="location" class="me-2">
                                                                                        <input type="text" name="" id=""
                                                                                            placeholder="Search your village, city, region, or zip code">
                                                                                    </a>
                                                                                    <ul class="dropdown-menu">
                                                                                        <li>
                                                                                            <h6
                                                                                                class="dropdown-item dark">
                                                                                                <img src="assets/imges/icons/c-location.svg"
                                                                                                    alt="location"
                                                                                                    class="me-2">Current
                                                                                                Location
                                                                                            </h6>
                                                                                        <li>
                                                                                            <hr
                                                                                                class="dropdown-divider">
                                                                                        </li>
                                                                                        <li>
                                                                                            <h6
                                                                                                class="dropdown-item dark mb-2">
                                                                                                Recent Search</h6>
                                                                                        </li>
                                                                                        <li><a class="dropdown-item dark"
                                                                                                href="#"><img
                                                                                                    src="assets/imges/icons/location_icon.svg"
                                                                                                    alt="location"
                                                                                                    class="me-2">
                                                                                                Bengaluru, KS 56010</a>
                                                                                        </li>
                                                                                        <li><a class="dropdown-item dark"
                                                                                                href="#"><img
                                                                                                    src="assets/imges/icons/location_icon.svg"
                                                                                                    alt="location"
                                                                                                    class="me-2">
                                                                                                Bengaluru, KS 56010</a>
                                                                                        </li>
                                                                                        <li><a class="dropdown-item dark"
                                                                                                href="#"><img
                                                                                                    src="assets/imges/icons/location_icon.svg"
                                                                                                    alt="location"
                                                                                                    class="me-2">
                                                                                                Bengaluru, KS 56010</a>
                                                                                        </li>

                                                                                    </ul>
                                                                                </li>
                                                                            </ul>
                                                                        </div>
                                                                        <div class="col-lg-3 col-md-4 col-sm-4 col-12 ">
                                                                            <div class="serch_box">
                                                                                <a class="btn blue_btn"
                                                                                    href="javascript:void(0)">Search
                                                                                    Now</a>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="tab-pane fade" id="pills-profile"
                                                                    role="tabpanel" aria-labelledby="pills-profile-tab">
                                                                    <div class="row">
                                                                        <div class="col-xl-3 col-lg-4 col-md-12">
                                                                            <ul class="location_dropdown ">
                                                                                <li
                                                                                    class="nav-item dropdown light_GRay">
                                                                                    <h6>Property Type</h6>
                                                                                    <a class="nav-link dropdown-toggle"
                                                                                        href="#" role="button"
                                                                                        data-bs-toggle="dropdown"
                                                                                        aria-expanded="false"><img
                                                                                            src="assets/imges/icons/home.svg"
                                                                                            alt="location" class="me-2">
                                                                                        All Types
                                                                                    </a>
                                                                                    <ul class="dropdown-menu">
                                                                                        <li><a class="dropdown-item dark"
                                                                                                href="#"><img
                                                                                                    src="assets/imges/icons/home.svg"
                                                                                                    alt="location"
                                                                                                    class="me-3">
                                                                                                All Types</a></li>
                                                                                        <li><a class="dropdown-item dark"
                                                                                                href="#"><img
                                                                                                    src="assets/imges/icons/home.svg"
                                                                                                    alt="location"
                                                                                                    class="me-3">
                                                                                                Apartments</a></li>
                                                                                        <li><a class="dropdown-item dark"
                                                                                                href="#"><img
                                                                                                    src="assets/imges/icons/home.svg"
                                                                                                    alt="location"
                                                                                                    class="me-3">
                                                                                                Villa</a></li>
                                                                                        <li><a class="dropdown-item dark"
                                                                                                href="#"><img
                                                                                                    src="assets/imges/icons/home.svg"
                                                                                                    alt="location"
                                                                                                    class="me-3">
                                                                                                Bungalow</a></li>
                                                                                        <li><a class="dropdown-item dark"
                                                                                                href="#"><img
                                                                                                    src="assets/imges/icons/home.svg"
                                                                                                    alt="location"
                                                                                                    class="me-3">
                                                                                                Row House</a></li>
                                                                                        <li><a class="dropdown-item dark"
                                                                                                href="#"><img
                                                                                                    src="assets/imges/icons/home.svg"
                                                                                                    alt="location"
                                                                                                    class="me-3">
                                                                                                Land</a></li>
                                                                                        <li><a class="dropdown-item dark"
                                                                                                href="#"><img
                                                                                                    src="assets/imges/icons/home.svg"
                                                                                                    alt="location"
                                                                                                    class="me-3">
                                                                                                Office</a></li>
                                                                                    </ul>
                                                                                </li>
                                                                            </ul>
                                                                        </div>
                                                                        <div
                                                                            class="col-xl-6 col-lg-5 col-md-8 col-sm-8 col-12">
                                                                            <ul class="location_dropdown ">
                                                                                <li class="nav-item dropdown ">
                                                                                    <h6>Location</h6>
                                                                                    <a class="nav-link dropdown-toggle serch_bar"
                                                                                        href="#" role="button"
                                                                                        data-bs-toggle="dropdown"
                                                                                        aria-expanded="false"><img
                                                                                            src="assets/imges/icons/search.svg"
                                                                                            alt="location" class="me-2">
                                                                                        <input type="text" name="" id=""
                                                                                            placeholder="Search your village, city, region, or zip code">
                                                                                    </a>
                                                                                    <ul class="dropdown-menu">
                                                                                        <li>
                                                                                            <h6
                                                                                                class="dropdown-item dark">
                                                                                                <img src="assets/imges/icons/c-location.svg"
                                                                                                    alt="location"
                                                                                                    class="me-2">Current
                                                                                                Location
                                                                                            </h6>
                                                                                        <li>
                                                                                            <hr
                                                                                                class="dropdown-divider">
                                                                                        </li>
                                                                                        <li>
                                                                                            <h6
                                                                                                class="dropdown-item dark mb-2">
                                                                                                Recent Search</h6>
                                                                                        </li>
                                                                                        <li><a class="dropdown-item dark"
                                                                                                href="#"><img
                                                                                                    src="assets/imges/icons/location_icon.svg"
                                                                                                    alt="location"
                                                                                                    class="me-2">
                                                                                                Bengaluru, KS 56010</a>
                                                                                        </li>
                                                                                        <li><a class="dropdown-item dark"
                                                                                                href="#"><img
                                                                                                    src="assets/imges/icons/location_icon.svg"
                                                                                                    alt="location"
                                                                                                    class="me-2">
                                                                                                Bengaluru, KS 56010</a>
                                                                                        </li>
                                                                                        <li><a class="dropdown-item dark"
                                                                                                href="#"><img
                                                                                                    src="assets/imges/icons/location_icon.svg"
                                                                                                    alt="location"
                                                                                                    class="me-2">
                                                                                                Bengaluru, KS 56010</a>
                                                                                        </li>

                                                                                    </ul>
                                                                                </li>
                                                                            </ul>
                                                                        </div>
                                                                        <div class="col-lg-3 col-md-4 col-sm-4 col-12 ">
                                                                            <div class="serch_box">
                                                                                <a class="btn blue_btn"
                                                                                    href="javascript:void(0)">Search
                                                                                    Now</a>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="tab-pane fade" id="pills-contact"
                                                                    role="tabpanel" aria-labelledby="pills-contact-tab">
                                                                    <div class="row">
                                                                        <div class="col-xl-3 col-lg-4 col-md-12">
                                                                            <ul class="location_dropdown ">
                                                                                <li
                                                                                    class="nav-item dropdown light_GRay">
                                                                                    <h6>Property Type</h6>
                                                                                    <a class="nav-link dropdown-toggle"
                                                                                        href="#" role="button"
                                                                                        data-bs-toggle="dropdown"
                                                                                        aria-expanded="false"><img
                                                                                            src="assets/imges/icons/home.svg"
                                                                                            alt="location" class="me-2">
                                                                                        All Types
                                                                                    </a>
                                                                                    <ul class="dropdown-menu">
                                                                                        <li><a class="dropdown-item dark"
                                                                                                href="#"><img
                                                                                                    src="assets/imges/icons/home.svg"
                                                                                                    alt="location"
                                                                                                    class="me-3">
                                                                                                All Types</a></li>
                                                                                        <li><a class="dropdown-item dark"
                                                                                                href="#"><img
                                                                                                    src="assets/imges/icons/home.svg"
                                                                                                    alt="location"
                                                                                                    class="me-3">
                                                                                                Apartments</a></li>
                                                                                        <li><a class="dropdown-item dark"
                                                                                                href="#"><img
                                                                                                    src="assets/imges/icons/home.svg"
                                                                                                    alt="location"
                                                                                                    class="me-3">
                                                                                                Villa</a></li>
                                                                                        <li><a class="dropdown-item dark"
                                                                                                href="#"><img
                                                                                                    src="assets/imges/icons/home.svg"
                                                                                                    alt="location"
                                                                                                    class="me-3">
                                                                                                Bungalow</a></li>
                                                                                        <li><a class="dropdown-item dark"
                                                                                                href="#"><img
                                                                                                    src="assets/imges/icons/home.svg"
                                                                                                    alt="location"
                                                                                                    class="me-3">
                                                                                                Row House</a></li>
                                                                                        <li><a class="dropdown-item dark"
                                                                                                href="#"><img
                                                                                                    src="assets/imges/icons/home.svg"
                                                                                                    alt="location"
                                                                                                    class="me-3">
                                                                                                Land</a></li>
                                                                                        <li><a class="dropdown-item dark"
                                                                                                href="#"><img
                                                                                                    src="assets/imges/icons/home.svg"
                                                                                                    alt="location"
                                                                                                    class="me-3">
                                                                                                Office</a></li>
                                                                                    </ul>
                                                                                </li>
                                                                            </ul>
                                                                        </div>
                                                                        <div
                                                                            class="col-xl-6 col-lg-5 col-md-8 col-sm-8 col-12">
                                                                            <ul class="location_dropdown ">
                                                                                <li class="nav-item dropdown ">
                                                                                    <h6>Location</h6>
                                                                                    <a class="nav-link dropdown-toggle serch_bar"
                                                                                        href="#" role="button"
                                                                                        data-bs-toggle="dropdown"
                                                                                        aria-expanded="false"><img
                                                                                            src="assets/imges/icons/search.svg"
                                                                                            alt="location" class="me-2">
                                                                                        <input type="text" name="" id=""
                                                                                            placeholder="Search your village, city, region, or zip code">
                                                                                    </a>
                                                                                    <ul class="dropdown-menu">
                                                                                        <li>
                                                                                            <h6
                                                                                                class="dropdown-item dark">
                                                                                                <img src="assets/imges/icons/c-location.svg"
                                                                                                    alt="location"
                                                                                                    class="me-2">Current
                                                                                                Location
                                                                                            </h6>
                                                                                        <li>
                                                                                            <hr
                                                                                                class="dropdown-divider">
                                                                                        </li>
                                                                                        <li>
                                                                                            <h6
                                                                                                class="dropdown-item dark mb-2">
                                                                                                Recent Search</h6>
                                                                                        </li>
                                                                                        <li><a class="dropdown-item dark"
                                                                                                href="#"><img
                                                                                                    src="assets/imges/icons/location_icon.svg"
                                                                                                    alt="location"
                                                                                                    class="me-2">
                                                                                                Bengaluru, KS 56010</a>
                                                                                        </li>
                                                                                        <li><a class="dropdown-item dark"
                                                                                                href="#"><img
                                                                                                    src="assets/imges/icons/location_icon.svg"
                                                                                                    alt="location"
                                                                                                    class="me-2">
                                                                                                Bengaluru, KS 56010</a>
                                                                                        </li>
                                                                                        <li><a class="dropdown-item dark"
                                                                                                href="#"><img
                                                                                                    src="assets/imges/icons/location_icon.svg"
                                                                                                    alt="location"
                                                                                                    class="me-2">
                                                                                                Bengaluru, KS 56010</a>
                                                                                        </li>

                                                                                    </ul>
                                                                                </li>
                                                                            </ul>
                                                                        </div>
                                                                        <div class="col-lg-3 col-md-4 col-sm-4 col-12 ">
                                                                            <div class="serch_box">
                                                                                <a class="btn blue_btn"
                                                                                    href="javascript:void(0)">Search
                                                                                    Now</a>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="carousel-item" data-bs-interval="1000">
                                    <img src="assets/imges/banner/banner-2.png" class="d-block w-100" alt="property">
                                    <div class="carousel-caption ">
                                        <div class="container">
                                            <div class="row justify-content-center align-items-center">
                                                <div class="col-sm-12">
                                                    <div class="row justify-content-center align-items-center">
                                                        <div
                                                            class="col-xxl-8 col-xl-8 col-lg-12  col-md-12 col-sm-12 col-12">
                                                            <h5>Discover Your Dream Home Today!</h5>
                                                            <p>Are you ready to find your living space? Discover how to
                                                                envision
                                                                your dream
                                                                home makeover and make it a reality!</p>
                                                        </div>
                                                        <div class="col-12 nav_tabs_sec  d_none_sm">
                                                            <ul class="nav nav-pills mb-3" id="pills-tab"
                                                                role="tablist">
                                                                <li class="nav-item" role="presentation">
                                                                    <button class="nav-link active " id="pills-home-tab"
                                                                        data-bs-toggle="pill"
                                                                        data-bs-target="#pills-home" type="button"
                                                                        role="tab" aria-controls="pills-home"
                                                                        aria-selected="true">Buy</button>
                                                                </li>
                                                                <li class="nav-item" role="presentation">
                                                                    <button class="nav-link" id="pills-profile-tab"
                                                                        data-bs-toggle="pill"
                                                                        data-bs-target="#pills-profile" type="button"
                                                                        role="tab" aria-controls="pills-profile"
                                                                        aria-selected="false">Sell</button>
                                                                </li>
                                                                <li class="nav-item" role="presentation">
                                                                    <button class="nav-link" id="pills-contact-tab"
                                                                        data-bs-toggle="pill"
                                                                        data-bs-target="#pills-contact" type="button"
                                                                        role="tab" aria-controls="pills-contact"
                                                                        aria-selected="false">Rent</button>
                                                                </li>
                                                            </ul>
                                                            <div class="bottom_line"></div>
                                                            <div class="tab-content" id="pills-tabContent">
                                                                <div class="tab-pane fade show active" id="pills-home"
                                                                    role="tabpanel" aria-labelledby="pills-home-tab">
                                                                    <div class="row">
                                                                        <div class="col-xl-3 col-lg-4 col-md-12">
                                                                            <ul class="location_dropdown ">
                                                                                <li
                                                                                    class="nav-item dropdown light_GRay">
                                                                                    <h6>Property Type</h6>
                                                                                    <a class="nav-link dropdown-toggle"
                                                                                        href="#" role="button"
                                                                                        data-bs-toggle="dropdown"
                                                                                        aria-expanded="false"><img
                                                                                            src="assets/imges/icons/home.svg"
                                                                                            alt="location" class="me-2">
                                                                                        All Types
                                                                                    </a>
                                                                                    <ul class="dropdown-menu">
                                                                                        <li><a class="dropdown-item dark"
                                                                                                href="#"><img
                                                                                                    src="assets/imges/icons/home.svg"
                                                                                                    alt="location"
                                                                                                    class="me-3">
                                                                                                All Types</a></li>
                                                                                        <li><a class="dropdown-item dark"
                                                                                                href="#"><img
                                                                                                    src="assets/imges/icons/home.svg"
                                                                                                    alt="location"
                                                                                                    class="me-3">
                                                                                                Apartments</a></li>
                                                                                        <li><a class="dropdown-item dark"
                                                                                                href="#"><img
                                                                                                    src="assets/imges/icons/home.svg"
                                                                                                    alt="location"
                                                                                                    class="me-3">
                                                                                                Villa</a></li>
                                                                                        <li><a class="dropdown-item dark"
                                                                                                href="#"><img
                                                                                                    src="assets/imges/icons/home.svg"
                                                                                                    alt="location"
                                                                                                    class="me-3">
                                                                                                Bungalow</a></li>
                                                                                        <li><a class="dropdown-item dark"
                                                                                                href="#"><img
                                                                                                    src="assets/imges/icons/home.svg"
                                                                                                    alt="location"
                                                                                                    class="me-3">
                                                                                                Row House</a></li>
                                                                                        <li><a class="dropdown-item dark"
                                                                                                href="#"><img
                                                                                                    src="assets/imges/icons/home.svg"
                                                                                                    alt="location"
                                                                                                    class="me-3">
                                                                                                Land</a></li>
                                                                                        <li><a class="dropdown-item dark"
                                                                                                href="#"><img
                                                                                                    src="assets/imges/icons/home.svg"
                                                                                                    alt="location"
                                                                                                    class="me-3">
                                                                                                Office</a></li>
                                                                                    </ul>
                                                                                </li>
                                                                            </ul>
                                                                        </div>
                                                                        <div
                                                                            class="col-xl-6 col-lg-5 col-md-8 col-sm-8 col-12">
                                                                            <ul class="location_dropdown ">
                                                                                <li class="nav-item dropdown ">
                                                                                    <h6>Location</h6>
                                                                                    <a class="nav-link dropdown-toggle serch_bar"
                                                                                        href="#" role="button"
                                                                                        data-bs-toggle="dropdown"
                                                                                        aria-expanded="false"><img
                                                                                            src="assets/imges/icons/search.svg"
                                                                                            alt="location" class="me-2">
                                                                                        <input type="text" name="" id=""
                                                                                            placeholder="Search your village, city, region, or zip code">
                                                                                    </a>
                                                                                    <ul class="dropdown-menu">
                                                                                        <li>
                                                                                            <h6
                                                                                                class="dropdown-item dark">
                                                                                                <img src="assets/imges/icons/c-location.svg"
                                                                                                    alt="location"
                                                                                                    class="me-2">Current
                                                                                                Location
                                                                                            </h6>
                                                                                        <li>
                                                                                            <hr
                                                                                                class="dropdown-divider">
                                                                                        </li>
                                                                                        <li>
                                                                                            <h6
                                                                                                class="dropdown-item dark mb-2">
                                                                                                Recent Search</h6>
                                                                                        </li>
                                                                                        <li><a class="dropdown-item dark"
                                                                                                href="#"><img
                                                                                                    src="assets/imges/icons/location_icon.svg"
                                                                                                    alt="location"
                                                                                                    class="me-2">
                                                                                                Bengaluru, KS 56010</a>
                                                                                        </li>
                                                                                        <li><a class="dropdown-item dark"
                                                                                                href="#"><img
                                                                                                    src="assets/imges/icons/location_icon.svg"
                                                                                                    alt="location"
                                                                                                    class="me-2">
                                                                                                Bengaluru, KS 56010</a>
                                                                                        </li>
                                                                                        <li><a class="dropdown-item dark"
                                                                                                href="#"><img
                                                                                                    src="assets/imges/icons/location_icon.svg"
                                                                                                    alt="location"
                                                                                                    class="me-2">
                                                                                                Bengaluru, KS 56010</a>
                                                                                        </li>

                                                                                    </ul>
                                                                                </li>
                                                                            </ul>
                                                                        </div>
                                                                        <div class="col-lg-3 col-md-4 col-sm-4 col-12 ">
                                                                            <div class="serch_box">
                                                                                <a class="btn blue_btn"
                                                                                    href="javascript:void(0)">Search
                                                                                    Now</a>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="tab-pane fade" id="pills-profile"
                                                                    role="tabpanel" aria-labelledby="pills-profile-tab">
                                                                    <div class="row">
                                                                        <div class="col-xl-3 col-lg-4 col-md-12">
                                                                            <ul class="location_dropdown ">
                                                                                <li
                                                                                    class="nav-item dropdown light_GRay">
                                                                                    <h6>Property Type</h6>
                                                                                    <a class="nav-link dropdown-toggle"
                                                                                        href="#" role="button"
                                                                                        data-bs-toggle="dropdown"
                                                                                        aria-expanded="false"><img
                                                                                            src="assets/imges/icons/home.svg"
                                                                                            alt="location" class="me-2">
                                                                                        All Types
                                                                                    </a>
                                                                                    <ul class="dropdown-menu">
                                                                                        <li><a class="dropdown-item dark"
                                                                                                href="#"><img
                                                                                                    src="assets/imges/icons/home.svg"
                                                                                                    alt="location"
                                                                                                    class="me-3">
                                                                                                All Types</a></li>
                                                                                        <li><a class="dropdown-item dark"
                                                                                                href="#"><img
                                                                                                    src="assets/imges/icons/home.svg"
                                                                                                    alt="location"
                                                                                                    class="me-3">
                                                                                                Apartments</a></li>
                                                                                        <li><a class="dropdown-item dark"
                                                                                                href="#"><img
                                                                                                    src="assets/imges/icons/home.svg"
                                                                                                    alt="location"
                                                                                                    class="me-3">
                                                                                                Villa</a></li>
                                                                                        <li><a class="dropdown-item dark"
                                                                                                href="#"><img
                                                                                                    src="assets/imges/icons/home.svg"
                                                                                                    alt="location"
                                                                                                    class="me-3">
                                                                                                Bungalow</a></li>
                                                                                        <li><a class="dropdown-item dark"
                                                                                                href="#"><img
                                                                                                    src="assets/imges/icons/home.svg"
                                                                                                    alt="location"
                                                                                                    class="me-3">
                                                                                                Row House</a></li>
                                                                                        <li><a class="dropdown-item dark"
                                                                                                href="#"><img
                                                                                                    src="assets/imges/icons/home.svg"
                                                                                                    alt="location"
                                                                                                    class="me-3">
                                                                                                Land</a></li>
                                                                                        <li><a class="dropdown-item dark"
                                                                                                href="#"><img
                                                                                                    src="assets/imges/icons/home.svg"
                                                                                                    alt="location"
                                                                                                    class="me-3">
                                                                                                Office</a></li>
                                                                                    </ul>
                                                                                </li>
                                                                            </ul>
                                                                        </div>
                                                                        <div
                                                                            class="col-xl-6 col-lg-5 col-md-8 col-sm-8 col-12">
                                                                            <ul class="location_dropdown ">
                                                                                <li class="nav-item dropdown ">
                                                                                    <h6>Location</h6>
                                                                                    <a class="nav-link dropdown-toggle serch_bar"
                                                                                        href="#" role="button"
                                                                                        data-bs-toggle="dropdown"
                                                                                        aria-expanded="false"><img
                                                                                            src="assets/imges/icons/search.svg"
                                                                                            alt="location" class="me-2">
                                                                                        <input type="text" name="" id=""
                                                                                            placeholder="Search your village, city, region, or zip code">
                                                                                    </a>
                                                                                    <ul class="dropdown-menu">
                                                                                        <li>
                                                                                            <h6
                                                                                                class="dropdown-item dark">
                                                                                                <img src="assets/imges/icons/c-location.svg"
                                                                                                    alt="location"
                                                                                                    class="me-2">Current
                                                                                                Location
                                                                                            </h6>
                                                                                        <li>
                                                                                            <hr
                                                                                                class="dropdown-divider">
                                                                                        </li>
                                                                                        <li>
                                                                                            <h6
                                                                                                class="dropdown-item dark mb-2">
                                                                                                Recent Search</h6>
                                                                                        </li>
                                                                                        <li><a class="dropdown-item dark"
                                                                                                href="#"><img
                                                                                                    src="assets/imges/icons/location_icon.svg"
                                                                                                    alt="location"
                                                                                                    class="me-2">
                                                                                                Bengaluru, KS 56010</a>
                                                                                        </li>
                                                                                        <li><a class="dropdown-item dark"
                                                                                                href="#"><img
                                                                                                    src="assets/imges/icons/location_icon.svg"
                                                                                                    alt="location"
                                                                                                    class="me-2">
                                                                                                Bengaluru, KS 56010</a>
                                                                                        </li>
                                                                                        <li><a class="dropdown-item dark"
                                                                                                href="#"><img
                                                                                                    src="assets/imges/icons/location_icon.svg"
                                                                                                    alt="location"
                                                                                                    class="me-2">
                                                                                                Bengaluru, KS 56010</a>
                                                                                        </li>

                                                                                    </ul>
                                                                                </li>
                                                                            </ul>
                                                                        </div>
                                                                        <div class="col-lg-3 col-md-4 col-sm-4 col-12 ">
                                                                            <div class="serch_box">
                                                                                <a class="btn blue_btn"
                                                                                    href="javascript:void(0)">Search
                                                                                    Now</a>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="tab-pane fade" id="pills-contact"
                                                                    role="tabpanel" aria-labelledby="pills-contact-tab">
                                                                    <div class="row">
                                                                        <div class="col-xl-3 col-lg-4 col-md-12">
                                                                            <ul class="location_dropdown ">
                                                                                <li
                                                                                    class="nav-item dropdown light_GRay">
                                                                                    <h6>Property Type</h6>
                                                                                    <a class="nav-link dropdown-toggle"
                                                                                        href="#" role="button"
                                                                                        data-bs-toggle="dropdown"
                                                                                        aria-expanded="false"><img
                                                                                            src="assets/imges/icons/home.svg"
                                                                                            alt="location" class="me-2">
                                                                                        All Types
                                                                                    </a>
                                                                                    <ul class="dropdown-menu">
                                                                                        <li><a class="dropdown-item dark"
                                                                                                href="#"><img
                                                                                                    src="assets/imges/icons/home.svg"
                                                                                                    alt="location"
                                                                                                    class="me-3">
                                                                                                All Types</a></li>
                                                                                        <li><a class="dropdown-item dark"
                                                                                                href="#"><img
                                                                                                    src="assets/imges/icons/home.svg"
                                                                                                    alt="location"
                                                                                                    class="me-3">
                                                                                                Apartments</a></li>
                                                                                        <li><a class="dropdown-item dark"
                                                                                                href="#"><img
                                                                                                    src="assets/imges/icons/home.svg"
                                                                                                    alt="location"
                                                                                                    class="me-3">
                                                                                                Villa</a></li>
                                                                                        <li><a class="dropdown-item dark"
                                                                                                href="#"><img
                                                                                                    src="assets/imges/icons/home.svg"
                                                                                                    alt="location"
                                                                                                    class="me-3">
                                                                                                Bungalow</a></li>
                                                                                        <li><a class="dropdown-item dark"
                                                                                                href="#"><img
                                                                                                    src="assets/imges/icons/home.svg"
                                                                                                    alt="location"
                                                                                                    class="me-3">
                                                                                                Row House</a></li>
                                                                                        <li><a class="dropdown-item dark"
                                                                                                href="#"><img
                                                                                                    src="assets/imges/icons/home.svg"
                                                                                                    alt="location"
                                                                                                    class="me-3">
                                                                                                Land</a></li>
                                                                                        <li><a class="dropdown-item dark"
                                                                                                href="#"><img
                                                                                                    src="assets/imges/icons/home.svg"
                                                                                                    alt="location"
                                                                                                    class="me-3">
                                                                                                Office</a></li>
                                                                                    </ul>
                                                                                </li>
                                                                            </ul>
                                                                        </div>
                                                                        <div
                                                                            class="col-xl-6 col-lg-5 col-md-8 col-sm-8 col-12">
                                                                            <ul class="location_dropdown ">
                                                                                <li class="nav-item dropdown ">
                                                                                    <h6>Location</h6>
                                                                                    <a class="nav-link dropdown-toggle serch_bar"
                                                                                        href="#" role="button"
                                                                                        data-bs-toggle="dropdown"
                                                                                        aria-expanded="false"><img
                                                                                            src="assets/imges/icons/search.svg"
                                                                                            alt="location" class="me-2">
                                                                                        <input type="text" name="" id=""
                                                                                            placeholder="Search your village, city, region, or zip code">
                                                                                    </a>
                                                                                    <ul class="dropdown-menu">
                                                                                        <li>
                                                                                            <h6
                                                                                                class="dropdown-item dark">
                                                                                                <img src="assets/imges/icons/c-location.svg"
                                                                                                    alt="location"
                                                                                                    class="me-2">Current
                                                                                                Location
                                                                                            </h6>
                                                                                        <li>
                                                                                            <hr
                                                                                                class="dropdown-divider">
                                                                                        </li>
                                                                                        <li>
                                                                                            <h6
                                                                                                class="dropdown-item dark mb-2">
                                                                                                Recent Search</h6>
                                                                                        </li>
                                                                                        <li><a class="dropdown-item dark"
                                                                                                href="#"><img
                                                                                                    src="assets/imges/icons/location_icon.svg"
                                                                                                    alt="location"
                                                                                                    class="me-2">
                                                                                                Bengaluru, KS 56010</a>
                                                                                        </li>
                                                                                        <li><a class="dropdown-item dark"
                                                                                                href="#"><img
                                                                                                    src="assets/imges/icons/location_icon.svg"
                                                                                                    alt="location"
                                                                                                    class="me-2">
                                                                                                Bengaluru, KS 56010</a>
                                                                                        </li>
                                                                                        <li><a class="dropdown-item dark"
                                                                                                href="#"><img
                                                                                                    src="assets/imges/icons/location_icon.svg"
                                                                                                    alt="location"
                                                                                                    class="me-2">
                                                                                                Bengaluru, KS 56010</a>
                                                                                        </li>

                                                                                    </ul>
                                                                                </li>
                                                                            </ul>
                                                                        </div>
                                                                        <div class="col-lg-3 col-md-4 col-sm-4 col-12 ">
                                                                            <div class="serch_box">
                                                                                <a class="btn blue_btn"
                                                                                    href="javascript:void(0)">Search
                                                                                    Now</a>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <div class="container-fluid">
            <div class="row">
                <div class="col-12 nav_tabs_sec d_none_md">
                    <ul class="nav nav-pills mb-3 px-80" id="pills-tab" role="tablist">
                        <li class="nav-item" role="presentation">
                            <button class="nav-link active " id="pills-home-tab" data-bs-toggle="pill"
                                data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home"
                                aria-selected="true">Buy</button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button class="nav-link" id="pills-profile-tab" data-bs-toggle="pill"
                                data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile"
                                aria-selected="false">Sell</button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button class="nav-link" id="pills-contact-tab" data-bs-toggle="pill"
                                data-bs-target="#pills-contact" type="button" role="tab" aria-controls="pills-contact"
                                aria-selected="false">Rent</button>
                        </li>
                    </ul>
                    <div class="bottom_line"></div>
                    <div class="tab-content px-80" id="pills-tabContent">
                        <div class="tab-pane fade show active" id="pills-home" role="tabpanel"
                            aria-labelledby="pills-home-tab">
                            <div class="row">
                                <div class="col-xl-3 col-lg-4 col-md-12">
                                    <ul class="location_dropdown ">
                                        <li class="nav-item dropdown light_GRay">
                                            <h6>Property Type</h6>
                                            <a class="nav-link dropdown-toggle" href="#" role="button"
                                                data-bs-toggle="dropdown" aria-expanded="false"><img
                                                    src="assets/imges/icons/home.svg" alt="location" class="me-2">
                                                All Types
                                            </a>
                                            <ul class="dropdown-menu">
                                                <li><a class="dropdown-item dark" href="#"><img
                                                            src="assets/imges/icons/home.svg" alt="location"
                                                            class="me-3">
                                                        All Types</a></li>
                                                <li><a class="dropdown-item dark" href="#"><img
                                                            src="assets/imges/icons/home.svg" alt="location"
                                                            class="me-3">
                                                        Apartments</a></li>
                                                <li><a class="dropdown-item dark" href="#"><img
                                                            src="assets/imges/icons/home.svg" alt="location"
                                                            class="me-3">
                                                        Villa</a></li>
                                                <li><a class="dropdown-item dark" href="#"><img
                                                            src="assets/imges/icons/home.svg" alt="location"
                                                            class="me-3">
                                                        Bungalow</a></li>
                                                <li><a class="dropdown-item dark" href="#"><img
                                                            src="assets/imges/icons/home.svg" alt="location"
                                                            class="me-3">
                                                        Row House</a></li>
                                                <li><a class="dropdown-item dark" href="#"><img
                                                            src="assets/imges/icons/home.svg" alt="location"
                                                            class="me-3">
                                                        Land</a></li>
                                                <li><a class="dropdown-item dark" href="#"><img
                                                            src="assets/imges/icons/home.svg" alt="location"
                                                            class="me-3">
                                                        Office</a></li>
                                            </ul>
                                        </li>
                                    </ul>
                                </div>
                                <div class="col-xl-6 col-lg-5 col-md-8 col-sm-8 col-12">
                                    <ul class="location_dropdown ">
                                        <li class="nav-item dropdown ">
                                            <h6>Location</h6>
                                            <a class="nav-link dropdown-toggle serch_bar" href="#" role="button"
                                                data-bs-toggle="dropdown" aria-expanded="false"><img
                                                    src="assets/imges/icons/search.svg" alt="location" class="me-2">
                                                <input type="text" name="" id=""
                                                    placeholder="Search your village, city, region, or zip code">
                                            </a>
                                            <ul class="dropdown-menu">
                                                <li>
                                                    <h6 class="dropdown-item dark">
                                                        <img src="assets/imges/icons/c-location.svg" alt="location"
                                                            class="me-2">Current
                                                        Location
                                                    </h6>
                                                <li>
                                                    <hr class="dropdown-divider">
                                                </li>
                                                <li>
                                                    <h6 class="dropdown-item dark mb-2">
                                                        Recent Search</h6>
                                                </li>
                                                <li><a class="dropdown-item dark" href="#"><img
                                                            src="assets/imges/icons/location_icon.svg" alt="location"
                                                            class="me-2">
                                                        Bengaluru, KS 56010</a>
                                                </li>
                                                <li><a class="dropdown-item dark" href="#"><img
                                                            src="assets/imges/icons/location_icon.svg" alt="location"
                                                            class="me-2">
                                                        Bengaluru, KS 56010</a>
                                                </li>
                                                <li><a class="dropdown-item dark" href="#"><img
                                                            src="assets/imges/icons/location_icon.svg" alt="location"
                                                            class="me-2">
                                                        Bengaluru, KS 56010</a>
                                                </li>

                                            </ul>
                                        </li>
                                    </ul>
                                </div>
                                <div class="col-lg-3 col-md-4 col-sm-4 col-12 ">
                                    <div class="serch_box">
                                        <a class="btn blue_btn" href="javascript:void(0)">Search
                                            Now</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="tab-pane fade" id="pills-profile" role="tabpanel"
                            aria-labelledby="pills-profile-tab">
                            <div class="container-fluid">
                                <div class="row">
                                    <div class="col-xl-3 col-lg-4 col-md-12">
                                        <ul class="location_dropdown ">
                                            <li class="nav-item dropdown light_GRay">
                                                <h6>Property Type</h6>
                                                <a class="nav-link dropdown-toggle" href="#" role="button"
                                                    data-bs-toggle="dropdown" aria-expanded="false"><img
                                                        src="assets/imges/icons/home.svg" alt="location" class="me-2">
                                                    All Types
                                                </a>
                                                <ul class="dropdown-menu">
                                                    <li><a class="dropdown-item dark" href="#"><img
                                                                src="assets/imges/icons/home.svg" alt="location"
                                                                class="me-3">
                                                            All Types</a></li>
                                                    <li><a class="dropdown-item dark" href="#"><img
                                                                src="assets/imges/icons/home.svg" alt="location"
                                                                class="me-3">
                                                            Apartments</a></li>
                                                    <li><a class="dropdown-item dark" href="#"><img
                                                                src="assets/imges/icons/home.svg" alt="location"
                                                                class="me-3">
                                                            Villa</a></li>
                                                    <li><a class="dropdown-item dark" href="#"><img
                                                                src="assets/imges/icons/home.svg" alt="location"
                                                                class="me-3">
                                                            Bungalow</a></li>
                                                    <li><a class="dropdown-item dark" href="#"><img
                                                                src="assets/imges/icons/home.svg" alt="location"
                                                                class="me-3">
                                                            Row House</a></li>
                                                    <li><a class="dropdown-item dark" href="#"><img
                                                                src="assets/imges/icons/home.svg" alt="location"
                                                                class="me-3">
                                                            Land</a></li>
                                                    <li><a class="dropdown-item dark" href="#"><img
                                                                src="assets/imges/icons/home.svg" alt="location"
                                                                class="me-3">
                                                            Office</a></li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="col-xl-6 col-lg-5 col-md-8 col-sm-8 col-12">
                                        <ul class="location_dropdown ">
                                            <li class="nav-item dropdown ">
                                                <h6>Location</h6>
                                                <a class="nav-link dropdown-toggle serch_bar" href="#" role="button"
                                                    data-bs-toggle="dropdown" aria-expanded="false"><img
                                                        src="assets/imges/icons/search.svg" alt="location" class="me-2">
                                                    <input type="text" name="" id=""
                                                        placeholder="Search your village, city, region, or zip code">
                                                </a>
                                                <ul class="dropdown-menu">
                                                    <li>
                                                        <h6 class="dropdown-item dark">
                                                            <img src="assets/imges/icons/c-location.svg" alt="location"
                                                                class="me-2">Current
                                                            Location
                                                        </h6>
                                                    <li>
                                                        <hr class="dropdown-divider">
                                                    </li>
                                                    <li>
                                                        <h6 class="dropdown-item dark mb-2">
                                                            Recent Search</h6>
                                                    </li>
                                                    <li><a class="dropdown-item dark" href="#"><img
                                                                src="assets/imges/icons/location_icon.svg"
                                                                alt="location" class="me-2">
                                                            Bengaluru, KS 56010</a>
                                                    </li>
                                                    <li><a class="dropdown-item dark" href="#"><img
                                                                src="assets/imges/icons/location_icon.svg"
                                                                alt="location" class="me-2">
                                                            Bengaluru, KS 56010</a>
                                                    </li>
                                                    <li><a class="dropdown-item dark" href="#"><img
                                                                src="assets/imges/icons/location_icon.svg"
                                                                alt="location" class="me-2">
                                                            Bengaluru, KS 56010</a>
                                                    </li>

                                                </ul>
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="col-lg-3 col-md-4 col-sm-4 col-12 ">
                                        <div class="serch_box">
                                            <a class="btn blue_btn" href="javascript:void(0)">Search
                                                Now</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="tab-pane fade" id="pills-contact" role="tabpanel"
                            aria-labelledby="pills-contact-tab">
                            <div class="row">
                                <div class="col-xl-3 col-lg-4 col-md-12">
                                    <ul class="location_dropdown ">
                                        <li class="nav-item dropdown light_GRay">
                                            <h6>Property Type</h6>
                                            <a class="nav-link dropdown-toggle" href="#" role="button"
                                                data-bs-toggle="dropdown" aria-expanded="false"><img
                                                    src="assets/imges/icons/home.svg" alt="location" class="me-2">
                                                All Types
                                            </a>
                                            <ul class="dropdown-menu">
                                                <li><a class="dropdown-item dark" href="#"><img
                                                            src="assets/imges/icons/home.svg" alt="location"
                                                            class="me-3">
                                                        All Types</a></li>
                                                <li><a class="dropdown-item dark" href="#"><img
                                                            src="assets/imges/icons/home.svg" alt="location"
                                                            class="me-3">
                                                        Apartments</a></li>
                                                <li><a class="dropdown-item dark" href="#"><img
                                                            src="assets/imges/icons/home.svg" alt="location"
                                                            class="me-3">
                                                        Villa</a></li>
                                                <li><a class="dropdown-item dark" href="#"><img
                                                            src="assets/imges/icons/home.svg" alt="location"
                                                            class="me-3">
                                                        Bungalow</a></li>
                                                <li><a class="dropdown-item dark" href="#"><img
                                                            src="assets/imges/icons/home.svg" alt="location"
                                                            class="me-3">
                                                        Row House</a></li>
                                                <li><a class="dropdown-item dark" href="#"><img
                                                            src="assets/imges/icons/home.svg" alt="location"
                                                            class="me-3">
                                                        Land</a></li>
                                                <li><a class="dropdown-item dark" href="#"><img
                                                            src="assets/imges/icons/home.svg" alt="location"
                                                            class="me-3">
                                                        Office</a></li>
                                            </ul>
                                        </li>
                                    </ul>
                                </div>
                                <div class="col-xl-6 col-lg-5 col-md-8 col-sm-8 col-12">
                                    <ul class="location_dropdown ">
                                        <li class="nav-item dropdown ">
                                            <h6>Location</h6>
                                            <a class="nav-link dropdown-toggle serch_bar" href="#" role="button"
                                                data-bs-toggle="dropdown" aria-expanded="false"><img
                                                    src="assets/imges/icons/search.svg" alt="location" class="me-2">
                                                <input type="text" name="" id=""
                                                    placeholder="Search your village, city, region, or zip code">
                                            </a>
                                            <ul class="dropdown-menu">
                                                <li>
                                                    <h6 class="dropdown-item dark">
                                                        <img src="assets/imges/icons/c-location.svg" alt="location"
                                                            class="me-2">Current
                                                        Location
                                                    </h6>
                                                <li>
                                                    <hr class="dropdown-divider">
                                                </li>
                                                <li>
                                                    <h6 class="dropdown-item dark mb-2">
                                                        Recent Search</h6>
                                                </li>
                                                <li><a class="dropdown-item dark" href="#"><img
                                                            src="assets/imges/icons/location_icon.svg" alt="location"
                                                            class="me-2">
                                                        Bengaluru, KS 56010</a>
                                                </li>
                                                <li><a class="dropdown-item dark" href="#"><img
                                                            src="assets/imges/icons/location_icon.svg" alt="location"
                                                            class="me-2">
                                                        Bengaluru, KS 56010</a>
                                                </li>
                                                <li><a class="dropdown-item dark" href="#"><img
                                                            src="assets/imges/icons/location_icon.svg" alt="location"
                                                            class="me-2">
                                                        Bengaluru, KS 56010</a>
                                                </li>

                                            </ul>
                                        </li>
                                    </ul>
                                </div>
                                <div class="col-lg-3 col-md-4 col-sm-4 col-12 ">
                                    <div class="serch_box">
                                        <a class="btn blue_btn" href="javascript:void(0)">Search
                                            Now</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <section class="realeast-banner_card_sec mb-5">
            <div class="realeast-banner_cards d-flex slider_card">
                <div class="realeast-card_img">
                    <img src="assets/imges/card-1.png" alt="property card">
                </div>
                <div class="realeast-card_img">
                    <img src="assets/imges/card-2.png" alt="property card">
                </div>
                <div class="realeast-card_img">
                    <img src="assets/imges/card-3.png" alt="property card">
                </div>
                <div class="realeast-card_img">
                    <img src="assets/imges/card-1.png" alt="property card">
                </div>
                <div class="realeast-card_img">
                    <img src="assets/imges/card-2.png" alt="property card">
                </div>
                <div class="realeast-card_img">
                    <img src="assets/imges/card-3.png" alt="property card">
                </div>
                <div class="realeast-card_img">
                    <img src="assets/imges/card-1.png" alt="property card">
                </div>
                <div class="realeast-card_img">
                    <img src="assets/imges/card-2.png" alt="property card">
                </div>
                <div class="realeast-card_img">
                    <img src="assets/imges/card-3.png" alt="property card">
                </div>
                <div class="realeast-card_img">
                    <img src="assets/imges/card-1.png" alt="property card">
                </div>
                <div class="realeast-card_img">
                    <img src="assets/imges/card-2.png" alt="property card">
                </div>
                <div class="realeast-card_img">
                    <img src="assets/imges/card-3.png" alt="property card">
                </div>
            </div>
        </section>
        <section class="place_sec px-80 pb-100">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-12 d-flex align-items-baseline justify-content-between pb-30 realeast_headline">
                        <h2 class="headline_txt"> Top Localities for buying, renting
                            properties</h2>
                        <a href="list-of-property.php" class="Viewall sign_in">View All<img
                                src="./assets/imges/icons/downdrop-down.svg" alt="drop-icon" class="ms-2"></a>
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
                                <a href="property-details.php">
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
                                                src="assets/imges/icons/user.svg" alt="user" class="me-1">Contact</a>
                                        <a href="#"><img src="assets/imges/icons/heart.svg" alt="heart"
                                                class="heart_btn"></a>
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
                                                src="assets/imges/icons/user.svg" alt="user" class="me-1">Contact</a>
                                        <a href="#"><img src="assets/imges/icons/heart.svg" alt="heart"
                                                class="heart_btn"></a>
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
                                                src="assets/imges/icons/user.svg" alt="user" class="me-1">Contact</a>
                                        <a href="#"><img src="assets/imges/icons/heart.svg" alt="heart"
                                                class="heart_btn"></a>
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
                                                src="assets/imges/icons/user.svg" alt="user" class="me-1">Contact</a>
                                        <a href="#"><img src="assets/imges/icons/heart.svg" alt="heart"
                                                class="heart_btn"></a>
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
                                                src="assets/imges/icons/user.svg" alt="user" class="me-1">Contact</a>
                                        <a href="#"><img src="assets/imges/icons/heart.svg" alt="heart"
                                                class="heart_btn"></a>
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
                                                src="assets/imges/icons/user.svg" alt="user" class="me-1">Contact</a>
                                        <a href="#"><img src="assets/imges/icons/heart.svg" alt="heart"
                                                class="heart_btn"></a>
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
                                                src="assets/imges/icons/user.svg" alt="user" class="me-1">Contact</a>
                                        <a href="#"><img src="assets/imges/icons/heart.svg" alt="heart"
                                                class="heart_btn"></a>
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
                                                src="assets/imges/icons/user.svg" alt="user" class="me-1">Contact</a>
                                        <a href="#"><img src="assets/imges/icons/heart.svg" alt="heart"
                                                class="heart_btn"></a>
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
        <section class="Properties_sec px-80 pb-100">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-12 d-flex align-items-baseline justify-content-between pb-30 realeast_headline">
                        <h2 class="headline_txt">Properties Categories</h2>
                        <a href="categories.php" class="Viewall sign_in">View All<img
                                src="./assets/imges/icons/downdrop-down.svg" alt="drop-icon" class="ms-2"></a>
                    </div>
                </div>
                <div class="row justify-content-between align-items-center">
                    <div class="col-xl-3 col-lg-3 col-md-6 col-sm-6  col-12">
                        <div class="category_card">
                            <div class="cetegory_content">
                                <a href="residential.php">
                                    <h6 class="dark">Residential</h6>
                                </a>
                                <p class="dark">150+ properties</p>
                            </div>
                            <img src="./assets/imges/place/pr-1.png" alt="house">
                        </div>
                    </div>
                    <div class="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12">
                        <div class="category_card pink_light">
                            <div class="cetegory_content">
                                <h6 class="dark">Commercial</h6>
                                <p class="dark">150+ properties</p>
                            </div>
                            <img src="./assets/imges/place/pr-2.png" alt="house">
                        </div>
                    </div>
                    <div class="col-xl-3 col-lg-3 col-md-6 col-sm-6  col-12">
                        <div class="category_card green_light">
                            <div class="cetegory_content">
                                <h6 class="dark">Guest House</h6>
                                <p class="dark">150+ properties</p>
                            </div>
                            <img src="./assets/imges/place/pr-3.png" alt="house">
                        </div>
                    </div>
                    <div class="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12">
                        <div class="category_card blue_light">
                            <div class="cetegory_content ">
                                <h6 class="dark">Raw Land</h6>
                                <p class="dark">150+ properties</p>
                            </div>
                            <img src="./assets/imges/place/pr-4.png" alt="house">
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section class="Newton_sec px-80 pb-100">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-12 d-flex align-items-baseline justify-content-between pb-30 realeast_headline">
                        <div>
                            <h2 class="headline_txt">Real Estate Agents in Newton, USA</h2>
                            <p class="difference_txt">A great agent makes all the difference.</p>
                        </div>
                        <a href="agent.php" class="Viewall sign_in">View All<img
                                src="./assets/imges/icons/downdrop-down.svg" alt="drop-icon" class="ms-2"></a>
                    </div>
                </div>
                <div class="row justify-content-center align-items-center">
                    <div class="col-xl-2 col-lg-3 col-md-4 col-sm-4 col-6">
                        <div class="newton_card">
                            <div class="container-box">
                                <img src="./assets/imges/place/user-1.png" alt="user">
                                <div class="gradient-overlay"></div>
                            </div>
                            <div class="newton_content">
                                <h6 class="white mb-2">Alastair Bell</h6>
                                <p class="white">2546 Westfall Avenue
                                    Fairmont...</p>
                                <a class="btn blue_btn" href="javascript:void(0)"><img src="assets/imges/icons/user.svg"
                                        alt="user" class="me-2">Contact</a>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-2 col-lg-3 col-md-4 col-sm-4 col-6">
                        <div class="newton_card">
                            <div class="container-box">
                                <img src="./assets/imges/place/user-2.png" alt="user">
                                <div class="gradient-overlay"></div>
                            </div>
                            <div class="newton_content">
                                <h6 class="white mb-2">Leon Hill</h6>
                                <p class="white">2546 Westfall Avenue
                                    Fairmont...</p>
                                <a class="btn blue_btn" href="javascript:void(0)"><img src="assets/imges/icons/user.svg"
                                        alt="user" class="me-2">Contact</a>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-2 col-lg-3 col-md-4 col-sm-4 col-6">
                        <div class="newton_card">
                            <div class="container-box">
                                <img src="./assets/imges/place/user-3.png" alt="user">
                                <div class="gradient-overlay"></div>
                            </div>
                            <div class="newton_content">
                                <h6 class="white mb-2">Neil Watson</h6>
                                <p class="white">2546 Westfall Avenue
                                    Fairmont...</p>
                                <a class="btn blue_btn" href="javascript:void(0)"><img src="assets/imges/icons/user.svg"
                                        alt="user" class="me-2">Contact</a>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-2 col-lg-3 col-md-4 col-sm-4 col-6">
                        <div class="newton_card">
                            <div class="container-box">
                                <img src="./assets/imges/place/user-4.png" alt="user">
                                <div class="gradient-overlay"></div>
                            </div>
                            <div class="newton_content">
                                <h6 class="white mb-2">Jensen Fraser</h6>
                                <p class="white">2546 Westfall Avenue
                                    Fairmont...</p>
                                <a class="btn blue_btn" href="javascript:void(0)"><img src="assets/imges/icons/user.svg"
                                        alt="user" class="me-2">Contact</a>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-2 col-lg-3 col-md-4 col-sm-4 col-6">
                        <div class="newton_card">
                            <div class="container-box">
                                <img src="./assets/imges/place/user-6.png" alt="user">
                                <div class="gradient-overlay"></div>
                            </div>
                            <div class="newton_content">
                                <h6 class="white mb-2">Cain McLean</h6>
                                <p class="white">2546 Westfall Avenue
                                    Fairmont...</p>
                                <a class="btn blue_btn" href="javascript:void(0)"><img src="assets/imges/icons/user.svg"
                                        alt="user" class="me-2">Contact</a>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-2 col-lg-3 col-md-4 col-sm-4 col-6">
                        <div class="newton_card">
                            <div class="container-box">
                                <img src="./assets/imges/place/user-5.png" alt="user">
                                <div class="gradient-overlay"></div>
                            </div>
                            <div class="newton_content">
                                <h6 class="white mb-2">John Doe</h6>
                                <p class="white">2546 Westfall Avenue
                                    Fairmont...</p>
                                <a class="btn blue_btn" href="javascript:void(0)"><img src="assets/imges/icons/user.svg"
                                        alt="user" class="me-2">Contact</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section class=" px-80 pb-100">
            <div class="container-fluid">
                <div class="row justify-content-center align-items-center">
                    <div class="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12 mt-md-0 mt-3">
                        <div class="property_box">
                            <div class="property_banner">
                                <img src="./assets/imges/banner/pr-6.png" alt="banner">
                            </div>
                            <a href="#agent-modal" data-bs-toggle="modal">
                                <h6>Are you interested to become property agent?</h6>
                            </a>
                            <a href="javascript:void(0);" class="next_arrow"><i class="fa-solid fa-arrow-right"></i></a>
                        </div>
                    </div>
                    <div class="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 mt-md-0 mt-3 ">
                        <div class="property_box">
                            <div class="property_banner">
                                <img src="./assets/imges/banner/pr-7.png" alt="banner">
                            </div>
                            <a href="#lender-modal" data-bs-toggle="modal">
                                <h6>Are you interested to become property lender?</h6>
                            </a>
                            <a href="javascript:void(0);" class="next_arrow"><i class="fa-solid fa-arrow-right"></i></a>
                        </div>
                    </div>
                    <div class="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 mt-3 mt-lg-0">
                        <div class="property_box">
                            <div class="property_banner">
                                <img src="./assets/imges/banner/pr-8.png" alt="banner">
                            </div>
                            <a href="create-property-advertisement.php">
                                <h6>Are you interested to Property Advertisement?</h6>
                            </a>
                            <a href="javascript:void(0);" class="next_arrow"><i class="fa-solid fa-arrow-right"></i></a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section class="Newton_sec px-80 pb-100">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-12 d-flex align-items-baseline justify-content-between pb-30 realeast_headline">
                        <div>
                            <h2 class="headline_txt">Real Estate Agents in Newton, USA</h2>
                            <p class="difference_txt">A great agent makes all the difference.</p>
                        </div>
                        <a href="lender.php" class="Viewall sign_in">View All<img
                                src="./assets/imges/icons/downdrop-down.svg" alt="drop-icon" class="ms-2"></a>
                    </div>
                </div>
                <div class="row justify-content-center align-items-center">
                    <div class="col-xl-2 col-lg-3 col-md-4 col-sm-4 col-6">
                        <div class="newton_card">
                            <div class="container-box">
                                <img src="./assets/imges/place/user-1.png" alt="user">
                                <div class="gradient-overlay"></div>
                            </div>
                            <div class="newton_content">
                                <h6 class="white mb-2">Alastair Bell</h6>
                                <p class="white">2546 Westfall Avenue
                                    Fairmont...</p>
                                <a class="btn blue_btn" href="javascript:void(0)"><img src="assets/imges/icons/user.svg"
                                        alt="user" class="me-2">Contact</a>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-2 col-lg-3 col-md-4 col-sm-4 col-6">
                        <div class="newton_card">
                            <div class="container-box">
                                <img src="./assets/imges/place/user-2.png" alt="user">
                                <div class="gradient-overlay"></div>
                            </div>
                            <div class="newton_content">
                                <h6 class="white mb-2">Leon Hill</h6>
                                <p class="white">2546 Westfall Avenue
                                    Fairmont...</p>
                                <a class="btn blue_btn" href="javascript:void(0)"><img src="assets/imges/icons/user.svg"
                                        alt="user" class="me-2">Contact</a>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-2 col-lg-3 col-md-4 col-sm-4 col-6">
                        <div class="newton_card">
                            <div class="container-box">
                                <img src="./assets/imges/place/user-3.png" alt="user">
                                <div class="gradient-overlay"></div>
                            </div>
                            <div class="newton_content">
                                <h6 class="white mb-2">Neil Watson</h6>
                                <p class="white">2546 Westfall Avenue
                                    Fairmont...</p>
                                <a class="btn blue_btn" href="javascript:void(0)"><img src="assets/imges/icons/user.svg"
                                        alt="user" class="me-2">Contact</a>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-2 col-lg-3 col-md-4 col-sm-4 col-6">
                        <div class="newton_card">
                            <div class="container-box">
                                <img src="./assets/imges/place/user-4.png" alt="user">
                                <div class="gradient-overlay"></div>
                            </div>
                            <div class="newton_content">
                                <h6 class="white mb-2">Jensen Fraser</h6>
                                <p class="white">2546 Westfall Avenue
                                    Fairmont...</p>
                                <a class="btn blue_btn" href="javascript:void(0)"><img src="assets/imges/icons/user.svg"
                                        alt="user" class="me-2">Contact</a>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-2 col-lg-3 col-md-4 col-sm-4 col-6">
                        <div class="newton_card">
                            <div class="container-box">
                                <img src="./assets/imges/place/user-6.png" alt="user">
                                <div class="gradient-overlay"></div>
                            </div>
                            <div class="newton_content">
                                <h6 class="white mb-2">Cain McLean</h6>
                                <p class="white">2546 Westfall Avenue
                                    Fairmont...</p>
                                <a class="btn blue_btn" href="javascript:void(0)"><img src="assets/imges/icons/user.svg"
                                        alt="user" class="me-2">Contact</a>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-2 col-lg-3 col-md-4 col-sm-4 col-6">
                        <div class="newton_card">
                            <div class="container-box">
                                <img src="./assets/imges/place/user-5.png" alt="user">
                                <div class="gradient-overlay"></div>
                            </div>
                            <div class="newton_content">
                                <h6 class="white mb-2">John Doe</h6>
                                <p class="white">2546 Westfall Avenue
                                    Fairmont...</p>
                                <a class="btn blue_btn" href="javascript:void(0)"><img src="assets/imges/icons/user.svg"
                                        alt="user" class="me-2">Contact</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section class="faQ_sec px-80 pb-100">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-12">
                        <div class="faq_headline">
                            <h6>Frequently Asked Questions</h6>
                            <p>Still need help? <a href="#"> Get Help Now</a></p>
                        </div>
                    </div>
                </div>
                <div class="row ">
                    <div class="col-xl-7 col-lg-6 col-md-12 col-sm-12 col-12">
                        <div class="faq_content">
                            <div class="accordion" id="accordionPanelsStayOpenExample">
                                <div class="accordion-item">
                                    <h2 class="accordion-header">
                                        <button class="accordion-button" type="button" data-bs-toggle="collapse"
                                            data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true"
                                            aria-controls="panelsStayOpen-collapseOne">
                                            What is BBOYO?
                                        </button>
                                    </h2>
                                    <div id="panelsStayOpen-collapseOne" class="accordion-collapse collapse show">
                                        <div class="accordion-body pt-0">
                                            <p>A name with an Irish origin, meaning boy or lad. Boyo real estate or
                                                Young
                                                Man's Real Estate. A platform available for all ages.</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="accordion-item">
                                    <h2 class="accordion-header">
                                        <button class="accordion-button collapsed" type="button"
                                            data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo"
                                            aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo">
                                            Are the service providers on HomePro reliable and qualified?
                                        </button>
                                    </h2>
                                    <div id="panelsStayOpen-collapseTwo" class="accordion-collapse collapse">
                                        <div class="accordion-body pt-0">
                                            <p>A name with an Irish origin, meaning boy or lad. Boyo real estate or
                                                Young Man's Real Estate. A platform available for all ages.</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="accordion-item">
                                    <h2 class="accordion-header">
                                        <button class="accordion-button collapsed" type="button"
                                            data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseThree"
                                            aria-expanded="false" aria-controls="panelsStayOpen-collapseThree">
                                            What if I have an issue or complaint about a properties?
                                        </button>
                                    </h2>
                                    <div id="panelsStayOpen-collapseThree" class="accordion-collapse collapse">
                                        <div class="accordion-body pt-0">
                                            <p>A name with an Irish origin, meaning boy or lad. Boyo real estate or
                                                Young Man's Real Estate. A platform available for all ages.</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="accordion-item">
                                    <h2 class="accordion-header">
                                        <button class="accordion-button collapsed" type="button"
                                            data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapsefour"
                                            aria-expanded="false" aria-controls="panelsStayOpen-collapseThree">
                                            How are payments handled on BOYO?
                                        </button>
                                    </h2>
                                    <div id="panelsStayOpen-collapsefour" class="accordion-collapse collapse">
                                        <div class="accordion-body pt-0">
                                            <p>A name with an Irish origin, meaning boy or lad. Boyo real estate or
                                                Young Man's Real Estate. A platform available for all ages.</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="accordion-item">
                                    <h2 class="accordion-header">
                                        <button class="accordion-button collapsed" type="button"
                                            data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapsefive"
                                            aria-expanded="false" aria-controls="panelsStayOpen-collapseThree">
                                            How to add your properties?
                                        </button>
                                    </h2>
                                    <div id="panelsStayOpen-collapsefive" class="accordion-collapse collapse">
                                        <div class="accordion-body pt-0">
                                            <p>A name with an Irish origin, meaning boy or lad. Boyo real estate or
                                                Young Man's Real Estate. A platform available for all ages.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-5 col-lg-6 col-md-12 col-sm-12 col-12">
                        <div class="faq_img">
                            <img src="./assets/imges/faq-1.png" alt="faq" class="img-fluid faq_one">
                            <img src="./assets/imges/faq-2.png" alt="faq" class="img-fluid faq_two">
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