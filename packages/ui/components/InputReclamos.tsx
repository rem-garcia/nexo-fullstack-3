import { HTMLInputTypeAttribute } from "react";
import { FieldValues, useController, UseControllerProps } from "react-hook-form";

// A los atributos definidos de 'InputReclamosProps' se agregan los de 'UserControllerProps'
// Para ello, se ha usado una restriccion al tipo generico 'T'. Mas sobre esto, leer:
// - https://www.freecodecamp.org/news/how-typescript-generics-work/
interface InputReclamosProps<T extends FieldValues> extends UseControllerProps<T> {
    idTag: string;
    label: string;
    type?: HTMLInputTypeAttribute;
    placeholder?: string;
    errorMsg?: string;
};

const InputReclamos = <T extends FieldValues>({idTag, label, type, placeholder, errorMsg, name, control}: InputReclamosProps<T>) => {
    const { field } = useController({name, control});

    return(
        <div className="mb-3">
            <label htmlFor={idTag}>{label}</label>
        
            <input
                id={idTag}
                className="block w-full p-3 border border-gray-200 rounded-xl"
                type={type}
                name={field.name}
                // Si field.value es 0, 'undefined' o 'null', devuelve "" (cadena vacia). De lo contrario, devuelve el valor del input.
                // - fuente: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing
                value={field.value ?? ""}
                onChange={field.onChange}
                placeholder={placeholder}
            />
        
            {errorMsg && (
                <p className="text-sm text-red-500">
                    <i className="fa-solid fa-triangle-exclamation mr-[5px]"></i>
                    {errorMsg}
                </p>
            )}
        
        </div>
    );
};

export default InputReclamos;
