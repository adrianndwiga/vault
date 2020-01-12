import { FileParams, FileStore, CloudDirectory } from "./types"
import { BlobServiceClient, StorageSharedKeyCredential } from '@azure/storage-blob'
import { readFile } from "fs"

interface AzureFileParams extends FileParams {
    containerName: string, 
    blobName: string
}

export class AzureFileStorage implements FileStore, CloudDirectory {
    private readonly blobServiceClient: BlobServiceClient

    constructor(account: string, accountKey: string) {
        const credential = new StorageSharedKeyCredential(account, accountKey)
        this.blobServiceClient = new BlobServiceClient(
            `https://${account}.blob.core.windows.net`, credential)
    }

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
        return new Promise<void>((resolve, reject) => {
            readFile(filePath, async (err, data) => {
                if (err) reject(err)
                const containerClient = this.blobServiceClient.getContainerClient(params.containerName)
                const blockBlobClient = containerClient.getBlockBlobClient(params.blobName)
                const uploadResponse = await blockBlobClient.upload(data, data.length)
                if (uploadResponse._response.status === 200)
                    resolve()
                else 
                    reject(uploadResponse)
            })    
        })
    }
}