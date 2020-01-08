export const router = {
    '/dummy-get-request': (chunk: any) => {
        console.log(`dummy-get-request/${chunk}`);
    },
    '/dummy-post-request': (chunk: any) => {
        console.log(`dummy-post-request/${chunk}`);        
    }
}