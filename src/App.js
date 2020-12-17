
import './App.css';
import Login from './components/Login'
import Home from './components/Home'
import 'bootstrap/dist/css/bootstrap.min.css';
import{Route, Switch , BrowserRouter as Router} from 'react-router-dom';
function App() {
  return (
    
    
    <Router>
    <div className="App">
     
     <Switch>
      <Route path ="/" exact component={Home}/>
      <Route path ="/Login" exact component={Login}/>
     </Switch>
    </div>
    </Router>
    
  );
}

export default App;
