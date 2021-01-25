import Header      from './Componnts/Header/header'
import data        from './data.json';
import Footer      from './Componnts/Footer/footer'
import AllMovies   from "./Componnts/Movie/allMovies";
import { connect } from "react-redux";

function App() {
  return (
    <div className="App">
      <Header />
      <AllMovies data={data.data}/>
      <Footer />
    </div>
  );
}

export default connect()(App);
