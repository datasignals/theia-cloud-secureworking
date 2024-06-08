export default function Register(){

    
    return(
     <div className="flex p-[20px] sm:p-0 items-center justify-center w-full h-[100vh] bg-[url('/src/assets/images/onboard_bg.svg')] bg-cover bg-center">
        <div className="w-[400px] min:h-[200px] bg-grayBg p-[50px] shadow-shadow-card">
            <img src="/assets/images/secure_working_logo.svg" />
            <div className="text-[12px] text-[#ffffff99] mb-[30px]">Enter your details to register</div>
            <form>
            <div className="mb-[20px]">
                    <label className="text-[12px] text-[#ffffff99]" htmlFor="r-full">Full Name</label>
                    <input type="text" id="r-full" className="h-[38px] w-full mt-[7px] bg-white border-0 text-[14px] px-[16px] focus:outline-none focus:ring-seondary focus:border-secondary " />
                </div>
                <div className="mb-[20px]">
                    <label className="text-[12px] text-[#ffffff99]" htmlFor="r-username">Username</label>
                    <input type="text" id="r-username" className="h-[38px] w-full mt-[7px] bg-white border-0 text-[14px] px-[16px] focus:outline-none focus:ring-seondary focus:border-secondary " />
                </div>
                <div className="mb-[20px]">
                    <label className="text-[12px] text-[#ffffff99]" htmlFor="r-email">Email</label>
                    <input type="text" id="r-email" className="h-[38px] w-full mt-[7px] bg-white border-0 text-[14px] px-[16px] focus:outline-none focus:ring-seondary focus:border-secondary " />
                </div>
                <div className="mb-[30px]">
                    <label className="text-[12px] text-[#ffffff99]" htmlFor="r-password">Password</label>
                    <input type="password" id="r-password" className="h-[38px] w-full mt-[7px] bg-white border-0 text-[14px] px-[16px] focus:outline-none focus:ring-seondary focus:border-secondary " />
                </div>
                <button className="border-0 w-full bg-secondary text-white h-[38px] flex items-center justify-center mb-[15px]">
                    <a href="welcome">REGISTER</a>
                </button>
            </form>
            <div className="text-center">
                <span className="text-[12px] text-[#ffffff80]">Already have an account?</span>
                <a href="/" className="text-secondary font-semibold text-[12px] ml-[10px]">Login</a>
            </div>
        </div>
     </div>
    ) 
 }