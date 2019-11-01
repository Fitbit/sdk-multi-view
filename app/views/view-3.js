import document from "document";
import clock from "clock";

export function initialize( views, { granularity } ){
  console.log("view3 initialize()");

  // Subscribe for clock updates...
  clock.granularity = granularity; // seconds, minutes, hours

  clock.ontick = function(evt) {
    console.log(evt.date.toString());
  };

  let btn = document.getElementById("v3-button");
  
  /**
   * Replace current view with view-2. Back button would still return us to view-1.
   */  
  btn.addEventListener("click", evt => {
    console.log("view-3 Button Clicked!");
    /* Navigate to another screen */
    views.replace("view-2");
  });

  // View init functions can return clean-up functions executed before the view is unloaded.
  // No need to unsubscribe from DOM events, it's done automatically.
  return () => {
    // Unsubscribe from clock.
    clock.granularity = "off";
    clock.ontick = void 0;
  }
}