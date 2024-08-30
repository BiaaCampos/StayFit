<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= $this->title; ?></title>

    <!-- Favicon -->
    <link rel="icon" type="image/x-icon" href="<?= URL ?>public/assets/favstayfit.png">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap" />

    <!-- BOX ICONS -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/boxicons@latest/css/boxicons.min.css">

    <!-- Core theme CSS (includes Bootstrap) -->
    <link rel="stylesheet" href="<?= URL ?>public/css/main.css">

    <!-- Essentail JS2 for Vue  (All components Styles) -->
    <link href="https://cdn.syncfusion.com/ej2/20.1.55/material.css" rel="stylesheet" type="text/css" />
    <link href="<?= URL ?>public/plugins/essentialui/styles/material.min.css" rel="stylesheet">
    <link href="<?= URL ?>public/plugins/fontawesome-free/css/all.css" rel="stylesheet">
    <link href="<?= URL ?>public/mdb/mdb.min.css" rel="stylesheet">
    <link href="<?= URL ?>public/mdb/css/mdb.min.css" rel="stylesheet">
    <?php if (isset($this->css)) {
        foreach ($this->css as $c) {
            echo ("<link href=\"" . URL . "$c\" rel=\"stylesheet\" type=\"text/css\">\n");
        }
    } ?>

    <!-- Vue library file-->
    <script src="https://cdn.jsdelivr.net/npm/vue@2.5.16/dist/vue.min.js" type="text/javascript"></script>
    <!-- Essential JS 2 for Vue  global script -->
    </script>
    <script src="https://cdn.syncfusion.com/ej2/20.1.55/ej2-vue-es5/dist/ej2-vue.min.js" type="text/javascript">
    <script src="<?= URL ?>public/plugins/essentialui/scripts/ej2-vue.min.js" type="text/javascript"></script>
    <script src="<?= URL ?>public/plugins/essentialui/scripts/internationalization/traducaoComponentes.js" type="text/javascript"></script>
    <script src="<?= URL ?>public/plugins/essentialui/scripts/internationalization/currencyData.js" type="text/javascript"></script>
    <script src="<?= URL ?>public/plugins/essentialui/scripts/internationalization/currencies.js" type="text/javascript"></script>
    <script src="<?= URL ?>public/plugins/essentialui/scripts/internationalization/numbers.js" type="text/javascript">
    </script>
    <script src="<?= URL ?>public/plugins/essentialui/scripts/internationalization/languages.js" type="text/javascript">
    </script>
    <script src="<?= URL ?>public/plugins/essentialui/scripts/internationalization/timeZoneNames.js" type="text/javascript"></script>
    <script src="<?= URL ?>public/plugins/essentialui/scripts/internationalization/numberingSystems.js" type="text/javascript"></script>
    <script src="<?= URL ?>public/plugins/essentialui/scripts/internationalization/caGregorian.js" type="text/javascript"></script>
    <script src="<?= URL ?>public/plugins/axios/axios.min.js" type="text/javascript"></script>
    <script src="<?= URL ?>public/dist/js/common.js" type="text/javascript"></script>
    <script src="<?= URL ?>public/mdb/js/mdb.min.js"></script>
    <script src="https://code.jquery.com/jquery-3.6.4.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.6/dist/umd/popper.min.js"></script>

    <script src="https://unpkg.com/vue-slick-carousel@1.0.6"></script>
    <?php
    if (isset($this->js)) {
        foreach ($this->js as $j) {
            echo ("<script src='" . URL . "$j' type='text/javascript'></script>\n");
        }
    } ?>
</head>
<body>
    <!-- Sidebar -->
    <div class="sidebar">
        <ul class="sidebar-menu">
            <li><a href="<?= URL ?>"><img src="public/images/icons-menu/home.svg" alt="" srcset="" class="icones-sidebar"><span>Home</span></a></li>
            <li><a href="<?= URL ?>"><img src="public/images/icons-menu/person.svg" alt="" srcset="" class="icones-sidebar"><span>Perfil</span></a></li>
            <li><a href="<?= URL ?>"><img src="public/images/icons-menu/calendario.svg" alt="" srcset="" class="icones-sidebar"><span>Agendar consulta</span></a></li>
            <li><a href="<?= URL ?>"><img src="public/images/icons-menu/chat.svg" alt="" srcset="" class="icones-sidebar"><span>Chat</span></a></li>
            <li><a href="<?= URL ?>"><img src="public/images/icons-menu/dashboard.svg" alt="" srcset="" class="icones-sidebar"><span>Dashboard</span></a></li>
            <li><a href="<?= URL ?>"><img src="public/images/icons-menu/sair.svg" alt="" srcset="" class="icones-sidebar"><span>Sair</span></a></li>
        </ul>
    </div>
    <nav>
        <div class="pessoa_nav">
            <div class="nome_nav">Nome teste</div>
            <div class="cidade_nav">Marília-SP</div>
        </div>
        <img src="public/images/icons-menu/logopreta.svg" alt="" srcset="" class="icones-sidebar" width="200"/>
    </nav>
    <div id="mainLayout"></div>
    <script>
        const mainLayout = new Vue({
            el: '#mainLayout',
            template: `
            <div>
                <AppVue ref="AppVue"></AppVue>
            </div>
        `,
            data: function() {
                return {
                }
            },
            computed: {
            },
            methods: {
            },
            mounted() {
            },
        })
    </script>

</body>