import { Link, useHistory } from 'react-router-dom'; //Link assume o papel do href no React
import { useAuth } from '../hooks/useAuth';
import { FormEvent, useState } from 'react';
import { database } from '../services/firebase';

import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
//webpack (snowpack, vite..) responsável pelas importações
import { Button } from '../Components/Button';

import '../styles/auth.scss';

export function NewRoom(){
    const { user } = useAuth();
    const history = useHistory();
    const [newRoom, setNewRoom] = useState('');

    async function HandleCreateRoom(event: FormEvent) {
        event.preventDefault();//funcao para prevenir o comportamento refresh padrão do onSubmit
        console.log(newRoom);
        if(newRoom.trim()===''){//remover os espaços para validar o texto
            return;
        }
        
        const roomRef = database.ref('rooms'); //a referência é uma "linha" de informações contida no banco de dados
        const firebaseRoom = await roomRef.push({
            title: newRoom,
            authorId: user?.id
        });//jogando uma nova sala para dentro de 'rooms'
        history.push(`/rooms/${firebaseRoom.key}`);//possível bug pela falta de '/'
    }   
    return(
        <div id="page-auth">
            <aside>
                <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas"/>
                <strong>Pergunte para a CT Junior</strong>
                <p>Tire suas dúvidas durante os diversos eventos da CT</p>
            </aside>
            <main className="main-content">
                <div>
                    <img src={logoImg} alt="Letmeask" />
                    <h2>Criar uma nova sala</h2>
                    <form onSubmit={HandleCreateRoom}>
                        <input 
                            type="text" 
                            placeholder="Nome da sala" 
                            onChange = {event => setNewRoom(event.target.value)}
                            value = {newRoom}
                        />
                        <Button type="submit">
                            Criar sala
                        </Button>
                    </form>
                    <p>
                        Deseja entrar em uma sala existente? <Link to="/">clique aqui</Link>
                    </p>
                </div>
            </main>
        </div>
    )
}