
// Funcion helper que convierte recursivamente las propiedades 'camelCase' a 'snake_case'
export const toSnakeCase = (input: any): any => {
  if (input == null) return input;
  if (Array.isArray(input)) return input.map(toSnakeCase);
  if (typeof input !== "object") return input;

  return Object.fromEntries(
    Object.entries(input).map(([k, v]) => [
      k.replace(/([A-Z])/g, "_$1").toLowerCase(),
      toSnakeCase(v),
    ])
  );
};
