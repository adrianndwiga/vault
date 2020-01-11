import { FileParams, FileStore, CloudDirectory } from "./types";

interface AzureFileParams extends FileParams {
    id: string
}

export class AzureFileStorage implements FileStore, CloudDirectory {
    createDirectory(directoryName: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    deleteDirectory(directoryName: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    downloadFile(params: AzureFileParams, filePath: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    uploadFile(params: AzureFileParams, filePath: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
}