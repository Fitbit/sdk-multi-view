# sdk-multi-view

SDK example application which demonstrates the usage of multi-view SVG that was
added in Fitbit OS 4.0.

## Structure

`/resources/views/` contains an SVG file for each view in the application.
`/app/views/` contains a JavaScript file for each view in the application.
`/app/index.js` initializes the list of views.

When `views.navigate()` is called, the current view is unloaded and all event
handlers are unregistered. The JavaScript for the selected view is dynamically
loaded, and the document for the selected view is loaded.

The `BACK` button can be used to navigate to the previous view.
