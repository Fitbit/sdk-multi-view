# sdk-multi-view

SDK example application which demonstrates the usage of multi-view SVG that was
added in Fitbit OS 4.0.

## Structure

`/resources/views/` contains an SVG file for each view in the application.
`/app/views/` contains a JavaScript file for each view in the application.
`/app/index.js` initializes the list of views.

When `views.replace()` or `views.open()` is called, the current view is unloaded and all UI event
handlers are unregistered. The JavaScript for the selected view is dynamically
loaded, and the document for the selected view is loaded. 

The `BACK` button can be used to navigate to the previous view.

## Viewport

Viewport is an object which knows the view names and able to switch between them.

View is a JS module in `app/views` folder having exported `initialize()` method. View is loaded dynamically when it's shown and unloaded when it's replaced with another view.

#### views.initialize()

Initialize views linking view names with JS controller modules.
View name must correspond to a file name in `resources/views` folder excluding `.gui` extension.

```javascript
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
```

#### views.replace( name, options )

Replace the currently displayed view with another view of the given name. Optionally, pass options to view's `initialize()` function.

Old views will automatically unsubscribe from all UI event handlers, but not the handlers from sensors and clock. You will need to do the latter in view's clean-up function optionally returned by view's `initialize()`.

#### views.open( name, options )

Works similar to `views.replace()`, but open another view on top of the existing one, so the `back` button will open the previous view.

#### views.back()

If view was opened with `views.open()`, return to the parent view. Works similar to hardware `back` button.

#### views.current

The name of the currently displayed view.

#### views.context

Global context object available for all views to share information between them. Initially it is empty.

This object can be handy as Fitbit OS doesn't have modules cache thus storing globals in modules won't work. Each dynamically loaded view will load its own instance of the module.

## Views

#### initialize( views, options )

Any view module must export initialize function this function takes viewport as its first argument, and an optional `options` object passed to `views.replace()` or `views.open()`.

All view logic like events subscribption must be placed inside of initialize.

```javascript
import document from "document";

export function initialize( views ){
  /**
   * When this view is mounted, setup elements and events.
   */
  const btn = document.getElementById("v2-button");

  /**
   * Sample button click with navigation.
   */
  btn.addEventListener("click", evt => {
    console.log("view-2 Button Clicked!");
    /* Navigate to another screen */
    views.replace("view-3", { granularity : "seconds" });
  });
}
```

`initialize()` may return the clean-up function to unsubscribe from the sensors and clock when the view is closed.

```javascript
import document from "document";
import clock from "clock";

export function initialize( views, { granularity } ){
  // Subscribe for clock updates...
  clock.granularity = granularity; // seconds, minutes, hours

  clock.ontick = function(evt) {
    console.log(evt.date.toString());
  };

  ...

  // View init functions can return clean-up functions executed before the view is unloaded.
  // No need to unsubscribe from DOM events, it's done automatically.
  return () => {
    // Unsubscribe from clock.
    clock.granularity = "off";
    clock.ontick = void 0;
  }
}
```