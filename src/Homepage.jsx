import { Link } from "react-router-dom";
import { Outlet} from 'react-router-dom'
import background from './images/bg.jpg'

//import './input.css'

export default function HomePage(){

    return (
        <div className="w-full flex flex-col items-center justify-center h-screen" style={
            {
                backgroundImage: `url(${background})`,
                height: "100vh",
                /* marginTop: "-70px", */
                /* fontSize: "50px", */
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
            }
        }>

            <section className="w-3/5 text-center space-y-4 bg-white p-8 rounded shadow-lg">
               <p className="text-4xl font-bold">The World Reality Blog </p>
               <p> Welcome to World Reality Blog! Blog on some life lessons!!! </p>

               <p> Want to sign up? </p>
               <p> 
                    <Link to="/signup" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">
                        Sign Up
                    </Link>                   
                </p>


               <p><span>Already a user!</span> </p>
               <p>
                    <Link to="/login" className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700">
                        Log In
                    </Link>
               </p>

               < Outlet />
             
            </section>
          
            

        </div>
    )
}