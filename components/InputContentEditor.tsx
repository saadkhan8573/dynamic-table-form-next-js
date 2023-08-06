import { Controller, useFormContext } from "react-hook-form";

import dynamic from "next/dynamic";
import { EditorProps } from "react-draft-wysiwyg";
const Editor = dynamic<EditorProps>(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  {
    ssr: false,
  }
);

const htmlToDraft =
  typeof window === "object" && require("html-to-draftjs").default;

import {
  ContentState,
  EditorState,
  convertFromHTML,
  convertToRaw,
} from "draft-js";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

export const draftToHtmlText = (draftText: EditorState) => {
  let content = "";
  if (draftText) {
    content = draftToHtml(convertToRaw(draftText?.getCurrentContent()));
  }
  return content;
};

export const htmlToDraftText = (content: string) => {
  if (content) {
    const blocksFromHTML = convertFromHTML(content);
    return EditorState.createWithContent(
      ContentState.createFromBlockArray(
        blocksFromHTML.contentBlocks,
        blocksFromHTML.entityMap
      )
    );
  }
  return null;
};

// export const inputEditorErrorMessage = (value: EditorState) => {
//   const content = draftToHtmlText(value);
//   if (htmltotext(content)?.length > 1) {
//     return true;
//   }
//   return false;
// };

// export const htmlToDraftText = (
//     methods: any,
//     content: string,
//     name: string
// ) => {
//     if (content) {
//         const blocksFromHTML = convertFromHTML(content)
//         const bodyValue = EditorState.createWithContent(
//             ContentState.createFromBlockArray(
//                 blocksFromHTML.contentBlocks,
//                 blocksFromHTML.entityMap
//             )
//         )
//         methods.setValue(name, bodyValue)
//     }
// }

export const InputContentEditor = ({
  name,
  label,
  content,
  onChange,
  height,
}: {
  name: string;
  label?: string;
  content?: any;
  onChange?: any;
  height?: string;
}) => {
  const methods = useFormContext();

  const error = methods?.formState?.errors?.[name]?.message;

  return (
    <div>
      <p>{label}</p>
      <Controller
        name={name}
        control={methods.control}
        render={({ field }) => {
          return (
            <Editor
              editorStyle={{
                padding: "0px 10px 10px",
                height: "200px",
              }}
              toolbar={{
                options: [
                  "inline",
                  "blockType",
                  "fontSize",
                  "list",
                  "textAlign",
                  "history",
                ],
                inline: { inDropdown: true },
                list: { inDropdown: true },
                textAlign: { inDropdown: true },
                link: { inDropdown: true },
                history: { inDropdown: true },
              }}
              editorState={field?.value}
              wrapperClassName={`border ${
                error ? "border-error" : ""
              } rounded-md ${height ? height : "h-64"} overflow-auto`}
              editorClassName="!overflow-auto custom-scrollbar !h-[calc(100%-60px)]"
              onEditorStateChange={(e: any) => {
                field.onChange(e);
                if (onChange) {
                  onChange(e);
                }
              }}
            />
          );
        }}
      />
      {/* <InputErrorMessage name={name} /> */}
    </div>
  );
};
