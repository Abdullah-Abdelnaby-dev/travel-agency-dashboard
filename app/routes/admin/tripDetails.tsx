import type { LoaderFunctionArgs } from "react-router";
import { getTripById } from "~/appwrite/trips";
import { cn, getFirstWord, parseTripData } from "~/lib/utils";
import type { Route } from "./+types/tripDetails";
import { Header } from "~/components";
import InfoPill from "~/components/infoPill";
import {
  ChipDirective,
  ChipListComponent,
  ChipsDirective,
} from "@syncfusion/ej2-react-buttons";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const { tripId } = params;

  if (!tripId) throw new Error("Trip ID is required");

  return await getTripById(tripId);
};

const tripDetails = ({ loaderData }: Route.ComponentProps) => {
  const imageUrls = loaderData?.imageUrls || [];

  const tripData = parseTripData(loaderData?.tripDetail);
  const {
    name,
    duration,
    interests,
    travelStyle,
    groupType,
    budget,
    itinerary,
    estimatedPrice,
    description,
    bestTimeToVisit,
    weatherInfo,
    country,
  } = tripData || {};
  const allTrips = loaderData?.allTrips as Trip[] | [];
  console.log("allTrips", allTrips );

  const pillItems = [
    { text: travelStyle, bg: "!bg-pink-50 !text-pink-500" },
    { text: groupType, bg: "!bg-primary-50 !text-primary-500" },
    { text: budget, bg: "!bg-success-50 !text-success-700" },
    { text: interests, bg: "!bg-navy-50 !text-navy-500" },
  ];

  const visitTimeAndWeatherInfo = [
    { title: "Best Time To Visit:", items: bestTimeToVisit },
    { title: "Weather Info:", items: weatherInfo },
  ];

  console.log("name", name);
  console.log("imageUrls", imageUrls);

  return (
    <main className="travel-detail wrapper">
      <Header
        title="Trip"
        description="View and edit AI-generated travel plans"
      />

      <section className="container wrapper-md ">
        <header>
          <h1 className="p-40-semibold text-dark-100">
            {name || "name not found"}
          </h1>
          <div className="flex items-center gap-5">
            <InfoPill
              text={`${duration} day plan`}
              image="/assets/icons/calendar.svg"
            />
            <InfoPill
              text={
                itinerary
                  ?.slice(0, 3)
                  .map((item) => item.location)
                  .join(", ") || ""
              }
              image="/assets/icons/location-mark.svg"
            />
          </div>
        </header>

        <section className="gallery">
          {imageUrls.map((url: string, index: number) => (
            <img
              src={url}
              alt="image-travel"
              key={index}
              className={cn(
                "w-full rounded-xl  object-cover",
                index === 0
                  ? "md:col-span-2 md:row-span-2 h-[330px]"
                  : "md:row-span-1 h-[150px]"
              )}
            />
          ))}
        </section>

        <section className="flex gap-3 md:gap-5  items-center">
          <ChipListComponent id="travel-chip">
            <ChipsDirective>
              {pillItems.map((pill, i) => (
                <ChipDirective
                  key={i}
                  text={getFirstWord(pill.text)}
                  cssClass={`${pill.bg}  !text-base !font-medium !px-4`}
                />
              ))}
            </ChipsDirective>
          </ChipListComponent>

          <ul className="flex gap-1 items-center">
            {Array(5)
              .fill("null")
              .map((_, index) => (
                <li key={index}>
                  <img
                    src="/assets/icons/star.svg"
                    alt="star"
                    className="size-[18px]"
                  />
                </li>
              ))}
            <li className="ml-1">
              <ChipListComponent>
                <ChipsDirective>
                  <ChipDirective
                    text="4.9/5"
                    cssClass="!bg-yellow-50 !text-yellow-700"
                  />
                </ChipsDirective>
              </ChipListComponent>
            </li>
          </ul>
        </section>

        <section className="title">
          <article>
            <h3>
              {duration}-Day {country} {travelStyle} Trip
            </h3>
            <p>
              {budget}, {groupType} and {interests}
            </p>
          </article>

          <h2>{estimatedPrice}</h2>
        </section>
        <p className="text-sm md:text-lg font-normal text-dark-400">
          {description}
        </p>

        <ul className="itinerary">
          {itinerary?.map((dayPlan: DayPlan, index: number) => (
            <li key={index}>
              <h3>
                Day {dayPlan.day}: {dayPlan.location}
              </h3>

              <ul>
                {dayPlan.activities.map((dayActivities, index: number) => (
                  <li key={index}>
                    <span className="flex-shring=0 p-18-semibold">
                      {dayActivities.time}
                    </span>
                    <p className="flex-grow">{dayActivities.description}</p>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>

        {visitTimeAndWeatherInfo.map((section) => (
          <section key={section.title} className="visit">
            <div className="">
              <h3>{section.title}</h3>

              <ul>
                {section.items?.map((item) => (
                  <li key={item}>
                    <p className="flex-grow">{item}</p>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ))}

        <section className="flex flex-col gap-6">
          <h2 className="p-24-semibold text-dark-100">Popular Trips</h2>
        </section>
      </section>
    </main>
  );
};

export default tripDetails;
