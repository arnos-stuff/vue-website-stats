import * as VueRouter from 'vue-router'

function lazyLoad(view){
    return() => import(`./components/${view}.vue`)
  }

const bgAnimValues = [
    { name: 'globe', component: lazyLoad('BgGlobe'), route: '/gl' },
    { name: 'network', component: lazyLoad('BgNet'), route: '/nt' },
    // topology : { name: 'topology', value: BgTop, route: '/tp' },
    { name: 'trunk', component: lazyLoad('BgTrunk'), route: '/tk' },
]

// const siteRoutes = [
//     {path: '/about', name: 'about', component: lazyLoad('About')},
//     {path: '/contact', name: 'contact', component: lazyLoad('Contact')},
// ]

// const bgAnimRoutes = bgAnimValues.map((item) => {
//     return {
//         path: item.route,
//         name: item.name,
//         component: item.component,
//         children: siteRoutes
//     }
// })

var routes = [
    {
        path: '/',
        name: 'home',
        component: lazyLoad('BgGlobe')}
].concat(bgAnimValues)

const Router = VueRouter.createRouter({
    // Provide the history implementation to use. We are using the hash history for simplicity here.
    history: VueRouter.createWebHashHistory(),
    routes: routes,
  })

export default Router