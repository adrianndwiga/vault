type Success<S> = (s: S) => Promise<void>

type VaultError<Error> = (error: Error) => Promise<void>

type RequestToken<S extends Success<S>, E extends VaultError<E>> = 
    (url: string, success: S, error: E) => Promise<void>

type UploadFile<S extends Success<S>, E extends VaultError<E>> = 
    (fullFilePath: string, success: S, error: E) => Promise<void>

type DownloadFile<S extends Success<S>, E extends VaultError<E>> = 
    (url: string, success: S, error: E) => Promise<void>
