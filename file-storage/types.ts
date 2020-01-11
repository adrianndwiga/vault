export interface FileParams {

}

export interface FileStore {
    downloadFile(params: FileParams, filePath: string): Promise<void>
    uploadFile(params: FileParams, filePath: string): Promise<void>
}

export interface CloudDirectory {
    createDirectory(directoryName: string): Promise<void>
    deleteDirectory(directoryName: string): Promise<void>
}