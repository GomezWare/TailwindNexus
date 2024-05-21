import React from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { html } from "@codemirror/lang-html";
import { dracula } from "@uiw/codemirror-theme-dracula";

function App(props) {
  const [value, setValue] = React.useState(
    `console.log('hello world!');console.log('hello world!');console.log('hello world!');console.log('hello world!);`
  );
  const onChange = React.useCallback((val, viewUpdate) => {
    console.log("val:", val);
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
