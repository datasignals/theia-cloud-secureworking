import { useEffect, useRef } from "react";
import Dropdown from "./Dropdown";

export default function Header(){

    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef);
    
    /**
     * Hook that alerts clicks outside of the passed ref
     */
    function useOutsideAlerter(ref: any) {
        useEffect(() => {
            /**
             * Alert if clicked on outside of element
             */
            function handleClickOutside(event: Event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    const dropdown = document.getElementById('dropdown');
                    dropdown?.classList.add('hidden');
                }
            }
            // Bind the event listener
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                // Unbind the event listener on clean up
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }
  

    const handleToggle = () => {
        const dropdown = document.getElementById('dropdown');
        dropdown?.classList.toggle('hidden');
        dropdown?.classList.toggle('block');
    };

    return(
     <>
         <nav className="fixed top-0 left-0 h-[110px] p-[20px] sm:p-0 w-full">
            <div className="flex items-center justify-between h-full w-auto sm:w-[640px] md:w-[768px] lg:w-[1024px] xl:w-[1280px] 2xl:w-[1536px] m-auto">
                <img className="w-[150px]" src="/assets/images/lockular_logo.svg" alt="brand-logo" />
                <ul className="flex items-center space-x-[20px]">
                    <li className="text-[14px] text-white"><a href="contact">Contact Us</a></li>
                    <li className="text-[14px] text-white"><a href="about">About Us</a></li>
                    <li className="text-[14px] text-white relative" ref={wrapperRef}><a>
                        <img className="cursor-pointer" src="/assets/images/ic_account.svg" onClick={handleToggle} /></a>
                        <div id="dropdown" className="hidden">
                            <Dropdown/>
                        </div>
                    </li>
                    {/* <li><a href="#"><img src="src//src/assets/images/ic_hamburger.svg" /></a></li> */}
                </ul>
            </div>
         </nav>
     </>
    ) 
 }
 