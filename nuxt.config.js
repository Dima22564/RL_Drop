
module.exports = {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#00bbff' },
  /*
  ** Global CSS
  */
  css: [
    'vue-material-design-icons/styles.css',
    '@/theme/main.sass',
    '@/theme/_mix.sass',
    'node_modules/slick-carousel/slick/slick.css',
    'vue-multiselect/dist/vue-multiselect.min.css',
    'bootstrap/dist/css/bootstrap.css',
    'bootstrap-vue/dist/bootstrap-vue.css',
    'vue2-dropzone/dist/vue2Dropzone.min.css'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    {
      src: '@/plugins/slick',
      ssr: false
    },
    {
      src: '@/plugins/slide-bar',
      ssr: false
    },
    {
      src: '@/plugins/kinesis',
      ssr: false
    },
    {
      src: '@/plugins/dropzone',
      ssr: false
    },
    '@/plugins/multi-select',
    '@/plugins/circle-bar',
    '@/plugins/my-components',
    '@/plugins/vuebar',
    '@/plugins/vuelidate',
    '@/plugins/axios',
    {
      src: '@/plugins/apexCharts',
      ssr: false
    },
    {
      src: '@/plugins/laravel-echo',
      ssr: false
    },
    {
      src: '@/plugins/socket',
      ssr: false
    },
    {
      src: '@/plugins/swiper',
      ssr: false
    }
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://bootstrap-vue.js.org
    'bootstrap-vue/nuxt',
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    ['nuxt-i18n', {
      detectBrowserLanguage: {
        useCookie: true,
        cookieKey: 'i18n_redirected',
        alwaysRedirect: true,
        fallbackLocale: 'en',
        seo: true
      },
      pages: {
        craft: {
          ru: '/craft',
          en: '/craft'
        },
        faq: {
          ru: '/faq',
          en: '/faq'
        },
        case: {
          ru: '/кейс',
          en: '/case'
        },
        dashboard: {
          ru: '/dashboard',
          en: '/dashboard'
        },
        settings: {
          ru: '/крафт',
          en: '/settings'
        },
        'sign-in': {
          ru: '/sign-in',
          en: '/sign-in'
        },
        'sign-up': {
          ru: '/sign-up',
          en: '/sign-up'
        }
      },
      locales: [
        {
          name: 'Russian',
          code: 'ru',
          iso: 'RU',
          file: 'ru-RU.js'
        },
        {
          name: 'English',
          code: 'en',
          iso: 'ENG',
          file: 'en-US.js'
        }
      ],
      lazy: true,
      langDir: 'lang/',
      defaultLocale: 'ru'
    }]
  ],
  // 'bootstrapVue': {
  //   componentPlugins: [
  //     'LayoutPlugin',
  //     'SidebarPlugin'
  //   ]
  // },
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    // baseURL: 'http://localhost/rl-drop/public/api'
    // baseURL: 'https://laravel-drlw.frb.io/api'
    baseURL: 'http://127.0.0.1:8000/api'
    // baseURL: 'http://91.247.36.216/api'
    // baseURL: 'rldrop-api.2x2m.ru/api'
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extractCSS: true,
    filenames: {
      css: ({ isDev }) => isDev ? '[name].css' : '[name].css'
    },
    transpile: ['vue-agile', 'vue-echarts', 'resize-detector'],
    extend (config, ctx) {
    }
  }
}
