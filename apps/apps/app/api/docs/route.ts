import swaggerJsdoc from 'swagger-jsdoc'
import { NextResponse } from 'next/server'

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Propiedades - Nexo',
      version: '1.0.0',
      description: 'Microservicio de gesti?n de propiedades inmobiliarias',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor de desarrollo',
      },
    ],
    components: {
      schemas: {
        Propiedad: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            codigo: { type: 'string', example: 'TORRE-A-501' },
            tipo: { type: 'string', example: 'Departamento' },
            direccion: { type: 'string', example: 'Av. Providencia 1234' },
            sector: { type: 'string', example: 'Providencia, Santiago' },
            piso: { type: 'integer', example: 5 },
            unidad: { type: 'string', example: '501' },
            torre: { type: 'string', example: 'Torre A' },
            m2: { type: 'integer', example: 65 },
            garantia: { type: 'string', example: 'Activa' },
            creado_en: { type: 'string', format: 'date-time' },
          },
        },
        CreatePropiedad: {
          type: 'object',
          required: ['codigo', 'tipo', 'direccion', 'sector', 'piso', 'unidad', 'torre', 'm2', 'garantia'],
          properties: {
            codigo: { type: 'string', example: 'TORRE-A-501' },
            tipo: { type: 'string', example: 'Departamento' },
            direccion: { type: 'string', example: 'Av. Providencia 1234' },
            sector: { type: 'string', example: 'Providencia, Santiago' },
            piso: { type: 'integer', example: 5 },
            unidad: { type: 'string', example: '501' },
            torre: { type: 'string', example: 'Torre A' },
            m2: { type: 'integer', example: 65 },
            garantia: { type: 'string', example: 'Activa' },
          },
        },
      },
    },
    paths: {
      '/api/propiedades': {
        get: {
          summary: 'Obtener todas las propiedades',
          tags: ['Propiedades'],
          responses: {
            '200': {
              description: 'Lista de propiedades',
              content: {
                'application/json': {
                  schema: { type: 'array', items: { ref: 'Propiedad' } },
                },
              },
            },
          },
        },
        post: {
          summary: 'Crear una nueva propiedad',
          tags: ['Propiedades'],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: { ref: 'CreatePropiedad' },
              },
            },
          },
          responses: {
            '201': {
              description: 'Propiedad creada',
            },
          },
        },
      },
      '/api/propiedades/{id}': {
        get: {
          summary: 'Obtener propiedad por ID',
          tags: ['Propiedades'],
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              schema: { type: 'string', format: 'uuid' },
            },
          ],
          responses: {
            '200': { description: 'Propiedad encontrada' },
            '404': { description: 'Propiedad no encontrada' },
          },
        },
      },
    },
  },
  apis: [],
}

const spec = swaggerJsdoc(options)

export async function GET() {
  return NextResponse.json(spec)
}
