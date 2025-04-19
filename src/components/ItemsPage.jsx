import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import unsplashApiKey from '../config/config'
import ImageModal from "./ImageModal/ImageModal";

export default function ItemsPage() {

    const [showModal, setShowModal] = useState(false)
    const closeModal = () => setShowModal(false)
    const [selectedImg, setSelectedImg] = useState([])
    const imgData = (item) => {
        setSelectedImg(item)
        setShowModal(true)


    }

    const { slug } = useParams();

    const [images, setImages] = useState([])
    const [pageNo, setPageNo] = useState(1)
    const col1 = []
    const col2 = []
    const col3 = []

    useEffect(() => {
        fetch(`https://api.unsplash.com/search/photos?page=${pageNo}&query=${slug}&client_id=${unsplashApiKey}`)
            .then(response => response.json())
            .then(data => {
                setImages(prev => {
                    const existingIds = new Set(prev.map(img => img.id))
                    const newImages = data.results.filter(img => !existingIds.has(img.id))
                    return [...prev, ...newImages]
                })
            })


    }, [pageNo, slug])

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

    images?.forEach((img, index) => {
        if (index % 3 === 0) col1.push(img);
        else if (index % 3 === 1) col2.push(img);
        else col3.push(img);
    });


    // It clears the image array for new slug and set the page number to zero
    useEffect(() => {
        setImages([]);
        setPageNo(1);
    }, [slug])


    return (
        <>

            {/* Modal */}
            {showModal && <ImageModal closeModal={closeModal} imgData={selectedImg} />}

            <div className="m-4 sm:m-6 md:m-10">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-mono font-bold">{slug.charAt(0).toUpperCase() + slug.slice(1)}</h1>
            </div>




            <div className="flex justify-center gap-4 mx-4 md:mx-8">
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


        </>
    )
}