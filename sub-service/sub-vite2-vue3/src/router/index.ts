const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("../views/Home.vue")
  }
];

export default routes;
