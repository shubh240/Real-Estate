<header class="page-header px-80 py-3">
    <nav class="navbar navbar-expand-lg">
        <div class="container-fluid">
            <a class="navbar-brand" href="home.php"><img src="assets/imges/icons/boyo-logo.svg" alt="boyo logo"></a>
            <ul class="left_menu  d-lg-none d-flex">
                <li class="lng_menu ">
                    <ul class="lng_dropdown lng_box">
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle none_toggle" href="#" role="button"
                                data-bs-toggle="dropdown" aria-expanded="false"> <img src="assets/imges/icons/lng.svg"
                                    alt="language" class="me-2">
                                English
                            </a>
                            <a class="nav-link dropdown-toggle lng_toogle" href="#" role="button"
                                data-bs-toggle="dropdown" aria-expanded="false"> <img src="assets/imges/icons/lng.svg"
                                    alt="language">
                            </a>
                            <ul class="dropdown-menu">
                                <li><a class="dropdown-item dark" href="#"> <img src="assets/imges/icons/lng.svg"
                                            alt="language" class="me-2">
                                        English</a></li>
                                <li><a class="dropdown-item dark" href="#"> <img src="assets/imges/icons/lng.svg"
                                            alt="language" class="me-2">
                                        English</a></li>
                                <li><a class="dropdown-item dark" href="#"> <img src="assets/imges/icons/lng.svg"
                                            alt="language" class="me-2">
                                        English</a></li>
                            </ul>
                        </li>
                    </ul>
                </li>
                <a class="btn sign_in messgae_box" href="chat.php"><img src="assets/imges/icons/messgae.svg"
                        alt="messgage"></a>
                <!-- <a class="btn blue_btn" href="list-property.php">List a property</a> -->
                <li class="lng_menu ">
                    <ul class="lng_dropdown">
                        <li class="nav-item dropdown profile_card">
                            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                                aria-expanded="false"> <span class="profile_name me-1">J D</span>
                                John D
                            </a>
                            </a>
                            <ul class="dropdown-menu px-3 py-4">
                                <li><a class="dropdown-item dark mb-3" href="#profile" data-bs-toggle="modal"><img
                                            src="assets/imges/icons/profile.svg" alt="language" class="me-2">
                                        My Profile</a></li>
                                <li><a class="dropdown-item dark mb-3" href="property-advertisement.php">
                                        <img src="assets/imges/icons/property.svg" alt="language" class="me-2">
                                        Property Advertisement</a></li>
                                <li><a class="dropdown-item dark  mb-3" href="favorite.php"> <img
                                            src="assets/imges/icons/fav.svg" alt="language" class="me-2">
                                        Favorite Properties</a></li>
                                <li><a class="dropdown-item dark  mb-3" href="my-properties.php"> <img
                                            src="assets/imges/icons/property.svg" alt="language" class="me-2">
                                        My Properties</a></li>
                                <li><a class="dropdown-item dark  mb-3" href="notifaction.php"> <img
                                            src="assets/imges/icons/notifaction.svg" alt="language" class="me-2">
                                        Notifications</a></li>
                                <li><a class="dropdown-item dark  mb-3" href="#password_change" data-bs-toggle="modal">
                                        <img src="assets/imges/icons/key.svg" alt="language" class="me-2">
                                        Change Password</a></li>
                                <li><a class="dropdown-item dark  mb-3" href="help.php"> <img
                                            src="assets/imges/icons/help.png" alt="language" class="me-2">
                                        Help</a></li>
                                <li><a class="dropdown-item dark  mb-3" href="index.php"> <img
                                            src="assets/imges/icons/logout.svg" alt="language" class="me-2">
                                        Signout</a></li>
                            </ul>
                        </li>
                    </ul>
                </li>
                <button class="btn toogle_btn" type="button" data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
                    <span><i class="fa-solid fa-bars"></i></span>
                </button>
            </ul>
            <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasExample"
                aria-labelledby="offcanvasExampleLabel">
                <div class="offcanvas-header">
                    <h5 class="offcanvas-title" id="offcanvasExampleLabel"><a href="index.php" class="h_logo"><img
                                src="./assets/imges/icons/bboyo.svg" alt="boyo"></a>
                    </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div class="offcanvas-body">
                    <div class="menubar">
                        <nav class="navbar">
                            <ul class="location_dropdown">
                                <li class="nav-item dropdown">
                                    <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                                        aria-expanded="false"><img src="assets/imges/icons/location.svg" alt="location"
                                            class="me-2">
                                        Newyork, USA
                                    </a>
                                    <ul class="dropdown-menu">
                                        <li>
                                            <h6 class="dropdown-item dark"><img src="assets/imges/icons/c-location.svg"
                                                    alt="location" class="me-2">Current Location</h6>
                                        <li>
                                            <hr class="dropdown-divider">
                                        </li>
                                        <li>
                                            <h6 class="dropdown-item dark mb-2">Recent Search</h6>
                                        </li>
                                        <li><a class="dropdown-item dark" href="#"><img
                                                    src="assets/imges/icons/location_icon.svg" alt="location"
                                                    class="me-2">
                                                Bengaluru, KS 56010</a></li>
                                        <li><a class="dropdown-item dark" href="#"><img
                                                    src="assets/imges/icons/location_icon.svg" alt="location"
                                                    class="me-2">
                                                Bengaluru, KS 56010</a></li>
                                        <li><a class="dropdown-item dark" href="#"><img
                                                    src="assets/imges/icons/location_icon.svg" alt="location"
                                                    class="me-2">
                                                Bengaluru, KS 56010</a></li>
                                    </ul>
                                </li>
                            </ul>
                            <ul class="navbar-nav">
                                <li class="nav-item">
                                    <a class="nav-link Secondary-Black active" href="list-of-property.php">Buy</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link Secondary-Black" href="#">Rent</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link Secondary-Black" href="sale.php">Sale</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link Secondary-Black" href="agent.php">Agent</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link Secondary-Black" href="lender.php">Lenders</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link Secondary-Black " href="help.php">Help</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link Secondary-Black" href="resources.php">Resources</a>
                                </li>
                                <li class="d-lg-none ">
                                    <a class="btn blue_btn" href="list-property.php">List a property</a>

                                </li>
                            </ul>

                        </nav>
                        <ul class="left_menu d-none d-lg-flex">
                            <li class="lng_menu ">
                                <ul class="lng_dropdown lng_box">
                                    <li class="nav-item dropdown">
                                        <a class="nav-link dropdown-toggle none_toggle" href="#" role="button"
                                            data-bs-toggle="dropdown" aria-expanded="false"> <img
                                                src="assets/imges/icons/lng.svg" alt="language" class="me-2">
                                            English
                                        </a>
                                        <a class="nav-link dropdown-toggle lng_toogle" href="#" role="button"
                                            data-bs-toggle="dropdown" aria-expanded="false"> <img
                                                src="assets/imges/icons/lng.svg" alt="language">
                                        </a>
                                        <ul class="dropdown-menu">
                                            <li><a class="dropdown-item dark" href="#"> <img
                                                        src="assets/imges/icons/lng.svg" alt="language" class="me-2">
                                                    English</a></li>
                                            <li><a class="dropdown-item dark" href="#"> <img
                                                        src="assets/imges/icons/lng.svg" alt="language" class="me-2">
                                                    English</a></li>
                                            <li><a class="dropdown-item dark" href="#"> <img
                                                        src="assets/imges/icons/lng.svg" alt="language" class="me-2">
                                                    English</a></li>
                                        </ul>
                                    </li>
                                </ul>
                            </li>
                            <a class="btn sign_in messgae_box" href="chat.php"><img src="assets/imges/icons/messgae.svg"
                                    alt="messgage"></a>
                            <a class="btn blue_btn" href="list-property.php">List a property</a>
                            <li class="lng_menu ">
                                <ul class="lng_dropdown">
                                    <li class="nav-item dropdown profile_card">
                                        <a class="nav-link dropdown-toggle" href="#" role="button"
                                            data-bs-toggle="dropdown" aria-expanded="false"> <span
                                                class="profile_name me-1">J D</span>
                                            John D
                                        </a>
                                        </a>
                                        <ul class="dropdown-menu px-3 py-4">
                                            <li><a class="dropdown-item dark mb-3" href="#profile"
                                                    data-bs-toggle="modal"><img src="assets/imges/icons/profile.svg"
                                                        alt="language" class="me-2">
                                                    My Profile</a></li>
                                            <li><a class="dropdown-item dark mb-3" href="property-advertisement.php">
                                                    <img src="assets/imges/icons/property.svg" alt="language"
                                                        class="me-2">
                                                    Property Advertisement</a></li>
                                            <li><a class="dropdown-item dark  mb-3" href="favorite.php"> <img
                                                        src="assets/imges/icons/fav.svg" alt="language" class="me-2">
                                                    Favorite Properties</a></li>
                                            <li><a class="dropdown-item dark  mb-3" href="my-properties.php"> <img
                                                        src="assets/imges/icons/property.svg" alt="language"
                                                        class="me-2">
                                                    My Properties</a></li>
                                            <li><a class="dropdown-item dark  mb-3" href="notifaction.php"> <img
                                                        src="assets/imges/icons/notifaction.svg" alt="language"
                                                        class="me-2">
                                                    Notifications</a></li>
                                            <li><a class="dropdown-item dark  mb-3" href="#password_change"
                                                    data-bs-toggle="modal"> <img src="assets/imges/icons/key.svg"
                                                        alt="language" class="me-2">
                                                    Change Password</a></li>
                                            <li><a class="dropdown-item dark  mb-3" href="help.php"> <img
                                                        src="assets/imges/icons/help.png" alt="language" class="me-2">
                                                    Help</a></li>
                                            <li><a class="dropdown-item dark  mb-3" href="index.php"> <img
                                                        src="assets/imges/icons/logout.svg" alt="language" class="me-2">
                                                    Signout</a></li>
                                        </ul>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</header>


