const mode = import.meta.env.MODE

export const isProduction = mode === 'production'
export const isTest = mode === 'test'

export const BREAK_SECONDS = isProduction ? 300 : 3
