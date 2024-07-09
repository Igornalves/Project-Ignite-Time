import { Play } from 'phosphor-react'
import { CountdownConteiner, FormConteiner, HomeConteiner, Separator } from './styles';


export default function Home(){
    return (
        <HomeConteiner>
            <form action="">
                <FormConteiner>
                    <label htmlFor="">Vou Trabalha em</label> 
                    <input id="task" />

                    <label htmlFor="">durante</label>
                    <input type="number" id="minutesAmount" />

                    <span>minutos.</span>
                </FormConteiner>

                <CountdownConteiner>
                    <span>0</span>
                    <span>0</span>
                    <Separator>:</Separator>
                    <span>0</span>
                    <span>0</span>
                </CountdownConteiner>

                <button type="submit">
                    <Play size={24} />
                    Começar 
                </button>
            </form>
        </HomeConteiner>
    );
}