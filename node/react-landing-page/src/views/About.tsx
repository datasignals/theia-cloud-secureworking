import { useNavigate } from 'react-router-dom';
export default function About(){
    const navigate = useNavigate();
    

    function loadWelcome() {
         navigate('/');
      }
    
    return(
    <div className="flex p-[20px] md:p-0 items-center justify-center w-full h-[100vh] bg-[url('/src/assets/images/onboard_bg.svg')] bg-cover bg-center">
        <div className="w-auto sm:w-[640px] md:w-[768px] lg:w-[1024px] xl:w-[1280px] 2xl:w-[1536px] min:h-[200px] bg-cardBg rounded-[30px] p-[50px] shadow-shadow-card">
            <div className="text-primary text-[24px] uppercase mb-[20px] font-semibold text-center">ABOUT US</div>
            <div className="h-[calc(100vh_-_400px)] overflow-auto">
                <div>
                   
                    <div className="text-[14px] text-primary text-[#ffffff99] mb-[20px]" >
                       Welcome to Lockular, where safeguarding your digital assets is our top priority. As a data security company, we understand the critical role data plays in powering today's interconnected world. Our mission is simple: to provide businesses, both large and small, with straightforward and robust solutions for protecting their most valuable asset—data.          
                    </div>
         
                    <div className="text-[14px] text-primary text-[#ffffff99]  mb-[20px]">
                       At Lockular, our foundation is built on a commitment to privacy, security, and empowering individuals and organizations with control over their data. Our dedication to responsible business practices extends beyond words—it's ingrained in everything we do. We operate with a sense of duty, ensuring that every decision we make benefits all stakeholders, from shareholders to customers, employees, and partners.
                    </div>
                    <div className="text-[14px] text-primary text-[#ffffff99]  mb-[20px]">
                       Lockular's IT infrastructure is designed with the latest cybersecurity measures to keep your data safe from evolving threats. From stringent access controls to multi-factor authentication, we employ industry-leading practices to fortify your defenses.                    </div>
                    <div className="text-[14px] text-primary text-[#ffffff99] mb-[20px]">
                       Our commitment to fair competition and collaboration underscores our belief in creating a stronger, more secure digital ecosystem for all.
                     </div>
                     <div className="text-[14px] text-primary text-[#ffffff99] mb-[20px]">
                        At Lockular, our team is at the heart of everything we do. We invest in talent, encourage innovation, and foster a culture of excellence to deliver the best possible outcomes for our clients.
                     </div>
                     <div className="text-[14px] text-primary text-[#ffffff99] mb-[20px]">
                     With Lockular, you can trust that your data is in capable hands. Join us on our mission to build a safer, more secure digital future for businesses worldwide.                     
                     </div>
                </div>
                
            </div>
            <div className="flex items-center justify-center space-x-[30px] mt-[30px]">
                <button className="bg-secondary h-[38px] w-[100px] border-0 flex items-center justify-center rounded-md" id="accept" onClick={loadWelcome} type="button">CLOSE</button>
            </div>
        </div>
     </div>
    ) 
 }