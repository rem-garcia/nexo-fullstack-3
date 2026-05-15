'use client'
import { type FieldValues, useController, type UseControllerProps } from "react-hook-form";

interface SelectReclamosProps<T extends FieldValues> extends UseControllerProps<T> {
    idTag: string;
    label: string;
    options: {id: number; descripcion: string; value: string;}[];
    errorMsg?: string;
};

const SelectReclamos = <T extends FieldValues>({idTag, label, options, errorMsg, name, control}: SelectReclamosProps<T>) => {
    const { field } = useController({name, control});

    return(
        <div className="mb-3">
            <label htmlFor={idTag}>{label}</label>
            <select
                id={idTag}
                className="block w-full p-3 border border-gray-200 rounded-xl"
                name={field.name}
                value={field.value ?? ""}
                onChange={field.onChange}
                //defaultValue=""
            >
                <option value="" disabled>Seleccione una opción...</option>
        
                {options.map((option) => (
                    <option key={option.id} value={option.value}>{option.descripcion}</option>
                ))}
            </select>
        
            {errorMsg && (
                <p className="text-sm text-red-500">
                    <i className="fa-solid fa-triangle-exclamation mr-[5px]"></i>
                    {errorMsg}
                </p>
            )}
        </div>
    );
};

export default SelectReclamos;
