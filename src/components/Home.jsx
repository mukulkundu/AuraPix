import React, { useEffect, useState } from "react";
import unsplashApiKey from '../config/config'

export default function Home() {

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

    useEffect(() => {
        window.addEventListener('scroll', handleInfiniteScroll)
        return () => window.removeEventListener('scroll', handleInfiniteScroll)
    }, [])

    images?.forEach((img, index) => {
        if (index % 3 === 0) col1.push(img);
        else if (index % 3 === 1) col2.push(img);
        else col3.push(img);
      });


    return (
        <>
            <div className="flex justify-evenly items-center my-20">
                <h1 className="text-8xl font-mono">AuraPix!</h1>
                <div className="text-xl font-mono">
                    <div>Discover stunning, high-quality images from around the world.</div>
                    <div>Search, explore, and get inspired—one photo at a time.</div>
                </div>
            </div>



            <div className="flex justify-center gap-4 mx-8">
                <div className="flex flex-col gap-4 w-1/3">
                    {col1.map((item, i) => (
                        <img key={i} src={item.urls.regular} alt="" className="rounded-xl" loading="lazy" />
                    ))}
                </div>

                <div className="flex flex-col gap-4 w-1/3">
                    {col2.map((item, i) => (
                        <img key={i} src={item.urls.regular} alt="" className="rounded-xl" loading="lazy" />
                    ))}
                </div>

                <div className="flex flex-col gap-4 w-1/3">
                    {col3.map((item, i) => (
                        <img key={i} src={item.urls.regular} alt="" className="rounded-xl" loading="lazy" />
                    ))}
                </div>
            </div>


        </>
    )
}