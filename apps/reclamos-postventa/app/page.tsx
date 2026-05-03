'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import SidebarMenu from "@nexo/ui";
import { useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import z from "zod";

// Esquema de Zod para validacion de formulario con React Hook Form
const reclamoFormSchema = z.object({
    nombreCliente: z.string().nonempty({ error: "Campo obligatorio" }),
    emailCliente: z.email({
        error: (iss) => iss.input === undefined || iss.input === "" ? "Campo obligatorio" : "Correo inválido"
    }),
    numTelefono: z.string().regex(
        /^\+56(?:9\d{8}|[2-7]\d{7}|1\d\d{7})$/,
        {
            error: iss => iss.input === undefined || iss.input === "" ? "Campo obligatorio" : "Número de teléfono inválido"
        }
    ),
    tipoPropiedad: z.string().nonempty({ error: "Campo obligatorio" }),
    nroDpto: z.string().nonempty({ error: "Campo obligatorio" }),
    tipoFalla: z.string().nonempty({ error: "Campo obligatorio "}),
    ubicacionFalla: z.string().nonempty({ error: "Campo obligatorio" }),
    descripcionFalla: z.string().max(200, {error: "Has alcanzado el máximo de caracteres (200)"}).optional()
});

// Se hace una inferencia del tipo del esquema de Zod
// para usarlo como tipo en hook 'useForm' de react-hook-form
type reclamoFormType = z.infer<typeof reclamoFormSchema>;

export default function Home() {
    const [openSidebar, setOpenSidebar] = useState(false);

    // Elementos de react-hook-form para validacion de formularios
    const { register, formState: { errors }, handleSubmit } = useForm<reclamoFormType>({
        // Resolver para usar el esquema de Zod en la validacion del formulario
        resolver: zodResolver(reclamoFormSchema)
    });

    const handleSidebar = () => {
        setOpenSidebar(!openSidebar);
    };

    const onSubmitForm: SubmitHandler<reclamoFormType> = (data) => {
        console.log(data);
    };

    // Datos dummy. Despues se obtendran desde el backend
    const tiposPropiedad = [
        {id: 1, tipo: "Departamento", value: "departamento"},
        {id: 2, tipo: "Oficina", value: "oficina"}
    ];

    // Datos dummy. Despues se obtendran desde el backend
    const tiposFalla = [
        {id: 1, tipoFalla: "Gasfitería", value: "gasfiteria"},
        {id: 2, tipoFalla: "Electricidad", value: "electricidad"},
        {id: 3, tipoFalla: "Filtración", value: "filtracion"},
        {id: 4, tipoFalla: "Estructura / muro", value: "estructura"},
        {id: 5, tipoFalla: "Pintura", value: "pintura"},
        {id: 6, tipoFalla: "Carpintería", value: "carpinteria"},
        {id: 7, tipoFalla: "Otro", value: "otro"}
    ];

    // Datos dummy. Despues se obtendran desde el backend
    const ubicacionesFalla = [
        {id: 1, ubicacion: "Baño", value: "bano"},
        {id: 2, ubicacion: "Cocina", value: "cocina"},
        {id: 3, ubicacion: "Terraza", value: "terraza"},
        {id: 4, ubicacion: "Living/comedor", value: "living-comedor"},
        {id: 5, ubicacion: "Dormitorio", value: "dormitorio"},
        {id: 6, ubicacion: "Otro", value: "otro"}
    ];

    return (
        <div className="flex bg-gray-100">
            {/* Sidebar de navegacion*/}
            <SidebarMenu openMenu={openSidebar} handleMenu={handleSidebar}/>

            {/* Main body */}
            <main className="grow px-5 lg:px-50">
                <div className="mt-5 mb-10 lg:my-10">
                    {/* Menu hamburguesa */}
                    <button className="lg:hidden text-3xl cursor-pointer" onClick={handleSidebar}>
                        <i className="fa-solid fa-bars"></i>
                    </button>
        
                    <h2 className="font-bold text-4xl mb-2">¿En qué podemos ayudarte?</h2>
 
                    <p className="text-gray-text">Ingresa tu reclamo para que el equipo de postventa pueda responder a la brevedad.</p>
                </div>

                {/* Formulario */}
                <form className="bg-white p-7 mb-8 border border-gray-200 rounded-xl" onSubmit={handleSubmit(onSubmitForm)}>
                    <fieldset className="mb-4">
                        <legend className="text-gray-text font-bold mb-3 uppercase">Datos de contacto</legend>

                        <div className="mb-3">
                            <label htmlFor="nombre-cliente">Nombre completo</label>

                            <input
                                id="nombre-cliente"
                                className="block w-full p-3 border border-gray-200 rounded-xl"
                                {...register("nombreCliente")}
                                placeholder="Ingrese su nombre"
                            />

                            {errors.nombreCliente && (
                                <p className="text-sm text-red-500">
                                    <i className="fa-solid fa-triangle-exclamation mr-[5px]"></i>
                                    {errors.nombreCliente?.message}
                                </p>
                            )}

                        </div>

                        <div className="mb-3">
                            <label htmlFor="correo">Correo electrónico</label>
                            <input
                                id="correo"
                                className="block w-full p-3 border border-gray-200 rounded-xl"
                                type="email"
                                {...register("emailCliente")}
                                placeholder="correo@mail.com"
                            />

                            {errors.emailCliente && (
                                <p className="text-sm text-red-500">
                                    <i className="fa-solid fa-triangle-exclamation mr-[5px]"></i>
                                    {errors.emailCliente?.message}
                                </p>
                            )}

                        </div>

                        <div className="mb-3">
                            <label htmlFor="telefono">Teléfono</label>
                            <input
                                id="telefono"
                                className="block w-full p-3 border border-gray-200 rounded-xl"
                                type="tel"
                                {...register("numTelefono")}
                                placeholder="+56912345678"
                            />

                            {errors.numTelefono && (
                                <p className="text-sm text-red-500">
                                    <i className="fa-solid fa-triangle-exclamation mr-[5px]"></i>
                                    {errors.numTelefono?.message}
                                </p>
                            )}
                        </div>
                    </fieldset>

                    <fieldset className="mb-4">
                        <legend className="text-gray-text font-bold mb-3 uppercase">Propiedad</legend>

                        <div className="mb-3">
                            <label htmlFor="tipo-propiedad">Tipo de propiedad</label>
                            <select
                                id="tipo-propiedad"
                                className="block w-full p-3 border border-gray-200 rounded-xl"
                                {...register("tipoPropiedad")}
                                defaultValue=""
                            >
                                <option value="" disabled>Seleccione una opción...</option>

                                {tiposPropiedad.map((tipoPropiedad) => (
                                    <option key={tipoPropiedad.id} value={tipoPropiedad.value}>{tipoPropiedad.tipo}</option>
                                ))}
                            </select>

                            {errors.tipoPropiedad && (
                                <p className="text-sm text-red-500">
                                    <i className="fa-solid fa-triangle-exclamation mr-[5px]"></i>
                                    {errors.tipoPropiedad?.message}
                                </p>
                            )}
                        </div>

                        <div className="mb-3">
                            <label htmlFor="nro-dpto">Número de Departamento/Oficina</label>
                            <input
                                id="nro-dpto"
                                className="block w-full p-3 border border-gray-200 rounded-xl"
                                //name="nroDpto"
                                {...register("nroDpto")}
                                placeholder="Ej. 201"
                            />

                            {errors.nroDpto && (
                                <p className="text-sm text-red-500">
                                    <i className="fa-solid fa-triangle-exclamation mr-[5px]"></i>
                                    {errors.nroDpto?.message}
                                </p>
                            )}
                        </div>
                    </fieldset>

                    <fieldset className="mb-4">
                        <legend className="text-gray-text font-bold mb-3 uppercase">Detalle de la falla</legend>

                        <div className="mb-3">
                            <label htmlFor="tipo-falla">Tipo de falla</label>
                            <select
                                id="tipo-falla"
                                className="block w-full p-3 border border-gray-200 rounded-xl"
                                {...register("tipoFalla")}
                                defaultValue=""
                            >
                                <option value="" disabled>Seleccione una opción</option>

                                {tiposFalla.map((falla) => (
                                    <option key={falla.id} value={falla.value}>{falla.tipoFalla}</option>
                                ))}
                            </select>

                            {errors.tipoFalla && (
                                <p className="text-sm text-red-500">
                                    <i className="fa-solid fa-triangle-exclamation mr-[5px]"></i>
                                    {errors.tipoFalla?.message}
                                </p>
                            )}
                        </div>

                        <div className="mb-3">
                            <label htmlFor="ubicacion-falla">Ubicación de la falla</label>
                            <select
                                id="ubicacion-falla"
                                className="block w-full p-3 border border-gray-200 rounded-xl"
                                {...register("ubicacionFalla")}
                                defaultValue=""
                            >
                                <option value="" disabled>Seleccione una opción</option>

                                {ubicacionesFalla.map((ubicacion) => (
                                    <option key={ubicacion.id} value={ubicacion.value}>{ubicacion.ubicacion}</option>
                                ))}
                            </select>

                            {errors.ubicacionFalla && (
                                <p className="text-sm text-red-500">
                                    <i className="fa-solid fa-triangle-exclamation mr-[5px]"></i>
                                    {errors.ubicacionFalla?.message}
                                </p>
                            )}
                        </div>

                        <div className="mb-3">
                            <label htmlFor="descripcion-falla">Descripción de la falla (opcional)</label>
                            <textarea
                                id="descripcion-falla"
                                className="block w-full p-3 border border-gray-200 rounded-xl"
                                {...register("descripcionFalla")}
                                cols={10}
                                rows={7}
                                placeholder="Describa con detalle la falla identificada."
                            ></textarea>

                            {errors.descripcionFalla && (
                                <p className="text-sm text-red-500">
                                    <i className="fa-solid fa-triangle-exclamation mr-[5px]"></i>
                                    {errors.descripcionFalla?.message}
                                </p>
                            )}
                        </div>
                    </fieldset>

                    <button
                        className="block w-full p-3 bg-blue-secondary hover:bg-blue-primary text-white rounded-xl cursor-pointer"
                    >
                        Enviar reclamo
                    </button>
                </form>
            </main>
        </div>
    );
}
