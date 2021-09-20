import UploadImages from './screens/upload-images';
import Login from './screens/list-images';
import { BrowserRouter as Router, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <UploadImages />
      <Route exact path='/' component={UploadImages}></Route>
      <Route exact path='/list' component={Login}></Route>
    </Router>
  );
}

export default App;