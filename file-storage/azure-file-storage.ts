import { FileParams, FileStore, CloudDirectory } from "./types"
import { BlobServiceClient, StorageSharedKeyCredential } from '@azure/storage-blob'
import { readFile, createWriteStream } from "fs"

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
        return new Promise<void>(async (resolve, reject) => {
            const containerClient = this.blobServiceClient.getContainerClient(params.containerName)
            const blobClient = containerClient.getBlobClient(params.blobName)
            const response = await blobClient.download()
            if (response._response.status === 200) {
                const ws = createWriteStream(filePath)
                response.readableStreamBody.pipe(ws)
                resolve()    
            } else {
                reject(response._response)
            }
        })
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