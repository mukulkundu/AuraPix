import React from "react";
import { X } from "lucide-react";
import unsplashApiKey from "../../config/config";

export default function ImageModal({closeModal, imgData}){
    console.log(imgData);
    
    // TO-DO
    const downloadImg = async () => {
        const downloadLocation = `${imgData?.links?.download_location}?client_id=${unsplashApiKey}`;
        if (!downloadLocation) return;
    
        try {
            // Step 1: Call the download_location endpoint to register the download and get the real URL
            const res = await fetch(`${downloadLocation}?client_id=${unsplashApiKey}`);
            const data = await res.json();
            const downloadUrl = data.url;
    
            // Step 2: Fetch the actual image
            const imageRes = await fetch(downloadUrl);
            const blob = await imageRes.blob();
            const blobUrl = window.URL.createObjectURL(blob);
    
            // Step 3: Trigger the download
            const link = document.createElement("a");
            link.href = blobUrl;
            link.download = `${imgData.id}.jpg`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(blobUrl);
        } catch (error) {
            console.error("Image download failed:", error);
        }
    };
    
    

    return(
        <>
        <div className="fixed top-0 left-0 w-screen h-screen backdrop-blur-2xl z-10 flex justify-center items-center">
            <div className="w-[90%] h-[75%] sm:w-[70%] sm:h-[85%] bg-gray-300 dark:bg-[#343434] rounded-2xl">

                {/* Cross Button */}
                <div className="w-[100%] h-[10%] flex items-center justify-end p-4">
                    <button className="hover:bg-white dark:hover:bg-[#4d4a4aa0] rounded-xl cursor-pointer duration-300" onClick={closeModal}>
                        <X size={40} />
                    </button>
                </div>



                {/* Image inside Modal */}
                <div className="w-[100%] h-[75%] flex justify-center items-center">
                    <img src={imgData.urls.regular} alt="Image" className="max-h-[75%] sm:max-h-full max-w-full object-contain"/>
                </div>



                <div className="w-[100%] h-[15%] px-8 pb-2 flex items-center justify-between">

                    {/* Download Button */}
                    <div>
                        <button className="cursor-pointer dark:bg-white dark:hover:bg-black dark:text-black dark:hover:text-white bg-black text-white rounded-xl py-1 px-3 sm:py-2 sm:px-6 hover:bg-white hover:text-black font-mono duration-300" onClick={downloadImg}>Download</button>
                    </div>



                    {/* Photographer Info */}
                    <div className="flex items-center">
                        {imgData.user.first_name+" "+ imgData.user.last_name}
                        <img src={imgData.user.profile_image.small} alt="" className="ml-2 rounded-full w-9"/>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}