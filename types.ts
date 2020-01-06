type RequestTokenSuccess = (tokenPath: string, token: string) => Promise<void>

type RequestTokenError = () => Promise<void>

type RequestToken = (url: string, success: RequestTokenSuccess, error: RequestTokenError) => Promise<void>

type UploadFileSuccess<T> = (contents: T) => Promise<void>

type UploadFileError<T> = (error: T) => Promise<void>

type UploadFile = () => Promise<void>