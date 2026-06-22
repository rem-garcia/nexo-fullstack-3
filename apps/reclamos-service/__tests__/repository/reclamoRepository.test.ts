import * as reclamoRepository from "../../src/repository/reclamoRepository";
import { prismaMock } from "../../__mocks__/src/lib/prismaMock";

jest.mock("../../src/lib/prisma", () => {
    const { prismaMock } = require("../../__mocks__/src/lib/prismaMock");

    return { prisma: prismaMock };
});

describe("reclamoRepository", () => {
    it("createReclamo debe crear un reclamo", async () => {
        const data = {
            nombreCliente: "Juanito Doe",
            emailCliente: "j.doe@test.com",
            numTelefono: "+56912345678",
            tipoPropiedad: "departamento",
            nroDpto: "320",
            tipoFalla: "electricidad",
            ubicacionFalla: "cocina",
            descripcionFalla: "Los enchufes no permiten conectarse a la electricidad."
        }

        prismaMock.reclamo.create.mockResolvedValue({id: "fe9eb675-bc07-401e-9faa-2d4768e4af9f", ...data, creadoEn: new Date(2026, 6, 8) });

        const resultado = await reclamoRepository.createReclamo(data as any);

        expect(prismaMock.reclamo.create).toHaveBeenCalledWith({ data });
        expect(resultado).toEqual({ id: "fe9eb675-bc07-401e-9faa-2d4768e4af9f", ...data, creadoEn: new Date(2026, 6, 8) });
    });

    it("getReclamos debe devolver lista de reclamos", async () => {
        const reclamos = [
            {
                id: "d77bb377-3ff0-4174-beed-21d314c3aebb",
                nombreCliente: "Pepita",
                emailCliente: "pepita@test.com",
                numTelefono: "+56912345678",
                tipoPropiedad: "oficina",
                nroDpto: "101",
                tipoFalla: "filtracion",
                ubicacionFalla: "bano",
                descripcionFalla: "El baño se moja sin tener las llaves abiertas",
                creadoEn: new Date(2026, 5, 8)
            },
            {
                id: "fe9eb675-bc07-401e-9faa-2d4768e4af9f",
                nombreCliente: "Juanito Doe",
                emailCliente: "j.doe@test.com",
                numTelefono: "+56912345678",
                tipoPropiedad: "departamento",
                nroDpto: "320",
                tipoFalla: "electricidad",
                ubicacionFalla: "cocina",
                descripcionFalla: "Los enchufes no permiten conectarse a la electricidad.",
                creadoEn: new Date(2026, 6, 8)
            }
        ];
        
        prismaMock.reclamo.findMany.mockResolvedValue(reclamos);
        
        const resultado = await reclamoRepository.getReclamos();
        expect(prismaMock.reclamo.findMany).toHaveBeenCalled();
        expect(resultado).toEqual(reclamos);
    });

    it("getReclamoById debe devolver un reclamo por id", async () => {
        const reclamo = {
            id: "d77bb377-3ff0-4174-beed-21d314c3aebb",
            nombreCliente: "Pepita",
            emailCliente: "pepita@test.com",
            numTelefono: "+56912345678",
            tipoPropiedad: "oficina",
            nroDpto: "101",
            tipoFalla: "filtracion",
            ubicacionFalla: "bano",
            descripcionFalla: "El baño se moja sin tener las llaves abiertas",
            creadoEn: new Date(2026, 5, 8)
        } as any;

        prismaMock.reclamo.findUnique.mockResolvedValue(reclamo);
        
        const resultado = await reclamoRepository.getReclamoById("d77bb377-3ff0-4174-beed-21d314c3aebb");
        expect(prismaMock.reclamo.findUnique).toHaveBeenCalledWith({ where: { id: "d77bb377-3ff0-4174-beed-21d314c3aebb" } });
        expect(resultado).toEqual(reclamo);
    });
    
    it("deleteReclamo debe eliminar un reclamo por id", async () => {
        const reclamo = {
            id: "d77bb377-3ff0-4174-beed-21d314c3aebb",
            nombreCliente: "Pepita",
            emailCliente: "pepita@test.com",
            numTelefono: "+56912345678",
            tipoPropiedad: "oficina",
            nroDpto: "101",
            tipoFalla: "filtracion",
            ubicacionFalla: "bano",
            descripcionFalla: "El baño se moja sin tener las llaves abiertas",
            creadoEn: new Date(2026, 5, 8)
        } as any;

        prismaMock.reclamo.delete.mockResolvedValue(reclamo);
        
        const resultado = await reclamoRepository.deleteReclamo("d77bb377-3ff0-4174-beed-21d314c3aebb");
        expect(prismaMock.reclamo.delete).toHaveBeenCalledWith({ where: { id: "d77bb377-3ff0-4174-beed-21d314c3aebb" } });
        expect(resultado).toEqual(reclamo);
    });

});
