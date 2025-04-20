import React, { useEffect, useState } from "react";
import unsplashApiKey from '../config/config'
import ImageModal from "./ImageModal/ImageModal";

export default function Home() {

    const [showModal, setShowModal] = useState(false)
    const closeModal = () => setShowModal(false)
    const [selectedImg, setSelectedImg] = useState([])
    const imgData = (item) => {
        setSelectedImg(item)
        setShowModal(true)


    }

    const [images, setImages] = useState([])
    const [pageNo, setPageNo] = useState(1)
    const col1 = []
    const col2 = []
    const col3 = []
    
    

    useEffect(() => {
        fetch(`https://api.unsplash.com/photos?page=${pageNo}&client_id=${unsplashApiKey}`)
            .then(response => response.json())
            .then(data => {
                setImages(prev => {
                    const existingIds = new Set(prev.map(img => img.id))
                    const newImages = data.filter(img => !existingIds.has(img.id))
                    return [...prev, ...newImages]
                })
            })


    }, [pageNo])

    const handleInfiniteScroll = async () => {
        try {
            // console.log(document.documentElement.scrollHeight+ " " + " " +2*window.innerHeight+ " " + " " + document.documentElement.scrollTop);

            if (document.documentElement.scrollTop + 3.2 * window.innerHeight >= document.documentElement.scrollHeight) {
                setPageNo(prev => prev + 1)
            }

        } catch (error) {
            console.error(error)
        }
    }

    // Lock/unlock scroll when modal opens/closes
    useEffect(() => {
        if (showModal) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        return () => {
            document.body.style.overflow = "auto";
        };
    }, [showModal]);

    useEffect(() => {

        let timeoutId = null;
        const throttledScroll = () => {
            if (timeoutId === null) {
                timeoutId = setTimeout(() => {
                    handleInfiniteScroll();
                    timeoutId = null;
                }, 500); // Only process scroll events every 500ms
            }
        };

        window.addEventListener('scroll', throttledScroll)
        return () => window.removeEventListener('scroll', throttledScroll)
    }, [handleInfiniteScroll])


    // To get only 2 colums when in mobile screen and otherwise 3
    if(screen.width <640){
        images?.forEach((img, index) => {
            if (index % 2 === 0) col1.push(img);
            else col2.push(img);
        });
    
    }else{
        images?.forEach((img, index) => {
            if (index % 3 === 0) col1.push(img);
            else if (index % 3 === 1) col2.push(img);
            else col3.push(img);
        });
    }

    


    return (
        <>

            {/* Modal */}
            {showModal && <ImageModal closeModal={closeModal} imgData={selectedImg} />}


            <div className="flex flex-col md:flex-row justify-evenly items-center my-8 md:my-16 lg:my-20 px-4 md:px-8 text-center md:text-left gap-6 md:gap-8">
                <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-mono">AuraPix!</h1>

                <div className="text-base sm:text-lg md:text-xl font-mono max-w-md">
                    <div className="mb-2">Discover stunning, high-quality images from around the world.</div>
                    <div>Search, explore, and get inspired—one photo at a time.</div>
                </div>
            </div>



            <div className="sm:flex hidden justify-center gap-4 mx-4 md:mx-8">
                <div className="flex flex-col gap-4 w-1/3">
                    {col1.map((item, i) => (
                        <button key={item.id} onClick={() => imgData(item)}><img key={i} src={item.urls.regular} alt="" className="rounded-xl hover:scale-[1.02] cursor-pointer duration-300" loading="lazy" /></button>
                    ))}
                </div>

                <div className="flex flex-col gap-4 w-1/3">
                    {col2.map((item, i) => (
                        <button key={item.id} onClick={() => imgData(item)}><img key={i} src={item.urls.regular} alt="" className="rounded-xl hover:scale-[1.03] cursor-pointer duration-300" loading="lazy" /></button>
                    ))}
                </div>

                <div className="flex flex-col gap-4 w-1/3">
                    {col3.map((item, i) => (
                        <button key={item.id} onClick={() => imgData(item)}><img key={i} src={item.urls.regular} alt="" className="rounded-xl hover:scale-[1.02] cursor-pointer duration-300" loading="lazy" /></button>
                    ))}
                </div>
            </div>


            <div className="flex sm:hidden justify-center gap-4 mx-4">
            <div className="flex flex-col gap-4 w-1/2">
                    {col1.map((item, i) => (
                        <button key={item.id} onClick={() => imgData(item)}><img key={i} src={item.urls.regular} alt="" className="rounded-xl hover:scale-[1.02] cursor-pointer duration-300" loading="lazy" /></button>
                    ))}
                </div>

                <div className="flex flex-col gap-4 w-1/2">
                    {col2.map((item, i) => (
                        <button key={item.id} onClick={() => imgData(item)}><img key={i} src={item.urls.regular} alt="" className="rounded-xl hover:scale-[1.03] cursor-pointer duration-300" loading="lazy" /></button>
                    ))}
                </div>
            </div>


        </>
    )
}