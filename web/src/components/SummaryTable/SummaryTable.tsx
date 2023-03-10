import { HabitDay } from "components/HabitDay/HabitDay";
import dayjs from "dayjs";
import { api } from "lib/axios";
import { useEffect, useState } from "react";
import { generateDaysFromYearBeginning } from "utils/generateDatesFromYearBeginning";

/** TODO --> Move all this stuff to generateDatesFromYearBeginning.ts  */
const weekDays = ["D", "S", "T", "Q", "Q", "S", "S"];
const summaryDates = generateDaysFromYearBeginning();
const minimumSummaryDatesSize = 18 * 7;
const amountOfDaysToFill = minimumSummaryDatesSize - summaryDates.length;

interface Summary {
  id: string;
  date: string;
  amount: number;
  completed: number;
}

export const SummaryTable: React.FC = () => {
  const [summary, setSummary] = useState<Summary[]>([]);

  useEffect(() => {
    api.get("/summary").then((response) => {
      setSummary(response.data);
    });
  }, []);

  return (
    <div className="w-full flex">
      <div className="grid grid-rows-7 grid-flow-row gap-3">
        {weekDays.map((day, index) => {
          return (
            <div
              className="text-zinc-400 font-bold text-xl h-10 w-10 flex items-center justify-center"
              key={`${day}-${index}`}
            >
              {day}
            </div>
          );
        })}
      </div>
      <div className="grid grid-rows-7 grid-flow-col gap-3">
        {summary.length > 0 &&
          summaryDates.map((date) => {
            const dayInSummary = summary.find((day) => {
              return dayjs(date).isSame(day.date, "day");
            });

            return (
              <HabitDay
                key={date.toString()}
                date={date}
                amount={dayInSummary?.amount}
                defaultCompleted={dayInSummary?.completed}
              />
            );
          })}

        {amountOfDaysToFill > 0 &&
          Array.from({ length: amountOfDaysToFill }).map((_, index) => {
            return (
              <div
                key={index}
                className="h-10 w-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg opacity-40 cursor-not-allowed"
              />
            );
          })}
      </div>
    </div>
  );
};
