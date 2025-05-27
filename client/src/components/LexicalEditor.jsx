import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { $getRoot } from "lexical";
import ToolbarPlugin from "./ToolbarPlugin"; // Import the toolbar

const theme = {
  paragraph: "mb-2",
  text: {
    bold: "font-bold",
    italic: "italic",
    underline: "underline",
  },
};

const LexicalEditor = ({ onChange }) => {
  const initialConfig = {
    namespace: "MyEditor",
    theme,
    onError: (error) => console.error(error),
  };

  const handleEditorChange = (editorState) => {
    editorState.read(() => {
      const content = $getRoot().getTextContent(); // extract plain text
      onChange(content); // pass content to parent
    });
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className="w-full p-3 bg-white rounded-md border border-gray-300 shadow-sm">
        <ToolbarPlugin />

        <RichTextPlugin
          contentEditable={<ContentEditable className="outline-none min-h-[150px] p-3" />}
          placeholder={<div className="text-gray-400 p-3">Write something amazing...</div>}
        />

        <HistoryPlugin />

        <OnChangePlugin onChange={handleEditorChange} />
      </div>
    </LexicalComposer>
  );
};

export default LexicalEditor;
/*import { useEffect, useRef } from "react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $getRoot } from "lexical";
import ToolbarPlugin from "./ToolbarPlugin";

const theme = {
  paragraph: "mb-2",
  text: {
    bold: "font-bold",
    italic: "italic",
    underline: "underline",
  },
};

function EditorInitializer({ value }) {
  const [editor] = useLexicalComposerContext();
  const didInit = useRef(false);

      useEffect(() => {
      if (value && !didInit.current) {
        let parsed;
        try {
          parsed = JSON.parse(value);

          // Extra safety check: make sure it looks like a Lexical state
          if (!parsed || typeof parsed !== "object" || !parsed.root) {
            throw new Error("Invalid Lexical state shape");
          }

          editor.update(() => {
            const editorState = editor.parseEditorState(parsed);
            editor.setEditorState(editorState);
          });
          didInit.current = true;
        } catch (err) {
          console.error("Failed to parse editor state:", err);
        }
      }
    }, [editor, value]);
  {/*useEffect(() => {
    if (value && !didInit.current) {
      try {
        const parsed = JSON.parse(value);
        editor.update(() => {
          const editorState = editor.parseEditorState(parsed);
          editor.setEditorState(editorState);
        });
        didInit.current = true;
      } catch (err) {
        console.error("Failed to parse editor state:", err);
      }
    }
  }, [editor, value]);*//*}

  return null;
}

const LexicalEditor = ({ value, onChange }) => {
  const initialConfig = {
    namespace: "MyEditor",
    theme,
    onError: (error) => console.error(error),
  };

  const handleEditorChange = (editorState) => {
    editorState.read(() => {
      const json = editorState.toJSON(); // get full JSON state
      onChange(JSON.stringify(json)); // pass to parent as string
    });
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <EditorInitializer value={value} />
      <div className="w-full p-3 bg-white rounded-md border border-gray-300 shadow-sm">
        <ToolbarPlugin />
        <RichTextPlugin
          contentEditable={
            <ContentEditable className="outline-none min-h-[150px] p-3" />
          }
          placeholder={
            <div className="text-gray-400 p-3">Write something amazing...</div>
          }
        />
        <HistoryPlugin />
        <OnChangePlugin onChange={handleEditorChange} />
      </div>
    </LexicalComposer>
  );
};

export default LexicalEditor;*/

/*import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { $getRoot } from "lexical";
import ToolbarPlugin from "./ToolbarPlugin"; // Import the toolbar

const theme = {
  paragraph: "mb-2",
  text: {
    bold: "font-bold",
    italic: "italic",
    underline: "underline",
  },
};

const LexicalEditor = ({ onChange }) => {
  const initialConfig = {
    namespace: "MyEditor",
    theme,
    onError: (error) => console.error(error),
  };

  const handleEditorChange = (editorState) => {
    editorState.read(() => {
      const content = $getRoot().getTextContent(); // extract plain text
      onChange(content); // pass content to parent
    });
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className="w-full p-3 bg-white rounded-md border border-gray-300 shadow-sm">
        <ToolbarPlugin />

        <RichTextPlugin
          contentEditable={<ContentEditable className="outline-none min-h-[150px] p-3" />}
          placeholder={<div className="text-gray-400 p-3">Write something amazing...</div>}
        />

        <HistoryPlugin />

        <OnChangePlugin onChange={handleEditorChange} />
      </div>
    </LexicalComposer>
  );
};

export default LexicalEditor;


/*import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { useEffect } from "react";
import ToolbarPlugin from "./ToolbarPlugin"; // Import the toolbar

const theme = {
  paragraph: "mb-2",
  text: {
    bold: "font-bold",
    italic: "italic",
    underline: "underline",
  },
};

const MyOnChangePlugin = () => {
  const [editor] = useLexicalComposerContext();
  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      console.log("Editor State Updated:", editorState);
      editorState.read(() => {
        const content = $getRoot().getTextContent(); // Extracts text content
        onChange(content); // Pass content to parent
      });
    });
  }, [editor]);
  return null;
};

const LexicalEditor = () => {
  const initialConfig = {
    namespace: "MyEditor",
    theme,
    onError: (error) => console.error(error),
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className="w-full p-3 bg-white rounded-md border border-gray-300 shadow-sm">
        {/* Toolbar Plugin */ /*}
        /*<ToolbarPlugin />

        {/* Rich Text Editor */ /*}
        /*<RichTextPlugin
          contentEditable={<ContentEditable className="outline-none min-h-[150px] p-3" />}
          placeholder={<div className="text-gray-400 p-3">Write something amazing...</div>}
        />
        <HistoryPlugin />
        <OnChangePlugin onChange={(editorState) => console.log(editorState)} />
      </div>
    </LexicalComposer>
  );
};

export default LexicalEditor;*/
