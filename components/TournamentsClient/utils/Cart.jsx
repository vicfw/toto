
import { useState } from "react";


export default function Cart({ tournament, matches, selectedBets, onSelectBet }) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => setIsOpen(!isOpen);
    function formatDateTime(dateString) {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");
      
        return `${year}/${month}/${day} (${hours}:${minutes})`;
      }
    return (
        <div>
            <ul className="bg-cool-gray px-2.5 py-[3px]">
                <li className="bg-white rounded-lg">
                    <div className="flex flex-col">
                        <button
                            onClick={toggleOpen}
                            className="flex items-center justify-between w-full pr-3 transition-transform duration-300"
                        >
                            <div className="flex items-center">
                                <svg
                                    viewBox="0 0 32 32"
                                    focusable="false"
                                    role="img"
                                    data-v-ico="sports|1"
                                    className="size-5"
                                >
                                    <path d="M16 0a16 16 0 100 32 16 16 0 000-32zm1 5l5-3 2 1 2 2 1 1 1 1v1l-1 4-5 2-5-4zM4 7l1-1 1-1 2-2 2-1 5 3v5l-5 4-5-2-1-4V7zm0 17l-1-1-1-2v-1l-1-1v-2l3-4 6 2 1 7-2 3zm16 7h-2-1a14 14 0 01-2 0h-1-1l-3-5 2-4h8l2 4zm11-12l-1 1v1l-1 2-1 1-5 1-2-3 1-7 6-2 3 4v2z"></path>
                                </svg>
                                <span className="pr-3 text-lg font-medium">{tournament?.title}</span>
                            </div>
                            <span
                                className={`px-2 min-w-12 min-h-12 flex justify-center items-center transition-transform duration-300 ${isOpen ? "rotate-180" : "rotate-0"
                                    }`}
                            >
                                <svg
                                    viewBox="0 0 32 19"
                                    focusable="false"
                                    role="img"
                                    data-v-ico="common|angle"
                                    className="size-3"
                                >
                                    <path d="M15.2 18.6.4 4c-.5-.5-.5-1.1 0-1.6l1.9-2c.5-.5 1.3-.5 1.7 0l12 11.8L28 .4c.4-.5 1.2-.5 1.7 0l2 2c.4.5.4 1 0 1.6L17 18.6c-.5.5-1.3.5-1.7 0Z"></path>
                                </svg>
                            </span>
                        </button>

                        <div
                            className={`overflow-hidden transition-all duration-500 ${isOpen ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
                                }`}
                        >
                            <ul className="p-2 space-y-1.5">
                            {matches?.map((match, index) => ( 
                                <li  key={match.id} className="p-2 rounded-lg shadow-custom">
                                  

                                        <div className="space-y-2.5">
                                            <div className="flex items-center w-full">
                                                <div className="aspect-square h-4 rounded-full bg-sky-blue-light shrink-0 flex items-center justify-center ml-1 font-semibold">
                                                    <span className="text-xs"> {(index + 1)} </span>
                                                </div>
                                                <span className="text-sm text-[#808080]">
                                                    {/* 25/10/2025 (22:00) */}
                                                    {formatDateTime(match.start_time)}
                                                </span>
                                                <button className="mr-auto">
                                                    <span
                                                        aria-hidden="true"
                                                        className="ico ico--square ico--stats"
                                                    >
                                                        <svg
                                                            viewBox="0 0 16 16"
                                                            focusable="false"
                                                            role="img"
                                                            data-v-ico="common|stats"
                                                            className="size-5"
                                                        >
                                                            <path d="M10.4 10.03h1.2c.2 0 .4-.21.4-.42V5.13c0-.22-.2-.43-.4-.43h-1.2c-.2 0-.4.21-.4.43V9.6c0 .21.2.42.4.42Zm3 0h1.2c.2 0 .4-.21.4-.42V1.93c0-.22-.2-.43-.4-.43h-1.2c-.2 0-.4.21-.4.43V9.6c0 .21.2.42.4.42Zm-9 0h1.2c.2 0 .4-.21.4-.42V7.26c0-.21-.2-.43-.4-.43H4.4c-.2 0-.4.22-.4.43v2.35c0 .21.2.42.4.42Zm3 0h1.2c.2 0 .4-.21.4-.42V2.99c0-.21-.2-.42-.4-.42H7.4c-.2 0-.4.21-.4.42v6.62c0 .21.2.42.4.42Zm8.1 2.14H2V2.03c0-.3-.22-.53-.5-.53h-1c-.28 0-.5.24-.5.53v11.2c0 .6.45 1.07 1 1.07h14.5c.28 0 .5-.24.5-.53V12.7c0-.3-.22-.53-.5-.53Z"></path>
                                                        </svg>
                                                    </span>
                                                </button>
                                            </div>
                                            <ul className="font-bold text-sm space-y-0.5">
                                                <li className="ml-2" > {match.home_team} </li>
                                                <li className="ml-2" > {match.away_team} </li>
                                            </ul>

                                            <ul className="grid grid-cols-3 text-[13px] gap-1.5">
                                                {["1", "X", "2"].map((betOption) => (
                                                    <li onClick={() => onSelectBet(match.id, betOption)} key={betOption} className={` px-2 py-0.5 rounded-lg ${selectedBets[match.id] === betOption ? "bg-ice-blue" : "bg-sky-blue-light"
                                                        }`}>
                                                        <button className="text-center w-full">
                                                            <span className="block">    {betOption}</span>
                                                            <span className="block">65%</span>
                                                        </button>
                                                    </li>
                                                ))}

                                            </ul>
                                        </div>
                                   
                                </li> ))}
                            </ul>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    );
}

