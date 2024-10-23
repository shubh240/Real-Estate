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
        <section class="apartment_sec px-80">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-12">
                        <div class="apartment_item">
                            <ul class="location_dropdown p-0 apartment_items">
                                <li class="nav-item dropdown">
                                    <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                                        aria-expanded="false"><img src="assets/imges/icons/location.svg" alt="location"
                                            class="me-2">
                                        Newyork, USA
                                    </a>
                                </li>
                                <li class="nav-item dropdown">
                                    <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                                        data-bs-offset="0,20" aria-expanded="false"><img
                                            src="assets/imges/icons/home.svg" alt="location" class="me-2">
                                        All Types
                                    </a>
                                    <ul class="dropdown-menu">
                                        <li><a class="dropdown-item dark" href="#"><img
                                                    src="assets/imges/icons/home.svg" alt="location" class="me-3">
                                                All Types</a></li>
                                        <li><a class="dropdown-item dark" href="#"><img
                                                    src="assets/imges/icons/home.svg" alt="location" class="me-3">
                                                Apartments</a></li>
                                        <li><a class="dropdown-item dark" href="#"><img
                                                    src="assets/imges/icons/home.svg" alt="location" class="me-3">
                                                Villa</a></li>
                                        <li><a class="dropdown-item dark" href="#"><img
                                                    src="assets/imges/icons/home.svg" alt="location" class="me-3">
                                                Bungalow</a></li>
                                        <li><a class="dropdown-item dark" href="#"><img
                                                    src="assets/imges/icons/home.svg" alt="location" class="me-3">
                                                Row House</a></li>
                                        <li><a class="dropdown-item dark" href="#"><img
                                                    src="assets/imges/icons/home.svg" alt="location" class="me-3">
                                                Land</a></li>
                                        <li><a class="dropdown-item dark" href="#"><img
                                                    src="assets/imges/icons/home.svg" alt="location" class="me-3">
                                                Office</a></li>
                                    </ul>
                                </li>
                                <li class="nav-item dropdown buy">
                                    <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                                        data-bs-offset="0,20" aria-expanded="false"><img
                                            src="assets/imges/icons/buy.svg" alt="buy" class="me-2">
                                        Buy
                                    </a>
                                    <ul class="dropdown-menu">
                                        <li><a class="dropdown-item dark" href="#">All</a></li>
                                        <li><a class="dropdown-item dark" href="#">Buy</a></li>
                                        <li><a class="dropdown-item dark" href="#">Rent</a></li>
                                        <li><a class="dropdown-item dark" href="#">Sale</a></li>
                                    </ul>
                                </li>
                                <li class="nav-item dropdown me-1">
                                    <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                                        aria-expanded="false" data-bs-offset="0,20"><img
                                            src="assets/imges/icons/budget.svg" alt="budget" class="me-2">
                                        Budget
                                    </a>
                                    <ul class="dropdown-menu w-auto" aria-labelledby="dropdownMenuOffset">
                                        <li class="lng_menu">
                                            <ul class="lng_dropdown d-flex g-3 p-3">
                                                <li class="nav-item dropdown me-3">
                                                    <a class="nav-link dropdown-toggle" href="#" role="button"
                                                        data-bs-toggle="dropdown" aria-expanded="false">
                                                        Min Price
                                                    </a>
                                                    <ul class="dropdown-menu">
                                                        <li><a class="dropdown-item dark" href="#">
                                                                3000</a></li>
                                                        <li><a class="dropdown-item dark" href="#">
                                                                3000</a></li>
                                                        <li><a class="dropdown-item dark" href="#">
                                                                3000</a></li>
                                                    </ul>
                                                </li>
                                                <li class="nav-item dropdown">
                                                    <a class="nav-link dropdown-toggle" href="#" role="button"
                                                        data-bs-toggle="dropdown" aria-expanded="false">
                                                        Max Price
                                                    </a>
                                                    <ul class="dropdown-menu">
                                                        <li><a class="dropdown-item dark" href="#">
                                                                3000</a></li>
                                                        <li><a class="dropdown-item dark" href="#">
                                                                3000</a></li>
                                                        <li><a class="dropdown-item dark" href="#">
                                                                3000</a></li>
                                                    </ul>
                                                </li>

                                            </ul>
                                        <li class="px-3 range_input"> <input type="range" min="1" max="100" value="0">
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                            <a class="btn blue_btn" href="javascript:void(0)">Save Search</a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section class="breadcrumb_sec px-80">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-12">
                        <ul class="breadcrumb mx-30">
                            <li><a href="list-of-property.php">Home</a></li>
                            <li><a href="list-of-property.php"> Buy</a></li>
                            <li><a href="list-of-property.php"> Apartments</a></li>
                            <li><a href="list-of-property.php"> Sinomen Studio Palace.</a></li>

                        </ul>
                    </div>
                </div>
            </div>
        </section>
        <section class=" gallary_sec px-80">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-xl-5 col-lg-5 col-md-6 col-sm-12 col-12">
                        <div class="gallary_img-left">
                            <img src="assets/imges/place/place-6.png" alt="img">
                        </div>
                    </div>
                    <div class="col-xl-7 col-lg-7 col-md-6 col-sm-12 col-12 mt-3 mt-md-0">
                        <div class="row">
                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-6">
                                <div class="property_img_cards">
                                    <div class="property_img">
                                        <img src="./assets/imges/place/place-6.png" alt="place">
                                    </div>
                                </div>
                            </div>
                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-6">
                                <div class="property_img_cards">
                                    <div class="property_img">
                                        <img src="./assets/imges/place/place-7.png" alt="place">
                                    </div>

                                </div>
                            </div>
                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-6">
                                <div class="property_img_cards">
                                    <div class="property_img">
                                        <img src="./assets/imges/place/place-7.png" alt="place" class="radius">
                                    </div>

                                </div>
                            </div>
                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-6">
                                <div class="property_img_cards">
                                    <div class="property_img">
                                        <img src="./assets/imges/place/place-6.png" alt="place">
                                    </div>

                                </div>
                            </div>
                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-6">
                                <div class="property_img_cards">
                                    <div class="property_img">
                                        <img src="./assets/imges/place/place-7.png" alt="place">
                                    </div>

                                </div>
                            </div>
                            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-6">
                                <div class="property_img_cards">
                                    <div class="property_img gallary_last-img">
                                        <img src="./assets/imges/place/place-7.png" alt="place">
                                    </div>
                                    <a href="#" class="delete_place">
                                        <p> <span><i class="fa-solid fa-plus"></i></span> 16 More</p>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section class="place_sec Studio_sec px-80 pb-100 mt-30">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-xl-8 col-lg-8 col-md-12 col-sm-12 col-12 pe-lg-5 pe-2 ">
                        <div class="row">
                            <div
                                class="col-12 d-flex align-items-baseline justify-content-between pb-30 realeast_headline pb-30">
                                <div>
                                    <h2 class="headline_txt ">Sinomen Studio Palace.</h2>
                                    <p class="card-text mt-3 fs-20"><img src="assets/imges/icons/location.svg"
                                            alt="location" class="me-1 w-auto">
                                        2546 Westfall Avenue Fairmont, MN 56031</p>
                                </div>
                                <a href="#"><img src="assets/imges/icons/heart.svg" alt="heart" class="heart_btn"></a>
                            </div>
                            <div class="col-12 pb-30">
                                <a href="javascript:void(0)" class="red_btn">For Rent</a>
                                <a href="javascript:void(0)" class="red_btn Primary-Blue-bg">Apartments</a>
                            </div>
                            <div class="top_line"></div>
                        </div>
                        <div class="hotel-info-card">
                            <div class="row">
                                <div class="col-12 mt-30">
                                    <h3>Properties Specifications</h3>
                                    <h6>Proin gravida nibh vel velit auctor aliquet. Aenean sollicitudin, lorem quis
                                        bibendum
                                        auctor, nisi elit consequat as sum, nec sagittis sem nibh id elit. Duis sed odio
                                        sit
                                        amet nibh vulputate cursus a sit amet mauris. Morbi accumsn sum velit. Nam nec
                                        tellus a
                                        odio tincidunt auctor a ornare odio. Sed non mauris vitae erat consequat auctor
                                        e in
                                        elit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per
                                        inceptos
                                        himenaeos. Mauris in erat justo. Nullam ac urna eu felis dapibus condimentum sit
                                        amet a
                                        augue.</h6>
                                    <h6>Proin gravida nibh vel velit auctor aliquet. Aenean sollicitudin, lorem quis
                                        bibendum
                                        auctor, nisi elit consequat as sum, nec sagittis sem nibh id elit. Duis sed odio
                                        sit
                                        amet nibh vulputate cursus a sit amet mauris. Morbi accumsn sum velit. Nam nec
                                        tellus a
                                        odio tincidunt auctor a ornare odio. Sed non mauris vitae erat consequat auctor
                                        e in
                                        elit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per
                                        inceptos
                                        himenaeos. Mauris in erat justo. Nullam ac urna eu felis dapibus condimentum sit
                                        amet a
                                        augue.</h6>
                                </div>
                                <div class="col-12 mt-30">
                                    <ul class="facilities_list_card">
                                        <h3>About Properties</h3>
                                        <div class="row">
                                            <div class="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-6 mt-3">
                                                <div class="facilities_item align-items-start gap-0">
                                                    <img src="./assets/imges/icons/area.svg" alt="area icon"
                                                        class="me-2">
                                                    <div>
                                                        <p> <span>1230 <span class="Gray">Sq.fit</span></span>
                                                        </p>
                                                        <p class="d-flex">Plot Area
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-6 mt-3">
                                                <div class="facilities_item align-items-start gap-0">
                                                    <img src="./assets/imges/icons/bedroom.svg" alt="area icon"
                                                        class="me-2">
                                                    <div>
                                                        <p> <span>3<span class="Gray"> Bedrooms</span></span>
                                                        </p>
                                                        <p class="d-flex">Bedroom
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-6 mt-3">
                                                <div class="facilities_item align-items-start gap-0">
                                                    <img src="./assets/imges/icons/wass.svg" alt="area icon"
                                                        class="me-2">
                                                    <div>
                                                        <p> <span>2 <span class="Gray"> Bathroom</span></span>
                                                        </p>
                                                        <p class="d-flex">Bathroom
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-6 mt-3">
                                                <div class="facilities_item align-items-start gap-0">
                                                    <img src="./assets/imges/icons/parking.svg" alt="area icon"
                                                        class="me-2">
                                                    <div>
                                                        <p> <span>2 <span class="Gray"> Car Attached
                                                                    Garag</span></span>
                                                        </p>
                                                        <p class="d-flex">Parking
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </ul>
                                </div>
                                <div class="col-12 mt-30 mb-3">
                                    <div class="col-12">
                                        <ul class="facilities_list_card">
                                            <h3>Properties Amenities</h3>
                                            <div class="row">
                                                <div class="col-12 m-t3 Gymnasium_items">
                                                    <div class="Gymnasium_card">
                                                        <img src="./assets/imges/icons/gymnasium.svg" alt="gym">
                                                        <p>Gymnasium</p>
                                                    </div>
                                                    <div class="Gymnasium_card">
                                                        <img src="./assets/imges/icons/game-home.svg" alt="gym">
                                                        <p>Children's
                                                            Play Area</p>
                                                    </div>
                                                    <div class="Gymnasium_card">
                                                        <img src="./assets/imges/icons/gymnasium.svg" alt="gym">
                                                        <p>Entrance
                                                            Lobby</p>
                                                    </div>
                                                    <div class="Gymnasium_card">
                                                        <img src="./assets/imges/icons/gymnasium.svg" alt="gym">
                                                        <p>Lifts</p>
                                                    </div>
                                                    <div class="Gymnasium_card">
                                                        <img src="./assets/imges/icons/gymnasium.svg" alt="gym">
                                                        <p>Fire Fighting
                                                            System</p>
                                                    </div>
                                                    <div class="Gymnasium_card">
                                                        <img src="./assets/imges/icons/gymnasium.svg" alt="gym">
                                                        <p>24X7 Water
                                                            Supply</p>
                                                    </div>
                                                    <div class="Gymnasium_card">
                                                        <img src="./assets/imges/icons/gymnasium.svg" alt="gym">
                                                        <p>24X7 Water
                                                            Supply/p>
                                                    </div>
                                                    <div class="Gymnasium_card">
                                                        <img src="./assets/imges/icons/gymnasium.svg" alt="gym">
                                                        <p>Closed Car
                                                            Parking
                                                    </div>
                                                </div>
                                            </div>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                        <div class="facilities_list_card mt-0">
                            <div class="price">
                                <h6>$ 560</h6>
                                <p>Property price</p>
                            </div>
                            <div class="top_line my-3"></div>
                            <div>
                                <h2 class="headline_txt fs-24">Leon Hill</h2>
                                <p class="card-text Gray"><img src="assets/imges/icons/location.svg" alt="location"
                                        class="me-1">
                                    2546 Westfall Avenue Fairmont, MN 56031</p>
                                <a class="btn blue_btn w-100 mt-3" href="#successfully_box" data-bs-toggle="modal"><img
                                        src="assets/imges/icons/user.svg" alt="user" class="me-1">Contacts Owner</a>
                            </div>
                        </div>
                        <div class="mt-30">
                            <div class="mapouter">
                                <div class="gmap_canvas"><iframe width="100%" height="500" id="gmap_canvas"
                                        src="https://maps.google.com/maps?q=chennai&t=&z=13&ie=UTF8&iwloc=&output=embed"
                                        frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>
                                </div>
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

    <!-- --------------------------Map js----------------------------------------------- -->
    <script type="text/javascript" src="http://maps.google.com/maps/api/js?sensor=false"></script>
    <!-- --------------------------------js --------------------------------------------------- -->
    <script>
    var map;
    var geocoder;

    function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
            center: {
                lat: 13.0827,
                lng: 80.2707
            }, // Chennai coordinates
            zoom: 13
        });

        geocoder = new google.maps.Geocoder();

        map.addListener('click', function(event) {
            geocodeLatLng(event.latLng);
        });
    }

    function geocodeLatLng(latlng) {
        geocoder.geocode({
            'location': latlng
        }, function(results, status) {
            if (status === 'OK') {
                if (results[0]) {
                    document.getElementById('address').value = results[0].formatted_address;
                } else {
                    window.alert('No results found');
                }
            } else {
                window.alert('Geocoder failed due to: ' + status);
            }
        });
    }
    </script>


    <!-- ===============================modal============================================= -->
    <!-- -------------successfully modal-------------- -->
    <div class="signin_modal successfully_modal">
        <div class="modal fade" id="successfully_box" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
            aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <!-- <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> -->
                    <div class="modal-body">
                        <div class="row justify-content-center align-items-center">
                            <div class="col-sm-12">
                                <div class="successfully_box text-center">
                                    <a href="#" class="bolo_log-img"><img src="./assets/imges/icons/boyo-logo.svg"
                                            alt="boyo"></a>
                                    <h2 class="mt-3">Hello John!</h2>
                                    <p class="verify mb-3">We will send your interest to the owner. He will
                                        contact you as soon as possible.</p>
                                    <a class="btn blue_btn w-100" href="#" data-bs-dismiss="modal">Ok</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>


</html>