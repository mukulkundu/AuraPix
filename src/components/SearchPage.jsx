import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import unsplashApiKey from '../config/config'
import ImageModal from "./ImageModal/ImageModal";

export default function SearchPage() {
    const navigate = useNavigate()

    const [showModal, setShowModal] = useState(false)
    const closeModal = () => setShowModal(false)
    const [selectedImg, setSelectedImg] = useState([])
    const imgData = (item) => {
        setSelectedImg(item)
        setShowModal(true)


    }

    const { searchValue } = useParams();

    const [images, setImages] = useState([])
    const [pageNo, setPageNo] = useState(1)
    const col1 = []
    const col2 = []
    const col3 = []


    useEffect(() => {
        fetch(`https://api.unsplash.com/search/photos?page=${pageNo}&query=${searchValue}&client_id=${unsplashApiKey}`)
            .then(response => response.json())
            .then(data => {
                if (data.results.length === 0 && pageNo === 1) {
                    navigate(`/photos/random`)

                } else {
                    setImages(prev => {
                        const existingIds = new Set(prev.map(img => img.id))
                        const newImages = data.results.filter(img => !existingIds.has(img.id))
                        return [...prev, ...newImages]
                    })
                }
            })


    }, [pageNo, searchValue])

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

        // Throttling code to ease the api requests
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


    useEffect(() => {
        setImages([]);
        setPageNo(1);
    }, [searchValue])


    return (
        <>

            {/* Modal */}
            {showModal && <ImageModal closeModal={closeModal} imgData={selectedImg} />}

            <div className="m-4 sm:m-6 md:m-10">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-mono font-bold">{searchValue.charAt(0).toUpperCase() + searchValue.slice(1)}</h1>
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