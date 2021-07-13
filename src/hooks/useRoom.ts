import { useEffect, useState } from "react";
import { database } from "../services/firebase";
import { useAuth } from "./useAuth";

type FirebaseQuestions = Record<string, {
    author: {
        name: string;
        avatar: string;
    }
    content: string;
    isAnswered: boolean;
    isHighlighted: boolean;
    likes: Record<string, {
        authorId: string;
    }>
}>

type QuestionType = {
    id: string;
    author: {
        name: string;
        avatar: string;
    }
    content: string;
    isAnswered: boolean;
    isHighlighted: boolean; 
    likeCount: number;
    likeId: string | undefined;
}

export function useRoom(roomId: string){
    const {user} = useAuth();
    const [questions, setQuestions] = useState<QuestionType[]>([]);
    const [title, setTitle] = useState('');

    useEffect(() => {
        //console.log(roomId);
        const roomRef = database.ref(`rooms/${roomId}`);
        roomRef.on('value', room => {//documentação do firebase(para pegar infos das salas)
            //console.log(room.val());
            const databaseRoom = room.val();
            const firebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {};//?? {} -> caso esteja vazio
            //Object.entries retorna uma matriz dos valores do objeto em questão
            const parsedQuestions = Object.entries(firebaseQuestions).map(([key, value]) => {
                return {
                    id: key,
                    content: value.content,
                    author: value.author,
                    isHighlighted: value.isHighlighted,
                    isAnswered: value.isAnswered,
                    likeCount: Object.values(value.likes ?? {}).length,
                    likeId: Object.entries(value.likes ?? {}).find(([key, like]) => like.authorId === user?.id)?.[0],//retorna true ou false quando encontrar o parâmetro;
                }
            }); 

            console.log(parsedQuestions);
            setTitle(databaseRoom.title);
            setQuestions(parsedQuestions);
        });
        return () =>{
            roomRef.off('value');
        }
    }, [roomId, user?.id]);

    return {questions, title}
}