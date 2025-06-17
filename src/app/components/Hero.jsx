// import { Button } from "../../components/ui/button"
// import Link from "next/link"

// export default function Hero() {
//     return (
//         <div className="relative overflow-hidden rounded-xl ">
//             <div className="container relative z-10 px-4 py-8 mx-auto md:flex md:items-center md:justify-between md:gap-8 xl:items-start">
//                 <img src="hero.jpeg" alt="masjid" className="mb-5 md:mb-0 rounded-md md:w-[300px] md:h-[250px] object-cover xl:w-[300px] xl:h-[250px] 2xl:w-[700px] 2xl:h-[300px]" />
//                 <div className="max-w-xl ">
//                     <h1 className="mb-4 text-4xl font-bold md:text-3xl md:mb-1 xl:text-5xl">Selamat Datang di Masjid At-Taqwa</h1>
//                     <p className="mb-8 text-lg text-gray-700 md:mb-3 md:mt-5">
//                         Pusat ibadah dan pembinaan umat yang nyaman dan representatif. Mari bersama-sama memakmurkan masjid dan
//                         membangun umat yang bertaqwa.
//                     </p>
//                     <div className="flex flex-col gap-4 sm:flex-row">
//                         <Button className="bg-amber-600 hover:bg-amber-700">
//                             <Link href="/profil">Tentang Kami</Link>
//                         </Button>
//                         <Button variant="outline">
//                             <Link href="/pengumuman">Lihat Pengumuman</Link>
//                         </Button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

"use client"

import { Button } from "../../components/ui/button"
import Link from "next/link"
import { getBannerImage } from "../../lib/services/bannerService"
import useSWR from "swr"
import Image from "next/image"
import { useState, useEffect } from "react"

