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
            console.error('Error while uploading file:', error);
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
            console.error('Error while deleting file:', error);
            return false ;
        }
    }

    getFilePreview( fileId ) {
        return this.storage.getFilePreview(
            conf.appwriteBucketId,
            fileId
        ).href; 
        //getFilePreview method returns an URL object. You need to access the href property of that object to get the actual URL string.
    }
}

const fileService = new FileService();

export default fileService ;