import React from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { html } from "@codemirror/lang-html";
import { dracula } from "@uiw/codemirror-theme-dracula";

function App(props) {
  const [value, setValue] = React.useState("val");
  const onChange = React.useCallback((val, viewUpdate) => {
    if (props.haveEvent) {
      const event = new CustomEvent(props.eventName, {
        detail: {
          content: val,
        },
      });
      window.dispatchEvent(event);
    }
    setValue(val);
    s;
  }, []);
  return (
    <CodeMirror
      value={props.value}
      extensions={[
        javascript({ jsx: true }),
        html({ autoCloseTags: true, extraTags: true }),
      ]}
      height={props.height}
      onChange={onChange}
      theme={dracula}
      readOnly={props.readonly}
    />
  );
}
export default App;
