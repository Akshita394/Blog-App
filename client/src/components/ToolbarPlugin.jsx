import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $getSelection,
  $isRangeSelection,
  FORMAT_TEXT_COMMAND,
  FORMAT_ELEMENT_COMMAND,
  UNDO_COMMAND,
  REDO_COMMAND,
} from "lexical";
import {
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  REMOVE_LIST_COMMAND,
} from "@lexical/list";
import { useCallback, useEffect, useState } from "react";
import { Button } from "flowbite-react";
import {
  FaBold,
  FaItalic,
  FaUnderline,
  FaStrikethrough,
  FaListUl,
  FaListOl,
  FaUndo,
  FaRedo,
  FaHeading,
} from "react-icons/fa";

const ToolbarPlugin = () => {
  const [editor] = useLexicalComposerContext();
  const [activeFormats, setActiveFormats] = useState({});

  // Toggle formatting
  const handleFormat = (command, type) => {
    editor.dispatchCommand(command, type);
  };

  // Toggle lists
  const handleList = (command) => {
    editor.dispatchCommand(command);
  };

  // Update toolbar state
  const updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      setActiveFormats({
        bold: selection.hasFormat("bold"),
        italic: selection.hasFormat("italic"),
        underline: selection.hasFormat("underline"),
        strikethrough: selection.hasFormat("strikethrough"),
      });
    }
  }, []);

  useEffect(() => {
    return editor.registerUpdateListener(() => {
      updateToolbar();
    });
  }, [editor, updateToolbar]);

  return (
    <div className="flex gap-2 bg-gray-100 p-2 rounded-md shadow-md">
      {/* Formatting */}
      <Button size="xs" color={activeFormats.bold ? "gray" : "light"} onClick={() => handleFormat(FORMAT_TEXT_COMMAND, "bold")}>
        <FaBold />
      </Button>
      <Button size="xs" color={activeFormats.italic ? "gray" : "light"} onClick={() => handleFormat(FORMAT_TEXT_COMMAND, "italic")}>
        <FaItalic />
      </Button>
      <Button size="xs" color={activeFormats.underline ? "gray" : "light"} onClick={() => handleFormat(FORMAT_TEXT_COMMAND, "underline")}>
        <FaUnderline />
      </Button>
      <Button size="xs" color={activeFormats.strikethrough ? "gray" : "light"} onClick={() => handleFormat(FORMAT_TEXT_COMMAND, "strikethrough")}>
        <FaStrikethrough />
      </Button>

      {/* Lists */}
      <Button size="xs" color="light" onClick={() => handleList(INSERT_UNORDERED_LIST_COMMAND)}>
        <FaListUl />
      </Button>
      <Button size="xs" color="light" onClick={() => handleList(INSERT_ORDERED_LIST_COMMAND)}>
        <FaListOl />
      </Button>
      <Button size="xs" color="light" onClick={() => handleList(REMOVE_LIST_COMMAND)}>
        ❌
      </Button>

      {/* Headings */}
      <Button size="xs" color="light" onClick={() => handleFormat(FORMAT_ELEMENT_COMMAND, "h1")}>
        <FaHeading /> H1
      </Button>
      <Button size="xs" color="light" onClick={() => handleFormat(FORMAT_ELEMENT_COMMAND, "h2")}>
        <FaHeading /> H2
      </Button>
      <Button size="xs" color="light" onClick={() => handleFormat(FORMAT_ELEMENT_COMMAND, "h3")}>
        <FaHeading /> H3
      </Button>

      {/* Undo/Redo */}
      <Button size="xs" color="light" onClick={() => editor.dispatchCommand(UNDO_COMMAND)}>
        <FaUndo />
      </Button>
      <Button size="xs" color="light" onClick={() => editor.dispatchCommand(REDO_COMMAND)}>
        <FaRedo />
      </Button>
    </div>
  );
};

export default ToolbarPlugin;
