import type { Config } from 'jest'

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  // Solo buscamos tests dentro de src/
  roots: ['<rootDir>/src'],
  testMatch: ['**/*.test.ts'],
}

export default config