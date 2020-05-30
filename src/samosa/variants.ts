// FIXME improve value type
export type VariantMap<T extends string | number | symbol> = { [key in T]: any };
