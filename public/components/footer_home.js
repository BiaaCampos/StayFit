Vue.component("footer_home", {
    props: ['tipofooterhome'],
    template: `
        <footer class="footer_home text-center text-lg-start bg-body-tertiary text-muted">
            <!-- Section: Links  -->
            <section class="">
                <div class="container text-center text-md-start mt-5">
                <!-- Grid row -->
                <div class="row mt-3">
                    <!-- Grid column -->
                    <div class="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                    <!-- Content -->
                    <h6 class="text-uppercase fw-bold mb-4">
                        <img src="public/images/icons-menu/logopreta.svg" alt="" srcset="" class="icones-sidebar" width="200">
                    </h6>
                    <p>
                        Sobre a stayfit
                    </p>
                    </div>
                    <!-- Grid column -->

                    <!-- Grid column -->
                    <div class="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                    <!-- Links -->
                    <h6 class="text-uppercase fw-bold mb-4">
                        Institucional
                    </h6>
                    <p>
                        <a href="#!" class="text-reset">Home</a>
                    </p>
                    <p>
                        <a href="#!" class="text-reset">Serviços</a>
                    </p>
                    <p>
                        <a href="#!" class="text-reset">Nutricionistas</a>
                    </p>
                    <p>
                        <a href="#!" class="text-reset">Sobre</a>
                    </p>
                    <p>
                        <a href="#!" class="text-reset">Fale conosco</a>
                    </p>
                    </div>
                    <!-- Grid column -->

                    <!-- Grid column -->
                    <div class="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                    <!-- Links -->
                    <h6 class="text-uppercase fw-bold mb-4">Contato</h6>
                    <p><i class="fas fa-home me-3"></i> Marília - SP</p>
                    <p>
                        <i class="fas fa-envelope me-3"></i>
                        stayfit@gmail.com
                    </p>
                    <p><i class="fas fa-phone me-3"></i> + 55 14 99999-9999</p>
                    </div>
                    <!-- Grid column -->
                </div>
                <!-- Grid row -->
                </div>
            </section>
            <!-- Section: Links  -->

            <!-- Copyright -->
            <div class="text-center p-4">
                © 2024 Copyright:
                <a class="text-reset fw-bold" href="#">StayFit</a>
            </div>
            <!-- Copyright -->
        </footer>`,
    data() {
        return {
        };
    },
    methods: {
    },
    mounted() {
    }
});