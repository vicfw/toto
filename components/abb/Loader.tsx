"use client";

export default function Loader() {
  return (
    <div className="flex justify-center items-center h-full min-h-[200px]">
      <div className="flex space-x-1">
        {[...Array(5)].map((_, i) => (
          <span
            key={i}
            className="block w-2 h-6 bg-blue-500 rounded animate-bounce delay-[0s] first:delay-[0s] second:delay-[100ms] third:delay-[200ms] fourth:delay-[300ms] fifth:delay-[400ms]"
            style={{ animationDelay: `${i * 0.1}s` }}
          ></span>
        ))}
      </div>
    </div>
  );
}
