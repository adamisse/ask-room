import {Home} from './pages/Home';
import { NewRoom } from './pages/NewRoom';
import {BrowserRouter, Route, Switch} from 'react-router-dom';//switch impede duas rotas serem chamadas simultaneamente
import { AuthContextProvider } from './contexts/AuthContext';
import { Room } from './pages/Room';
import { AdminRoom } from './pages/AdminRoom';

//utiliza-se conceitos de "routing" p/ navegação entre componentes atraves do react-router-dom
/*para tornar as rotas compativeis com o Typescript basta dar o seguinte comando no terminal:
yarn add @types/react-router-dom -D (-D = ambiente de desenvolvimento pois Ts e Route não são utilizados em produção)
*/

 

//o formato do contexto é passado como parâmetro({}:obj ou '':string);

//OBS: TUDO O QUE ESTÁ DENTRO DO PROVIDER (as rotas, por ex) CONSEGUE ENXERGAR O CONTEXTO PASSADO!!!

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Switch>
          <Route path="/" exact={true} component={Home} />
          <Route path="/rooms/new" component={NewRoom} />
          <Route path="/rooms/:id" component={Room} />
          <Route path="/admin/rooms/:id" component={AdminRoom} />
        </Switch>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
