import './App.scss';
import { BrowserRouter as Router} from 'react-router-dom';
import { PrivateRoutes } from './Routes/PrivateRoutes/PrivateRoutes';
import PublicRoutes from './Routes/PublicRoutes/PublicRoutes';

function App() {
  return (
    <div className="App">
       <Router>
         <PrivateRoutes/> 
         <PublicRoutes/>
       </Router>
    </div>
  );
}

export default App;
