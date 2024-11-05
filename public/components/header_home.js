Vue.component("header_home", {
    props: ['tipoheaderhome'],
    template: `
        <header>
            <div class="navbar_home">
                <a href="/">
                    <img src="public/images/icons-menu/logopreta.svg" alt="" srcset="" class="icones-sidebar" width="200">
                </a>
                <ul class="nav-links">
                    <li><a href="#home">Home</a></li>
                    <li><a href="#servicos">Serviços</a></li>
                    <li><a href="#nutricionistas">Nutricionistas</a></li>
                    <li><a href="#sobre">Sobre</a></li>
                    <li><a href="#faleconosco">Fale conosco</a></li>
                </ul>
                <div class="auth-buttons">
                    <a href="login" class="register">Entrar/Cadastrar</a>
                </div>
                <div class="menu-toggle" @click="toggleMenu">
                    <img src="public/images/icons-menu/menu_icon.svg" alt="" srcset="" class="icones-sidebar" width="35">
                </div>
            </div>

            <div class="mobile-menu" id="mobileMenu">
                <div class="close-icon" @click="toggleMenu">✖</div>
                <ul>
                    <li><a href="#home">Home</a></li>
                    <li><a href="#servicos">Serviços</a></li>
                    <li><a href="#nutricionistas">Nutricionistas</a></li>
                    <li><a href="#sobre">Sobre</a></li>
                    <li><a href="#faleconosco">Fale conosco</a></li>
                </ul>
                <div class="mobile-auth-buttons">
                    <button class="login" @click="toggleMenu">Entrar</button>
                    <button class="register" @click="toggleMenu">Cadastre-se</button>
                </div>
            </div>
        </header>`,
    data() {
        return {
            menuVisible: false
        };
    },
    methods: {
        toggleMenu() {
            this.menuVisible = !this.menuVisible;
            const menu = document.getElementById('mobileMenu');
            menu.style.display = this.menuVisible ? 'flex' : 'none';
        },
    },
    mounted() {
        console.log('oi')
        const menu = document.getElementById('mobileMenu');
        menu.style.display = 'none';
    }
});