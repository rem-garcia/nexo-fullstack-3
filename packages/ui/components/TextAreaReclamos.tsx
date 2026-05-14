'use client'
import { FieldValues, useController, UseControllerProps } from "react-hook-form";

interface TextAreaReclamosProps<T extends FieldValues> extends UseControllerProps<T>{
    idTag: string;
    label: string;
    placeholder?: string;
    errorMsg?: string;
};

const TextAreaReclamos = <T extends FieldValues>({idTag, label, placeholder, errorMsg, name, control}: TextAreaReclamosProps<T>) => {
    const { field } = useController({ name, control });

    return(
        <div className="mb-3">
            <label htmlFor={idTag}>{label}</label>
            <textarea
                id={idTag}
                className="block w-full p-3 border border-gray-200 rounded-xl"
                name={field.name}
                cols={10}
                rows={7}
                value={field.value ?? ""}
                onChange={field.onChange}
                placeholder={placeholder}
            ></textarea>
        
            {errorMsg && (
                <p className="text-sm text-red-500">
                    <i className="fa-solid fa-triangle-exclamation mr-[5px]"></i>
                    {errorMsg}
                </p>
            )}
        </div>
    );
};

export default TextAreaReclamos;
