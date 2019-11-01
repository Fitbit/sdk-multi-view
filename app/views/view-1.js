import document from "document";

/**
 * View module must export initialize() function.
 * @param {*} views - the global viewport object used to perform navigation between views.
 * @param {*} options - optional parameter passed to `views.replace( options )` or `views.open( options )` call
 */
export function initialize( views, options ){
  console.log("view-1 init()");

  const btn2 = document.getElementById("v2-button");
  
  /**
   * Open view-2 as subview. `views.open()` enables "back" button in subview.
   */
  btn2.addEventListener( "click", evt => {
    console.log("view-1 Button Clicked!");
    /* Navigate to another screen */
    views.open("view-2");
  } );

  const btn3 = document.getElementById("v3-button");
  
  /**
   * Open view-2 as subview and pass granularity as a parameter.
   */
  btn3.addEventListener( "click", evt => {
    console.log("view-1 Button Clicked!");
    /* Navigate to another screen */
    views.open("view-3", { granularity : "seconds" });
  } );
}
