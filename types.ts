type RequestTokenSuccess<T> = (token: T) => Promise<void>

type RequestTokenError<T> = (error: T) => Promise<void>

type RequestToken = (url: string, success: RequestTokenSuccess<string>, error: RequestTokenError<string>) => Promise<void>

type UploadFileSuccess<T> = (contents: T) => Promise<void>

type UploadFileError<T> = (error: T) => Promise<void>

type UploadFile = () => Promise<void>

type DownloadFileSuccess<T> = (content: T) => Promise<void>

type DownloadFileError<T> = (error: T) => Promise<void>

type DownloadFile = () => Promise<void>
