import { createRouter, createWebHistory } from "vue-router";
import EditorView from "@/views/editor/index.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/editor",
    },
    {
      path: "/editor",
      name: "Editor",
      component: EditorView,
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue'),
    // },

    // pathMatch is the name of the param, e.g., going to /not/found yields
    // { params: { pathMatch: ['not', 'found'] }}
    // this is thanks to the last *, meaning repeated params and it is necessary if you
    // plan on directly navigating to the not-found route using its name
    {
      path: "/:pathMatch(.*)*",
      name: "not-found",
      redirect: "/home",
    },
    // if you omit the last `*`, the `/` character in params will be encoded when resolving or pushing
    {
      path: "/:pathMatch(.*)",
      name: "bad-not-found",
      redirect: "/home",
    },
  ],
});

export default router;
