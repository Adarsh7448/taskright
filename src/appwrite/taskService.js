import envConfig from "../config/env-config";
import { Client, ID, Databases, Query } from "appwrite"

class TaskService {
    client = new Client()
    databases
    constructor() {
        this.client
        .setEndpoint(envConfig.appwriteUrl)
        .setProject(envConfig.appwriteProjectId)
        this.databases = new Databases(this.client)
    }

    async getTasks(userId){
        try {
            const documents = await this.databases.listDocuments(
                envConfig.appwriteDatabaseId,
                envConfig.appwriteTaskCollectionId,
                [
                    Query.equal('auth_id', userId),
                ]
            )
            return documents
        } catch (error) {
            console.error(`APPWRITE ERROR: ${error}`)
            return null
        }
    }

    async createTask({task_title, task_content, deadline, high_priority, is_completed, auth_id}){
        try {
            const result = await this.databases.createDocument(
                envConfig.appwriteDatabaseId, // databaseId
                envConfig.appwriteTaskCollectionId, // collectionId
                ID.unique(), // documentId
                {
                    task_title, 
                    task_content, 
                    deadline, 
                    high_priority, 
                    is_completed,
                    auth_id
                }, // data
            )
            return result;
        } catch (error) {
            console.error(`APPWRITE ERROR: ${error}`)
            return null
        }
        
    }

    async updateTask({task_id, task_title, task_content, deadline, high_priority, is_completed, auth_id}){
        try {
            const result = await this.databases.updateDocument(
                envConfig.appwriteDatabaseId, // databaseId
                envConfig.appwriteTaskCollectionId, // collectionId
                task_id, // documentId
                {
                    task_title, 
                    task_content, 
                    deadline, 
                    high_priority, 
                    is_completed,
                    auth_id
                }, // data
            )
            return result;
        } catch (error) {
            console.error(`APPWRITE ERROR: ${error}`)
            return null
        }
        
    }

    async deleteTask(taskId){
        try {
            const result = await this.databases.deleteDocument(
                envConfig.appwriteDatabaseId, // databaseId
                envConfig.appwriteTaskCollectionId, // collectionId
                taskId // documentId
            );
            return result
        } catch (error) {
            console.error(`APPWRITE ERROR: ${error}`)
            return null 
        }
    }
}

const taskService = new TaskService;
export default taskService




