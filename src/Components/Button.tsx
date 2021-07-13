import {ButtonHTMLAttributes} from 'react';
import '../styles/button.scss'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &{
    isOutlined?: boolean;
};

export function Button({isOutlined=false, ...props}: ButtonProps){
    return (
        <button className={`button ${isOutlined?'outlined' : ''}`} {...props}/>
        //repassa cada uma das propriedades/atributos do elemento botão para esse button
    )
}

//<Button />//ao dar ctrl+space posso ver todas as possíveis propriedades oriundas do "props:ButtonProps"