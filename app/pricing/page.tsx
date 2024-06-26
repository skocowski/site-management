'use client'
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";
import { auth } from "../firebase/firebaseConfig";
const pricingData = [
    {
        mainTitle: "Freebie",
        infoNote: "Ideal for individuals who need quick access to basic features.",
        isSelected: false,
        monthlyPrice: 2,
        yerlyPrice: 20,
        getIn: [
            {
                rightIcon: true,
                description: "20,000+ of PNG & SVG graphics",
            },
            {
                rightIcon: true,
                description: "Access to 100 million stock images",
            },
            {
                rightIcon: false,
                description: "Instant Access to our design system",
            },
            {
                rightIcon: false,
                description: "Create teams to collaborate on designs",
            },
        ],
    },
    {
        mainTitle: "Professional",
        monthlyPrice: 5,
        yerlyPrice: 50,
        infoNote: "Ideal for individuals who need quick access to basic features.",
        isSelected: true,
        getIn: [
            {
                rightIcon: true,
                description: "20,000+ of PNG & SVG graphics",
            },
            {
                rightIcon: true,
                description: "Access to 100 million stock images",
            },
            {
                rightIcon: false,
                description: "Instant Access to our design system",
            },
            {
                rightIcon: false,
                description: "Create teams to collaborate on designs",
            },
        ],
    },
    {
        mainTitle: "Enterprise",
        infoNote: "Ideal for individuals who need quick access to basic features.",
        isSelected: false,
        monthlyPrice: 10,
        yerlyPrice: 100,
        getIn: [
            {
                rightIcon: true,
                description: "20,000+ of PNG & SVG graphics",
            },
            {
                rightIcon: true,
                description: "Access to 100 million stock images",
            },
            {
                rightIcon: false,
                description: "Instant Access to our design system",
            },
            {
                rightIcon: false,
                description: "Create teams to collaborate on designs",
            },
        ],
    },
];
const RightIcon = ({ fillColor } : {fillColor: any}) => {
    return (
        <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-8 h-8"
        >
            <rect width="32" height="32" rx="16" fill="#E8EDFB" />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M21.8162 12.207C22.0701 12.4737 22.0597 12.8957 21.793 13.1495L14.0893 20.4829C13.9577 20.6081 13.7808 20.6742 13.5993 20.666C13.4179 20.6577 13.2477 20.5758 13.128 20.4391L10.1651 17.0545C9.92254 16.7775 9.95052 16.3563 10.2276 16.1138C10.5046 15.8713 10.9258 15.8992 11.1683 16.1763L13.6734 19.0379L20.8737 12.1838C21.1404 11.9299 21.5624 11.9403 21.8162 12.207Z"
                fill={fillColor}
            />
        </svg>
    );
};
const CloseIcon = ({ fillColor }: { fillColor: any }) => (
    <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-8 h-8"
    >
        <rect width="32" height="32" rx="16" fill="#F7F8F9" />
        <path
            d="M20.2421 20.2426C20.5025 19.9822 20.5025 19.5601 20.2421 19.2997L16.9428 16.0004L20.243 12.7001C20.5034 12.4397 20.5034 12.0176 20.243 11.7573C19.9827 11.4969 19.5606 11.4969 19.3002 11.7573L15.9999 15.0576L12.6997 11.7573C12.4393 11.4969 12.0172 11.4969 11.7568 11.7573C11.4965 12.0176 11.4965 12.4397 11.7568 12.7001L15.0571 16.0004L11.7578 19.2997C11.4974 19.5601 11.4974 19.9822 11.7578 20.2426C12.0181 20.5029 12.4402 20.5029 12.7006 20.2426L15.9999 16.9432L19.2993 20.2426C19.5597 20.5029 19.9818 20.5029 20.2421 20.2426Z"
            fill={fillColor}
        />
    </svg>
);
const Arrow = ({ strokColor }: { strokColor: any }) => {
    return (
        <svg
            width="107"
            height="88"
            viewBox="0 0 107 88"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-14 md:w-20 h-20 -mt-8"
        >
            <path
                d="M95.4463 61.5975C83.1573 64.6611 68.4838 65.2433 57.6839 57.506C50.782 52.5613 47.1171 42.5628 49.6964 34.4471C52.1324 26.7825 57.8212 20.0482 66.3457 20.2534C70.789 20.3604 74.6201 22.4047 75.429 27.084C76.6648 34.2329 69.5331 41.6308 63.8629 44.7405C46.1672 54.4452 21.1341 53.9052 4.27686 42.6407"
                stroke={strokColor}
                strokeWidth="3"
                strokeLinecap="round"
            />
            <path
                d="M11.7068 55.8447C9.64482 52.9634 5.14208 46.2418 3.62681 42.4054"
                stroke={strokColor}
                strokeWidth="3"
                strokeLinecap="round"
            />
            <path
                d="M3.62695 42.4055C7.1396 41.942 15.124 40.6363 18.9603 39.121"
                stroke={strokColor}
                strokeWidth="3"
                strokeLinecap="round"
            />
        </svg>
    );
};
const Pricing = () => {
    const [monthPrice, setMonthPrice] = useState(true);
    return (
        <div className=" flex flex-col justify-center items-center py-3 border min-h-screen font-sans">

        

            {/* pricing section   */}
            <div className="flex flex-col lg:flex-row gap-6 h-full px-5">
                {pricingData.map((data, index) => (
                    <div
                        className={`flex flex-col h-full max-w-[378px] py-6 px-5 sm:px-10 lg:w-auto xl:w-[378px] border rounded-xl ${data?.isSelected
                                ? `bg-[#365CCE] text-white`
                                : "bg-white text-black"
                            }`}
                        key={index}
                    >
                        <div className="flex flex-col text-left">
                            <div className="flex flex-col gap-3">
                                <span className="text-2xl">{data?.mainTitle}</span>
                                <span>{data?.infoNote}</span>
                            </div>
                            <div className="flex items-center gap-3 my-4">
                                <span className="text-6xl font-semibold">
                                    ${monthPrice ? data?.monthlyPrice : data?.yerlyPrice}
                                </span>
                                <span className="font-light">
                                    /&nbsp;&nbsp;{monthPrice ? "Month" : "Year"}
                                </span>
                            </div>
                            <button
                                className={`w-full border-[1px] rounded py-2.5 text-[#365CCE] ${data?.isSelected
                                        ? "bg-white"
                                        : "bg-transparent border-[#365CCE]"
                                    }`}
                            >
                                Get Started Now
                            </button>
                            <div className="mt-10 space-y-3">
                                {data?.getIn?.map((description, index) => (
                                    <div className="flex items-center gap-4 max-w-xs" key={index}>
                                        <div className="w-8 h-8">
                                            {description?.rightIcon ? (
                                                <RightIcon fillColor={`#365CCE`} />
                                            ) : (
                                                <CloseIcon fillColor={`#365CCE`} />
                                            )}
                                        </div>
                                        <span className="font-medium text-base">
                                            {description?.description}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default Pricing
