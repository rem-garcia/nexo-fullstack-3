import { POST, GET } from "../../app/api/reclamos/route";
import { GET as GET_BY_ID, DELETE } from "../../app/api/reclamos/[id]/route";
import * as reclamoService from "../../src/service/reclamoService";

jest.mock("../../src/service/reclamoService");

jest.mock("../../src/lib/prisma", () => {
    const { prismaMock } = require("../../__mocks__/src/lib/prismaMock");

    return { prisma: prismaMock };
});

describe("Route Handlers", () => {
  it("POST debe devolver 201 si se crea reclamo", async () => {
    (reclamoService.crearReclamo as jest.Mock).mockResolvedValue({
      id: "1",
      nombreCliente: "Juanito Doe"
    });

    const req = new Request("http://localhost", {
      method: "POST",
      body: JSON.stringify({ nombreCliente: "Juanito Doe" }),
    });

    const res = await POST(req);
    expect(res.status).toBe(201);
    expect(await res.json()).toEqual({ id: "1", nombreCliente: "Juanito Doe" });
  });

  it("GET debe devolver 204 si no hay reclamos", async () => {
    (reclamoService.obtenerReclamos as jest.Mock).mockResolvedValue([]);
    const res = await GET();
    expect(res.status).toBe(204);
  });

  it("GET_BY_ID debe devolver 404 si reclamo no existe", async () => {
    (reclamoService.obtenerReclamoPorId as jest.Mock).mockRejectedValue(
      new Error('Reclamo con id "no-id" no existe.')
    );

    const res = await GET_BY_ID({} as any, { params: Promise.resolve({ id: "no-id" }) });
    expect(res.status).toBe(404);
  });

  it("DELETE debe devolver 204 si se elimina reclamo", async () => {
    (reclamoService.eliminarReclamo as jest.Mock).mockResolvedValue(undefined);

    const res = await DELETE({} as any, { params: Promise.resolve({ id: "1" }) });
    expect(res.status).toBe(204);
  });
});
