'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { ReclamoSchema, ReclamoType } from "@nexo/schemas";
import { InputReclamos, SelectReclamos, SidebarMenu, TextAreaReclamos } from "@nexo/ui";
import { useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";

export default function Home() {
    const [openSidebar, setOpenSidebar] = useState(false);

    // Elementos de react-hook-form para validacion de formularios
    const { formState: { errors }, handleSubmit, control } = useForm<ReclamoType>({

        // Resolver para usar el esquema de Zod en la validacion del formulario
        resolver: zodResolver(ReclamoSchema),

        // Se definen valores por defecto con cadenas vacias porque las validaciones
        // del esquema de zod definido esperan datos de tipo string y React-Hook-Form las maneja
        // como 'undefined' en la forma en que se esta usando en los componentes 'InputReclamos'
        // y 'SelectReclamos'
        defaultValues: {
            nombreCliente: "",
            emailCliente: "",
            numTelefono: "",
            tipoPropiedad: "",
            nroDpto: "",
            tipoFalla: "",
            ubicacionFalla: "",
            descripcionFalla: ""
        }
    });

    const handleSidebar = () => {
        setOpenSidebar(!openSidebar);
    };

    const onSubmitForm: SubmitHandler<ReclamoType> = (data) => {
        console.log(data);
    };

    // Datos dummy. Despues se obtendran desde el backend
    const tiposPropiedad = [
        {id: 1, descripcion: "Departamento", value: "departamento"},
        {id: 2, descripcion: "Oficina", value: "oficina"}
    ];

    // Datos dummy. Despues se obtendran desde el backend
    const tiposFalla = [
        {id: 1, descripcion: "Gasfitería", value: "gasfiteria"},
        {id: 2, descripcion: "Electricidad", value: "electricidad"},
        {id: 3, descripcion: "Filtración", value: "filtracion"},
        {id: 4, descripcion: "Estructura / muro", value: "estructura"},
        {id: 5, descripcion: "Pintura", value: "pintura"},
        {id: 6, descripcion: "Carpintería", value: "carpinteria"},
        {id: 7, descripcion: "Otro", value: "otro"}
    ];

    // Datos dummy. Despues se obtendran desde el backend
    const ubicacionesFalla = [
        {id: 1, descripcion: "Baño", value: "bano"},
        {id: 2, descripcion: "Cocina", value: "cocina"},
        {id: 3, descripcion: "Terraza", value: "terraza"},
        {id: 4, descripcion: "Living/comedor", value: "living-comedor"},
        {id: 5, descripcion: "Dormitorio", value: "dormitorio"},
        {id: 6, descripcion: "Otro", value: "otro"}
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

                        <InputReclamos
                            idTag="nombre-cliente"
                            label="Nombre completo"
                            name="nombreCliente"
                            placeholder="Ingrese su nombre"
                            control={control}
                            errorMsg={errors.nombreCliente?.message}
                        />

                        <InputReclamos
                            idTag="correo"
                            label="Correo electrónico"
                            name="emailCliente"
                            placeholder="correo@mail.com"
                            control={control}
                            errorMsg={errors.emailCliente?.message}
                        />

                        <InputReclamos
                            idTag="telefono"
                            label="Teléfono"
                            name="numTelefono"
                            type="tel"
                            placeholder="+56912345678"
                            control={control}
                            errorMsg={errors.numTelefono?.message}
                        />
                    </fieldset>

                    <fieldset className="mb-4">
                        <legend className="text-gray-text font-bold mb-3 uppercase">Propiedad</legend>

                        <SelectReclamos
                            idTag="tipo-propiedad"
                            label="Tipo de propiedad"
                            name="tipoPropiedad"
                            options={tiposPropiedad}
                            control={control}
                            errorMsg={errors.tipoPropiedad?.message}
                        />

                        <InputReclamos
                            idTag="nro-dpto"
                            label="Número de Departamento/Oficina"
                            name="nroDpto"
                            placeholder="Ej. 201"
                            control={control}
                            errorMsg={errors.nroDpto?.message}
                        />
                    </fieldset>

                    <fieldset className="mb-4">
                        <legend className="text-gray-text font-bold mb-3 uppercase">Detalle de la falla</legend>

                        <SelectReclamos
                            idTag="tipo-falla"
                            label="Tipo de falla"
                            name="tipoFalla"
                            options={tiposFalla}
                            control={control}
                            errorMsg={errors.tipoFalla?.message}
                        />

                        <SelectReclamos
                            idTag="ubicacion-falla"
                            label="Ubicación de la falla"
                            name="ubicacionFalla"
                            options={ubicacionesFalla}
                            control={control}
                            errorMsg={errors.ubicacionFalla?.message}
                        />

                        <TextAreaReclamos
                            idTag="descripcion-falla"
                            label="Descripción de la falla (opcional)"
                            name="descripcionFalla"
                            control={control}
                            placeholder="Describa con mayor detalle la falla encontrada"
                            errorMsg={errors.descripcionFalla?.message}
                        />
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
