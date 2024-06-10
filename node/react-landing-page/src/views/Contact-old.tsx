import { useNavigate } from 'react-router-dom';
export default function Contact(){

    const navigate = useNavigate();
    
    function loadWelcome() {
         navigate('/');
      }

    return(
     <div className="flex p-[20px] sm:p-0 items-center justify-center w-full h-[100vh] bg-[url('/src/assets/images/onboard_bg.svg')] bg-cover bg-center">
        <div className="w-auto md:w-[700px] min:h-[200px] bg-cardBg rounded-[30px] p-[50px] shadow-shadow-card">
            <div className="text-[20px] text-primary font-semibold text-center">Contact us</div>
            <form className="mt-[30px] grid grid-cols-2 gap-[30px]">
                
                <div className="col-span-2 flex justify-center">
                   <button className="bg-transparent border border-secondary h-[38px] w-[100px] text-secondary rounded-md flex items-center justify-center mr-[15px]" id="accept" onClick={loadWelcome} type="button">CLOSE</button>
                    <button className="rounded-md border-0 w-[120px] bg-secondary text-primary h-[38px] flex items-center text-white justify-center">
                        <a href="">SEND</a>
                    </button>
                </div>
            </form>
        </div>
     </div>
    ) 
 }