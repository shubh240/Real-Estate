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
                <h2>Create Property Advertisement</h2>
                <p>Attract buyers or renters easily with simple, attention-grabbing property ads, showing off what makes
                    each listing unique.</p>
            </div>
        </section>
        <section class="advertise_sec px-80 pb-100 ">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-12">
                        <div class="faq_headline">
                            <h6 class="fs-24 pb-2">How would you like to advertise your property?</h6>
                        </div>
                    </div>
                    <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                        <div class="row">
                            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12 mt-2 mt-sm-0">
                                <a href="create-property-advertisement.php">
                                    <div class="gender d-flex align-items-center  active">
                                        <div class="form-check">
                                            <input class="form-check-input" type="radio" name="flexRadioDefault"
                                                id="flexRadioDefault1" checked>
                                        </div>
                                        <p class="m-0">General Listing</p>
                                    </div>
                                </a>
                            </div>
                            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12 mt-2 mt-sm-0">
                                <a href="createproperty-advertisement.php">
                                    <div class="gender d-flex align-items-center">
                                        <div class="form-check ">
                                            <input class="form-check-input" type="radio" name="flexRadioDefault"
                                                id="flexRadioDefault2">
                                        </div>
                                        <p class="m-0">Advertise on Landing Page</p>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="top_line mt-2 mt-sm-4"></div>
                <div class="row">
                    <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 order-lg-1 order-2">
                        <form action="#" class="contact_form advertise">
                            <div class="row justify-content-center">
                                <div class="col-12">
                                    <div class="input_fild mb-4">
                                        <label>Select your property
                                        </label>
                                        <select class="form-select form-control" aria-label="Default select example">
                                            <option selected>Select your property</option>
                                            <option value="1">One</option>
                                            <option value="2">Two</option>
                                            <option value="3">Three</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6">
                                    <div class="input_fild mb-4">
                                        <label>Start Date & Time
                                        </label>
                                        <div class="Startdate_input">
                                            <div class="password w-100">
                                                <input type="date" class="form-control" placeholder="Select date">
                                                <span><img src="./assets/imges/icons/date.svg" alt="date"></span>
                                            </div>
                                            <div class="password w-100">
                                                <input type="time" class="form-control" placeholder="Select date">
                                                <span><img src="./assets/imges/icons/date.svg" alt="date"></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6">
                                    <div class="input_fild mb-4">
                                        <label>Start Date & Time
                                        </label>
                                        <div class="Startdate_input">
                                            <div class="password w-100">
                                                <input type="date" class="form-control" placeholder="Select date">
                                                <span><img src="./assets/imges/icons/date.svg" alt="date"></span>
                                            </div>
                                            <div class="password w-100">
                                                <input type="time" class="form-control" placeholder="Select date">
                                                <span><img src="./assets/imges/icons/date.svg" alt="date"></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-12">
                                    <div class="input_fild mb-4">
                                        <label>Select Place (1 to 5)
                                        </label>
                                        <select class="form-select form-control" aria-label="Default select example">
                                            <option selected>25 - 40</option>
                                            <option value="1">25 - 40</option>
                                            <option value="2">25 - 40</option>
                                            <option value="3">25 - 40</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-12">
                                    <div class="row mb-4">
                                        <div class="col-12">
                                            <div class="input_fild">
                                                <label>Select Gender
                                                </label>
                                            </div>
                                        </div>
                                        <div class="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-6">
                                            <div class="gender d-flex align-items-center mb-4">
                                                <div class="form-check ps-0">
                                                    <input class="form-check-input m-0" type="radio"
                                                        name="flexRadioDefault" id="flexRadioDefault2" checked>
                                                </div>
                                                <p class="m-0">All</p>
                                            </div>
                                        </div>
                                        <div class="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-6">
                                            <div class="gender d-flex align-items-center mb-4">
                                                <div class="form-check ps-0">
                                                    <input class="form-check-input m-0" type="radio"
                                                        name="flexRadioDefault" id="flexRadioDefault2" checked>
                                                </div>
                                                <p class="m-0">Male</p>
                                            </div>
                                        </div>
                                        <div class="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-6">
                                            <div class="gender d-flex align-items-center ">
                                                <div class="form-check ps-0">
                                                    <input class="form-check-input m-0" type="radio"
                                                        name="flexRadioDefault" id="flexRadioDefault2" checked>
                                                </div>
                                                <p class="m-0">Female</p>
                                            </div>
                                        </div>
                                        <div class="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-6">
                                            <div class="gender d-flex align-items-center">
                                                <div class="form-check ps-0">
                                                    <input class="form-check-input m-0" type="radio"
                                                        name="flexRadioDefault" id="flexRadioDefault2" checked>
                                                </div>
                                                <p class="m-0">Other</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 order-lg-2 order-1">
                        <div class="contact_img">
                            <h2 class="headline_txt text-start mb-3"> Sinomen Studio Palace.</h2>
                            <img src="./assets/imges/place/place-5.png" alt="place" class=" img-fluid">
                        </div>
                    </div>
                    <div class="col-12 order-lg-3 order-3">
                        <div class="top_line mt-2 mt-sm-4"></div>
                        <div class="row">
                            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 mt-3 mt-md-4">
                                <div class="price">
                                    <h6>$ 560</h6>
                                    <p>Approx Estimation Price</p>
                                </div>
                            </div>
                            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                                <div class="row">
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 mt-3 mt-md-4">
                                        <a class="btn sign_in w-100" href="property-advertisement.php">Cancel</a>
                                    </div>
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 mt-3 mt-md-4">
                                        <a class="btn blue_btn w-100" href="#pay" data-bs-toggle="modal">Continue &
                                            Pay</a>
                                    </div>
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
    <!-- ===================================================modal strat========================================== -->

    <!-- sign in Modal -->
    <div class="signin_modal">
        <div class="modal fade" id="pay" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
            aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-lg">
                <div class="modal-content">
                    <!-- <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> -->
                    <div class="modal-body">
                        <form action="#">
                            <div class="row">
                                <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 p-0">
                                    <div class="signin_card">
                                        <h2 class="headline_txt text-start fs-24"> Sinomen Studio Palace.</h2>
                                        <p class="card-text"><img src="assets/imges/icons/location.svg" alt="location"
                                                class="me-1">
                                            <span class="Gray">Targeted Location :</span> Newyork, USA
                                        </p>
                                        <div class="contact_img">
                                            <img src="./assets/imges/place/place-5.png" alt="place" class=" img-fluid">
                                            <div class="price text-center mt-3">
                                                <h6>$ 560</h6>
                                                <p>Final Price</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 p-0">
                                    <div class="signin_card">
                                        <h6 class="signin-title">Payment Info</h6>
                                        <p class="verify">Add your card details to complete subscription </p>
                                        <div class="signin_card-content">
                                            <div class="input_fild mb-4">
                                                <label>Card Number
                                                </label>
                                                <input type="text" class="form-control" placeholder="Your card number">
                                            </div>
                                            <div class="input_fild mb-4">
                                                <label>Name on card
                                                </label>
                                                <input type="text" class="form-control" placeholder="Your name on card">
                                            </div>
                                            <div class="row">
                                                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                                    <div class="input_fild mb-4">
                                                        <label>Start Date & Time
                                                        </label>
                                                        <div class="Startdate_input">
                                                            <div class="password w-100">
                                                                <input type="date" class="form-control"
                                                                    placeholder="Select date">
                                                                <span><img src="./assets/imges/icons/date.svg"
                                                                        alt="date"></span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                                                    <div class="input_fild mb-4">
                                                        <label>CVV
                                                        </label>
                                                        <input type="text" class="form-control" placeholder="Your CVV">
                                                    </div>
                                                </div>
                                            </div>
                                            <a class="btn blue_btn w-100" href="#successfully_box"
                                                data-bs-toggle="modal">Confirm & Pay</a>
                                            <a class="btn sign_in w-100 mt-3" href="#">Cancel</a>
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
                                    <p class="verify mb-3">The property advertisement has been
                                        completed successfully.</p>
                                    <a class="btn blue_btn w-100" href="property-advertisement.php">Ok</a>
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