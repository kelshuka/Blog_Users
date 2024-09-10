
import { Link } from 'react-router-dom'
import { Outlet} from 'react-router-dom'

//import './App.css'



function App() {

  return (
    <div className='container'>
      <header>
        
        <section className='navigates'>
          <nav>
            <div className='homeBlog'>
              <button type='button'> <Link to="/homepage"> Home </Link> </button>
              <button type='button'> <Link to="/blogPage/allposts"> Blog </Link> </button>
            </div>

            <div className='logOut'>
              <button type='button'> <Link to="/blogPage/logout"> logout </Link> </button>
            </div>
        
          </nav>
        </section>

      </header>
      
      <main>
        
        <section className='blogs'>
          
          < Outlet />

        </section>

      </main>

      <footer>

        <div className='footHome'> The World Reality Blog </div>

      </footer>
    </div>
  )
}

export default App