export default function Hero() {
    const { data: banner, error, isLoading } = useSWR("banner", getBannerImage)
    const [currentImageIndex, setCurrentImageIndex] = useState(0)
    const [nextImageIndex, setNextImageIndex] = useState(0)
    const [isPaused, setIsPaused] = useState(false)
    const [images, setImages] = useState([])
    const [hasMultipleImages, setHasMultipleImages] = useState(false)
    const [imageLoaded, setImageLoaded] = useState(false)
    const [loadedImages, setLoadedImages] = useState(new Set())
    const [isTransitioning, setIsTransitioning] = useState(false)

    useEffect(() => {
        if (banner) {
            setImages(banner.images_url || [])
            setHasMultipleImages(Array.isArray(banner.images_url) && banner.images_url.length > 1)
            setLoadedImages(new Set())
            setImageLoaded(false)
        }
    }, [banner])

    useEffect(() => {
        if (!hasMultipleImages || isPaused) return

        const interval = setInterval(() => {
            setIsTransitioning(true)
            setNextImageIndex((prev) => (prev + 1) % images.length)

            // Start transition
            setTimeout(() => {
                setCurrentImageIndex((prev) => (prev + 1) % images.length)
                setTimeout(() => {
                    setIsTransitioning(false)
                }, 500)
            }, 200)
        }, 7000)

        return () => clearInterval(interval)
    }, [hasMultipleImages, images.length, isPaused])

    const handleImageLoad = (index) => {
        setLoadedImages((prev) => new Set([...prev, index]))
        if (index === currentImageIndex) {
            setImageLoaded(true)
        }
    }

    const handleImageError = (index) => {
        console.error(`Failed to load image at index ${index}`)
        setLoadedImages((prev) => new Set([...prev, index]))
        if (index === currentImageIndex) {
            setImageLoaded(true)
        }
    }

    useEffect(() => {
        setImageLoaded(loadedImages.has(currentImageIndex))
    }, [currentImageIndex, loadedImages])

    if (isLoading)
        return (
            <div className="relative overflow-hidden rounded-xl">
                <div className="container relative z-10 flex flex-col px-4 py-8 mx-auto md:flex-row md:items-start md:justify-between md:gap-8 xl:items-start">
                    <div className="relative w-full mb-5 md:mb-0 md:w-auto">
                        <div className="relative overflow-hidden rounded-md w-full max-w-[700px] mx-auto md:mx-0 shadow-lg">
                            <div className="bg-gray-200 animate-pulse w-full aspect-[7/3] md:w-[300px] md:h-[250px] xl:w-[300px] xl:h-[250px] 2xl:w-[700px] 2xl:h-[300px]"></div>
                        </div>
                    </div>

                    <div className="w-full max-w-xl">
                        <div className="w-full h-12 mb-4 bg-gray-200 rounded-md md:h-10 xl:h-14 animate-pulse md:w-3/4"></div>
                        <div className="mb-8 space-y-3 md:mt-5">
                            <div className="w-full h-5 bg-gray-200 rounded-md animate-pulse"></div>
                            <div className="w-5/6 h-5 bg-gray-200 rounded-md animate-pulse"></div>
                            <div className="w-4/6 h-5 bg-gray-200 rounded-md animate-pulse"></div>
                        </div>

                        {/* Buttons Skeleton */}
                        <div className="flex flex-col gap-4 sm:flex-row">
                            <div className="w-full h-10 bg-gray-200 rounded-md animate-pulse sm:w-32"></div>
                            <div className="w-full h-10 bg-gray-200 rounded-md animate-pulse sm:w-40"></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    if (error) return <div>Failed to load banner</div>

    return (
        <div className="relative overflow-hidden rounded-xl">
            <div className="container relative z-10 flex flex-col px-4 py-8 mx-auto md:flex-row md:items-start md:justify-between md:gap-8 xl:items-start">
                {images.length > 0 && (
                    <div
                        className="relative w-full mb-5 md:mb-0 group md:w-auto"
                        onMouseEnter={() => setIsPaused(true)}
                        onMouseLeave={() => setIsPaused(false)}
                    >
                        <div className="relative overflow-hidden rounded-md w-full max-w-[700px] mx-auto md:mx-0 shadow-lg transition-shadow duration-300 group-hover:shadow-xl">
                            {!imageLoaded && (
                                <div className="absolute inset-0 bg-gray-200 animate-pulse z-10 min-h-[250px]">
                                    <div className="w-full h-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse">
                                        <div className="flex items-center justify-center w-full h-full">
                                            <div className="w-12 h-12 border-4 border-gray-300 rounded-full border-t-gray-500 animate-spin"></div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="relative w-full">
                                <div
                                    className={`relative transition-transform duration-1000 ease-out ${isTransitioning ? "-translate-x-full" : "translate-x-0"
                                        }`}
                                >
                                    <Image
                                        src={images[currentImageIndex] || "/placeholder.jpg"}
                                        alt={`masjid ${currentImageIndex + 1}`}
                                        className={`w-full h-auto transition-all duration-800 ${imageLoaded ? "opacity-100" : "opacity-0"}`}
                                        width={700}
                                        height={300}
                                        onLoad={() => handleImageLoad(currentImageIndex)}
                                        onError={() => handleImageError(currentImageIndex)}
                                        priority={currentImageIndex === 0}
                                        style={{
                                            objectFit: "contain",
                                            maxWidth: "100%",
                                            height: "auto",
                                        }}
                                    />
                                </div>

                                {hasMultipleImages && (
                                    <div
                                        className={`absolute top-0 left-0 w-full transition-transform duration-1000 ease-out ${isTransitioning ? "translate-x-0" : "translate-x-full"
                                            }`}
                                    >
                                        <Image
                                            src={images[nextImageIndex] || "/placeholder.jpg"}
                                            alt={`masjid ${nextImageIndex + 1}`}
                                            className="w-full h-auto transition-all duration-800"
                                            width={700}
                                            height={300}
                                            onLoad={() => handleImageLoad(nextImageIndex)}
                                            onError={() => handleImageError(nextImageIndex)}
                                            style={{
                                                objectFit: "contain",
                                                maxWidth: "100%",
                                                height: "auto",
                                            }}
                                        />
                                    </div>
                                )}
                            </div>

                            {hasMultipleImages &&
                                images.map((src, index) => {
                                    if (index === currentImageIndex || index === nextImageIndex) return null
                                    return (
                                        <Image
                                            key={`preload-${index}`}
                                            src={src || "/placeholder.svg"}
                                            alt=""
                                            width={700}
                                            height={300}
                                            className="hidden"
                                            onLoad={() => handleImageLoad(index)}
                                            onError={() => handleImageError(index)}
                                        />
                                    )
                                })}
                        </div>

                        {/* <div className="absolute inset-0 transition-opacity duration-300 border-2 border-transparent rounded-md opacity-0 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 group-hover:opacity-100 -z-10 blur-sm"></div> */}
                    </div>
                )}

                <div className="max-w-xl">
                    <h1 className="mb-4 text-4xl font-bold md:text-3xl md:mb-1 xl:text-5xl animate-fade-in-up">
                        Selamat Datang di Masjid At-Taqwa 
                    </h1>
                    <p className="mb-8 text-lg text-gray-700 md:mb-3 md:mt-5 animate-fade-in-up animation-delay-200">
                        Pusat ibadah dan pembinaan umat yang nyaman. Mari bersama-sama memakmurkan masjid dan
                        membangun umat yang bertaqwa.
                    </p>
                    <div className="flex flex-col gap-4 sm:flex-row animate-fade-in-up animation-delay-400">
                        <Button className="transition-all duration-200 transform bg-amber-600 hover:bg-amber-700 hover:scale-105 hover:shadow-lg">
                            <Link href="/profil">Tentang Kami</Link>
                        </Button>
                        <Button
                            variant="outline"
                            className="transition-all duration-200 transform hover:scale-105 hover:shadow-lg hover:border-amber-600"
                        >
                            <Link href="/pengumuman">Lihat Pengumuman</Link>
                        </Button>
                    </div>
                </div>
            </div>

            <style jsx>{`
        @keyframes kenBurns {
            0% {
                transform: scale(1) translate(0, 0);
            }
            100% {
                transform: scale(1.05) translate(-1%, -0.5%);
            }
        }

        @keyframes fade-in-up {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .animate-fade-in-up {
            animation: fade-in-up 0.8s ease-out forwards;
        }

        .animation-delay-200 {
            animation-delay: 0.2s;
            opacity: 0;
        }

        .animation-delay-400 {
            animation-delay: 0.4s;
            opacity: 0;
        }
        `}</style>
        </div>
    )
}