<!-- ======================================modal====================================== -->
<!-- change password Modal -->
<div class="signin_modal">
    <div class="modal fade" id="password_change" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
        aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content">
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                <div class="modal-body">
                    <form action="#">
                        <div class="row">
                            <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 p-0 order-lg-1 order-2">
                                <div class="signin_card">
                                    <h6 class="signin-title">Change Password</h6>
                                    <p class="verify">Keep your personal information up-to-date and organized. </p>
                                    <div class="signin_card-content">
                                        <div class="input_fild mb-4">
                                            <label>New Password
                                            </label>
                                            <div class="password">
                                                <input type="password" class="form-control"
                                                    placeholder="Enter password">
                                                <span><img src="./assets/imges/icons/password.svg"
                                                        alt="password"></span>
                                            </div>
                                        </div>
                                        <div class="input_fild mb-4">
                                            <label>Confirm Password
                                            </label>
                                            <div class="password">
                                                <input type="password" class="form-control"
                                                    placeholder="Enter password">
                                                <span><img src="./assets/imges/icons/password.svg"
                                                        alt="password"></span>
                                            </div>
                                        </div>
                                        <div class="input_fild mb-4">
                                            <label>Confirm Password
                                            </label>
                                            <div class="password">
                                                <input type="password" class="form-control"
                                                    placeholder="Enter password">
                                                <span><img src="./assets/imges/icons/password.svg"
                                                        alt="password"></span>
                                            </div>
                                        </div>
                                        <a class="btn blue_btn w-100" href="#" data-bs-toggle="modal">Update</a>
                                    </div>
                                </div>
                            </div>
                            <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 order-lg-2 order-1">
                                <div class="signin_box">
                                    <a href="#" class="bolo_log-img"><img src="./assets/imges/icons/boyo-logo.svg"
                                            alt="boyo"></a>
                                    <h2 class="experience_txt">Experience luxury living at its finest with our premier
                                        real estate homes</h2>

                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- profile  Modal -->
