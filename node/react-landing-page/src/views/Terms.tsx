import { useNavigate } from 'react-router-dom';
import { userData } from '../userData';


export default function Terms(){
    
    const navigate = useNavigate();

    function loadingNavigate()
    {
        userData.termsAccepted = true   
        navigate("/loading")
    }

    function welcomeNavigate()
    {
        userData.termsAccepted = false   
           navigate("/")
    }

    return(
    <div className="flex p-[20px] md:p-0 items-center justify-center w-full h-[100vh] bg-[url('/src/assets/images/onboard_bg.svg')] bg-cover bg-center">
        <div className="w-auto md:w-[700px] xl:w-[1000px] 2xl:w-[1200px] min:h-[200px] bg-cardBg rounded-[30px] p-[50px] shadow-shadow-card">
            <div className="text-primary text-[24px] uppercase mb-[20px] font-semibold text-center">Secure Working - End User License</div>
            <div className="h-[calc(100vh_-_500px)] overflow-auto">
                <div>
                    <div className="text-[18px] text-primary mb-[7px] font-semibold"> End-User License Agreement</div>

                    <div className="text-[14px] text-primary text-[#ffffff99] font-medium mb-[10px]">
                     BEFORE ACCESSING ANY SOFTWARE THROUGH LOCKULAR, PLEASE READ THIS AGREEMENT CAREFULLY:
                    </div>

                    <div className="text-[14px] text-primary text-[#ffffff99] mb-[10px]">
                    This End-User License Agreement ("License") constitutes a legally binding agreement between you ("Licensee" or "you") and Lockular Ltd ("Lockular," "we," or "the Company") governing your use of the software applications ("Software") accessible through Lockular's platform.
                    </div>

                    <div className="text-[14px] text-primary text-[#ffffff99] mb-[10px] ">
                     <b> Software Access : </b>
                     Lockular grants you a personal, limited, revocable, non-exclusive, non-transferable license, solely for your lawful use of the Software via Lockular's platform.
                    </div>

                    <div className="text-[14px] text-primary text-[#ffffff99] mb-[10px]">
                     <b> Ownership and Transfer :  </b>
                    This License does not transfer any ownership of the Software to you. Lockular retains all ownership rights to the Software.
                    </div> 

                     <div className="text-[14px] text-primary text-[#ffffff99] mb-[10px]">
                     <b> Usage Restrictions : </b>
                     You agree to use the Software only for lawful purposes and in compliance with applicable laws. Modification, reverse-engineering, or distribution of the Software is prohibited.
                     </div>   

                     <div className="text-[14px] text-primary text-[#ffffff99] mb-[10px] ">
                     <b>  Intellectual Property : </b>
                     You acknowledge that Lockular owns all intellectual property rights in the Software. This License grants you the right to use the Software but does not transfer any intellectual property rights to you.
                     </div>   

                     <div className="text-[14px] text-primary text-[#ffffff99] mb-[10px]">
                    <b> Warranty Disclaimer :</b>
                    The Software is provided "as is" without warranties of any kind, express or implied. Lockular disclaims all warranties, including fitness for a particular purpose and non-infringement.
                     </div>   

                     <div className="text-[14px] text-primary text-[#ffffff99] mb-[10px]">
                     <b> Limitation of Liability:  </b>
                     Lockular shall not be liable for any indirect, incidental, or consequential damages arising from your use of the Software.
                     </div>   

                     <div className="text-[14px] text-primary text-[#ffffff99] mb-[10px]">
                     <b> Termination : </b>                 
                     Lockular reserves the right to terminate this License at any time without notice. Upon termination, you must cease all use of the Software.                   
                     </div>   


                     <div className="text-[14px] text-primary text-[#ffffff99] mb-[10px]">
                     <b> Governing Law : </b>
                     This License shall be governed by and construed in accordance with the laws of [Jurisdiction]. You agree to submit to the exclusive jurisdiction of the courts in that jurisdiction.
                     </div>   

                     <div className="text-[14px] text-primary text-[#ffffff99] mb-[10px] font-semibold">
                     By accessing the Software through Lockular's platform, you acknowledge that you have read, understood, and agreed to the terms of this License.
                     </div>   



                </div>
            </div>
            <div className="flex items-center justify-center space-x-[30px] mt-[30px]">
                <button className="bg-transparent border border-secondary h-[38px] w-[100px] text-secondary rounded-md flex items-center justify-center" id="decline" onClick={welcomeNavigate} type="button"> DECLINE </button>
                <button className="bg-secondary h-[38px] w-[100px] border-0 flex items-center justify-center rounded-md" id="accept" onClick={loadingNavigate} type="button">ACCEPT</button>
            </div>
        </div>
     </div>
    ) 
 }