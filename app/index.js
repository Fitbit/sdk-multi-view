import views from "./views";

/**
 * Definition for each view in the resources/views folder, and the associated
 * JavaScript module is lazily loaded alongside its view.
 */
views.initialize({
  'view-1' : () => import("./views/view-1"),
  'view-2' : () => import("./views/view-2"),
  'view-3' : () => import("./views/view-3")
});

setTimeout( () => {
  // Initialize application loading the first view.
  views.replace("view-1");
}, 1000 );

