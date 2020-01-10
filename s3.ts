import * as AWS from 'aws-sdk'
import { readFile, writeFile } from 'fs';

interface FileStore {
    downloadFile(params: {Bucket: string, Key: string}, filePath: string): Promise<void>
    uploadFile(params: {Bucket: string, Key: string}, filePath: string): Promise<void>
}

export class AmazonS3 implements FileStore {
    private readonly s3: AWS.S3;
    constructor(accessKeyId: string, secretAccessKey: string) {
        this.s3 = new AWS.S3({
            accessKeyId,
            secretAccessKey
        })
    }

    downloadFile(params: {Bucket: string, Key: string}, filePath: string) {
        return new Promise<void>((resolve, reject) => {
            this.s3.getObject(params, (err, data) => {
                writeFile(filePath, data.Body.toString(), 'utf8', (err) => {
                    err ? reject(err) : resolve()
                })
            })
        })
    }

    uploadFile(params: {Bucket: string, Key: string}, filePath: string): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            readFile(filePath, (err, data) => {
                if (err) throw err
                // const uploadData = new Buffer(data, 'binary')
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
}

export async function createBucket(): Promise<void> {

}

export async function uploadFile(): Promise<void> {}

export async function downloadFile(): Promise<void> {}


