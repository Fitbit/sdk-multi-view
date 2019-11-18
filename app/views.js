/**
 * A basic module to simplify navigation within multi-view applications.
 */
import document from "document";

/**
 * @param {string} _prefix The folder name where the view files reside.
 * Initialize the views module with views from a specific folder.
 * @param {Object} _views An map of view names to an associated JavaScript `import()`.
 */

let _views;
let _unmount;
let _history = [];
let _options = [];
let _currentOptions;

const viewport = {
  initialize( views ) {
    _views = views;
  },

  // Currently selected view name.
  current : null,

  // Global context shared across all views.
  context : {},

  /**
   * Navigate to a specific view using its view name.
   * @param {string} viewName The name of a .gui file, excluding its path or file extension.
   * @param {object} options Object with options to be passed to view's initialize() function.
   */
  replace( viewName, options ){
    if( _unmount ){
      _unmount();
    }
    
    _views[ viewName ]()
      .then(({ initialize }) => {
        document.replaceSync(`./resources/views/${viewName}.gui`);
        
        if( _history.length ){
          document.addEventListener( "keypress", evt => {
            if( evt.key === "back"){
              evt && evt.preventDefault();
              viewport.back( evt );
            }
          });  
        }

        viewport.current = viewName;
        _currentOptions = options;
        _unmount = initialize( viewport, options );
      })
      .catch( e => {
        console.error( e );
        console.error(`Failed to load view JS: ${viewName}`);
      });
  },

  /** Open the view as subview, so back button can be used to navigate back */
  open( viewName, options ){
    _history.push( this.current );
    _options.push( _currentOptions );

    viewport.replace( viewName, options );
  },

  /** If view was opened with views.open(), close it and navigate to the previous view */
  back(){
    viewport.replace( _history.pop(), _options.pop() );
  }
}

export default viewport;