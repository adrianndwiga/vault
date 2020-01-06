type RequestTokenSuccess = (tokenPath: string, token: string) => Promise<void>

type RequestTokenError = () => Promise<void>

type RequestToken = (url: string, success: RequestTokenSuccess, error: RequestTokenError) => Promise<void>
