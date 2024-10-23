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
            <div class="col-xl-8 col-lg-8 col-md-12 col-sm-12 col-12">
                <div class="fav_view">
                    <h2>List a Property</h2>
                    <p>Easily list properties for rent or sale with 'My Properties,' your all-in-one platform for
                        managing
                        real estate assets, complete with detailed descriptions and status updates.</p>
                </div>
            </div>
        </section>
        <section class="px-80 pb-100 ">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-12">
                        <div class="faq_headline">
                            <h6 class="fs-24 pb-2">Tell us about properties</h6>
                            <p class="Gray">Upgrade your property listings with photos and descriptions</p>
                        </div>
                    </div>
                </div>
                <div class="top_line mt-2 mt-sm-4"></div>
                <div class="row">
                    <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 order-lg-1 order-2">
                        <form action="#" class="contact_form advertise">
                            <div class="row justify-content-center">
                                <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                                    <div class="input_fild mb-4">
                                        <label>Property Name
                                        </label>
                                        <input type="text" class="form-control" placeholder="Your property name">
                                    </div>
                                </div>
                                <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                                    <div class="input_fild mb-4">
                                        <label>Property Name
                                        </label>
                                        <div class="password">
                                            <input type="text" class="form-control" placeholder="Your property name">
                                            <span><img src="assets/imges/icons/location.svg" alt="location"></span>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                                    <div class="input_fild mb-4">
                                        <label>What do you want?(Rent/Sale)
                                        </label>
                                        <select class="form-select form-control" aria-label="Default select example">
                                            <option selected>Sale</option>
                                            <option value="1">Sale</option>
                                            <option value="2">Sale</option>
                                            <option value="3">Sale</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                                    <div class="input_fild mb-4">
                                        <label>Property Type
                                        </label>
                                        <select class="form-select form-control" aria-label="Default select example">
                                            <option selected>Apartment</option>
                                            <option value="1">Apartment</option>
                                            <option value="2">Apartment</option>
                                            <option value="3">Apartment</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-12">
                                    <div class="input_fild mb-4">
                                        <label>About Property
                                        </label>
                                        <textarea name="" id="" cols="10" rows="5" placeholder="Your bio" class="form-control"></textarea>
                                    </div>
                                </div>
                                <div class="col-12">
                                    <div class="input_fild mb-4">
                                        <label>Property Price
                                        </label>
                                        <input type="text" class="form-control" placeholder="Your property Price">
                                    </div>
                                </div>
                            </div>
                            <div class="row mt-3">
                                <div class="col-12 d-flex justify-content-between align-items-sm-center flex-column flex-sm-row">
                                    <div class="faq_headline">
                                        <h6 class="fs-24 pb-2">Properties Amenities</h6>
                                        <p class="Gray">add your properties Amenities</p>
                                    </div>
                                    <a class="btn blue_btn mt-3 mt-sm-0" href="#add_box" data-bs-toggle="modal"><i class="fa-solid fa-plus me-1"></i> Add</a>
                                </div>
                                <div class="col-12">
                                    <ul class="facilities_list_card">
                                        <li class="mb-3">
                                            <div class="facilities_item">
                                                <p class="d-flex"><img src="./assets/imges/icons/area.svg" alt="area icon" class="me-2">Plot Area
                                                </p>
                                                <span>: 1230 Sq.fit</span>
                                            </div>
                                            <i class="fa-solid fa-xmark"></i>
                                        </li>
                                        <li class="mb-3">
                                            <div class="facilities_item">
                                                <p class="d-flex"><img src="./assets/imges/icons/parking.svg" alt="parking" class="me-2">Parking
                                                </p>
                                                <span>: 2 Car Attached Garag </span>
                                            </div>
                                            <i class="fa-solid fa-xmark"></i>
                                        </li>
                                        <li class="mb-3">
                                            <div class="facilities_item">
                                                <p class="d-flex"><img src="./assets/imges/icons/bedroom.svg" alt="bedroom" class="me-2">Bedroom
                                                </p>
                                                <span>: 3</span>
                                            </div>
                                            <i class="fa-solid fa-xmark"></i>
                                        </li>
                                        <li class="mb-3">
                                            <div class="facilities_item">
                                                <p class="d-flex"><img src="./assets/imges/icons/wass.svg" alt="wass icon" class="me-2">Bathroom
                                                </p>
                                                <span>: 2</span>
                                            </div>
                                            <i class="fa-solid fa-xmark"></i>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div class="row mt-3">
                                <div class="col-12 d-flex justify-content-between align-items-sm-center flex-column flex-sm-row">
                                    <div class="faq_headline">
                                        <h6 class="fs-24 pb-2">Properties Amenities</h6>
                                        <p class="Gray">add your properties Amenities</p>
                                    </div>
                                    <a class="btn blue_btn mt-3 mt-sm-0" href="#add_box-two" data-bs-toggle="modal"><i class="fa-solid fa-plus me-1"></i> Add</a>
                                </div>
                                <div class="col-12">
                                    <div class="row">
                                        <div class="col-xl-4 col-lg-6 col-md-4 col-sm-6 col-6">
                                            <ul class="facilities_list_card gym_box">
                                                <li class="mb-3 border-0">
                                                    <div class="facilities_item">
                                                        <p class="d-flex dark "><img src="./assets/imges/icons/gym.svg" alt="gym" class="me-1">Gymnasium
                                                        </p>
                                                    </div>
                                                    <i class="fa-solid fa-xmark"></i>
                                                </li>
                                            </ul>
                                        </div>
                                        <div class="col-xl-4 col-lg-6 col-md-4 col-sm-6 col-6">
                                            <ul class="facilities_list_card gym_box">
                                                <li class="mb-3 border-0">
                                                    <div class="facilities_item">
                                                        <p class="d-flex dark "><img src="./assets/imges/icons/gym.svg" alt="gym" class="me-1">Gymnasium
                                                        </p>
                                                    </div>
                                                    <i class="fa-solid fa-xmark"></i>
                                                </li>
                                            </ul>
                                        </div>
                                        <div class="col-xl-4 col-lg-6 col-md-4 col-sm-6 col-6">
                                            <ul class="facilities_list_card gym_box">
                                                <li class="mb-3 border-0">
                                                    <div class="facilities_item">
                                                        <p class="d-flex dark "><img src="./assets/imges/icons/gym.svg" alt="gym" class="me-1">Gymnasium
                                                        </p>
                                                    </div>
                                                    <i class="fa-solid fa-xmark"></i>
                                                </li>
                                            </ul>
                                        </div>
                                        <div class="col-xl-4 col-lg-6 col-md-4 col-sm-6 col-6">
                                            <ul class="facilities_list_card gym_box">
                                                <li class="mb-3 border-0">
                                                    <div class="facilities_item">
                                                        <p class="d-flex dark "><img src="./assets/imges/icons/gym.svg" alt="gym" class="me-1">Gymnasium
                                                        </p>
                                                    </div>
                                                    <i class="fa-solid fa-xmark"></i>
                                                </li>
                                            </ul>
                                        </div>
                                        <div class="col-xl-4 col-lg-6 col-md-4 col-sm-6 col-6">
                                            <ul class="facilities_list_card gym_box">
                                                <li class="mb-3 border-0">
                                                    <div class="facilities_item">
                                                        <p class="d-flex dark "><img src="./assets/imges/icons/gym.svg" alt="gym" class="me-1">Gymnasium
                                                        </p>
                                                    </div>
                                                    <i class="fa-solid fa-xmark"></i>
                                                </li>
                                            </ul>
                                        </div>
                                        <div class="col-xl-4 col-lg-6 col-md-4 col-sm-6 col-6">
                                            <ul class="facilities_list_card gym_box">
                                                <li class="mb-3 border-0">
                                                    <div class="facilities_item">
                                                        <p class="d-flex dark "><img src="./assets/imges/icons/gym.svg" alt="gym" class="me-1">Gymnasium
                                                        </p>
                                                    </div>
                                                    <i class="fa-solid fa-xmark"></i>
                                                </li>
                                            </ul>
                                        </div>
                                        <div class="col-xl-4 col-lg-6 col-md-4 col-sm-6 col-6">
                                            <ul class="facilities_list_card gym_box">
                                                <li class="mb-3 border-0">
                                                    <div class="facilities_item">
                                                        <p class="d-flex dark "><img src="./assets/imges/icons/gym.svg" alt="gym" class="me-1">Gymnasium
                                                        </p>
                                                    </div>
                                                    <i class="fa-solid fa-xmark"></i>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>

                    <div class="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 order-lg-2 order-1 contact_form">
                        <h2 class="headline_txt text-start mb-3">Properties Photos</h2>
                        <div class="uplod_vedio_card">
                            <label class="uplod-img">
                                <i class="fa-solid fa-plus me-1"></i>
                                <input type="file" name="">
                            </label>
                            <p>Upload properties photos or videos</p>
                        </div>
                        <div class="row">
                            <div class="col-xl-4 col-lg-6 col-md-4 col-sm-6 col-6">
                                <div class="property_img_cards">
                                    <div class="property_img">
                                        <img src="./assets/imges/place/place-6.png" alt="place">
                                    </div>
                                    <a href="#" class="delete_place"><img src="./assets/imges/icons/whitw-delete.svg" alt="delete"></a>
                                    <div class="gradient-overlay"></div>
                                </div>
                            </div>
                            <div class="col-xl-4 col-lg-6 col-md-4 col-sm-6 col-6">
                                <div class="property_img_cards">
                                    <div class="property_img">
                                        <img src="./assets/imges/place/place-7.png" alt="place">
                                    </div>
                                    <a href="#" class="delete_place"><img src="./assets/imges/icons/whitw-delete.svg" alt="delete"></a>
                                    <div class="gradient-overlay"></div>
                                </div>
                            </div>
                            <div class="col-xl-4 col-lg-6 col-md-4 col-sm-6 col-6">
                                <div class="property_img_cards">
                                    <div class="property_img">
                                        <img src="./assets/imges/place/place-7.png" alt="place">
                                    </div>
                                    <a href="#" class="delete_place"><img src="./assets/imges/icons/whitw-delete.svg" alt="delete"></a>
                                    <div class="gradient-overlay"></div>
                                </div>
                            </div>
                            <div class="col-xl-4 col-lg-6 col-md-4 col-sm-6 col-6">
                                <div class="property_img_cards">
                                    <div class="property_img">
                                        <img src="./assets/imges/place/place-6.png" alt="place">
                                    </div>
                                    <a href="#" class="delete_place"><img src="./assets/imges/icons/whitw-delete.svg" alt="delete"></a>
                                    <div class="gradient-overlay"></div>
                                </div>
                            </div>
                            <div class="col-xl-4 col-lg-6 col-md-4 col-sm-6 col-6">
                                <div class="property_img_cards">
                                    <div class="property_img">
                                        <img src="./assets/imges/place/place-7.png" alt="place">
                                    </div>
                                    <a href="#" class="delete_place"><img src="./assets/imges/icons/whitw-delete.svg" alt="delete"></a>
                                    <div class="gradient-overlay"></div>
                                </div>
                            </div>
                            <div class="col-xl-4 col-lg-6 col-md-4 col-sm-6 col-6">
                                <div class="property_img_cards">
                                    <div class="property_img">
                                        <img src="./assets/imges/place/place-7.png" alt="place">
                                    </div>
                                    <a href="#" class="delete_place"><img src="./assets/imges/icons/whitw-delete.svg" alt="delete"></a>
                                    <div class="gradient-overlay"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 order-lg-3 order-3">
                        <div class="top_line mt-2 mt-sm-4"></div>
                        <div class="row justify-content-md-end">
                            <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                                <div class="row">
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 mt-3 mt-md-4">
                                        <a class="btn sign_in w-100" href="#">Cancel</a>
                                    </div>
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 mt-3 mt-md-4">
                                        <a class="btn blue_btn w-100" href="my-properties.php">Add</a>
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

    <!--  Modal -->
    <div class="signin_modal">
        <div class="modal fade" id="add_box" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    <div class="modal-body">
                        <form action="#">
                            <div class="row">
                                <div class="col-12 p-0">
                                    <div class="signin_card">
                                        <h6 class="signin-title">Properties attribute</h6>
                                        <div class="signin_card-content">
                                            <div class="input_fild mb-4">
                                                <label>Attribute Type
                                                </label>
                                                <select class="form-select form-control" aria-label="Default select example">
                                                    <option selected="">Other</option>
                                                    <option value="1">One</option>
                                                    <option value="2">Two</option>
                                                    <option value="3">Three</option>
                                                </select>
                                            </div>
                                            <div class="input_fild mb-4">
                                                <label>Properties attribute name
                                                </label>
                                                <input type="text" class="form-control" placeholder="Enter attribute name">
                                            </div>
                                            <div class="input_fild mb-4">
                                                <label>Attribute Values
                                                </label>
                                                <input type="text" class="form-control" placeholder="Enter values">
                                            </div>
                                            <a class="btn blue_btn w-100" href="#">Add</a>
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

    <!--  Modal -->
    <div class="signin_modal">
        <div class="modal fade" id="add_box-two" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    <div class="modal-body">
                        <form action="#">
                            <div class="row">
                                <div class="col-12 p-0">
                                    <div class="signin_card">
                                        <h6 class="signin-title">Properties Amenities</h6>
                                        <div class="signin_card-content">
                                            <div class="input_fild mb-4">
                                                <label>Select Amenities
                                                </label>
                                                <select class="form-select form-control" aria-label="Default select example">
                                                    <option selected="">Other</option>
                                                    <option value="1">One</option>
                                                    <option value="2">Two</option>
                                                    <option value="3">Three</option>
                                                </select>
                                            </div>
                                            <div class="input_fild mb-4">
                                                <label>Enter amenities name
                                                </label>
                                                <input type="text" class="form-control" placeholder="Enter attribute name">
                                            </div>
                                            <a class="btn blue_btn w-100" href="#">Add</a>
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
    
</body>

</html>