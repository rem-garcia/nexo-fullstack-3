import { NextRequest, NextResponse } from 'next/server'
import { propiedadService } from '../../../src/service'
import { CreatePropiedadDto } from '../../../src/models'

export async function GET() {
  try {
    const propiedades = await propiedadService.getAll()
    return NextResponse.json(propiedades)
  } catch (error) {
    console.error('ERROR DETALLADO:', error)
    return NextResponse.json(
      { error: 'Error al obtener propiedades' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: CreatePropiedadDto = await request.json()
    const propiedad = await propiedadService.create(body)
    return NextResponse.json(propiedad, { status: 201 })
  } catch (error) {
    console.error('ERROR DETALLADO:', error)
    return NextResponse.json(
      { error: 'Error al crear propiedad' },
      { status: 500 }
    )
  }
}