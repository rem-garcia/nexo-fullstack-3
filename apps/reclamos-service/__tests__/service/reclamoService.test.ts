import * as reclamoService from '../../src/service/reclamoService';
import * as reclamoRepository from '../../src/repository/reclamoRepository';

jest.mock("../../src/lib/prisma", () => {
    const { prismaMock } = require("../../__mocks__/src/lib/prismaMock");

    return { prisma: prismaMock };
});

jest.mock('../../src/repository/reclamoRepository');

describe("reclamoService", () => {
    const payload = {
        nombreCliente: "Juanito Doe",
        emailCliente: "j.doe@test.com",
        numTelefono: "+56912345678",
        tipoPropiedad: "departamento",
        nroDpto: "320",
        tipoFalla: "electricidad",
        ubicacionFalla: "cocina",
        descripcionFalla: "Los enchufes no permiten conectarse a la electricidad."
    }

    it("crearReclamo debe validar y crear reclamo", async () => {
        (reclamoRepository.createReclamo as jest.Mock).mockResolvedValue({
            id: "fe9eb675-bc07-401e-9faa-2d4768e4af9f",
            ...payload,
            creadoEn: new Date(2026, 5, 8)
        });

        const resultado = await reclamoService.crearReclamo(payload);
        expect(reclamoRepository.createReclamo).toHaveBeenCalledWith(payload);
        expect(resultado.id).toBe("fe9eb675-bc07-401e-9faa-2d4768e4af9f");
    });

    it("crearReclamo debe lanzar error si payload inválido", async () => {
        await expect(reclamoService.crearReclamo({})).rejects.toBeDefined();
    });

    it("obtenerReclamos debe devolver lista de reclamos", async () => {
      (reclamoRepository.getReclamos as jest.Mock).mockResolvedValue([{ id: "fe9eb675-bc07-401e-9faa-2d4768e4af9f" }]);
      const resultado = await reclamoService.obtenerReclamos();
      expect(resultado).toEqual([{ id: "fe9eb675-bc07-401e-9faa-2d4768e4af9f" }]);
    });

    it("obtenerReclamoPorId debe lanzar error si no existe", async () => {
      (reclamoRepository.getReclamoById as jest.Mock).mockResolvedValue(null);
      await expect(reclamoService.obtenerReclamoPorId("no-id")).rejects.toThrow(
        'Reclamo con id "no-id" no existe.'
      );
    });

    it("eliminarReclamo debe lanzar error si no existe", async () => {
      (reclamoRepository.getReclamoById as jest.Mock).mockResolvedValue(null);
      await expect(reclamoService.eliminarReclamo("no-id")).rejects.toThrow();
    });

    it("eliminarReclamo debe eliminar si existe", async () => {
      (reclamoRepository.getReclamoById as jest.Mock).mockResolvedValue({ id: "fe9eb675-bc07-401e-9faa-2d4768e4af9f" });
      (reclamoRepository.deleteReclamo as jest.Mock).mockResolvedValue({ id: "fe9eb675-bc07-401e-9faa-2d4768e4af9f" }); 
      await reclamoService.eliminarReclamo("fe9eb675-bc07-401e-9faa-2d4768e4af9f");
      expect(reclamoRepository.deleteReclamo).toHaveBeenCalledWith("fe9eb675-bc07-401e-9faa-2d4768e4af9f");
    });
    
});
