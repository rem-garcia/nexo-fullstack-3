
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model propiedades
 * 
 */
export type propiedades = $Result.DefaultSelection<Prisma.$propiedadesPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Propiedades
 * const propiedades = await prisma.propiedades.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more Propiedades
   * const propiedades = await prisma.propiedades.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.propiedades`: Exposes CRUD operations for the **propiedades** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Propiedades
    * const propiedades = await prisma.propiedades.findMany()
    * ```
    */
  get propiedades(): Prisma.propiedadesDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.8.0
   * Query Engine version: 3c6e192761c0362d496ed980de936e2f3cebcd3a
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    propiedades: 'propiedades'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "propiedades"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      propiedades: {
        payload: Prisma.$propiedadesPayload<ExtArgs>
        fields: Prisma.propiedadesFieldRefs
        operations: {
          findUnique: {
            args: Prisma.propiedadesFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$propiedadesPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.propiedadesFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$propiedadesPayload>
          }
          findFirst: {
            args: Prisma.propiedadesFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$propiedadesPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.propiedadesFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$propiedadesPayload>
          }
          findMany: {
            args: Prisma.propiedadesFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$propiedadesPayload>[]
          }
          create: {
            args: Prisma.propiedadesCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$propiedadesPayload>
          }
          createMany: {
            args: Prisma.propiedadesCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.propiedadesCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$propiedadesPayload>[]
          }
          delete: {
            args: Prisma.propiedadesDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$propiedadesPayload>
          }
          update: {
            args: Prisma.propiedadesUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$propiedadesPayload>
          }
          deleteMany: {
            args: Prisma.propiedadesDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.propiedadesUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.propiedadesUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$propiedadesPayload>[]
          }
          upsert: {
            args: Prisma.propiedadesUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$propiedadesPayload>
          }
          aggregate: {
            args: Prisma.PropiedadesAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePropiedades>
          }
          groupBy: {
            args: Prisma.propiedadesGroupByArgs<ExtArgs>
            result: $Utils.Optional<PropiedadesGroupByOutputType>[]
          }
          count: {
            args: Prisma.propiedadesCountArgs<ExtArgs>
            result: $Utils.Optional<PropiedadesCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    propiedades?: propiedadesOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */



  /**
   * Models
   */

  /**
   * Model propiedades
   */

  export type AggregatePropiedades = {
    _count: PropiedadesCountAggregateOutputType | null
    _avg: PropiedadesAvgAggregateOutputType | null
    _sum: PropiedadesSumAggregateOutputType | null
    _min: PropiedadesMinAggregateOutputType | null
    _max: PropiedadesMaxAggregateOutputType | null
  }

  export type PropiedadesAvgAggregateOutputType = {
    piso: number | null
    m2: number | null
  }

  export type PropiedadesSumAggregateOutputType = {
    piso: number | null
    m2: number | null
  }

  export type PropiedadesMinAggregateOutputType = {
    id: string | null
    codigo: string | null
    tipo: string | null
    direccion: string | null
    sector: string | null
    piso: number | null
    unidad: string | null
    torre: string | null
    m2: number | null
    garantia: string | null
    creado_en: Date | null
  }

  export type PropiedadesMaxAggregateOutputType = {
    id: string | null
    codigo: string | null
    tipo: string | null
    direccion: string | null
    sector: string | null
    piso: number | null
    unidad: string | null
    torre: string | null
    m2: number | null
    garantia: string | null
    creado_en: Date | null
  }

  export type PropiedadesCountAggregateOutputType = {
    id: number
    codigo: number
    tipo: number
    direccion: number
    sector: number
    piso: number
    unidad: number
    torre: number
    m2: number
    garantia: number
    creado_en: number
    _all: number
  }


  export type PropiedadesAvgAggregateInputType = {
    piso?: true
    m2?: true
  }

  export type PropiedadesSumAggregateInputType = {
    piso?: true
    m2?: true
  }

  export type PropiedadesMinAggregateInputType = {
    id?: true
    codigo?: true
    tipo?: true
    direccion?: true
    sector?: true
    piso?: true
    unidad?: true
    torre?: true
    m2?: true
    garantia?: true
    creado_en?: true
  }

  export type PropiedadesMaxAggregateInputType = {
    id?: true
    codigo?: true
    tipo?: true
    direccion?: true
    sector?: true
    piso?: true
    unidad?: true
    torre?: true
    m2?: true
    garantia?: true
    creado_en?: true
  }

  export type PropiedadesCountAggregateInputType = {
    id?: true
    codigo?: true
    tipo?: true
    direccion?: true
    sector?: true
    piso?: true
    unidad?: true
    torre?: true
    m2?: true
    garantia?: true
    creado_en?: true
    _all?: true
  }

  export type PropiedadesAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which propiedades to aggregate.
     */
    where?: propiedadesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of propiedades to fetch.
     */
    orderBy?: propiedadesOrderByWithRelationInput | propiedadesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: propiedadesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` propiedades from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` propiedades.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned propiedades
    **/
    _count?: true | PropiedadesCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PropiedadesAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PropiedadesSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PropiedadesMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PropiedadesMaxAggregateInputType
  }

  export type GetPropiedadesAggregateType<T extends PropiedadesAggregateArgs> = {
        [P in keyof T & keyof AggregatePropiedades]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePropiedades[P]>
      : GetScalarType<T[P], AggregatePropiedades[P]>
  }




  export type propiedadesGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: propiedadesWhereInput
    orderBy?: propiedadesOrderByWithAggregationInput | propiedadesOrderByWithAggregationInput[]
    by: PropiedadesScalarFieldEnum[] | PropiedadesScalarFieldEnum
    having?: propiedadesScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PropiedadesCountAggregateInputType | true
    _avg?: PropiedadesAvgAggregateInputType
    _sum?: PropiedadesSumAggregateInputType
    _min?: PropiedadesMinAggregateInputType
    _max?: PropiedadesMaxAggregateInputType
  }

  export type PropiedadesGroupByOutputType = {
    id: string
    codigo: string
    tipo: string
    direccion: string
    sector: string
    piso: number
    unidad: string
    torre: string
    m2: number
    garantia: string
    creado_en: Date
    _count: PropiedadesCountAggregateOutputType | null
    _avg: PropiedadesAvgAggregateOutputType | null
    _sum: PropiedadesSumAggregateOutputType | null
    _min: PropiedadesMinAggregateOutputType | null
    _max: PropiedadesMaxAggregateOutputType | null
  }

  type GetPropiedadesGroupByPayload<T extends propiedadesGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PropiedadesGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PropiedadesGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PropiedadesGroupByOutputType[P]>
            : GetScalarType<T[P], PropiedadesGroupByOutputType[P]>
        }
      >
    >


  export type propiedadesSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    codigo?: boolean
    tipo?: boolean
    direccion?: boolean
    sector?: boolean
    piso?: boolean
    unidad?: boolean
    torre?: boolean
    m2?: boolean
    garantia?: boolean
    creado_en?: boolean
  }, ExtArgs["result"]["propiedades"]>

  export type propiedadesSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    codigo?: boolean
    tipo?: boolean
    direccion?: boolean
    sector?: boolean
    piso?: boolean
    unidad?: boolean
    torre?: boolean
    m2?: boolean
    garantia?: boolean
    creado_en?: boolean
  }, ExtArgs["result"]["propiedades"]>

  export type propiedadesSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    codigo?: boolean
    tipo?: boolean
    direccion?: boolean
    sector?: boolean
    piso?: boolean
    unidad?: boolean
    torre?: boolean
    m2?: boolean
    garantia?: boolean
    creado_en?: boolean
  }, ExtArgs["result"]["propiedades"]>

  export type propiedadesSelectScalar = {
    id?: boolean
    codigo?: boolean
    tipo?: boolean
    direccion?: boolean
    sector?: boolean
    piso?: boolean
    unidad?: boolean
    torre?: boolean
    m2?: boolean
    garantia?: boolean
    creado_en?: boolean
  }

  export type propiedadesOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "codigo" | "tipo" | "direccion" | "sector" | "piso" | "unidad" | "torre" | "m2" | "garantia" | "creado_en", ExtArgs["result"]["propiedades"]>

  export type $propiedadesPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "propiedades"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      codigo: string
      tipo: string
      direccion: string
      sector: string
      piso: number
      unidad: string
      torre: string
      m2: number
      garantia: string
      creado_en: Date
    }, ExtArgs["result"]["propiedades"]>
    composites: {}
  }

  type propiedadesGetPayload<S extends boolean | null | undefined | propiedadesDefaultArgs> = $Result.GetResult<Prisma.$propiedadesPayload, S>

  type propiedadesCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<propiedadesFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PropiedadesCountAggregateInputType | true
    }

  export interface propiedadesDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['propiedades'], meta: { name: 'propiedades' } }
    /**
     * Find zero or one Propiedades that matches the filter.
     * @param {propiedadesFindUniqueArgs} args - Arguments to find a Propiedades
     * @example
     * // Get one Propiedades
     * const propiedades = await prisma.propiedades.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends propiedadesFindUniqueArgs>(args: SelectSubset<T, propiedadesFindUniqueArgs<ExtArgs>>): Prisma__propiedadesClient<$Result.GetResult<Prisma.$propiedadesPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Propiedades that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {propiedadesFindUniqueOrThrowArgs} args - Arguments to find a Propiedades
     * @example
     * // Get one Propiedades
     * const propiedades = await prisma.propiedades.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends propiedadesFindUniqueOrThrowArgs>(args: SelectSubset<T, propiedadesFindUniqueOrThrowArgs<ExtArgs>>): Prisma__propiedadesClient<$Result.GetResult<Prisma.$propiedadesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Propiedades that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {propiedadesFindFirstArgs} args - Arguments to find a Propiedades
     * @example
     * // Get one Propiedades
     * const propiedades = await prisma.propiedades.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends propiedadesFindFirstArgs>(args?: SelectSubset<T, propiedadesFindFirstArgs<ExtArgs>>): Prisma__propiedadesClient<$Result.GetResult<Prisma.$propiedadesPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Propiedades that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {propiedadesFindFirstOrThrowArgs} args - Arguments to find a Propiedades
     * @example
     * // Get one Propiedades
     * const propiedades = await prisma.propiedades.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends propiedadesFindFirstOrThrowArgs>(args?: SelectSubset<T, propiedadesFindFirstOrThrowArgs<ExtArgs>>): Prisma__propiedadesClient<$Result.GetResult<Prisma.$propiedadesPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Propiedades that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {propiedadesFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Propiedades
     * const propiedades = await prisma.propiedades.findMany()
     * 
     * // Get first 10 Propiedades
     * const propiedades = await prisma.propiedades.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const propiedadesWithIdOnly = await prisma.propiedades.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends propiedadesFindManyArgs>(args?: SelectSubset<T, propiedadesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$propiedadesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Propiedades.
     * @param {propiedadesCreateArgs} args - Arguments to create a Propiedades.
     * @example
     * // Create one Propiedades
     * const Propiedades = await prisma.propiedades.create({
     *   data: {
     *     // ... data to create a Propiedades
     *   }
     * })
     * 
     */
    create<T extends propiedadesCreateArgs>(args: SelectSubset<T, propiedadesCreateArgs<ExtArgs>>): Prisma__propiedadesClient<$Result.GetResult<Prisma.$propiedadesPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Propiedades.
     * @param {propiedadesCreateManyArgs} args - Arguments to create many Propiedades.
     * @example
     * // Create many Propiedades
     * const propiedades = await prisma.propiedades.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends propiedadesCreateManyArgs>(args?: SelectSubset<T, propiedadesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Propiedades and returns the data saved in the database.
     * @param {propiedadesCreateManyAndReturnArgs} args - Arguments to create many Propiedades.
     * @example
     * // Create many Propiedades
     * const propiedades = await prisma.propiedades.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Propiedades and only return the `id`
     * const propiedadesWithIdOnly = await prisma.propiedades.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends propiedadesCreateManyAndReturnArgs>(args?: SelectSubset<T, propiedadesCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$propiedadesPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Propiedades.
     * @param {propiedadesDeleteArgs} args - Arguments to delete one Propiedades.
     * @example
     * // Delete one Propiedades
     * const Propiedades = await prisma.propiedades.delete({
     *   where: {
     *     // ... filter to delete one Propiedades
     *   }
     * })
     * 
     */
    delete<T extends propiedadesDeleteArgs>(args: SelectSubset<T, propiedadesDeleteArgs<ExtArgs>>): Prisma__propiedadesClient<$Result.GetResult<Prisma.$propiedadesPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Propiedades.
     * @param {propiedadesUpdateArgs} args - Arguments to update one Propiedades.
     * @example
     * // Update one Propiedades
     * const propiedades = await prisma.propiedades.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends propiedadesUpdateArgs>(args: SelectSubset<T, propiedadesUpdateArgs<ExtArgs>>): Prisma__propiedadesClient<$Result.GetResult<Prisma.$propiedadesPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Propiedades.
     * @param {propiedadesDeleteManyArgs} args - Arguments to filter Propiedades to delete.
     * @example
     * // Delete a few Propiedades
     * const { count } = await prisma.propiedades.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends propiedadesDeleteManyArgs>(args?: SelectSubset<T, propiedadesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Propiedades.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {propiedadesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Propiedades
     * const propiedades = await prisma.propiedades.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends propiedadesUpdateManyArgs>(args: SelectSubset<T, propiedadesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Propiedades and returns the data updated in the database.
     * @param {propiedadesUpdateManyAndReturnArgs} args - Arguments to update many Propiedades.
     * @example
     * // Update many Propiedades
     * const propiedades = await prisma.propiedades.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Propiedades and only return the `id`
     * const propiedadesWithIdOnly = await prisma.propiedades.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends propiedadesUpdateManyAndReturnArgs>(args: SelectSubset<T, propiedadesUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$propiedadesPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Propiedades.
     * @param {propiedadesUpsertArgs} args - Arguments to update or create a Propiedades.
     * @example
     * // Update or create a Propiedades
     * const propiedades = await prisma.propiedades.upsert({
     *   create: {
     *     // ... data to create a Propiedades
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Propiedades we want to update
     *   }
     * })
     */
    upsert<T extends propiedadesUpsertArgs>(args: SelectSubset<T, propiedadesUpsertArgs<ExtArgs>>): Prisma__propiedadesClient<$Result.GetResult<Prisma.$propiedadesPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Propiedades.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {propiedadesCountArgs} args - Arguments to filter Propiedades to count.
     * @example
     * // Count the number of Propiedades
     * const count = await prisma.propiedades.count({
     *   where: {
     *     // ... the filter for the Propiedades we want to count
     *   }
     * })
    **/
    count<T extends propiedadesCountArgs>(
      args?: Subset<T, propiedadesCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PropiedadesCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Propiedades.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PropiedadesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PropiedadesAggregateArgs>(args: Subset<T, PropiedadesAggregateArgs>): Prisma.PrismaPromise<GetPropiedadesAggregateType<T>>

    /**
     * Group by Propiedades.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {propiedadesGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends propiedadesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: propiedadesGroupByArgs['orderBy'] }
        : { orderBy?: propiedadesGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, propiedadesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPropiedadesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the propiedades model
   */
  readonly fields: propiedadesFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for propiedades.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__propiedadesClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the propiedades model
   */
  interface propiedadesFieldRefs {
    readonly id: FieldRef<"propiedades", 'String'>
    readonly codigo: FieldRef<"propiedades", 'String'>
    readonly tipo: FieldRef<"propiedades", 'String'>
    readonly direccion: FieldRef<"propiedades", 'String'>
    readonly sector: FieldRef<"propiedades", 'String'>
    readonly piso: FieldRef<"propiedades", 'Int'>
    readonly unidad: FieldRef<"propiedades", 'String'>
    readonly torre: FieldRef<"propiedades", 'String'>
    readonly m2: FieldRef<"propiedades", 'Int'>
    readonly garantia: FieldRef<"propiedades", 'String'>
    readonly creado_en: FieldRef<"propiedades", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * propiedades findUnique
   */
  export type propiedadesFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the propiedades
     */
    select?: propiedadesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the propiedades
     */
    omit?: propiedadesOmit<ExtArgs> | null
    /**
     * Filter, which propiedades to fetch.
     */
    where: propiedadesWhereUniqueInput
  }

  /**
   * propiedades findUniqueOrThrow
   */
  export type propiedadesFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the propiedades
     */
    select?: propiedadesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the propiedades
     */
    omit?: propiedadesOmit<ExtArgs> | null
    /**
     * Filter, which propiedades to fetch.
     */
    where: propiedadesWhereUniqueInput
  }

  /**
   * propiedades findFirst
   */
  export type propiedadesFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the propiedades
     */
    select?: propiedadesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the propiedades
     */
    omit?: propiedadesOmit<ExtArgs> | null
    /**
     * Filter, which propiedades to fetch.
     */
    where?: propiedadesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of propiedades to fetch.
     */
    orderBy?: propiedadesOrderByWithRelationInput | propiedadesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for propiedades.
     */
    cursor?: propiedadesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` propiedades from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` propiedades.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of propiedades.
     */
    distinct?: PropiedadesScalarFieldEnum | PropiedadesScalarFieldEnum[]
  }

  /**
   * propiedades findFirstOrThrow
   */
  export type propiedadesFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the propiedades
     */
    select?: propiedadesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the propiedades
     */
    omit?: propiedadesOmit<ExtArgs> | null
    /**
     * Filter, which propiedades to fetch.
     */
    where?: propiedadesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of propiedades to fetch.
     */
    orderBy?: propiedadesOrderByWithRelationInput | propiedadesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for propiedades.
     */
    cursor?: propiedadesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` propiedades from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` propiedades.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of propiedades.
     */
    distinct?: PropiedadesScalarFieldEnum | PropiedadesScalarFieldEnum[]
  }

  /**
   * propiedades findMany
   */
  export type propiedadesFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the propiedades
     */
    select?: propiedadesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the propiedades
     */
    omit?: propiedadesOmit<ExtArgs> | null
    /**
     * Filter, which propiedades to fetch.
     */
    where?: propiedadesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of propiedades to fetch.
     */
    orderBy?: propiedadesOrderByWithRelationInput | propiedadesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing propiedades.
     */
    cursor?: propiedadesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` propiedades from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` propiedades.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of propiedades.
     */
    distinct?: PropiedadesScalarFieldEnum | PropiedadesScalarFieldEnum[]
  }

  /**
   * propiedades create
   */
  export type propiedadesCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the propiedades
     */
    select?: propiedadesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the propiedades
     */
    omit?: propiedadesOmit<ExtArgs> | null
    /**
     * The data needed to create a propiedades.
     */
    data: XOR<propiedadesCreateInput, propiedadesUncheckedCreateInput>
  }

  /**
   * propiedades createMany
   */
  export type propiedadesCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many propiedades.
     */
    data: propiedadesCreateManyInput | propiedadesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * propiedades createManyAndReturn
   */
  export type propiedadesCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the propiedades
     */
    select?: propiedadesSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the propiedades
     */
    omit?: propiedadesOmit<ExtArgs> | null
    /**
     * The data used to create many propiedades.
     */
    data: propiedadesCreateManyInput | propiedadesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * propiedades update
   */
  export type propiedadesUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the propiedades
     */
    select?: propiedadesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the propiedades
     */
    omit?: propiedadesOmit<ExtArgs> | null
    /**
     * The data needed to update a propiedades.
     */
    data: XOR<propiedadesUpdateInput, propiedadesUncheckedUpdateInput>
    /**
     * Choose, which propiedades to update.
     */
    where: propiedadesWhereUniqueInput
  }

  /**
   * propiedades updateMany
   */
  export type propiedadesUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update propiedades.
     */
    data: XOR<propiedadesUpdateManyMutationInput, propiedadesUncheckedUpdateManyInput>
    /**
     * Filter which propiedades to update
     */
    where?: propiedadesWhereInput
    /**
     * Limit how many propiedades to update.
     */
    limit?: number
  }

  /**
   * propiedades updateManyAndReturn
   */
  export type propiedadesUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the propiedades
     */
    select?: propiedadesSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the propiedades
     */
    omit?: propiedadesOmit<ExtArgs> | null
    /**
     * The data used to update propiedades.
     */
    data: XOR<propiedadesUpdateManyMutationInput, propiedadesUncheckedUpdateManyInput>
    /**
     * Filter which propiedades to update
     */
    where?: propiedadesWhereInput
    /**
     * Limit how many propiedades to update.
     */
    limit?: number
  }

  /**
   * propiedades upsert
   */
  export type propiedadesUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the propiedades
     */
    select?: propiedadesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the propiedades
     */
    omit?: propiedadesOmit<ExtArgs> | null
    /**
     * The filter to search for the propiedades to update in case it exists.
     */
    where: propiedadesWhereUniqueInput
    /**
     * In case the propiedades found by the `where` argument doesn't exist, create a new propiedades with this data.
     */
    create: XOR<propiedadesCreateInput, propiedadesUncheckedCreateInput>
    /**
     * In case the propiedades was found with the provided `where` argument, update it with this data.
     */
    update: XOR<propiedadesUpdateInput, propiedadesUncheckedUpdateInput>
  }

  /**
   * propiedades delete
   */
  export type propiedadesDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the propiedades
     */
    select?: propiedadesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the propiedades
     */
    omit?: propiedadesOmit<ExtArgs> | null
    /**
     * Filter which propiedades to delete.
     */
    where: propiedadesWhereUniqueInput
  }

  /**
   * propiedades deleteMany
   */
  export type propiedadesDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which propiedades to delete
     */
    where?: propiedadesWhereInput
    /**
     * Limit how many propiedades to delete.
     */
    limit?: number
  }

  /**
   * propiedades without action
   */
  export type propiedadesDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the propiedades
     */
    select?: propiedadesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the propiedades
     */
    omit?: propiedadesOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const PropiedadesScalarFieldEnum: {
    id: 'id',
    codigo: 'codigo',
    tipo: 'tipo',
    direccion: 'direccion',
    sector: 'sector',
    piso: 'piso',
    unidad: 'unidad',
    torre: 'torre',
    m2: 'm2',
    garantia: 'garantia',
    creado_en: 'creado_en'
  };

  export type PropiedadesScalarFieldEnum = (typeof PropiedadesScalarFieldEnum)[keyof typeof PropiedadesScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type propiedadesWhereInput = {
    AND?: propiedadesWhereInput | propiedadesWhereInput[]
    OR?: propiedadesWhereInput[]
    NOT?: propiedadesWhereInput | propiedadesWhereInput[]
    id?: UuidFilter<"propiedades"> | string
    codigo?: StringFilter<"propiedades"> | string
    tipo?: StringFilter<"propiedades"> | string
    direccion?: StringFilter<"propiedades"> | string
    sector?: StringFilter<"propiedades"> | string
    piso?: IntFilter<"propiedades"> | number
    unidad?: StringFilter<"propiedades"> | string
    torre?: StringFilter<"propiedades"> | string
    m2?: IntFilter<"propiedades"> | number
    garantia?: StringFilter<"propiedades"> | string
    creado_en?: DateTimeFilter<"propiedades"> | Date | string
  }

  export type propiedadesOrderByWithRelationInput = {
    id?: SortOrder
    codigo?: SortOrder
    tipo?: SortOrder
    direccion?: SortOrder
    sector?: SortOrder
    piso?: SortOrder
    unidad?: SortOrder
    torre?: SortOrder
    m2?: SortOrder
    garantia?: SortOrder
    creado_en?: SortOrder
  }

  export type propiedadesWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: propiedadesWhereInput | propiedadesWhereInput[]
    OR?: propiedadesWhereInput[]
    NOT?: propiedadesWhereInput | propiedadesWhereInput[]
    codigo?: StringFilter<"propiedades"> | string
    tipo?: StringFilter<"propiedades"> | string
    direccion?: StringFilter<"propiedades"> | string
    sector?: StringFilter<"propiedades"> | string
    piso?: IntFilter<"propiedades"> | number
    unidad?: StringFilter<"propiedades"> | string
    torre?: StringFilter<"propiedades"> | string
    m2?: IntFilter<"propiedades"> | number
    garantia?: StringFilter<"propiedades"> | string
    creado_en?: DateTimeFilter<"propiedades"> | Date | string
  }, "id">

  export type propiedadesOrderByWithAggregationInput = {
    id?: SortOrder
    codigo?: SortOrder
    tipo?: SortOrder
    direccion?: SortOrder
    sector?: SortOrder
    piso?: SortOrder
    unidad?: SortOrder
    torre?: SortOrder
    m2?: SortOrder
    garantia?: SortOrder
    creado_en?: SortOrder
    _count?: propiedadesCountOrderByAggregateInput
    _avg?: propiedadesAvgOrderByAggregateInput
    _max?: propiedadesMaxOrderByAggregateInput
    _min?: propiedadesMinOrderByAggregateInput
    _sum?: propiedadesSumOrderByAggregateInput
  }

  export type propiedadesScalarWhereWithAggregatesInput = {
    AND?: propiedadesScalarWhereWithAggregatesInput | propiedadesScalarWhereWithAggregatesInput[]
    OR?: propiedadesScalarWhereWithAggregatesInput[]
    NOT?: propiedadesScalarWhereWithAggregatesInput | propiedadesScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"propiedades"> | string
    codigo?: StringWithAggregatesFilter<"propiedades"> | string
    tipo?: StringWithAggregatesFilter<"propiedades"> | string
    direccion?: StringWithAggregatesFilter<"propiedades"> | string
    sector?: StringWithAggregatesFilter<"propiedades"> | string
    piso?: IntWithAggregatesFilter<"propiedades"> | number
    unidad?: StringWithAggregatesFilter<"propiedades"> | string
    torre?: StringWithAggregatesFilter<"propiedades"> | string
    m2?: IntWithAggregatesFilter<"propiedades"> | number
    garantia?: StringWithAggregatesFilter<"propiedades"> | string
    creado_en?: DateTimeWithAggregatesFilter<"propiedades"> | Date | string
  }

  export type propiedadesCreateInput = {
    id?: string
    codigo: string
    tipo: string
    direccion: string
    sector: string
    piso: number
    unidad: string
    torre: string
    m2: number
    garantia: string
    creado_en?: Date | string
  }

  export type propiedadesUncheckedCreateInput = {
    id?: string
    codigo: string
    tipo: string
    direccion: string
    sector: string
    piso: number
    unidad: string
    torre: string
    m2: number
    garantia: string
    creado_en?: Date | string
  }

  export type propiedadesUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    codigo?: StringFieldUpdateOperationsInput | string
    tipo?: StringFieldUpdateOperationsInput | string
    direccion?: StringFieldUpdateOperationsInput | string
    sector?: StringFieldUpdateOperationsInput | string
    piso?: IntFieldUpdateOperationsInput | number
    unidad?: StringFieldUpdateOperationsInput | string
    torre?: StringFieldUpdateOperationsInput | string
    m2?: IntFieldUpdateOperationsInput | number
    garantia?: StringFieldUpdateOperationsInput | string
    creado_en?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type propiedadesUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    codigo?: StringFieldUpdateOperationsInput | string
    tipo?: StringFieldUpdateOperationsInput | string
    direccion?: StringFieldUpdateOperationsInput | string
    sector?: StringFieldUpdateOperationsInput | string
    piso?: IntFieldUpdateOperationsInput | number
    unidad?: StringFieldUpdateOperationsInput | string
    torre?: StringFieldUpdateOperationsInput | string
    m2?: IntFieldUpdateOperationsInput | number
    garantia?: StringFieldUpdateOperationsInput | string
    creado_en?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type propiedadesCreateManyInput = {
    id?: string
    codigo: string
    tipo: string
    direccion: string
    sector: string
    piso: number
    unidad: string
    torre: string
    m2: number
    garantia: string
    creado_en?: Date | string
  }

  export type propiedadesUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    codigo?: StringFieldUpdateOperationsInput | string
    tipo?: StringFieldUpdateOperationsInput | string
    direccion?: StringFieldUpdateOperationsInput | string
    sector?: StringFieldUpdateOperationsInput | string
    piso?: IntFieldUpdateOperationsInput | number
    unidad?: StringFieldUpdateOperationsInput | string
    torre?: StringFieldUpdateOperationsInput | string
    m2?: IntFieldUpdateOperationsInput | number
    garantia?: StringFieldUpdateOperationsInput | string
    creado_en?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type propiedadesUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    codigo?: StringFieldUpdateOperationsInput | string
    tipo?: StringFieldUpdateOperationsInput | string
    direccion?: StringFieldUpdateOperationsInput | string
    sector?: StringFieldUpdateOperationsInput | string
    piso?: IntFieldUpdateOperationsInput | number
    unidad?: StringFieldUpdateOperationsInput | string
    torre?: StringFieldUpdateOperationsInput | string
    m2?: IntFieldUpdateOperationsInput | number
    garantia?: StringFieldUpdateOperationsInput | string
    creado_en?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UuidFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidFilter<$PrismaModel> | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type propiedadesCountOrderByAggregateInput = {
    id?: SortOrder
    codigo?: SortOrder
    tipo?: SortOrder
    direccion?: SortOrder
    sector?: SortOrder
    piso?: SortOrder
    unidad?: SortOrder
    torre?: SortOrder
    m2?: SortOrder
    garantia?: SortOrder
    creado_en?: SortOrder
  }

  export type propiedadesAvgOrderByAggregateInput = {
    piso?: SortOrder
    m2?: SortOrder
  }

  export type propiedadesMaxOrderByAggregateInput = {
    id?: SortOrder
    codigo?: SortOrder
    tipo?: SortOrder
    direccion?: SortOrder
    sector?: SortOrder
    piso?: SortOrder
    unidad?: SortOrder
    torre?: SortOrder
    m2?: SortOrder
    garantia?: SortOrder
    creado_en?: SortOrder
  }

  export type propiedadesMinOrderByAggregateInput = {
    id?: SortOrder
    codigo?: SortOrder
    tipo?: SortOrder
    direccion?: SortOrder
    sector?: SortOrder
    piso?: SortOrder
    unidad?: SortOrder
    torre?: SortOrder
    m2?: SortOrder
    garantia?: SortOrder
    creado_en?: SortOrder
  }

  export type propiedadesSumOrderByAggregateInput = {
    piso?: SortOrder
    m2?: SortOrder
  }

  export type UuidWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NestedUuidFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidFilter<$PrismaModel> | string
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedUuidWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}