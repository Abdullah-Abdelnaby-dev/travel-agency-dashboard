
import {calculateTrendPercentage}from "~/lib/utils"

const StatsCard = ({ headerTitle, total, currentMonthCount, lastMonthCount }: StatsCard) => {

  const {trend,percentage} = calculateTrendPercentage(currentMonthCount, lastMonthCount)
  const isDecrement = trend === "decrement";
  return (
    <article className="stats-card bg-white p-4 rounded-lg shadow-md">
    <div className="content">
      <div className="flex flex-col gap-4 me-8">
          <h3 className="text-lg font-semibold">{headerTitle}</h3>
      <h2 className="font-bold text-4xl">{total}</h2>
      <div className="flex item-center gap-2">
        <figure className="flex items-center gap-1">
        <img src={`/assets/icons/${isDecrement ? 'arrow-down-red.svg' : 'arrow-up-green.svg'}`} alt="arrow" className="size-5" />
        <figcaption>{Math.round(percentage)}%</figcaption>
        </figure>
        <p className="text-sm font-medium text-gray-100 truncate">vs last month</p>
      </div>
      </div>
      <img src={`/assets/icons/${isDecrement ? 'decrement.svg' : 'increment.svg'}`} alt="trend graph" className="w-full" />
    </div>
    </article>
  )
}

export default StatsCard
