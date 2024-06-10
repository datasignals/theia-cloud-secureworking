import { useNavigate } from 'react-router-dom';
export default function ContactUs(){

    const navigate = useNavigate();
    
    function loadWelcome() {
         navigate('/');
      }


    return(
     <div className="flex p-[20px] sm:p-0 items-center justify-center w-full h-[100vh] bg-[url('/src/assets/images/onboard_bg.svg')] bg-cover bg-center">
        <div className="w-auto md:w-[700px] min:h-[200px] bg-cardBg rounded-[30px] p-[50px] shadow-shadow-card">
            <div className="text-[20px] text-primary font-semibold text-center">Contact us</div>
            <div className="my-[50px] grid grid-cols-3 gap-[30px]">
                <div className="col-span-1 flex items-center flex-col">
                    <div><img className="h-[48px] w-[48]px" src="/assets/images/location.svg"  /></div>
                    <div className="text-[14px] mt-[15px] text-primary text-center">Lockular Limited, 3 Hardman Square, Manchester, M3 3EB, UK</div>
                </div>
                <div className="col-span-1 flex items-center flex-col">
                    <div><img className="h-[48px] w-[48]px" src="/assets/images/email.svg" /></div>
                    <div className="text-[14px] mt-[15px] text-primary">info@lockular.com</div>
                </div>
                <div className="col-span-1 flex items-center flex-col">
                    <div><img className="h-[48px] w-[48]px" src="/assets/images/phone.svg" /></div>
                    <div className="text-[14px] mt-[15px] text-primary">+44808080800</div>
                </div>
            </div>
            <div className="col-span-2 flex justify-center">
                <button className="rounded-md border-0 w-[120px] bg-secondary h-[38px] flex items-center  justify-center " id="accept" onClick={loadWelcome}>
                    <a href="">CLOSE</a>
                </button>
            </div>
            {/* <form className="mt-[30px] grid grid-cols-2 gap-[30px]">
                <div className="col-span-1">
                    <label className="text-[12px] font-medium text-[#1B1B1B99]" htmlFor="c-first-name">First Name</label>
                    <input type="text" id="c-first-name" className="h-[38px] w-full rounded-md mt-[5px] bg-transparent border border-inputBorder text-[14px] px-[16px] focus:outline-none focus:ring-seondary focus:border-secondary " />
                </div>
                <div className="col-span-1">
                    <label className="text-[12px] font-medium text-[#1B1B1B99]" htmlFor="c-last-name">Last Name</label>
                    <input type="text" id="c-last-name" className="h-[38px] w-full rounded-md mt-[5px] bg-transparent border border-inputBorder text-[14px] px-[16px] focus:outline-none focus:ring-seondary focus:border-secondary " />
                </div>
                <div className="col-span-1">
                    <label className="text-[12px] font-medium text-[#1B1B1B99]" htmlFor="c-email">Email</label>
                    <input type="text" id="c-email" className="h-[38px] w-full rounded-md mt-[5px] bg-transparent border border-inputBorder text-[14px] px-[16px] focus:outline-none focus:ring-seondary focus:border-secondary " />
                </div>
                <div className="col-span-1">
                    <label className="text-[12px] font-medium text-[#1B1B1B99]" htmlFor="c-subject">Subject</label>
                    <input type="text" id="c-subject" className="h-[38px] w-full rounded-md mt-[5px] bg-transparent border border-inputBorder text-[14px] px-[16px] focus:outline-none focus:ring-seondary focus:border-secondary " />
                </div>
                <div className="col-span-2">
                    <label className="text-[12px] font-medium text-[#1B1B1B99]" htmlFor="r-username">Message</label>
                    <textarea id="c-message" className="h-[72px] w-full mt-[5px] rounded-md bg-transparent border border-inputBorder text-[14px] px-[16px] focus:outline-none focus:ring-seondary focus:border-secondary "></textarea>
                </div>
            </form> */}
        </div>
     </div>
    ) 
 }