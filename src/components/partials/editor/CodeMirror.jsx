import React from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { html } from "@codemirror/lang-html";
import { dracula } from "@uiw/codemirror-theme-dracula";

/**
 * This is the react component of CodeMirror editor
 * This is used to make easy code edition when uploading a component
 *
 * @param {*} props
 * @return {CodeMirror}
 */
function App(props) {
  // Declating a state variable with initial value
  const [value, setValue] = React.useState("val");

  // Creating a reactive callback when the component status have a change
  const onChange = React.useCallback((val, viewUpdate) => {
    // Check if we have a event in props
    if (props.haveEvent) {
      // Create a new custom event with the name in eventName prop
      // The event detail contains an object with the content property set to the new value
      const event = new CustomEvent(props.eventName, {
        detail: {
          content: val,
        },
      });
      // Dispatch the custom event to the window object
      window.dispatchEvent(event);
    }
    // Update the state value
    setValue(val);
  }, []);
  // Return the CodeMirror component with the specified props and configuration
  return (
    <CodeMirror
      value={props.value} // Initial value for the editor
      extensions={[
        javascript({ jsx: true }), // JavaScript syntax highlighting
        html({ autoCloseTags: true, extraTags: true }), // HTML syntax highlighting with auto tag closing and use of extratags
      ]}
      height={props.height} // Height of the editor
      onChange={onChange} // Use the onChange callback
      theme={dracula} // Set Dracula theme to editor
      readOnly={props.readonly} // Set editor to read-only mode if we need
    />
  );
}
export default App;
