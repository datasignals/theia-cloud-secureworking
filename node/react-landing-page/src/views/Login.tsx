export default function Login(){
    return(
     <div className="flex items-center justify-center h-full w-full">
        <div className="w-[400px] min:h-[200px] bg-grayBg p-[50px] shadow-shadow-card">
            <img src="/assets/images/secure_working_logo.svg" />
            <div className="text-[12px] text-[#ffffff99] mb-[30px]">Login in to Secure Working</div>
            <form>
                <div className="mb-[20px]">
                    <label className="text-[12px] text-[#ffffff99]" htmlFor="username">Email or Username</label>
                    <input type="text" className="h-[38px] w-full mt-[7px] bg-white border-0 text-[14px] px-[16px] focus:outline-none focus:ring-seondary focus:border-secondary " id="username" />
                </div>
                <div className="mb-[30px]">
                    <label className="text-[12px] text-[#ffffff99]" htmlFor="username">Password</label>
                    <input type="password" className="h-[38px] w-full mt-[7px] bg-white border-0 text-[14px] px-[16px] focus:outline-none focus:ring-seondary focus:border-secondary " id="username" />
                </div>
                <button className="border-0 w-full bg-secondary text-white h-[38px] flex items-center justify-center mb-[15px]">
                    <a href="welcome">LOGIN</a>
                </button>
            </form>
            <div className="text-center">
                <span className="text-[12px] text-[#ffffff80]">Don't have an account?</span>
                <a href="register" className="text-secondary font-semibold text-[12px] ml-[10px]">Register</a>
            </div>
        </div>
     </div>
    ) 
 }