import conf from "../conf/conf";
import { Client, ID, Storage } from "appwrite";


export class FileService{
    client = new Client();
    storage;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        
        this.storage = new Storage(this.client);
    }

    async uploadFile(file) {
        try {
            return await this.storage.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            );

        } catch (error) {
            console.error('Appwrite service :: uploadFile :: error', error);
            return false ;
        }
    }

    async deleteFile( fileId ) {
        try{
            await this.storage.deleteFile(
                conf.appwriteBucketId,
                fileId
            )

            return true ;
        }catch(error){
            console.error('Appwrite service :: deleteFile :: error', error);
            return false ;
        }
    }

    getFilePreview(fileId) {
        // Files in the public directory are served at the root path, so use '/placeholder.png'
        if (!fileId) {
            return '/placeholder.png';
        }
        try {
            return this.storage.getFilePreview(conf.appwriteBucketId, fileId).href;
        } catch (error) {
            console.warn('Appwrite service :: getFilePreview :: error. Check bucket permissions.', error);
            return '/placeholder.png';
        }
        //getFilePreview method returns an URL object. 
        // You need to access the href property of that 
        // object to get the actual URL string.
    }
}

const fileService = new FileService();

export default fileService ;