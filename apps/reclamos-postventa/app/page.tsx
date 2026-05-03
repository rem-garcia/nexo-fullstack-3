'use client';

import SidebarMenu from "@nexo/ui";
import { useState } from "react";

export default function Home() {
    const [openSidebar, setOpenSidebar] = useState(false);

    const handleSidebar = () => {
        setOpenSidebar(!openSidebar);
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
                <form className="bg-white p-7 mb-8 border border-gray-200 rounded-xl">
                    <fieldset className="mb-4">
                        <legend className="text-gray-text font-bold mb-3 uppercase">Datos de contacto</legend>

                        <div>
                            <label htmlFor="nombre-cliente">Nombre completo</label>
                            <input
                                id="nombre-cliente"
                                className="block w-[stretch] p-3 mb-3 border border-gray-200 rounded-xl"
                                type="text"
                                name="nombre_cliente"
                                placeholder="Ingrese su nombre"
                            />
                        </div>
                        <div>
                            <label htmlFor="correo">Correo electrónico</label>
                            <input
                                id="correo"
                                className="block w-[stretch] p-3 mb-3 border border-gray-200 rounded-xl"
                                type="email"
                                name="email_cliente"
                                placeholder="correo@mail.com"
                            />
                        </div>
                        <div>
                            <label htmlFor="telefono">Teléfono</label>
                            <input
                                id="telefono"
                                className="block w-[stretch] p-3 mb-3 border border-gray-200 rounded-xl"
                                type="text"
                                name="telefono_contacto"
                                placeholder="+56 9 1234 5678"
                            />
                        </div>
                    </fieldset>

                    <fieldset className="mb-4">
                        <legend className="text-gray-text font-bold mb-3 uppercase">Propiedad</legend>

                        <div>
                            <label htmlFor="tipo-propiedad">Tipo de propiedad</label>
                            <select
                                id="tipo-propiedad"
                                className="block w-[stretch] p-3 mb-3 border border-gray-200 rounded-xl"
                                name="tipo_propiedad"
                                defaultValue=""
                            >
                                <option value="" disabled>Seleccione una opción...</option>

                                {tiposPropiedad.map((tipoPropiedad) => (
                                    <option key={tipoPropiedad.id} value={tipoPropiedad.value}>{tipoPropiedad.tipo}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="nro-dpto">Número de Departamento/Oficina</label>
                            <input
                                id="nro-dpto"
                                className="block w-[stretch] p-3 mb-3 border border-gray-200 rounded-xl"
                                name="nro_dpto"
                                placeholder="Ej. 201"
                            />
                        </div>
                    </fieldset>

                    <fieldset className="mb-4">
                        <legend className="text-gray-text font-bold mb-3 uppercase">Detalle de la falla</legend>
                        <div>
                            <label htmlFor="tipo-falla">Tipo de falla</label>
                            <select
                                id="tipo-falla"
                                className="block w-[stretch] p-3 mb-3 border border-gray-200 rounded-xl"
                                name="tipo_falla"
                                defaultValue=""
                            >
                                <option value="" disabled>Seleccione una opción</option>

                                {tiposFalla.map((falla) => (
                                    <option key={falla.id} value={falla.value}>{falla.tipoFalla}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label htmlFor="ubicacion-falla">Ubicación de la falla</label>
                            <select
                                id="ubicacion-falla"
                                className="block w-[stretch] p-3 mb-3 border border-gray-200 rounded-xl"
                                name="ubicacion_falla"
                                defaultValue=""
                            >
                                <option value="" disabled>Seleccione una opción</option>

                                {ubicacionesFalla.map((ubicacion) => (
                                    <option key={ubicacion.id} value={ubicacion.value}>{ubicacion.ubicacion}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label htmlFor="descripcion-falla">Descripción de la falla</label>
                            <textarea
                                id="descripcion-falla"
                                className="block w-[stretch] p-3 mb-3 border border-gray-200 rounded-xl"
                                cols={10}
                                rows={7}
                                placeholder="Describa con detalle la falla identificada."
                            ></textarea>
                        </div>
                    </fieldset>

                    <button
                        type="button"
                        className="block w-[stretch] p-3 bg-blue-secondary hover:bg-blue-primary text-white rounded-xl cursor-pointer"
                    >
                        Enviar reclamo
                    </button>
                </form>
            </main>
        </div>
    );
}