<div class="signin_modal">
    <div class="modal fade" id="profile" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
        aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content">
                <!-- <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> -->
                <div class="modal-body">
                    <form action="#">
                        <div class="row">
                            <div class="col-12">
                                <div class="signin_card">
                                    <h6 class="signin-title">My Profile</h6>
                                    <p class="verify">Keep your personal information up-to-date and organized. </p>
                                    <div class="user_profile-box">
                                        <label>
                                            <img src="./assets/imges/profile.png" alt="user profile">
                                            <input type="file" name="">
                                        </label>
                                        <div>
                                            <h6>Upload Profile</h6>
                                            <a class="btn blue_btn" href="#">Browse</a>
                                        </div>
                                    </div>
                                    <div class="signin_card-content">
                                        <div class="row">
                                            <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                                                <div class="input_fild mb-4">
                                                    <label>First Name
                                                    </label>
                                                    <input type="text" class="form-control" placeholder="John">
                                                </div>
                                            </div>
                                            <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                                                <div class="input_fild mb-4">
                                                    <label>Last Name
                                                    </label>
                                                    <input type="text" class="form-control" placeholder="John">
                                                </div>
                                            </div>
                                            <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                                                <div class="input_fild mb-4">
                                                    <label>Email
                                                    </label>
                                                    <input type="email" class="form-control"
                                                        placeholder="Johndoe@gmail.com">
                                                </div>
                                            </div>
                                            <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                                                <div class="input_fild mb-4">
                                                    <label>Mobile Number
                                                    </label>
                                                    <div class="d-flex form-control mobile_no">
                                                        <select class="form-select" aria-label="Default select example">
                                                            <option selected>+1</option>
                                                            <option value="1">+91</option>
                                                            <option value="2">+91</option>
                                                            <option value="3">+91</option>
                                                        </select>
                                                        <input type="text" class="" placeholder="Your number">

                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                                                <div class="input_fild mb-4">
                                                    <label>Date
                                                    </label>
                                                    <div class="Startdate_input">
                                                        <div class="password w-100">
                                                            <input type="date" class="form-control"
                                                                placeholder="25 - 05 - 1990">
                                                            <span><img src="./assets/imges/icons/date.svg"
                                                                    alt="date"></span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                                                <div class="input_fild mb-4">
                                                    <label>Address
                                                    </label>
                                                    <div class="password w-100">
                                                        <input type="text" class="form-control"
                                                            placeholder="4767 Granville Lane Netcong, NJ 07857 ">
                                                        <span><img src="./assets/imges/icons/location.svg"
                                                                alt="location"></span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class=" col-12">
                                                <div class="top_line "></div>
                                            </div>
                                            <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 mt-4">
                                                <a class="btn sign_in w-100" href="#" data-bs-dismiss="modal">Cancel</a>
                                            </div>
                                            <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 mt-4">
                                                <a class="btn blue_btn w-100" href="#"
                                                    data-bs-dismiss="modal">Update</a>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>