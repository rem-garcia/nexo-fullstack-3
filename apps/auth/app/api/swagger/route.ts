import { NextResponse } from 'next/server'
import spec from '../../../src/swagger/swagger.json'

export const GET = async () => {
  return NextResponse.json(spec)
}