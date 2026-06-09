import * as reclamoService from '../../src/service/reclamoService';
import * as reclamoRepository from '../../src/repository/reclamoRepository';
import { ReclamoSchema } from '@nexo/schemas';

jest.mock('../../src/repository/reclamoRepository');

const mockedRepository = jest.mocked(reclamoRepository);

describe('reclamoService', () => {
        afterEach(() => jest.resetAllMocks());

        it('crearReclamo -> crea correctamente cuando payload es valido', async () => {
            const payload = {
                nombreCliente: "Juan Doe",
                emailCliente: "juan.doe@mail.com",
                numTelefono: "+56912345678",
                tipoPropiedad: "departamento",
                nroDpto: "315-A",
                tipoFalla: "filtracion",
                ubicacionFalla: "bano",
                descripcionFalla: "Se moja el baño cuando no esta corriendo la llave"
            };

            expect(ReclamoSchema.safeParse(payload).success).toBeTruthy();

            const created = {
                id: 'f473cdcb-1068-4050-b2d8-1a4ef0aad729',
                ...payload,
                creadoEn: new Date()
            };

            mockedRepository.createReclamo.mockResolvedValue(created as any);

            const response = await reclamoService.crearReclamo(payload);

            expect(mockedRepository.createReclamo).toHaveBeenCalledWith(expect.objectContaining(payload));
            expect(response).toEqual(created);
        })
    }
)
