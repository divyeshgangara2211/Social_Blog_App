import conf from "../conf/conf";
import { Client, ID , Databases , Storage , Query } from "appwrite";

export class AppwriteService {
    client = new Client();
    databases;
    bucket;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);

    }

    async createPost( { title, slug , content , featuredImage , status , userId} ){
        try{
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug || ID.unique(),
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            )
        }catch(error){
            console.error('Error creating post:', error);
            throw error;
        }
    }

    async updatePost( slug, { title, content, featuredImage, status } ){
        try{
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status
                }
            )
        }catch(error){
            console.error('Error updating post:', error);
            throw error;
        }
    }

    async deletePost( slug ){
        try{
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                
            )

            return true;
        }catch(error){
            console.error('Error deleting post:', error);
            return false;
        }
    }

    async getPost( slug ){
        try{
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )

        }catch(error){
            console.error('Error fetching post:', error);
            return false;
        }
    }

    async getPosts( queries = [ Query.equal("Status" , "active") ] ){
        try{
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries,
                100, // Limit to 100 posts per request
                0 // Start from the first post
            )
        }catch(error){
            console.error('Error fetching posts:', error);
            return false;
        }
    }
}

// here slug means the document ID in Appwrite.

const service = new AppwriteService();

export default service;