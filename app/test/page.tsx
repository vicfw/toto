"use client";

export default function DashboardUI() {
  return (
    <div className="min-h-screen bg-[var(--color-bg-soft)] text-[var(--color-text-dark)] font-sans">
      {/* Header */}
      <header className="bg-[var(--color-primary)] text-[var(--color-text-light)] py-4 px-6 shadow-md">
        <h1 className="text-2xl font-bold">داشبورد پیش‌بینی</h1>
      </header>

      {/* Main Content */}
      <main className="p-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* کارت نمونه */}
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="bg-[var(--color-bg-medium)] rounded-xl p-4 shadow hover:shadow-lg transition"
          >
            <h2 className="text-lg font-semibold mb-2">مسابقه {item}</h2>
            <p className="text-sm mb-4">لیگ: لیگ مثال | شروع: 14:30</p>

            {/* دکمه‌های شرط */}
            <div className="flex gap-2">
              {["1", "X", "2"].map((bet) => (
                <button
                  key={bet}
                  className={`flex-1 py-2 rounded-lg font-semibold text-sm transition
                    ${bet === "1" ? "bg-[var(--color-primary)] text-[var(--color-text-light)] hover:bg-[var(--color-primary-light)]" : ""}
                    ${bet === "X" ? "bg-[var(--color-accent)] text-[var(--color-text-light)] hover:bg-[var(--color-primary-light)]" : ""}
                    ${bet === "2" ? "bg-[var(--color-primary-dark)] text-[var(--color-text-light)] hover:bg-[var(--color-primary-light)]" : ""}
                  `}
                >
                  {bet}
                </button>
              ))}
            </div>
          </div>
        ))}
      </main>

      {/* CTA */}
      <footer className="bg-[var(--color-accent)] text-[var(--color-text-light)] py-6 mt-6 text-center rounded-t-lg">
        <h2 className="text-xl font-bold mb-2">شرکت در مسابقات بیشتر!</h2>
        <button className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-light)] text-[var(--color-text-light)] px-6 py-2 rounded-lg font-semibold transition">
          شروع
        </button>
      </footer>
    </div>
  );
}
