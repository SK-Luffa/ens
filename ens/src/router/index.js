// import Vue from "vue";
// import Router from "vue-router";
import Homepage from "@/components/HomePage"

import Screen from "@/components/Screen"
// import Details from "@/components/Details/detail"
import Blank from "@/components/Blank"
import Favorites from "@/components/Favorites"
import FolderDetails from "@/components/Favorites/FolderDetails"
// import Shoppingcar from "@/components/Shoppingcar"
import PersonalCenter from "@/components/PersonalCenter"
// import Tipstext from "@/components/BottomNavigation/TipsText"
import User from "@/components/PersonalCenter/User"
import method from "@/components/PersonalCenter/Method"
import OrderForm from "@/components/PersonalCenter/OrderForm"

import Order from "@/components/PersonalCenter/OrderForm/Order"
// import invoice from "@/components/PersonalCenter/OrderForm/Order/invoice"
import Paid from "@/components/PersonalCenter/OrderForm/Paid"
import Contact from "@/components/Contact"
import Fashion from "@/components/Fashion"
import Fashiondetails from "@/components/Fashion/fashiondetails"
import Blog from "@/components/Blog"
import Blogdetails from "@/components/Blog/blogdetails"
import PhotoGallery from "@/components/PhotoGallery"

import About from "@/components/BottomNavigation/xml/About"
import AboutUS from "@/components/BottomNavigation/route/AboutUS"
import ContactUS from "@/components/BottomNavigation/route/ContactUS"
import US from "@/components/BottomNavigation/xml/US"

import FAQ from "@/components/BottomNavigation/xml/FAQ"
import Comparisons from "@/components/BottomNavigation/xml/Comparisons"
import Terms from "@/components/BottomNavigation/xml/Terms"
import Privacy from "@/components/BottomNavigation/xml/Privacy"

import Returns from "@/components/BottomNavigation/xml/Returns"

import Thank from "@/components/Contact/thank"

Vue.use(VueRouter);
export default new VueRouter({
    mode: "history",
    routes: [{
        path: "/",
        name: "home",
        component: Homepage,
    },
    {
        path: "/ContactUS",
        name: "ContactUS",
        component: ContactUS,
    },
        {
            path: "/photoGallery",
            name: "PhotoGallery",
            component: PhotoGallery,
        },
    {
        path: "/Fashion",
        name: "Fashion",
        component: Fashion,
    },
    {
        path: "/fashiondetails",
        name: "Fashiondetails",
        component: Fashiondetails,
    },
        {
            path: "/blog",
            name: "blog",
            component: Blog,
        }, 
          {
              path: "/blogdetails",
              name: "Blogdetails",
              component: Blogdetails,
        },
    {
        path: "/AboutUS",
        name: "AboutUS",
        component: AboutUS,
    },

    {
        path: "/thank",
        name: "thank",
        component: Thank,
    },
    {
        path: "/Privacy",
        name: "Privacy",
        component: Privacy,
    },
    {
        path: "/Terms",
        name: "Terms",
        component: Terms,
    },
    {
        path: "/Returns",
        name: "Returns",
        component: Returns,
    },
    {
        path: "/Comparisons",
        name: "Comparisons",
        component: Comparisons,
    },
    {
        path: "/faq",
        name: "faq",
        component: FAQ,
    },
    {
        path: "/about",
        name: "about",
        component: About,
    },
    {
        path: "/us",
        name: "us",
        component: US,
    },

    // {
    //     path: "/invoice",
    //     name: "invoice",
    //     component: invoice
    // },

    // {
    //     path: "/tipstext",
    //     name: "tipstext",
    //     component: Tipstext
    // },
    {
        path: "/folder",
        name: "folder",
        component: FolderDetails
    },
    {
        path: "/contact",
        name: "contact",
        component: Contact
    },
    {
        path: "/favorites",
        name: "favorites",
        component: Favorites,
    },
    {
        path: "/store",
        name: "store",
        component: Screen,
    },
    // {
    //     path: "/details",
    //     component: Details,
    // },
    {
        path: "/detail/:id",
        name: "detail",
        component: resolve => require(['@/components/Details/detail'], resolve),
    },
    {
        path: "/blank",
        name: "blank",
        component: Blank,
    },
    {
        path: "/shoppingcar",
        name: "shoppingcar",
        component: resolve => require(['@/components/Shoppingcar'], resolve),
        // component: Shoppingcar,
    },
    {
        path: "/personalCenter",
        name: "userParent",
        component: PersonalCenter,
        children: [
            {
                path: "/",
                name: "user",
                component: User,
            },
            {
                path: "/method",
                name: "method",
                component: method,
            },
            {
                path: "/orderForm",
                name: "orderParent",
                component: OrderForm,
                children: [
                    {
                        path: '/',
                        name: "order",
                        component: Order
                    },
                    {
                        path: '/paid',
                        name: "paid",
                        component: Paid
                    }
                ]
            }
        ]
    }
    ],

    scrollBehavior() {
        return {
            x: 0,
            y: 0
        }
    }

})