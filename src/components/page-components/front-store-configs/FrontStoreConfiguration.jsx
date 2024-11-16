// "use client";
// import React, { useEffect, useRef, useState } from "react";
// import grapesjs from "grapesjs";
// import plugin from "grapesjs-tailwind";

// import "grapesjs/dist/css/grapes.min.css";
// export default function FrontStoreConfiguration() {
//   const [editor, setEditor] = useState(null);
//   const editorRef = useRef(null);
//   useEffect(() => {
//     if (!editorRef.current) {
//       const editorInstance = grapesjs.init({
//         container: "#gjs",
//         // ...
//         plugins: [plugin],
//         pluginsOpts: {
//           [plugin]: {
//             /* options */
//           },
//         },
//       });
//     }
//   });
//   return (
//     <div className="GrapeJsEditor">
//       <div id="gjs"></div>
//     </div>
//   );
// }
"use client";
import React, { useEffect, useRef, useState } from "react";
import grapesjs from "grapesjs";
import plugin from "grapesjs-tailwind";
import "grapesjs/dist/css/grapes.min.css";

export default function FrontStoreConfiguration() {
  const [editor, setEditor] = useState(null);
  const editorRef = useRef(null);

  useEffect(() => {
    if (!editorRef.current) {
      const editorInstance = grapesjs.init({
        container: "#gjs",
        plugins: [plugin],
        pluginsOpts: {
          [plugin]: {
            /* options */
          },
        },
      });

      setEditor(editorInstance);
      editorRef.current = editorInstance;
    }

    return () => {
      if (editorRef.current) {
        editorRef.current.destroy();
        editorRef.current = null;
      }
    };
  }, []);

  const saveCode = () => {
    if (editor) {
      const code = editor.getHtml() + "\n" + editor.getCss();
      localStorage.setItem("savedCode", code); // Save code to localStorage
      console.log("Code saved");
    }
  };

  const clearLocalStorage = () => {
    localStorage.removeItem("savedCode"); // Clear saved code
    console.log("Local storage cleared");
  };

  return (
    <div className="GrapeJsEditor">
      <div id="gjs"></div>
      <button onClick={saveCode}>Save Code</button>
      <button onClick={clearLocalStorage}>Clear Local Storage</button>
    </div>
  );
}
