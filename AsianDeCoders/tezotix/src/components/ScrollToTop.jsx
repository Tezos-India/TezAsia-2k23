import { useEffect, useState } from 'react';
import { BiArrowFromBottom } from 'react-icons/bi';

export default function ScrollToTop() {
    const [isVisible, setIsVisible] = useState(false)

    const toggleVisibility = () => {
        if (window.pageYOffset > 400) {
            setIsVisible(true)
        } else {
            setIsVisible(false)
        }
    }

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
    }

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility)

        return () => {
            window.removeEventListener('scroll', toggleVisibility)
        }
    }, [])

    return (
        <div className="fixed bottom-5 right-5 z-10">
            <button
                type="button"
                onClick={scrollToTop}
                className={`${isVisible ? 'opacity-100' : 'opacity-0'} bg-white/10 hover:bg-white/20 inline-flex items-center rounded-full p-3 text-white/80 hover:text-white shadow-lg transition focus:outline-none focus:ring-2 focus:ring-primaryBlack focus:ring-offset-2 z-10`}
            >
                <BiArrowFromBottom className="h-[30px] w-[30px]" aria-hidden="true" />
            </button>
        </div>
    )
}