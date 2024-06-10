export default function Footer(){
    return(
     <div className="fixed bottom-0 left-0 h-[100px] w-full">
        <div className="flex items-center justify-end h-full w-auto sm:w-[640px] md:w-[768px] lg:w-[1024px] xl:w-[1280px] 2xl:w-[1536px] m-auto">
            <div className="text-[14px] text-[#ffffff99] mt-[10px]">Copyright ©  Lockular Limited </div>
            <div className="flex ml-[20px] items-center space-x-[10px]">
                <a href="https://uk.linkedin.com/company/lockular-ltd" target="_blank" ><img src="/assets/images/ic_linkedin.svg" /></a>
                <a href="https://twitter.com/lockular" target="_blank"><img src="/assets/images/ic_twitter.svg" /></a>
            </div>
        </div>
     </div>
    ) 
 }