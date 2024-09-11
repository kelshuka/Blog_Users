
import { Link } from 'react-router-dom'
import { Outlet} from 'react-router-dom'





function App() {

  return (
    <div className="flex flex-col min-h-screen">
      <header className="fixed w-full top-0 bg-gray-800 text-white p-4 flex justify-between items-center shadow-md z-50">
        

        <h1 className="text-2xl font-bold">World Reality Blog</h1>
        <nav className="flex">
          <div >
            <Link to="/homepage" className="mr-4 hover:underline"> Home </Link> 
            <Link to="/blogPage/allposts" className="mr-4 hover:underline"> Blog </Link> 
          </div>

          <div >
            <Link to="/blogPage/logout" className="hover:underline"> logout </Link> 
          </div>
      
        </nav>

      </header>
      
      <main className="flex-grow pt-20 pb-16 px-4">
        
        <section className='blogs'>
          
          < Outlet />

        </section>

      </main>

      <footer className="fixed bottom-0 w-full bg-gray-800 text-white text-center p-2">

        <p>&copy; 2024 World Reality Blog. All rights reserved.</p>

      </footer>
    </div>
  )
}

export default App
