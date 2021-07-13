import firebase from "firebase";
import { createContext, ReactNode, useEffect, useState } from "react";
import { auth } from "../services/firebase";

export const AuthContext = createContext({} as AuthContextType); //tipagem do typescript

type User = {
    id: string;
    name: string;
    avatar: string;
}
  
type AuthContextType = {
    user: User | undefined ;
    signInWithGoogle: () => Promise<void>;//toda async/await devolve uma promise
}

type AuthContextProviderProps = {
    children: ReactNode;
}

export function AuthContextProvider(props: AuthContextProviderProps){
    const [user, setUser] = useState<User>();//informando que o usuário é do tipo <User> (declarado na linha 12)
  //criando um estado através do React

  useEffect(()=>{
    const unsubscribe = auth.onAuthStateChanged(user => {
      if(user){
      const {displayName, photoURL, uid} = user;  

        if(!displayName || !photoURL){
          throw new Error('Missing information from Google Account.');
        }else{
          setUser({//"preenche o usuário"
            id: uid,
            name: displayName,
            avatar: photoURL
          })
        }
      }
    });//event listener

    return () =>{
      unsubscribe();//funcao para se descadastrar de todos os event listeners
    }

  }, [])//(funcao a ser executada, quando deve executar{se vazio=dispara uma unica vez})//hook

  async function signInWithGoogle(){
    const provider = new firebase.auth.GoogleAuthProvider();//autenticação google via firebase
    const result = await auth.signInWithPopup(provider);
    /*
        desafio: como capturar a informação se o user está logado em outras páginas? 
        bloqueando o acesso dele caso não esteja, por exemplo.. ou capturando as infos de login
        *****dica: usando a nova api de "context" (facilita troca de informações entre components)
    */           
    if(result.user){//se a autenticação funcionou corretamente
        const {displayName, photoURL, uid} = result.user;
        
        if(!displayName || !photoURL){
            throw new Error('Missing information from Google Account.');
        }else{
            setUser({//"preenche o usuário"
                id: uid,
                name: displayName,
                avatar: photoURL
            })
        }
    }
  }


    return(
        <AuthContext.Provider value={{user, signInWithGoogle}}>
            {props.children}
        </AuthContext.Provider>
    )
}