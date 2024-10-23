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
                <h2>Properties Categories</h2>
                <p>Discover a range of property categories, including residential and commercial, to suit your needs</p>
            </div>
        </section>
        <section class="Properties_sec px-80 pb-100 mb-400">
            <div class="container-fluid">
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