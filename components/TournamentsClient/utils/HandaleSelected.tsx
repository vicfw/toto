interface HandaleSelectedProps {
  handleReset: () => void;
  handleRandom: () => void;
  Object: typeof Object;
  matchesMap: { [key: number]: { id: number;[key: string]: any }[] };
  allSelected: boolean;
  selectedBets: { [matchId: number]: "1" | "X" | "2" | undefined };
}
export default function HandaleSelected({ handleReset, handleRandom, Object, matchesMap, allSelected, selectedBets }: HandaleSelectedProps) {
  return (
    <div className="shadow-custom bg-white p-2.5  flex gap-2">
      <button onClick={handleReset} className="shrink-0">
        <div className="py-1 px-2 rounded-sm bg-sky-blue min-w-11 min-h-11 flex justify-center items-center">
          <svg viewBox="0 0 448 512" focusable="false" className="size-5">
            <path d="M32 464a48 48 0 0048 48h288a48 48 0 0048-48V128H32zm272-256a16 16 0 0132 0v224a16 16 0 01-32 0zm-96 0a16 16 0 0132 0v224a16 16 0 01-32 0zm-96 0a16 16 0 0132 0v224a16 16 0 01-32 0zM432 32H312l-9.4-18.7A24 24 0 00281.1 0H166.8a23.72 23.72 0 00-21.4 13.3L136 32H16A16 16 0 000 48v32a16 16 0 0016 16h416a16 16 0 0016-16V48a16 16 0 00-16-16z"></path>
          </svg>
        </div>
      </button>

      <button onClick={handleRandom} className="shrink-0">
        <div className="py-1 px-2 rounded-sm bg-sky-blue min-w-11 min-h-11 flex justify-center items-center">
          <svg
            data-v-960f624a=""
            viewBox="0 0 15 13"
            focusable="false"
            role="img"
            data-v-ico="common|random"
            className="size-5"
          >
            <path d="m14.78 9.5-2.35-2.32a.68.68 0 0 0-1.17.5V8.8h-.94L8.77 7.18 7.18 8.84l2.09 2.2c.06.07.17.1.26.1h1.73v1.16c0 .64.73.93 1.17.5l2.35-2.33c.3-.26.3-.7 0-.96ZM.35 4.17h2.47l1.52 1.66 1.58-1.66-2.08-2.2a.44.44 0 0 0-.26-.12H.35c-.2 0-.35.17-.35.34v1.63c0 .2.15.35.35.35Zm10.91 0v1.16c0 .64.73.93 1.17.5l2.35-2.33c.3-.26.3-.7 0-.96L12.43.21a.68.68 0 0 0-1.17.5v1.13H9.53c-.09 0-.2.05-.26.11L2.82 8.81H.35c-.2 0-.35.17-.35.35v1.63c0 .2.15.35.35.35h3.23c.12 0 .2-.03.26-.1l6.48-6.88h.94Z"></path>
          </svg>
        </div>
      </button>

      <div className="w-full flex items-center justify-between rounded-md bg-gradient-to-l from-sky-blue-light text-xs pr-3 p-1">
        <div className="flex flex-col text-[11px]">
          <span>انتخاب شده</span>
          <span className="font-medium text-[15px]">{`${Object.values(selectedBets).filter(Boolean).length} / ${Object.values(matchesMap).flat().length}`}</span>
        </div>

        <button disabled={!allSelected} className={` h-full rounded-md px-10 ${allSelected ? "bg-green-500" : "bg-warm-gold cursor-not-allowed"}`}>
          <span>به برگه شرط بروید</span>
        </button>
      </div>
    </div>)
}