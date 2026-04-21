import { use, useState } from "react"
import { API_URL } from "../src/assets/api";

export type ConversationMessage = {
    role: "user" | "assistant"
    content: string
}

export interface useChatResponse {
    success:boolean
    conversation:ConversationMessage[]
    user_info?: {
        name:string
        age:number
        email:string
        phone:string
    }
    chat:(user_message:string)=> void
    loading:boolean
}

export function useChat():useChatResponse{
    const [loading, setLoading] = useState<boolean>(false)
    const [conversation, setConverstion] = useState<ConversationMessage[]>([])
    const [user_info, setUserInfo] = useState<useChatResponse["user_info"]>()

    const chat = async (user_message:string)=>{
        setLoading(true)
        try {
            const response = await fetch(`${API_URL}/api/chat`, {
                method:"POST",
                headers:{
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ user_input: user_message })
            })

            if(!response.ok){
                throw new Error("Failed to fetch chat response")
            }

            const data = await response.json()
            setConverstion(data.conversation)
            console.log("Chat response data:", data);

            const bot_response = JSON.parse(data.data)
            if(bot_response.user_info){
                setUserInfo(bot_response.user_info)
            }

        } catch (error) {
            
        }
        finally{
            setLoading(false)
        }
    }
    return {
        success: true,
        conversation,
        chat,
        loading,
       user_info, 
    }
}