"use client";

import { TextInput } from "@/components/TextInput";
import React, { useState, useEffect } from "react";
import {
  FormProvider,
  useForm,
  useFieldArray,
  Controller,
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  InputContentEditor,
  draftToHtmlText,
  htmlToDraftText,
} from "@/components/InputContentEditor";

const Home = () => {
  const [table, setTable] = useState([]);
  const onSubmit = (values: any) => {
    const abc = values.fieldsData?.map((fields: any) => {
      const obj: any = {};
      Object.entries(fields).forEach(([key, value]: any) => {
        obj[key] = draftToHtmlText(value);
      });
      return obj;
    });
    setTable(abc);
  };


  const methods = useForm({
    mode: "all",
  });
  const { fields, append, remove } = useFieldArray({
    rules: { minLength: 1 },
    control: methods.control,
    name: "fields",
  });

  const {
    fields: fieldsData,
    append: appendFieldsData,
    remove: removeFieldsData,
  } = useFieldArray({
    rules: { minLength: 1 },
    control: methods.control,
    name: "fieldsData",
  });

  const fieData = methods.getValues("fields");

  const tableObject = table?.length > 0 ? table[0] : {};
  const tableHeading = Object.keys(tableObject);

  const arr = [
    {
      "field name 1": "<p>asdasdas</p>\n",
      "field name 2": "<p>asdasda</p>\n",
    },
    {
      "field name 1": "<p>dadas</p>\n",
      "field name 2": "<p>asdasd</p>\n",
    },
  ];

  useEffect(() => {
    const setToFieldData = arr?.map((tab: any) => {
      // return tab;
      let obj: any = {};
      Object.entries(tab).forEach(([key, value]: any) => {
        obj[key] = htmlToDraftText(value);
      });
      return obj;
    });
    const fieldsData = setToFieldData?.length > 0 ? setToFieldData[0] : {};
    const f = Object.keys(fieldsData);

    // set the default field value in form
    // it can be use in the edit form
    // methods.setValue("fields", f);
    // methods.setValue("fieldsData", setToFieldData);
  }, []);


  return (
    <div>
      <FormProvider {...methods}>
        <form className="mt-2 w-full" onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="border border-secondary-dark mt-6">
            <div className="flex justify-between">
              {fields.map((item, index) => (
                // <div
                //   className="flex flex-col md:flex-row items-start gap-x-6 px-2 py-1"
                //   key={index}
                // >
                <TextInput
                  placeholder="Enter your First Name"
                  name={`fields.${index}`}
                />
                // </div>
              ))}
              <div className="flex flex-col">
                <button
                  type="button"
                  onClick={() => append(`field name ${fields?.length + 1}`)}
                  disabled={false}
                >
                  + Add Another Field
                </button>
              </div>
            </div>
            <div>
              {fieldsData.map((data, index) => (
                <div className="flex items-center gap-3">
                  {fieData.map((f: any) => (
                    <InputContentEditor
                      name={`fieldsData.${index}.${f}`}
                      label={"Message"}
                      //   onChange={(e: any) => {
                      //     const note = draftToHtmlText(e);
                      //     setNoteContent(note);
                      //   }}
                    />
                  ))}
                </div>
              ))}
            </div>
            <div className="flex flex-col">
              <button
                type="button"
                onClick={() => {
                  let obj: any = {};
                  for (let index = 0; index < fieData.length; index++) {
                    const element = fieData[index];
                    obj[element] = "";
                  }
                  appendFieldsData(obj);
                }}
                disabled={false}
              >
                + Add Another Entry
              </button>
            </div>
            {/* {!employeeData && ( */}

            {/* )} */}
          </div>

          <button type="submit">Send</button>
        </form>
      </FormProvider>
      <hr />
      {table && table?.length > 0 && (
        <table className="border min-w-[600px] mt-20 ">
          <tr className="border">
            {fieData?.map((heading: any) => (
              <th>{heading}</th>
            ))}
          </tr>
          {table?.map((tab: any) => {
          
            return (
              <tr className="border">
                {Object.values(tab).map((value: any) => (
                  <td>
                    <div
                      className="leer"
                      dangerouslySetInnerHTML={{
                        __html: value,
                      }}
                    />
                  </td>
                ))}
              </tr>
            );
          })}
        </table>
      )}
    </div>
  );
};

export default Home;
