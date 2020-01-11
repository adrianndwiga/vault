import * as AWS from 'aws-sdk'
import { readFile, writeFile } from 'fs';

interface FileParams {

}

interface FileStore {
    downloadFile(params: FileParams, filePath: string): Promise<void>
    uploadFile(params: FileParams, filePath: string): Promise<void>
}

interface CloudDirectory {
    createDirectory(directoryName: string): Promise<void>
    deleteDirectory(directoryName: string): Promise<void>
}


interface AWSS3Params extends FileParams {
    Bucket: string
    Key: string
}

export class AWSS3 implements FileStore, CloudDirectory {
    private readonly s3: AWS.S3

    constructor(accessKeyId: string, secretAccessKey: string) {
        this.s3 = new AWS.S3({
            accessKeyId,
            secretAccessKey
        })
    }

    downloadFile(params: AWSS3Params, filePath: string) {
        return new Promise<void>((resolve, reject) => {
            this.s3.getObject(params, (err, data) => {
                writeFile(filePath, data.Body.toString(), 'utf8', (err) => {
                    err ? reject(err) : resolve()
                })
            })
        })
    }

    uploadFile(params: AWSS3Params, filePath: string): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            readFile(filePath, (err, data) => {
                if (err) throw err
                this.s3.upload({
                    Bucket: params.Bucket,
                    Key: params.Key,
                    Body: data
                }, (err, data) => {
                    if (err) 
                        reject(err)
                    resolve()
                })
            })
        })
    }

    createDirectory(bucketName: string): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            const params = {
                Bucket: bucketName
            }
            this.s3.createBucket(params, (err, data) => {
                if(err) 
                    reject(err)
                resolve()
            })
        })
    }

    deleteDirectory(bucketName: string): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            const params = {
                Bucket: bucketName
            }
            this.s3.deleteBucket(params, (err, data) => {
                if (err) 
                    reject(err)
                resolve()
            })
        })
    }
}