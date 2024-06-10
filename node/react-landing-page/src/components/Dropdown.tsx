import config from '../../public/config.js';
export default function Dropdown(){
    return(
        <>
            <div className="w-[200px] absolute top-[45px] right-0 bg-cardBg p-[20px] text-primary rounded-[15px] font-medium space-y-[15px]">
                <div><a href="">Change Password</a></div>  
                <div><a href={config.logoutUrl}>Logout</a></div>
            </div> 
       </>
    ) 
 }