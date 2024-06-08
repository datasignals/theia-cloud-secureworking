import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import config from '../../public/config.js';
import { usePreviousContainer } from '../context/containerContext';
import { userData } from '../userData.js';



export default function WelcomeBack() {
  const navigate = useNavigate();
  const { previousContainer, setPreviousContainer } = usePreviousContainer();

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setPreviousContainer(selectedValue);
    userData.selectedContainer = selectedValue;
    console.log(selectedValue);
  };

  function termsfunction() {

    if (userData.termsAccepted == false ){
             navigate('/terms');
    }
    else{
        navigate('/loading');
    }        

  }

  // useEffect to update selectedContainer when userData.previousContainer changes
  useEffect(() => {
    setPreviousContainer(userData.previousContainer);
  }, [userData.previousContainer]);

  return (
    <div className="flex p-[20px] sm:p-0 items-center justify-center w-full h-[100vh] bg-[url('/src/assets/images/onboard_bg.svg')] bg-cover bg-center">
      <div className="w-[500px] min:h-[200px] bg-cardBg sm:p-[50px] shadow-lg rounded-[30px]">
        <div className='flex w-full justify-center mb-[30px]'>
          <img className="w-[200px]" src="/assets/images/logo_dark.svg" alt="brand-logo" />
        </div>
        <div className="mt-[20px] text-primary text-[16px] text-[#ffffff99] mb-[20px] font-semibold hidden">Welcome Back!</div>
        <form>
          <div className="mb-[30px]">
            <label className="text-[12px] font-medium text-[#1B1B1B99] mb-[20px]" htmlFor="r-codasip"> Select your Environment </label>
         
            <select
              id="r-codasip"
              className="h-[38px] w-full mt-[10px]  bg-transparent border border-inputBorder text-[14px] px-[16px] text-[#000] rounded-md focus:outline-none focus:ring-seondary focus:border-secondary"
              value={previousContainer} // Use previousContainer from context instead of local state
              onChange={handleSelectChange}
            >
              {config.availableContainers.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <button className="border-0 w-full rounded-md bg-secondary text-white h-[38px] flex items-center justify-center" onClick={termsfunction} type="button">
            OPEN
          </button>
        </form>
      </div>
    </div>
  );
}
