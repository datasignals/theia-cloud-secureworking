import { LaunchRequest, RequestOptions, TheiaCloud } from "@lockular/common/src";
import { useEffect } from 'react';
import config from '../../public/config.js';
import { userData } from '../userData';


export default function Loading() {
  useEffect(() => {
    // Create WorkSpace 
    const launchRequest = LaunchRequest.createWorkspace(
      config.serviceUrl!,
      config.appId!,
      userData.selectedContainer!,
      undefined,
      userData.email,
      userData.workspaceName
    );

    // Create Request Options
    console.log(userData.selectedContainer + "checck")
    console.log("rameez 400");
    console.log(userData.token);
    console.log("rameez 500");
    const options: RequestOptions = {
      accessToken: userData.token,
      retries: 12,
      timeout: 30000,
    };

    // Launch Session 
    const newLaunchRequest = { ...launchRequest, companyName: "codasip", licenseKey: "1" };

    console.log("launch called ")

    TheiaCloud.launchAndRedirect(newLaunchRequest, options)
      .catch(error => {
        console.error(error);
      });
  }, []); // Empty dependency array to run useEffect only once

  return (
    <div className="flex items-center justify-center w-full h-screen bg-[url('/src/assets/images/onboard_bg.svg')] bg-cover bg-center">
      <div className="w-[700px] min-h-200 bg-cardBg sm:p-[70px] shadow-lg rounded-[30px] flex flex-col items-center justify-center">
        {/* Content for the Loading component */}
        <div className='pac-man'></div>
        <div className="text-[14px] text-primary font-medium z-10">Pease wait till your session is loading...</div>
      </div>
    </div>
  );
}
