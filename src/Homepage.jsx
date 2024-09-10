import { Link } from "react-router-dom";
import { Outlet} from 'react-router-dom'
import background from './images/bg.jpg'

export default function HomePage(){
    return (
        <div className='homePage'>

            <section className='homeDesc'>
               <p className='homeTitle'>The World Reality Blog </p>
               <p> Welcome to World Reality Blog! Blog on some life lessons!!! </p>
               <p> Want to sign up? </p>
               <p> 
                    <Link to="/signup" className="button"> Sign up </Link> 
                </p>
               <p><span>Already a user!</span> </p>
               <p>
                    <Link to="/login"> Log in </Link> 
               </p>
            </section>
            
            <section className='signForms'>
          
                < Outlet />

            </section>

        </div>
    )
}