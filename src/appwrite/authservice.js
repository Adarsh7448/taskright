import envConfig from "../config/env-config";
import { Client, Account, ID } from "appwrite"; 

class AuthService{
    client = new Client()
    account
    constructor(){
        this.client
        .setEndpoint(envConfig.appwriteUrl)
        .setProject(envConfig.appwriteProjectId)
        this.account = new Account(this.client)
    }

    async checkLogin(){
        try {
            const user = await this.account.get()
            return user
        } catch (error) {
            console.error("APPWRITE CHECK LOGIN ERROR: ", error)
            return null
        }
    }

    async createAccount({email, password, name}){
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name)
            if(userAccount){
                return userAccount
            }
            else{
                return null
            }
        }
        catch (error) {
            console.error("APPWRITE CREATE ERROR: ", error)
        }
    }

    async signIn({email, password}){
        try {
            const user =  await this.account.createEmailPasswordSession(email, password)
            return user
        }catch (error) {
            console.error("APPWRITE LOGIN ERROR: ", error)
        }
    }

    async signOut(){
        try {
            if(this.checkLogin()){
                return await this.account.deleteSessions()
            }else{
                return null
            }  
        } catch (error) {
            console.error("APPWRITE ERROR: ", error)
        }
    }
}

const authService = new AuthService()

export default authService