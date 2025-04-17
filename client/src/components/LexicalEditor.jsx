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
