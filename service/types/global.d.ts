export {}
declare global{
    namespace NodeJS{
        interface ProcessEnv {
            MONGO_URI: string
            PRIVATE_KEY: string
            PUBLIC_KEY: string
        }
    }
}