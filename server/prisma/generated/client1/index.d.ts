
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model ActiveUser
 * 
 */
export type ActiveUser = $Result.DefaultSelection<Prisma.$ActiveUserPayload>
/**
 * Model ActiveDuoCall
 * 
 */
export type ActiveDuoCall = $Result.DefaultSelection<Prisma.$ActiveDuoCallPayload>

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
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
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
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
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
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
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs>;

  /**
   * `prisma.activeUser`: Exposes CRUD operations for the **ActiveUser** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ActiveUsers
    * const activeUsers = await prisma.activeUser.findMany()
    * ```
    */
  get activeUser(): Prisma.ActiveUserDelegate<ExtArgs>;

  /**
   * `prisma.activeDuoCall`: Exposes CRUD operations for the **ActiveDuoCall** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ActiveDuoCalls
    * const activeDuoCalls = await prisma.activeDuoCall.findMany()
    * ```
    */
  get activeDuoCall(): Prisma.ActiveDuoCallDelegate<ExtArgs>;
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
  export import NotFoundError = runtime.NotFoundError

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
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

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
   * Prisma Client JS version: 5.21.1
   * Query Engine version: bf0e5e8a04cada8225617067eaa03d041e2bba36
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */


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
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
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
    User: 'User',
    ActiveUser: 'ActiveUser',
    ActiveDuoCall: 'ActiveDuoCall'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "user" | "activeUser" | "activeDuoCall"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      ActiveUser: {
        payload: Prisma.$ActiveUserPayload<ExtArgs>
        fields: Prisma.ActiveUserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ActiveUserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActiveUserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ActiveUserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActiveUserPayload>
          }
          findFirst: {
            args: Prisma.ActiveUserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActiveUserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ActiveUserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActiveUserPayload>
          }
          findMany: {
            args: Prisma.ActiveUserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActiveUserPayload>[]
          }
          create: {
            args: Prisma.ActiveUserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActiveUserPayload>
          }
          createMany: {
            args: Prisma.ActiveUserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ActiveUserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActiveUserPayload>[]
          }
          delete: {
            args: Prisma.ActiveUserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActiveUserPayload>
          }
          update: {
            args: Prisma.ActiveUserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActiveUserPayload>
          }
          deleteMany: {
            args: Prisma.ActiveUserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ActiveUserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ActiveUserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActiveUserPayload>
          }
          aggregate: {
            args: Prisma.ActiveUserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateActiveUser>
          }
          groupBy: {
            args: Prisma.ActiveUserGroupByArgs<ExtArgs>
            result: $Utils.Optional<ActiveUserGroupByOutputType>[]
          }
          count: {
            args: Prisma.ActiveUserCountArgs<ExtArgs>
            result: $Utils.Optional<ActiveUserCountAggregateOutputType> | number
          }
        }
      }
      ActiveDuoCall: {
        payload: Prisma.$ActiveDuoCallPayload<ExtArgs>
        fields: Prisma.ActiveDuoCallFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ActiveDuoCallFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActiveDuoCallPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ActiveDuoCallFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActiveDuoCallPayload>
          }
          findFirst: {
            args: Prisma.ActiveDuoCallFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActiveDuoCallPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ActiveDuoCallFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActiveDuoCallPayload>
          }
          findMany: {
            args: Prisma.ActiveDuoCallFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActiveDuoCallPayload>[]
          }
          create: {
            args: Prisma.ActiveDuoCallCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActiveDuoCallPayload>
          }
          createMany: {
            args: Prisma.ActiveDuoCallCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ActiveDuoCallCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActiveDuoCallPayload>[]
          }
          delete: {
            args: Prisma.ActiveDuoCallDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActiveDuoCallPayload>
          }
          update: {
            args: Prisma.ActiveDuoCallUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActiveDuoCallPayload>
          }
          deleteMany: {
            args: Prisma.ActiveDuoCallDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ActiveDuoCallUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ActiveDuoCallUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActiveDuoCallPayload>
          }
          aggregate: {
            args: Prisma.ActiveDuoCallAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateActiveDuoCall>
          }
          groupBy: {
            args: Prisma.ActiveDuoCallGroupByArgs<ExtArgs>
            result: $Utils.Optional<ActiveDuoCallGroupByOutputType>[]
          }
          count: {
            args: Prisma.ActiveDuoCallCountArgs<ExtArgs>
            result: $Utils.Optional<ActiveDuoCallCountAggregateOutputType> | number
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
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
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
  }


  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

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

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

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
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    activeUsers: number
    activeDuoCalls: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    activeUsers?: boolean | UserCountOutputTypeCountActiveUsersArgs
    activeDuoCalls?: boolean | UserCountOutputTypeCountActiveDuoCallsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountActiveUsersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ActiveUserWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountActiveDuoCallsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ActiveDuoCallWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    id: number | null
  }

  export type UserSumAggregateOutputType = {
    id: number | null
  }

  export type UserMinAggregateOutputType = {
    id: number | null
    email: string | null
    name: string | null
    username: string | null
    pfp: string | null
    about: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: number | null
    email: string | null
    name: string | null
    username: string | null
    pfp: string | null
    about: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    name: number
    username: number
    pfp: number
    about: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    id?: true
  }

  export type UserSumAggregateInputType = {
    id?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    name?: true
    username?: true
    pfp?: true
    about?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    name?: true
    username?: true
    pfp?: true
    about?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    name?: true
    username?: true
    pfp?: true
    about?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: number
    email: string
    name: string
    username: string
    pfp: string
    about: string
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    username?: boolean
    pfp?: boolean
    about?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    activeUsers?: boolean | User$activeUsersArgs<ExtArgs>
    activeDuoCalls?: boolean | User$activeDuoCallsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    username?: boolean
    pfp?: boolean
    about?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    name?: boolean
    username?: boolean
    pfp?: boolean
    about?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    activeUsers?: boolean | User$activeUsersArgs<ExtArgs>
    activeDuoCalls?: boolean | User$activeDuoCallsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      activeUsers: Prisma.$ActiveUserPayload<ExtArgs>[]
      activeDuoCalls: Prisma.$ActiveDuoCallPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      email: string
      name: string
      username: string
      pfp: string
      about: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
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
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    activeUsers<T extends User$activeUsersArgs<ExtArgs> = {}>(args?: Subset<T, User$activeUsersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActiveUserPayload<ExtArgs>, T, "findMany"> | Null>
    activeDuoCalls<T extends User$activeDuoCallsArgs<ExtArgs> = {}>(args?: Subset<T, User$activeDuoCallsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActiveDuoCallPayload<ExtArgs>, T, "findMany"> | Null>
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
   * Fields of the User model
   */ 
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'Int'>
    readonly email: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly username: FieldRef<"User", 'String'>
    readonly pfp: FieldRef<"User", 'String'>
    readonly about: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
  }

  /**
   * User.activeUsers
   */
  export type User$activeUsersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActiveUser
     */
    select?: ActiveUserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActiveUserInclude<ExtArgs> | null
    where?: ActiveUserWhereInput
    orderBy?: ActiveUserOrderByWithRelationInput | ActiveUserOrderByWithRelationInput[]
    cursor?: ActiveUserWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ActiveUserScalarFieldEnum | ActiveUserScalarFieldEnum[]
  }

  /**
   * User.activeDuoCalls
   */
  export type User$activeDuoCallsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActiveDuoCall
     */
    select?: ActiveDuoCallSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActiveDuoCallInclude<ExtArgs> | null
    where?: ActiveDuoCallWhereInput
    orderBy?: ActiveDuoCallOrderByWithRelationInput | ActiveDuoCallOrderByWithRelationInput[]
    cursor?: ActiveDuoCallWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ActiveDuoCallScalarFieldEnum | ActiveDuoCallScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model ActiveUser
   */

  export type AggregateActiveUser = {
    _count: ActiveUserCountAggregateOutputType | null
    _avg: ActiveUserAvgAggregateOutputType | null
    _sum: ActiveUserSumAggregateOutputType | null
    _min: ActiveUserMinAggregateOutputType | null
    _max: ActiveUserMaxAggregateOutputType | null
  }

  export type ActiveUserAvgAggregateOutputType = {
    id: number | null
  }

  export type ActiveUserSumAggregateOutputType = {
    id: number | null
  }

  export type ActiveUserMinAggregateOutputType = {
    id: number | null
    socketId: string | null
    username: string | null
    duoSocketId: string | null
    duoUsername: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ActiveUserMaxAggregateOutputType = {
    id: number | null
    socketId: string | null
    username: string | null
    duoSocketId: string | null
    duoUsername: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ActiveUserCountAggregateOutputType = {
    id: number
    socketId: number
    username: number
    duoSocketId: number
    duoUsername: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ActiveUserAvgAggregateInputType = {
    id?: true
  }

  export type ActiveUserSumAggregateInputType = {
    id?: true
  }

  export type ActiveUserMinAggregateInputType = {
    id?: true
    socketId?: true
    username?: true
    duoSocketId?: true
    duoUsername?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ActiveUserMaxAggregateInputType = {
    id?: true
    socketId?: true
    username?: true
    duoSocketId?: true
    duoUsername?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ActiveUserCountAggregateInputType = {
    id?: true
    socketId?: true
    username?: true
    duoSocketId?: true
    duoUsername?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ActiveUserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ActiveUser to aggregate.
     */
    where?: ActiveUserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ActiveUsers to fetch.
     */
    orderBy?: ActiveUserOrderByWithRelationInput | ActiveUserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ActiveUserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ActiveUsers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ActiveUsers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ActiveUsers
    **/
    _count?: true | ActiveUserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ActiveUserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ActiveUserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ActiveUserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ActiveUserMaxAggregateInputType
  }

  export type GetActiveUserAggregateType<T extends ActiveUserAggregateArgs> = {
        [P in keyof T & keyof AggregateActiveUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateActiveUser[P]>
      : GetScalarType<T[P], AggregateActiveUser[P]>
  }




  export type ActiveUserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ActiveUserWhereInput
    orderBy?: ActiveUserOrderByWithAggregationInput | ActiveUserOrderByWithAggregationInput[]
    by: ActiveUserScalarFieldEnum[] | ActiveUserScalarFieldEnum
    having?: ActiveUserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ActiveUserCountAggregateInputType | true
    _avg?: ActiveUserAvgAggregateInputType
    _sum?: ActiveUserSumAggregateInputType
    _min?: ActiveUserMinAggregateInputType
    _max?: ActiveUserMaxAggregateInputType
  }

  export type ActiveUserGroupByOutputType = {
    id: number
    socketId: string
    username: string
    duoSocketId: string | null
    duoUsername: string | null
    createdAt: Date
    updatedAt: Date
    _count: ActiveUserCountAggregateOutputType | null
    _avg: ActiveUserAvgAggregateOutputType | null
    _sum: ActiveUserSumAggregateOutputType | null
    _min: ActiveUserMinAggregateOutputType | null
    _max: ActiveUserMaxAggregateOutputType | null
  }

  type GetActiveUserGroupByPayload<T extends ActiveUserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ActiveUserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ActiveUserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ActiveUserGroupByOutputType[P]>
            : GetScalarType<T[P], ActiveUserGroupByOutputType[P]>
        }
      >
    >


  export type ActiveUserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    socketId?: boolean
    username?: boolean
    duoSocketId?: boolean
    duoUsername?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["activeUser"]>

  export type ActiveUserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    socketId?: boolean
    username?: boolean
    duoSocketId?: boolean
    duoUsername?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["activeUser"]>

  export type ActiveUserSelectScalar = {
    id?: boolean
    socketId?: boolean
    username?: boolean
    duoSocketId?: boolean
    duoUsername?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ActiveUserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ActiveUserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ActiveUserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ActiveUser"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      socketId: string
      username: string
      duoSocketId: string | null
      duoUsername: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["activeUser"]>
    composites: {}
  }

  type ActiveUserGetPayload<S extends boolean | null | undefined | ActiveUserDefaultArgs> = $Result.GetResult<Prisma.$ActiveUserPayload, S>

  type ActiveUserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ActiveUserFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ActiveUserCountAggregateInputType | true
    }

  export interface ActiveUserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ActiveUser'], meta: { name: 'ActiveUser' } }
    /**
     * Find zero or one ActiveUser that matches the filter.
     * @param {ActiveUserFindUniqueArgs} args - Arguments to find a ActiveUser
     * @example
     * // Get one ActiveUser
     * const activeUser = await prisma.activeUser.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ActiveUserFindUniqueArgs>(args: SelectSubset<T, ActiveUserFindUniqueArgs<ExtArgs>>): Prisma__ActiveUserClient<$Result.GetResult<Prisma.$ActiveUserPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one ActiveUser that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ActiveUserFindUniqueOrThrowArgs} args - Arguments to find a ActiveUser
     * @example
     * // Get one ActiveUser
     * const activeUser = await prisma.activeUser.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ActiveUserFindUniqueOrThrowArgs>(args: SelectSubset<T, ActiveUserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ActiveUserClient<$Result.GetResult<Prisma.$ActiveUserPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first ActiveUser that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActiveUserFindFirstArgs} args - Arguments to find a ActiveUser
     * @example
     * // Get one ActiveUser
     * const activeUser = await prisma.activeUser.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ActiveUserFindFirstArgs>(args?: SelectSubset<T, ActiveUserFindFirstArgs<ExtArgs>>): Prisma__ActiveUserClient<$Result.GetResult<Prisma.$ActiveUserPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first ActiveUser that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActiveUserFindFirstOrThrowArgs} args - Arguments to find a ActiveUser
     * @example
     * // Get one ActiveUser
     * const activeUser = await prisma.activeUser.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ActiveUserFindFirstOrThrowArgs>(args?: SelectSubset<T, ActiveUserFindFirstOrThrowArgs<ExtArgs>>): Prisma__ActiveUserClient<$Result.GetResult<Prisma.$ActiveUserPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more ActiveUsers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActiveUserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ActiveUsers
     * const activeUsers = await prisma.activeUser.findMany()
     * 
     * // Get first 10 ActiveUsers
     * const activeUsers = await prisma.activeUser.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const activeUserWithIdOnly = await prisma.activeUser.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ActiveUserFindManyArgs>(args?: SelectSubset<T, ActiveUserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActiveUserPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a ActiveUser.
     * @param {ActiveUserCreateArgs} args - Arguments to create a ActiveUser.
     * @example
     * // Create one ActiveUser
     * const ActiveUser = await prisma.activeUser.create({
     *   data: {
     *     // ... data to create a ActiveUser
     *   }
     * })
     * 
     */
    create<T extends ActiveUserCreateArgs>(args: SelectSubset<T, ActiveUserCreateArgs<ExtArgs>>): Prisma__ActiveUserClient<$Result.GetResult<Prisma.$ActiveUserPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many ActiveUsers.
     * @param {ActiveUserCreateManyArgs} args - Arguments to create many ActiveUsers.
     * @example
     * // Create many ActiveUsers
     * const activeUser = await prisma.activeUser.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ActiveUserCreateManyArgs>(args?: SelectSubset<T, ActiveUserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ActiveUsers and returns the data saved in the database.
     * @param {ActiveUserCreateManyAndReturnArgs} args - Arguments to create many ActiveUsers.
     * @example
     * // Create many ActiveUsers
     * const activeUser = await prisma.activeUser.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ActiveUsers and only return the `id`
     * const activeUserWithIdOnly = await prisma.activeUser.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ActiveUserCreateManyAndReturnArgs>(args?: SelectSubset<T, ActiveUserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActiveUserPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a ActiveUser.
     * @param {ActiveUserDeleteArgs} args - Arguments to delete one ActiveUser.
     * @example
     * // Delete one ActiveUser
     * const ActiveUser = await prisma.activeUser.delete({
     *   where: {
     *     // ... filter to delete one ActiveUser
     *   }
     * })
     * 
     */
    delete<T extends ActiveUserDeleteArgs>(args: SelectSubset<T, ActiveUserDeleteArgs<ExtArgs>>): Prisma__ActiveUserClient<$Result.GetResult<Prisma.$ActiveUserPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one ActiveUser.
     * @param {ActiveUserUpdateArgs} args - Arguments to update one ActiveUser.
     * @example
     * // Update one ActiveUser
     * const activeUser = await prisma.activeUser.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ActiveUserUpdateArgs>(args: SelectSubset<T, ActiveUserUpdateArgs<ExtArgs>>): Prisma__ActiveUserClient<$Result.GetResult<Prisma.$ActiveUserPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more ActiveUsers.
     * @param {ActiveUserDeleteManyArgs} args - Arguments to filter ActiveUsers to delete.
     * @example
     * // Delete a few ActiveUsers
     * const { count } = await prisma.activeUser.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ActiveUserDeleteManyArgs>(args?: SelectSubset<T, ActiveUserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ActiveUsers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActiveUserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ActiveUsers
     * const activeUser = await prisma.activeUser.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ActiveUserUpdateManyArgs>(args: SelectSubset<T, ActiveUserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ActiveUser.
     * @param {ActiveUserUpsertArgs} args - Arguments to update or create a ActiveUser.
     * @example
     * // Update or create a ActiveUser
     * const activeUser = await prisma.activeUser.upsert({
     *   create: {
     *     // ... data to create a ActiveUser
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ActiveUser we want to update
     *   }
     * })
     */
    upsert<T extends ActiveUserUpsertArgs>(args: SelectSubset<T, ActiveUserUpsertArgs<ExtArgs>>): Prisma__ActiveUserClient<$Result.GetResult<Prisma.$ActiveUserPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of ActiveUsers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActiveUserCountArgs} args - Arguments to filter ActiveUsers to count.
     * @example
     * // Count the number of ActiveUsers
     * const count = await prisma.activeUser.count({
     *   where: {
     *     // ... the filter for the ActiveUsers we want to count
     *   }
     * })
    **/
    count<T extends ActiveUserCountArgs>(
      args?: Subset<T, ActiveUserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ActiveUserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ActiveUser.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActiveUserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ActiveUserAggregateArgs>(args: Subset<T, ActiveUserAggregateArgs>): Prisma.PrismaPromise<GetActiveUserAggregateType<T>>

    /**
     * Group by ActiveUser.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActiveUserGroupByArgs} args - Group by arguments.
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
      T extends ActiveUserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ActiveUserGroupByArgs['orderBy'] }
        : { orderBy?: ActiveUserGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ActiveUserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetActiveUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ActiveUser model
   */
  readonly fields: ActiveUserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ActiveUser.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ActiveUserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
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
   * Fields of the ActiveUser model
   */ 
  interface ActiveUserFieldRefs {
    readonly id: FieldRef<"ActiveUser", 'Int'>
    readonly socketId: FieldRef<"ActiveUser", 'String'>
    readonly username: FieldRef<"ActiveUser", 'String'>
    readonly duoSocketId: FieldRef<"ActiveUser", 'String'>
    readonly duoUsername: FieldRef<"ActiveUser", 'String'>
    readonly createdAt: FieldRef<"ActiveUser", 'DateTime'>
    readonly updatedAt: FieldRef<"ActiveUser", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ActiveUser findUnique
   */
  export type ActiveUserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActiveUser
     */
    select?: ActiveUserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActiveUserInclude<ExtArgs> | null
    /**
     * Filter, which ActiveUser to fetch.
     */
    where: ActiveUserWhereUniqueInput
  }

  /**
   * ActiveUser findUniqueOrThrow
   */
  export type ActiveUserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActiveUser
     */
    select?: ActiveUserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActiveUserInclude<ExtArgs> | null
    /**
     * Filter, which ActiveUser to fetch.
     */
    where: ActiveUserWhereUniqueInput
  }

  /**
   * ActiveUser findFirst
   */
  export type ActiveUserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActiveUser
     */
    select?: ActiveUserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActiveUserInclude<ExtArgs> | null
    /**
     * Filter, which ActiveUser to fetch.
     */
    where?: ActiveUserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ActiveUsers to fetch.
     */
    orderBy?: ActiveUserOrderByWithRelationInput | ActiveUserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ActiveUsers.
     */
    cursor?: ActiveUserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ActiveUsers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ActiveUsers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ActiveUsers.
     */
    distinct?: ActiveUserScalarFieldEnum | ActiveUserScalarFieldEnum[]
  }

  /**
   * ActiveUser findFirstOrThrow
   */
  export type ActiveUserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActiveUser
     */
    select?: ActiveUserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActiveUserInclude<ExtArgs> | null
    /**
     * Filter, which ActiveUser to fetch.
     */
    where?: ActiveUserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ActiveUsers to fetch.
     */
    orderBy?: ActiveUserOrderByWithRelationInput | ActiveUserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ActiveUsers.
     */
    cursor?: ActiveUserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ActiveUsers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ActiveUsers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ActiveUsers.
     */
    distinct?: ActiveUserScalarFieldEnum | ActiveUserScalarFieldEnum[]
  }

  /**
   * ActiveUser findMany
   */
  export type ActiveUserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActiveUser
     */
    select?: ActiveUserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActiveUserInclude<ExtArgs> | null
    /**
     * Filter, which ActiveUsers to fetch.
     */
    where?: ActiveUserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ActiveUsers to fetch.
     */
    orderBy?: ActiveUserOrderByWithRelationInput | ActiveUserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ActiveUsers.
     */
    cursor?: ActiveUserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ActiveUsers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ActiveUsers.
     */
    skip?: number
    distinct?: ActiveUserScalarFieldEnum | ActiveUserScalarFieldEnum[]
  }

  /**
   * ActiveUser create
   */
  export type ActiveUserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActiveUser
     */
    select?: ActiveUserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActiveUserInclude<ExtArgs> | null
    /**
     * The data needed to create a ActiveUser.
     */
    data: XOR<ActiveUserCreateInput, ActiveUserUncheckedCreateInput>
  }

  /**
   * ActiveUser createMany
   */
  export type ActiveUserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ActiveUsers.
     */
    data: ActiveUserCreateManyInput | ActiveUserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ActiveUser createManyAndReturn
   */
  export type ActiveUserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActiveUser
     */
    select?: ActiveUserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many ActiveUsers.
     */
    data: ActiveUserCreateManyInput | ActiveUserCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActiveUserIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ActiveUser update
   */
  export type ActiveUserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActiveUser
     */
    select?: ActiveUserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActiveUserInclude<ExtArgs> | null
    /**
     * The data needed to update a ActiveUser.
     */
    data: XOR<ActiveUserUpdateInput, ActiveUserUncheckedUpdateInput>
    /**
     * Choose, which ActiveUser to update.
     */
    where: ActiveUserWhereUniqueInput
  }

  /**
   * ActiveUser updateMany
   */
  export type ActiveUserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ActiveUsers.
     */
    data: XOR<ActiveUserUpdateManyMutationInput, ActiveUserUncheckedUpdateManyInput>
    /**
     * Filter which ActiveUsers to update
     */
    where?: ActiveUserWhereInput
  }

  /**
   * ActiveUser upsert
   */
  export type ActiveUserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActiveUser
     */
    select?: ActiveUserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActiveUserInclude<ExtArgs> | null
    /**
     * The filter to search for the ActiveUser to update in case it exists.
     */
    where: ActiveUserWhereUniqueInput
    /**
     * In case the ActiveUser found by the `where` argument doesn't exist, create a new ActiveUser with this data.
     */
    create: XOR<ActiveUserCreateInput, ActiveUserUncheckedCreateInput>
    /**
     * In case the ActiveUser was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ActiveUserUpdateInput, ActiveUserUncheckedUpdateInput>
  }

  /**
   * ActiveUser delete
   */
  export type ActiveUserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActiveUser
     */
    select?: ActiveUserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActiveUserInclude<ExtArgs> | null
    /**
     * Filter which ActiveUser to delete.
     */
    where: ActiveUserWhereUniqueInput
  }

  /**
   * ActiveUser deleteMany
   */
  export type ActiveUserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ActiveUsers to delete
     */
    where?: ActiveUserWhereInput
  }

  /**
   * ActiveUser without action
   */
  export type ActiveUserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActiveUser
     */
    select?: ActiveUserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActiveUserInclude<ExtArgs> | null
  }


  /**
   * Model ActiveDuoCall
   */

  export type AggregateActiveDuoCall = {
    _count: ActiveDuoCallCountAggregateOutputType | null
    _avg: ActiveDuoCallAvgAggregateOutputType | null
    _sum: ActiveDuoCallSumAggregateOutputType | null
    _min: ActiveDuoCallMinAggregateOutputType | null
    _max: ActiveDuoCallMaxAggregateOutputType | null
  }

  export type ActiveDuoCallAvgAggregateOutputType = {
    id: number | null
  }

  export type ActiveDuoCallSumAggregateOutputType = {
    id: number | null
  }

  export type ActiveDuoCallMinAggregateOutputType = {
    id: number | null
    socketId: string | null
    username: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ActiveDuoCallMaxAggregateOutputType = {
    id: number | null
    socketId: string | null
    username: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ActiveDuoCallCountAggregateOutputType = {
    id: number
    socketId: number
    username: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ActiveDuoCallAvgAggregateInputType = {
    id?: true
  }

  export type ActiveDuoCallSumAggregateInputType = {
    id?: true
  }

  export type ActiveDuoCallMinAggregateInputType = {
    id?: true
    socketId?: true
    username?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ActiveDuoCallMaxAggregateInputType = {
    id?: true
    socketId?: true
    username?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ActiveDuoCallCountAggregateInputType = {
    id?: true
    socketId?: true
    username?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ActiveDuoCallAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ActiveDuoCall to aggregate.
     */
    where?: ActiveDuoCallWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ActiveDuoCalls to fetch.
     */
    orderBy?: ActiveDuoCallOrderByWithRelationInput | ActiveDuoCallOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ActiveDuoCallWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ActiveDuoCalls from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ActiveDuoCalls.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ActiveDuoCalls
    **/
    _count?: true | ActiveDuoCallCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ActiveDuoCallAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ActiveDuoCallSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ActiveDuoCallMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ActiveDuoCallMaxAggregateInputType
  }

  export type GetActiveDuoCallAggregateType<T extends ActiveDuoCallAggregateArgs> = {
        [P in keyof T & keyof AggregateActiveDuoCall]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateActiveDuoCall[P]>
      : GetScalarType<T[P], AggregateActiveDuoCall[P]>
  }




  export type ActiveDuoCallGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ActiveDuoCallWhereInput
    orderBy?: ActiveDuoCallOrderByWithAggregationInput | ActiveDuoCallOrderByWithAggregationInput[]
    by: ActiveDuoCallScalarFieldEnum[] | ActiveDuoCallScalarFieldEnum
    having?: ActiveDuoCallScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ActiveDuoCallCountAggregateInputType | true
    _avg?: ActiveDuoCallAvgAggregateInputType
    _sum?: ActiveDuoCallSumAggregateInputType
    _min?: ActiveDuoCallMinAggregateInputType
    _max?: ActiveDuoCallMaxAggregateInputType
  }

  export type ActiveDuoCallGroupByOutputType = {
    id: number
    socketId: string
    username: string
    createdAt: Date
    updatedAt: Date
    _count: ActiveDuoCallCountAggregateOutputType | null
    _avg: ActiveDuoCallAvgAggregateOutputType | null
    _sum: ActiveDuoCallSumAggregateOutputType | null
    _min: ActiveDuoCallMinAggregateOutputType | null
    _max: ActiveDuoCallMaxAggregateOutputType | null
  }

  type GetActiveDuoCallGroupByPayload<T extends ActiveDuoCallGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ActiveDuoCallGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ActiveDuoCallGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ActiveDuoCallGroupByOutputType[P]>
            : GetScalarType<T[P], ActiveDuoCallGroupByOutputType[P]>
        }
      >
    >


  export type ActiveDuoCallSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    socketId?: boolean
    username?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["activeDuoCall"]>

  export type ActiveDuoCallSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    socketId?: boolean
    username?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["activeDuoCall"]>

  export type ActiveDuoCallSelectScalar = {
    id?: boolean
    socketId?: boolean
    username?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ActiveDuoCallInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ActiveDuoCallIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ActiveDuoCallPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ActiveDuoCall"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      socketId: string
      username: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["activeDuoCall"]>
    composites: {}
  }

  type ActiveDuoCallGetPayload<S extends boolean | null | undefined | ActiveDuoCallDefaultArgs> = $Result.GetResult<Prisma.$ActiveDuoCallPayload, S>

  type ActiveDuoCallCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ActiveDuoCallFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ActiveDuoCallCountAggregateInputType | true
    }

  export interface ActiveDuoCallDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ActiveDuoCall'], meta: { name: 'ActiveDuoCall' } }
    /**
     * Find zero or one ActiveDuoCall that matches the filter.
     * @param {ActiveDuoCallFindUniqueArgs} args - Arguments to find a ActiveDuoCall
     * @example
     * // Get one ActiveDuoCall
     * const activeDuoCall = await prisma.activeDuoCall.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ActiveDuoCallFindUniqueArgs>(args: SelectSubset<T, ActiveDuoCallFindUniqueArgs<ExtArgs>>): Prisma__ActiveDuoCallClient<$Result.GetResult<Prisma.$ActiveDuoCallPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one ActiveDuoCall that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ActiveDuoCallFindUniqueOrThrowArgs} args - Arguments to find a ActiveDuoCall
     * @example
     * // Get one ActiveDuoCall
     * const activeDuoCall = await prisma.activeDuoCall.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ActiveDuoCallFindUniqueOrThrowArgs>(args: SelectSubset<T, ActiveDuoCallFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ActiveDuoCallClient<$Result.GetResult<Prisma.$ActiveDuoCallPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first ActiveDuoCall that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActiveDuoCallFindFirstArgs} args - Arguments to find a ActiveDuoCall
     * @example
     * // Get one ActiveDuoCall
     * const activeDuoCall = await prisma.activeDuoCall.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ActiveDuoCallFindFirstArgs>(args?: SelectSubset<T, ActiveDuoCallFindFirstArgs<ExtArgs>>): Prisma__ActiveDuoCallClient<$Result.GetResult<Prisma.$ActiveDuoCallPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first ActiveDuoCall that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActiveDuoCallFindFirstOrThrowArgs} args - Arguments to find a ActiveDuoCall
     * @example
     * // Get one ActiveDuoCall
     * const activeDuoCall = await prisma.activeDuoCall.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ActiveDuoCallFindFirstOrThrowArgs>(args?: SelectSubset<T, ActiveDuoCallFindFirstOrThrowArgs<ExtArgs>>): Prisma__ActiveDuoCallClient<$Result.GetResult<Prisma.$ActiveDuoCallPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more ActiveDuoCalls that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActiveDuoCallFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ActiveDuoCalls
     * const activeDuoCalls = await prisma.activeDuoCall.findMany()
     * 
     * // Get first 10 ActiveDuoCalls
     * const activeDuoCalls = await prisma.activeDuoCall.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const activeDuoCallWithIdOnly = await prisma.activeDuoCall.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ActiveDuoCallFindManyArgs>(args?: SelectSubset<T, ActiveDuoCallFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActiveDuoCallPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a ActiveDuoCall.
     * @param {ActiveDuoCallCreateArgs} args - Arguments to create a ActiveDuoCall.
     * @example
     * // Create one ActiveDuoCall
     * const ActiveDuoCall = await prisma.activeDuoCall.create({
     *   data: {
     *     // ... data to create a ActiveDuoCall
     *   }
     * })
     * 
     */
    create<T extends ActiveDuoCallCreateArgs>(args: SelectSubset<T, ActiveDuoCallCreateArgs<ExtArgs>>): Prisma__ActiveDuoCallClient<$Result.GetResult<Prisma.$ActiveDuoCallPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many ActiveDuoCalls.
     * @param {ActiveDuoCallCreateManyArgs} args - Arguments to create many ActiveDuoCalls.
     * @example
     * // Create many ActiveDuoCalls
     * const activeDuoCall = await prisma.activeDuoCall.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ActiveDuoCallCreateManyArgs>(args?: SelectSubset<T, ActiveDuoCallCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ActiveDuoCalls and returns the data saved in the database.
     * @param {ActiveDuoCallCreateManyAndReturnArgs} args - Arguments to create many ActiveDuoCalls.
     * @example
     * // Create many ActiveDuoCalls
     * const activeDuoCall = await prisma.activeDuoCall.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ActiveDuoCalls and only return the `id`
     * const activeDuoCallWithIdOnly = await prisma.activeDuoCall.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ActiveDuoCallCreateManyAndReturnArgs>(args?: SelectSubset<T, ActiveDuoCallCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActiveDuoCallPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a ActiveDuoCall.
     * @param {ActiveDuoCallDeleteArgs} args - Arguments to delete one ActiveDuoCall.
     * @example
     * // Delete one ActiveDuoCall
     * const ActiveDuoCall = await prisma.activeDuoCall.delete({
     *   where: {
     *     // ... filter to delete one ActiveDuoCall
     *   }
     * })
     * 
     */
    delete<T extends ActiveDuoCallDeleteArgs>(args: SelectSubset<T, ActiveDuoCallDeleteArgs<ExtArgs>>): Prisma__ActiveDuoCallClient<$Result.GetResult<Prisma.$ActiveDuoCallPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one ActiveDuoCall.
     * @param {ActiveDuoCallUpdateArgs} args - Arguments to update one ActiveDuoCall.
     * @example
     * // Update one ActiveDuoCall
     * const activeDuoCall = await prisma.activeDuoCall.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ActiveDuoCallUpdateArgs>(args: SelectSubset<T, ActiveDuoCallUpdateArgs<ExtArgs>>): Prisma__ActiveDuoCallClient<$Result.GetResult<Prisma.$ActiveDuoCallPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more ActiveDuoCalls.
     * @param {ActiveDuoCallDeleteManyArgs} args - Arguments to filter ActiveDuoCalls to delete.
     * @example
     * // Delete a few ActiveDuoCalls
     * const { count } = await prisma.activeDuoCall.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ActiveDuoCallDeleteManyArgs>(args?: SelectSubset<T, ActiveDuoCallDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ActiveDuoCalls.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActiveDuoCallUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ActiveDuoCalls
     * const activeDuoCall = await prisma.activeDuoCall.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ActiveDuoCallUpdateManyArgs>(args: SelectSubset<T, ActiveDuoCallUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ActiveDuoCall.
     * @param {ActiveDuoCallUpsertArgs} args - Arguments to update or create a ActiveDuoCall.
     * @example
     * // Update or create a ActiveDuoCall
     * const activeDuoCall = await prisma.activeDuoCall.upsert({
     *   create: {
     *     // ... data to create a ActiveDuoCall
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ActiveDuoCall we want to update
     *   }
     * })
     */
    upsert<T extends ActiveDuoCallUpsertArgs>(args: SelectSubset<T, ActiveDuoCallUpsertArgs<ExtArgs>>): Prisma__ActiveDuoCallClient<$Result.GetResult<Prisma.$ActiveDuoCallPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of ActiveDuoCalls.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActiveDuoCallCountArgs} args - Arguments to filter ActiveDuoCalls to count.
     * @example
     * // Count the number of ActiveDuoCalls
     * const count = await prisma.activeDuoCall.count({
     *   where: {
     *     // ... the filter for the ActiveDuoCalls we want to count
     *   }
     * })
    **/
    count<T extends ActiveDuoCallCountArgs>(
      args?: Subset<T, ActiveDuoCallCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ActiveDuoCallCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ActiveDuoCall.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActiveDuoCallAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ActiveDuoCallAggregateArgs>(args: Subset<T, ActiveDuoCallAggregateArgs>): Prisma.PrismaPromise<GetActiveDuoCallAggregateType<T>>

    /**
     * Group by ActiveDuoCall.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActiveDuoCallGroupByArgs} args - Group by arguments.
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
      T extends ActiveDuoCallGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ActiveDuoCallGroupByArgs['orderBy'] }
        : { orderBy?: ActiveDuoCallGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ActiveDuoCallGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetActiveDuoCallGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ActiveDuoCall model
   */
  readonly fields: ActiveDuoCallFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ActiveDuoCall.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ActiveDuoCallClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
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
   * Fields of the ActiveDuoCall model
   */ 
  interface ActiveDuoCallFieldRefs {
    readonly id: FieldRef<"ActiveDuoCall", 'Int'>
    readonly socketId: FieldRef<"ActiveDuoCall", 'String'>
    readonly username: FieldRef<"ActiveDuoCall", 'String'>
    readonly createdAt: FieldRef<"ActiveDuoCall", 'DateTime'>
    readonly updatedAt: FieldRef<"ActiveDuoCall", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ActiveDuoCall findUnique
   */
  export type ActiveDuoCallFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActiveDuoCall
     */
    select?: ActiveDuoCallSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActiveDuoCallInclude<ExtArgs> | null
    /**
     * Filter, which ActiveDuoCall to fetch.
     */
    where: ActiveDuoCallWhereUniqueInput
  }

  /**
   * ActiveDuoCall findUniqueOrThrow
   */
  export type ActiveDuoCallFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActiveDuoCall
     */
    select?: ActiveDuoCallSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActiveDuoCallInclude<ExtArgs> | null
    /**
     * Filter, which ActiveDuoCall to fetch.
     */
    where: ActiveDuoCallWhereUniqueInput
  }

  /**
   * ActiveDuoCall findFirst
   */
  export type ActiveDuoCallFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActiveDuoCall
     */
    select?: ActiveDuoCallSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActiveDuoCallInclude<ExtArgs> | null
    /**
     * Filter, which ActiveDuoCall to fetch.
     */
    where?: ActiveDuoCallWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ActiveDuoCalls to fetch.
     */
    orderBy?: ActiveDuoCallOrderByWithRelationInput | ActiveDuoCallOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ActiveDuoCalls.
     */
    cursor?: ActiveDuoCallWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ActiveDuoCalls from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ActiveDuoCalls.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ActiveDuoCalls.
     */
    distinct?: ActiveDuoCallScalarFieldEnum | ActiveDuoCallScalarFieldEnum[]
  }

  /**
   * ActiveDuoCall findFirstOrThrow
   */
  export type ActiveDuoCallFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActiveDuoCall
     */
    select?: ActiveDuoCallSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActiveDuoCallInclude<ExtArgs> | null
    /**
     * Filter, which ActiveDuoCall to fetch.
     */
    where?: ActiveDuoCallWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ActiveDuoCalls to fetch.
     */
    orderBy?: ActiveDuoCallOrderByWithRelationInput | ActiveDuoCallOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ActiveDuoCalls.
     */
    cursor?: ActiveDuoCallWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ActiveDuoCalls from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ActiveDuoCalls.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ActiveDuoCalls.
     */
    distinct?: ActiveDuoCallScalarFieldEnum | ActiveDuoCallScalarFieldEnum[]
  }

  /**
   * ActiveDuoCall findMany
   */
  export type ActiveDuoCallFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActiveDuoCall
     */
    select?: ActiveDuoCallSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActiveDuoCallInclude<ExtArgs> | null
    /**
     * Filter, which ActiveDuoCalls to fetch.
     */
    where?: ActiveDuoCallWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ActiveDuoCalls to fetch.
     */
    orderBy?: ActiveDuoCallOrderByWithRelationInput | ActiveDuoCallOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ActiveDuoCalls.
     */
    cursor?: ActiveDuoCallWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ActiveDuoCalls from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ActiveDuoCalls.
     */
    skip?: number
    distinct?: ActiveDuoCallScalarFieldEnum | ActiveDuoCallScalarFieldEnum[]
  }

  /**
   * ActiveDuoCall create
   */
  export type ActiveDuoCallCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActiveDuoCall
     */
    select?: ActiveDuoCallSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActiveDuoCallInclude<ExtArgs> | null
    /**
     * The data needed to create a ActiveDuoCall.
     */
    data: XOR<ActiveDuoCallCreateInput, ActiveDuoCallUncheckedCreateInput>
  }

  /**
   * ActiveDuoCall createMany
   */
  export type ActiveDuoCallCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ActiveDuoCalls.
     */
    data: ActiveDuoCallCreateManyInput | ActiveDuoCallCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ActiveDuoCall createManyAndReturn
   */
  export type ActiveDuoCallCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActiveDuoCall
     */
    select?: ActiveDuoCallSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many ActiveDuoCalls.
     */
    data: ActiveDuoCallCreateManyInput | ActiveDuoCallCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActiveDuoCallIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ActiveDuoCall update
   */
  export type ActiveDuoCallUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActiveDuoCall
     */
    select?: ActiveDuoCallSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActiveDuoCallInclude<ExtArgs> | null
    /**
     * The data needed to update a ActiveDuoCall.
     */
    data: XOR<ActiveDuoCallUpdateInput, ActiveDuoCallUncheckedUpdateInput>
    /**
     * Choose, which ActiveDuoCall to update.
     */
    where: ActiveDuoCallWhereUniqueInput
  }

  /**
   * ActiveDuoCall updateMany
   */
  export type ActiveDuoCallUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ActiveDuoCalls.
     */
    data: XOR<ActiveDuoCallUpdateManyMutationInput, ActiveDuoCallUncheckedUpdateManyInput>
    /**
     * Filter which ActiveDuoCalls to update
     */
    where?: ActiveDuoCallWhereInput
  }

  /**
   * ActiveDuoCall upsert
   */
  export type ActiveDuoCallUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActiveDuoCall
     */
    select?: ActiveDuoCallSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActiveDuoCallInclude<ExtArgs> | null
    /**
     * The filter to search for the ActiveDuoCall to update in case it exists.
     */
    where: ActiveDuoCallWhereUniqueInput
    /**
     * In case the ActiveDuoCall found by the `where` argument doesn't exist, create a new ActiveDuoCall with this data.
     */
    create: XOR<ActiveDuoCallCreateInput, ActiveDuoCallUncheckedCreateInput>
    /**
     * In case the ActiveDuoCall was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ActiveDuoCallUpdateInput, ActiveDuoCallUncheckedUpdateInput>
  }

  /**
   * ActiveDuoCall delete
   */
  export type ActiveDuoCallDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActiveDuoCall
     */
    select?: ActiveDuoCallSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActiveDuoCallInclude<ExtArgs> | null
    /**
     * Filter which ActiveDuoCall to delete.
     */
    where: ActiveDuoCallWhereUniqueInput
  }

  /**
   * ActiveDuoCall deleteMany
   */
  export type ActiveDuoCallDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ActiveDuoCalls to delete
     */
    where?: ActiveDuoCallWhereInput
  }

  /**
   * ActiveDuoCall without action
   */
  export type ActiveDuoCallDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActiveDuoCall
     */
    select?: ActiveDuoCallSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActiveDuoCallInclude<ExtArgs> | null
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


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    name: 'name',
    username: 'username',
    pfp: 'pfp',
    about: 'about',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const ActiveUserScalarFieldEnum: {
    id: 'id',
    socketId: 'socketId',
    username: 'username',
    duoSocketId: 'duoSocketId',
    duoUsername: 'duoUsername',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ActiveUserScalarFieldEnum = (typeof ActiveUserScalarFieldEnum)[keyof typeof ActiveUserScalarFieldEnum]


  export const ActiveDuoCallScalarFieldEnum: {
    id: 'id',
    socketId: 'socketId',
    username: 'username',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ActiveDuoCallScalarFieldEnum = (typeof ActiveDuoCallScalarFieldEnum)[keyof typeof ActiveDuoCallScalarFieldEnum]


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


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


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


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: IntFilter<"User"> | number
    email?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    username?: StringFilter<"User"> | string
    pfp?: StringFilter<"User"> | string
    about?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    activeUsers?: ActiveUserListRelationFilter
    activeDuoCalls?: ActiveDuoCallListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    username?: SortOrder
    pfp?: SortOrder
    about?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    activeUsers?: ActiveUserOrderByRelationAggregateInput
    activeDuoCalls?: ActiveDuoCallOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    email?: string
    username?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringFilter<"User"> | string
    pfp?: StringFilter<"User"> | string
    about?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    activeUsers?: ActiveUserListRelationFilter
    activeDuoCalls?: ActiveDuoCallListRelationFilter
  }, "id" | "email" | "username">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    username?: SortOrder
    pfp?: SortOrder
    about?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"User"> | number
    email?: StringWithAggregatesFilter<"User"> | string
    name?: StringWithAggregatesFilter<"User"> | string
    username?: StringWithAggregatesFilter<"User"> | string
    pfp?: StringWithAggregatesFilter<"User"> | string
    about?: StringWithAggregatesFilter<"User"> | string
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type ActiveUserWhereInput = {
    AND?: ActiveUserWhereInput | ActiveUserWhereInput[]
    OR?: ActiveUserWhereInput[]
    NOT?: ActiveUserWhereInput | ActiveUserWhereInput[]
    id?: IntFilter<"ActiveUser"> | number
    socketId?: StringFilter<"ActiveUser"> | string
    username?: StringFilter<"ActiveUser"> | string
    duoSocketId?: StringNullableFilter<"ActiveUser"> | string | null
    duoUsername?: StringNullableFilter<"ActiveUser"> | string | null
    createdAt?: DateTimeFilter<"ActiveUser"> | Date | string
    updatedAt?: DateTimeFilter<"ActiveUser"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type ActiveUserOrderByWithRelationInput = {
    id?: SortOrder
    socketId?: SortOrder
    username?: SortOrder
    duoSocketId?: SortOrderInput | SortOrder
    duoUsername?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type ActiveUserWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    socketId?: string
    username?: string
    AND?: ActiveUserWhereInput | ActiveUserWhereInput[]
    OR?: ActiveUserWhereInput[]
    NOT?: ActiveUserWhereInput | ActiveUserWhereInput[]
    duoSocketId?: StringNullableFilter<"ActiveUser"> | string | null
    duoUsername?: StringNullableFilter<"ActiveUser"> | string | null
    createdAt?: DateTimeFilter<"ActiveUser"> | Date | string
    updatedAt?: DateTimeFilter<"ActiveUser"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
  }, "id" | "socketId" | "username">

  export type ActiveUserOrderByWithAggregationInput = {
    id?: SortOrder
    socketId?: SortOrder
    username?: SortOrder
    duoSocketId?: SortOrderInput | SortOrder
    duoUsername?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ActiveUserCountOrderByAggregateInput
    _avg?: ActiveUserAvgOrderByAggregateInput
    _max?: ActiveUserMaxOrderByAggregateInput
    _min?: ActiveUserMinOrderByAggregateInput
    _sum?: ActiveUserSumOrderByAggregateInput
  }

  export type ActiveUserScalarWhereWithAggregatesInput = {
    AND?: ActiveUserScalarWhereWithAggregatesInput | ActiveUserScalarWhereWithAggregatesInput[]
    OR?: ActiveUserScalarWhereWithAggregatesInput[]
    NOT?: ActiveUserScalarWhereWithAggregatesInput | ActiveUserScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"ActiveUser"> | number
    socketId?: StringWithAggregatesFilter<"ActiveUser"> | string
    username?: StringWithAggregatesFilter<"ActiveUser"> | string
    duoSocketId?: StringNullableWithAggregatesFilter<"ActiveUser"> | string | null
    duoUsername?: StringNullableWithAggregatesFilter<"ActiveUser"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"ActiveUser"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ActiveUser"> | Date | string
  }

  export type ActiveDuoCallWhereInput = {
    AND?: ActiveDuoCallWhereInput | ActiveDuoCallWhereInput[]
    OR?: ActiveDuoCallWhereInput[]
    NOT?: ActiveDuoCallWhereInput | ActiveDuoCallWhereInput[]
    id?: IntFilter<"ActiveDuoCall"> | number
    socketId?: StringFilter<"ActiveDuoCall"> | string
    username?: StringFilter<"ActiveDuoCall"> | string
    createdAt?: DateTimeFilter<"ActiveDuoCall"> | Date | string
    updatedAt?: DateTimeFilter<"ActiveDuoCall"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type ActiveDuoCallOrderByWithRelationInput = {
    id?: SortOrder
    socketId?: SortOrder
    username?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type ActiveDuoCallWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    socketId?: string
    username?: string
    AND?: ActiveDuoCallWhereInput | ActiveDuoCallWhereInput[]
    OR?: ActiveDuoCallWhereInput[]
    NOT?: ActiveDuoCallWhereInput | ActiveDuoCallWhereInput[]
    createdAt?: DateTimeFilter<"ActiveDuoCall"> | Date | string
    updatedAt?: DateTimeFilter<"ActiveDuoCall"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
  }, "id" | "socketId" | "username">

  export type ActiveDuoCallOrderByWithAggregationInput = {
    id?: SortOrder
    socketId?: SortOrder
    username?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ActiveDuoCallCountOrderByAggregateInput
    _avg?: ActiveDuoCallAvgOrderByAggregateInput
    _max?: ActiveDuoCallMaxOrderByAggregateInput
    _min?: ActiveDuoCallMinOrderByAggregateInput
    _sum?: ActiveDuoCallSumOrderByAggregateInput
  }

  export type ActiveDuoCallScalarWhereWithAggregatesInput = {
    AND?: ActiveDuoCallScalarWhereWithAggregatesInput | ActiveDuoCallScalarWhereWithAggregatesInput[]
    OR?: ActiveDuoCallScalarWhereWithAggregatesInput[]
    NOT?: ActiveDuoCallScalarWhereWithAggregatesInput | ActiveDuoCallScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"ActiveDuoCall"> | number
    socketId?: StringWithAggregatesFilter<"ActiveDuoCall"> | string
    username?: StringWithAggregatesFilter<"ActiveDuoCall"> | string
    createdAt?: DateTimeWithAggregatesFilter<"ActiveDuoCall"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ActiveDuoCall"> | Date | string
  }

  export type UserCreateInput = {
    email: string
    name: string
    username: string
    pfp?: string
    about?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    activeUsers?: ActiveUserCreateNestedManyWithoutUserInput
    activeDuoCalls?: ActiveDuoCallCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: number
    email: string
    name: string
    username: string
    pfp?: string
    about?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    activeUsers?: ActiveUserUncheckedCreateNestedManyWithoutUserInput
    activeDuoCalls?: ActiveDuoCallUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    pfp?: StringFieldUpdateOperationsInput | string
    about?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    activeUsers?: ActiveUserUpdateManyWithoutUserNestedInput
    activeDuoCalls?: ActiveDuoCallUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    pfp?: StringFieldUpdateOperationsInput | string
    about?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    activeUsers?: ActiveUserUncheckedUpdateManyWithoutUserNestedInput
    activeDuoCalls?: ActiveDuoCallUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: number
    email: string
    name: string
    username: string
    pfp?: string
    about?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    pfp?: StringFieldUpdateOperationsInput | string
    about?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    pfp?: StringFieldUpdateOperationsInput | string
    about?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActiveUserCreateInput = {
    socketId: string
    duoSocketId?: string | null
    duoUsername?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutActiveUsersInput
  }

  export type ActiveUserUncheckedCreateInput = {
    id?: number
    socketId: string
    username: string
    duoSocketId?: string | null
    duoUsername?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ActiveUserUpdateInput = {
    socketId?: StringFieldUpdateOperationsInput | string
    duoSocketId?: NullableStringFieldUpdateOperationsInput | string | null
    duoUsername?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutActiveUsersNestedInput
  }

  export type ActiveUserUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    socketId?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    duoSocketId?: NullableStringFieldUpdateOperationsInput | string | null
    duoUsername?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActiveUserCreateManyInput = {
    id?: number
    socketId: string
    username: string
    duoSocketId?: string | null
    duoUsername?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ActiveUserUpdateManyMutationInput = {
    socketId?: StringFieldUpdateOperationsInput | string
    duoSocketId?: NullableStringFieldUpdateOperationsInput | string | null
    duoUsername?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActiveUserUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    socketId?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    duoSocketId?: NullableStringFieldUpdateOperationsInput | string | null
    duoUsername?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActiveDuoCallCreateInput = {
    socketId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutActiveDuoCallsInput
  }

  export type ActiveDuoCallUncheckedCreateInput = {
    id?: number
    socketId: string
    username: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ActiveDuoCallUpdateInput = {
    socketId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutActiveDuoCallsNestedInput
  }

  export type ActiveDuoCallUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    socketId?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActiveDuoCallCreateManyInput = {
    id?: number
    socketId: string
    username: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ActiveDuoCallUpdateManyMutationInput = {
    socketId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActiveDuoCallUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    socketId?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
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

  export type ActiveUserListRelationFilter = {
    every?: ActiveUserWhereInput
    some?: ActiveUserWhereInput
    none?: ActiveUserWhereInput
  }

  export type ActiveDuoCallListRelationFilter = {
    every?: ActiveDuoCallWhereInput
    some?: ActiveDuoCallWhereInput
    none?: ActiveDuoCallWhereInput
  }

  export type ActiveUserOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ActiveDuoCallOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    username?: SortOrder
    pfp?: SortOrder
    about?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    username?: SortOrder
    pfp?: SortOrder
    about?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    username?: SortOrder
    pfp?: SortOrder
    about?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    id?: SortOrder
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

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type UserRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type ActiveUserCountOrderByAggregateInput = {
    id?: SortOrder
    socketId?: SortOrder
    username?: SortOrder
    duoSocketId?: SortOrder
    duoUsername?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ActiveUserAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type ActiveUserMaxOrderByAggregateInput = {
    id?: SortOrder
    socketId?: SortOrder
    username?: SortOrder
    duoSocketId?: SortOrder
    duoUsername?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ActiveUserMinOrderByAggregateInput = {
    id?: SortOrder
    socketId?: SortOrder
    username?: SortOrder
    duoSocketId?: SortOrder
    duoUsername?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ActiveUserSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type ActiveDuoCallCountOrderByAggregateInput = {
    id?: SortOrder
    socketId?: SortOrder
    username?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ActiveDuoCallAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type ActiveDuoCallMaxOrderByAggregateInput = {
    id?: SortOrder
    socketId?: SortOrder
    username?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ActiveDuoCallMinOrderByAggregateInput = {
    id?: SortOrder
    socketId?: SortOrder
    username?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ActiveDuoCallSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type ActiveUserCreateNestedManyWithoutUserInput = {
    create?: XOR<ActiveUserCreateWithoutUserInput, ActiveUserUncheckedCreateWithoutUserInput> | ActiveUserCreateWithoutUserInput[] | ActiveUserUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ActiveUserCreateOrConnectWithoutUserInput | ActiveUserCreateOrConnectWithoutUserInput[]
    createMany?: ActiveUserCreateManyUserInputEnvelope
    connect?: ActiveUserWhereUniqueInput | ActiveUserWhereUniqueInput[]
  }

  export type ActiveDuoCallCreateNestedManyWithoutUserInput = {
    create?: XOR<ActiveDuoCallCreateWithoutUserInput, ActiveDuoCallUncheckedCreateWithoutUserInput> | ActiveDuoCallCreateWithoutUserInput[] | ActiveDuoCallUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ActiveDuoCallCreateOrConnectWithoutUserInput | ActiveDuoCallCreateOrConnectWithoutUserInput[]
    createMany?: ActiveDuoCallCreateManyUserInputEnvelope
    connect?: ActiveDuoCallWhereUniqueInput | ActiveDuoCallWhereUniqueInput[]
  }

  export type ActiveUserUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ActiveUserCreateWithoutUserInput, ActiveUserUncheckedCreateWithoutUserInput> | ActiveUserCreateWithoutUserInput[] | ActiveUserUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ActiveUserCreateOrConnectWithoutUserInput | ActiveUserCreateOrConnectWithoutUserInput[]
    createMany?: ActiveUserCreateManyUserInputEnvelope
    connect?: ActiveUserWhereUniqueInput | ActiveUserWhereUniqueInput[]
  }

  export type ActiveDuoCallUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ActiveDuoCallCreateWithoutUserInput, ActiveDuoCallUncheckedCreateWithoutUserInput> | ActiveDuoCallCreateWithoutUserInput[] | ActiveDuoCallUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ActiveDuoCallCreateOrConnectWithoutUserInput | ActiveDuoCallCreateOrConnectWithoutUserInput[]
    createMany?: ActiveDuoCallCreateManyUserInputEnvelope
    connect?: ActiveDuoCallWhereUniqueInput | ActiveDuoCallWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type ActiveUserUpdateManyWithoutUserNestedInput = {
    create?: XOR<ActiveUserCreateWithoutUserInput, ActiveUserUncheckedCreateWithoutUserInput> | ActiveUserCreateWithoutUserInput[] | ActiveUserUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ActiveUserCreateOrConnectWithoutUserInput | ActiveUserCreateOrConnectWithoutUserInput[]
    upsert?: ActiveUserUpsertWithWhereUniqueWithoutUserInput | ActiveUserUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ActiveUserCreateManyUserInputEnvelope
    set?: ActiveUserWhereUniqueInput | ActiveUserWhereUniqueInput[]
    disconnect?: ActiveUserWhereUniqueInput | ActiveUserWhereUniqueInput[]
    delete?: ActiveUserWhereUniqueInput | ActiveUserWhereUniqueInput[]
    connect?: ActiveUserWhereUniqueInput | ActiveUserWhereUniqueInput[]
    update?: ActiveUserUpdateWithWhereUniqueWithoutUserInput | ActiveUserUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ActiveUserUpdateManyWithWhereWithoutUserInput | ActiveUserUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ActiveUserScalarWhereInput | ActiveUserScalarWhereInput[]
  }

  export type ActiveDuoCallUpdateManyWithoutUserNestedInput = {
    create?: XOR<ActiveDuoCallCreateWithoutUserInput, ActiveDuoCallUncheckedCreateWithoutUserInput> | ActiveDuoCallCreateWithoutUserInput[] | ActiveDuoCallUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ActiveDuoCallCreateOrConnectWithoutUserInput | ActiveDuoCallCreateOrConnectWithoutUserInput[]
    upsert?: ActiveDuoCallUpsertWithWhereUniqueWithoutUserInput | ActiveDuoCallUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ActiveDuoCallCreateManyUserInputEnvelope
    set?: ActiveDuoCallWhereUniqueInput | ActiveDuoCallWhereUniqueInput[]
    disconnect?: ActiveDuoCallWhereUniqueInput | ActiveDuoCallWhereUniqueInput[]
    delete?: ActiveDuoCallWhereUniqueInput | ActiveDuoCallWhereUniqueInput[]
    connect?: ActiveDuoCallWhereUniqueInput | ActiveDuoCallWhereUniqueInput[]
    update?: ActiveDuoCallUpdateWithWhereUniqueWithoutUserInput | ActiveDuoCallUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ActiveDuoCallUpdateManyWithWhereWithoutUserInput | ActiveDuoCallUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ActiveDuoCallScalarWhereInput | ActiveDuoCallScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ActiveUserUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ActiveUserCreateWithoutUserInput, ActiveUserUncheckedCreateWithoutUserInput> | ActiveUserCreateWithoutUserInput[] | ActiveUserUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ActiveUserCreateOrConnectWithoutUserInput | ActiveUserCreateOrConnectWithoutUserInput[]
    upsert?: ActiveUserUpsertWithWhereUniqueWithoutUserInput | ActiveUserUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ActiveUserCreateManyUserInputEnvelope
    set?: ActiveUserWhereUniqueInput | ActiveUserWhereUniqueInput[]
    disconnect?: ActiveUserWhereUniqueInput | ActiveUserWhereUniqueInput[]
    delete?: ActiveUserWhereUniqueInput | ActiveUserWhereUniqueInput[]
    connect?: ActiveUserWhereUniqueInput | ActiveUserWhereUniqueInput[]
    update?: ActiveUserUpdateWithWhereUniqueWithoutUserInput | ActiveUserUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ActiveUserUpdateManyWithWhereWithoutUserInput | ActiveUserUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ActiveUserScalarWhereInput | ActiveUserScalarWhereInput[]
  }

  export type ActiveDuoCallUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ActiveDuoCallCreateWithoutUserInput, ActiveDuoCallUncheckedCreateWithoutUserInput> | ActiveDuoCallCreateWithoutUserInput[] | ActiveDuoCallUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ActiveDuoCallCreateOrConnectWithoutUserInput | ActiveDuoCallCreateOrConnectWithoutUserInput[]
    upsert?: ActiveDuoCallUpsertWithWhereUniqueWithoutUserInput | ActiveDuoCallUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ActiveDuoCallCreateManyUserInputEnvelope
    set?: ActiveDuoCallWhereUniqueInput | ActiveDuoCallWhereUniqueInput[]
    disconnect?: ActiveDuoCallWhereUniqueInput | ActiveDuoCallWhereUniqueInput[]
    delete?: ActiveDuoCallWhereUniqueInput | ActiveDuoCallWhereUniqueInput[]
    connect?: ActiveDuoCallWhereUniqueInput | ActiveDuoCallWhereUniqueInput[]
    update?: ActiveDuoCallUpdateWithWhereUniqueWithoutUserInput | ActiveDuoCallUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ActiveDuoCallUpdateManyWithWhereWithoutUserInput | ActiveDuoCallUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ActiveDuoCallScalarWhereInput | ActiveDuoCallScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutActiveUsersInput = {
    create?: XOR<UserCreateWithoutActiveUsersInput, UserUncheckedCreateWithoutActiveUsersInput>
    connectOrCreate?: UserCreateOrConnectWithoutActiveUsersInput
    connect?: UserWhereUniqueInput
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type UserUpdateOneRequiredWithoutActiveUsersNestedInput = {
    create?: XOR<UserCreateWithoutActiveUsersInput, UserUncheckedCreateWithoutActiveUsersInput>
    connectOrCreate?: UserCreateOrConnectWithoutActiveUsersInput
    upsert?: UserUpsertWithoutActiveUsersInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutActiveUsersInput, UserUpdateWithoutActiveUsersInput>, UserUncheckedUpdateWithoutActiveUsersInput>
  }

  export type UserCreateNestedOneWithoutActiveDuoCallsInput = {
    create?: XOR<UserCreateWithoutActiveDuoCallsInput, UserUncheckedCreateWithoutActiveDuoCallsInput>
    connectOrCreate?: UserCreateOrConnectWithoutActiveDuoCallsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutActiveDuoCallsNestedInput = {
    create?: XOR<UserCreateWithoutActiveDuoCallsInput, UserUncheckedCreateWithoutActiveDuoCallsInput>
    connectOrCreate?: UserCreateOrConnectWithoutActiveDuoCallsInput
    upsert?: UserUpsertWithoutActiveDuoCallsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutActiveDuoCallsInput, UserUpdateWithoutActiveDuoCallsInput>, UserUncheckedUpdateWithoutActiveDuoCallsInput>
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

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type ActiveUserCreateWithoutUserInput = {
    socketId: string
    duoSocketId?: string | null
    duoUsername?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ActiveUserUncheckedCreateWithoutUserInput = {
    id?: number
    socketId: string
    duoSocketId?: string | null
    duoUsername?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ActiveUserCreateOrConnectWithoutUserInput = {
    where: ActiveUserWhereUniqueInput
    create: XOR<ActiveUserCreateWithoutUserInput, ActiveUserUncheckedCreateWithoutUserInput>
  }

  export type ActiveUserCreateManyUserInputEnvelope = {
    data: ActiveUserCreateManyUserInput | ActiveUserCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type ActiveDuoCallCreateWithoutUserInput = {
    socketId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ActiveDuoCallUncheckedCreateWithoutUserInput = {
    id?: number
    socketId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ActiveDuoCallCreateOrConnectWithoutUserInput = {
    where: ActiveDuoCallWhereUniqueInput
    create: XOR<ActiveDuoCallCreateWithoutUserInput, ActiveDuoCallUncheckedCreateWithoutUserInput>
  }

  export type ActiveDuoCallCreateManyUserInputEnvelope = {
    data: ActiveDuoCallCreateManyUserInput | ActiveDuoCallCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type ActiveUserUpsertWithWhereUniqueWithoutUserInput = {
    where: ActiveUserWhereUniqueInput
    update: XOR<ActiveUserUpdateWithoutUserInput, ActiveUserUncheckedUpdateWithoutUserInput>
    create: XOR<ActiveUserCreateWithoutUserInput, ActiveUserUncheckedCreateWithoutUserInput>
  }

  export type ActiveUserUpdateWithWhereUniqueWithoutUserInput = {
    where: ActiveUserWhereUniqueInput
    data: XOR<ActiveUserUpdateWithoutUserInput, ActiveUserUncheckedUpdateWithoutUserInput>
  }

  export type ActiveUserUpdateManyWithWhereWithoutUserInput = {
    where: ActiveUserScalarWhereInput
    data: XOR<ActiveUserUpdateManyMutationInput, ActiveUserUncheckedUpdateManyWithoutUserInput>
  }

  export type ActiveUserScalarWhereInput = {
    AND?: ActiveUserScalarWhereInput | ActiveUserScalarWhereInput[]
    OR?: ActiveUserScalarWhereInput[]
    NOT?: ActiveUserScalarWhereInput | ActiveUserScalarWhereInput[]
    id?: IntFilter<"ActiveUser"> | number
    socketId?: StringFilter<"ActiveUser"> | string
    username?: StringFilter<"ActiveUser"> | string
    duoSocketId?: StringNullableFilter<"ActiveUser"> | string | null
    duoUsername?: StringNullableFilter<"ActiveUser"> | string | null
    createdAt?: DateTimeFilter<"ActiveUser"> | Date | string
    updatedAt?: DateTimeFilter<"ActiveUser"> | Date | string
  }

  export type ActiveDuoCallUpsertWithWhereUniqueWithoutUserInput = {
    where: ActiveDuoCallWhereUniqueInput
    update: XOR<ActiveDuoCallUpdateWithoutUserInput, ActiveDuoCallUncheckedUpdateWithoutUserInput>
    create: XOR<ActiveDuoCallCreateWithoutUserInput, ActiveDuoCallUncheckedCreateWithoutUserInput>
  }

  export type ActiveDuoCallUpdateWithWhereUniqueWithoutUserInput = {
    where: ActiveDuoCallWhereUniqueInput
    data: XOR<ActiveDuoCallUpdateWithoutUserInput, ActiveDuoCallUncheckedUpdateWithoutUserInput>
  }

  export type ActiveDuoCallUpdateManyWithWhereWithoutUserInput = {
    where: ActiveDuoCallScalarWhereInput
    data: XOR<ActiveDuoCallUpdateManyMutationInput, ActiveDuoCallUncheckedUpdateManyWithoutUserInput>
  }

  export type ActiveDuoCallScalarWhereInput = {
    AND?: ActiveDuoCallScalarWhereInput | ActiveDuoCallScalarWhereInput[]
    OR?: ActiveDuoCallScalarWhereInput[]
    NOT?: ActiveDuoCallScalarWhereInput | ActiveDuoCallScalarWhereInput[]
    id?: IntFilter<"ActiveDuoCall"> | number
    socketId?: StringFilter<"ActiveDuoCall"> | string
    username?: StringFilter<"ActiveDuoCall"> | string
    createdAt?: DateTimeFilter<"ActiveDuoCall"> | Date | string
    updatedAt?: DateTimeFilter<"ActiveDuoCall"> | Date | string
  }

  export type UserCreateWithoutActiveUsersInput = {
    email: string
    name: string
    username: string
    pfp?: string
    about?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    activeDuoCalls?: ActiveDuoCallCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutActiveUsersInput = {
    id?: number
    email: string
    name: string
    username: string
    pfp?: string
    about?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    activeDuoCalls?: ActiveDuoCallUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutActiveUsersInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutActiveUsersInput, UserUncheckedCreateWithoutActiveUsersInput>
  }

  export type UserUpsertWithoutActiveUsersInput = {
    update: XOR<UserUpdateWithoutActiveUsersInput, UserUncheckedUpdateWithoutActiveUsersInput>
    create: XOR<UserCreateWithoutActiveUsersInput, UserUncheckedCreateWithoutActiveUsersInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutActiveUsersInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutActiveUsersInput, UserUncheckedUpdateWithoutActiveUsersInput>
  }

  export type UserUpdateWithoutActiveUsersInput = {
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    pfp?: StringFieldUpdateOperationsInput | string
    about?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    activeDuoCalls?: ActiveDuoCallUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutActiveUsersInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    pfp?: StringFieldUpdateOperationsInput | string
    about?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    activeDuoCalls?: ActiveDuoCallUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutActiveDuoCallsInput = {
    email: string
    name: string
    username: string
    pfp?: string
    about?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    activeUsers?: ActiveUserCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutActiveDuoCallsInput = {
    id?: number
    email: string
    name: string
    username: string
    pfp?: string
    about?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    activeUsers?: ActiveUserUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutActiveDuoCallsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutActiveDuoCallsInput, UserUncheckedCreateWithoutActiveDuoCallsInput>
  }

  export type UserUpsertWithoutActiveDuoCallsInput = {
    update: XOR<UserUpdateWithoutActiveDuoCallsInput, UserUncheckedUpdateWithoutActiveDuoCallsInput>
    create: XOR<UserCreateWithoutActiveDuoCallsInput, UserUncheckedCreateWithoutActiveDuoCallsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutActiveDuoCallsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutActiveDuoCallsInput, UserUncheckedUpdateWithoutActiveDuoCallsInput>
  }

  export type UserUpdateWithoutActiveDuoCallsInput = {
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    pfp?: StringFieldUpdateOperationsInput | string
    about?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    activeUsers?: ActiveUserUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutActiveDuoCallsInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    pfp?: StringFieldUpdateOperationsInput | string
    about?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    activeUsers?: ActiveUserUncheckedUpdateManyWithoutUserNestedInput
  }

  export type ActiveUserCreateManyUserInput = {
    id?: number
    socketId: string
    duoSocketId?: string | null
    duoUsername?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ActiveDuoCallCreateManyUserInput = {
    id?: number
    socketId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ActiveUserUpdateWithoutUserInput = {
    socketId?: StringFieldUpdateOperationsInput | string
    duoSocketId?: NullableStringFieldUpdateOperationsInput | string | null
    duoUsername?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActiveUserUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    socketId?: StringFieldUpdateOperationsInput | string
    duoSocketId?: NullableStringFieldUpdateOperationsInput | string | null
    duoUsername?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActiveUserUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    socketId?: StringFieldUpdateOperationsInput | string
    duoSocketId?: NullableStringFieldUpdateOperationsInput | string | null
    duoUsername?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActiveDuoCallUpdateWithoutUserInput = {
    socketId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActiveDuoCallUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    socketId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActiveDuoCallUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    socketId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use UserCountOutputTypeDefaultArgs instead
     */
    export type UserCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use UserDefaultArgs instead
     */
    export type UserArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ActiveUserDefaultArgs instead
     */
    export type ActiveUserArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ActiveUserDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ActiveDuoCallDefaultArgs instead
     */
    export type ActiveDuoCallArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ActiveDuoCallDefaultArgs<ExtArgs>

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