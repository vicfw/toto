interface PrizeCardProps {
  position: 1 | 2 | 3;
  amount: string;
  label: string;
}

export default function PrizeCard({ position, amount, label }: PrizeCardProps) {
  const positionConfig = {
    1: {
      bgGradient: "from-warm-gold-light to-warm-gold",
      border: "border-warm-gold-dark/30",
      iconBg: "bg-warm-gold-dark",
      textColor: "text-white",
      amountColor: "text-white",
      currencyColor: "text-white/90",
      labelColor: "text-white/80",
      dropShadow: "drop-shadow-md",
      amountDropShadow: "drop-shadow-lg",
    },
    2: {
      bgGradient: "from-cool-gray-light to-cool-gray",
      border: "border-cool-gray-dark/30",
      iconBg: "bg-cool-gray-dark",
      textColor: "text-deep-blue",
      amountColor: "text-deep-blue",
      currencyColor: "text-ocean-blue",
      labelColor: "text-gray-600",
      dropShadow: "",
      amountDropShadow: "",
    },
    3: {
      bgGradient: "from-sky-blue-light to-sky-blue",
      border: "border-sky-blue-dark/30",
      iconBg: "bg-sky-blue-dark",
      textColor: "text-white",
      amountColor: "text-white",
      currencyColor: "text-white/90",
      labelColor: "text-white/80",
      dropShadow: "drop-shadow-md",
      amountDropShadow: "drop-shadow-lg",
    },
  };

  const config = positionConfig[position];

  return (
    <div
      className={`relative bg-linear-to-br ${config.bgGradient} rounded-xl p-1 sm:p-4 md:p-1 text-center border-2 ${config.border} shadow-xl md:transform md:hover:scale-105 transition-transform duration-300 overflow-visible`}
    >
      {/* Medal Icon */}
      <div
        className={`absolute -top-2 -right-2 md:-top-6 md:-right-6 ${config.iconBg} rounded-full p-1.5 sm:p-2 md:p-3 shadow-lg z-10 animate-bounce cursor-pointer transition-all duration-200`}
      >
        <svg
          viewBox="0 0 24 24"
          className="w-3 h-3 sm:w-6 sm:h-6 md:w-5 md:h-5 text-white animate-spin-slow"
          fill="currentColor"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      </div>

      <style jsx>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 2s linear infinite;
        }
      `}</style>

      <div>
        {/* Prize Amount */}
        <span
          className={`${config.amountColor} text-center text-sm sm:text-lg md:text-xl font-black mb-1 sm:mb-2  ${config.amountDropShadow}`}
        >
          {parseFloat(amount).toLocaleString("fa-IR")}
        </span>

        {/* Currency */}
        <div
          className={`${config.currencyColor} text-[10px] sm:text-xs md:text-sm font-bold`}
        >
          دلار
        </div>

        {/* Prize Label */}
        <div
          className={`${config.labelColor} text-[9px] sm:text-xs mt-1 sm:mt-2 md:mt-3 font-medium`}
        >
          {label}
        </div>
      </div>
    </div>
  );
}
