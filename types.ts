type Success<S> = (s: S) => Promise<void>

type VaultError<E> = (error: E) => Promise<void>

type RequestToken<S extends Success<S>, E extends VaultError<E>> = (url: string, success: S, error: E) => Promise<void>

type UploadFileSuccess<T> = (contents: T) => Promise<void>

type UploadFileError<T> = (error: T) => Promise<void>

type UploadFile = () => Promise<void>

type DownloadFileSuccess<T> = (content: T) => Promise<void>

type DownloadFileError<T> = (error: T) => Promise<void>

type DownloadFile = () => Promise<void>
