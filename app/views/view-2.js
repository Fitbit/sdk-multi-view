import document from "document";

export function initialize( views ){
  console.log("view-2 initialize()");

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