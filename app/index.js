import { init } from "./views";

/**
 * Definition for each view in the resources/views folder, and the associated
 * JavaScript module is lazily loaded alongside its view.
 */
const views = init(
  [
    ["view-1", () => import("./views/view-1")],
    ["view-2", () => import("./views/view-2")],
    ["view-3", () => import("./views/view-3")]
  ],
  "./resources/views/"
);

// Select the first view (view-1) after 1 second
setTimeout(() => {
  views.navigate("view-1");
}, 1000);
