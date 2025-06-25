import { Link, useLocation } from "react-router";
import {
  ChipDirective,
  ChipListComponent,
  ChipsDirective,
} from "@syncfusion/ej2-react-buttons";
import { cn, getFirstWord } from "~/lib/utils";

const TripCard = ({
  id,
  name,
  imageUrls,
  location,
  tags,
  price,
}: TripCardProps) => {
  const path = useLocation();
  return (
    <Link
      to={
        path.pathname === "/" || path.pathname.startsWith("/travel")
          ? `/travel/${id} `
          : `/trips/${id}`
      }
      className="shadow-xl rounded-b-[20px] relative"
    >
     <div className="w-fit h-60">
       <img src={imageUrls} alt={name} className="trip-card w-full h-full object-cover" />
     </div>
      <article className="p-4 ">
        <h2 className="mb-4">{name}</h2>
        <figure className="flex items-center gap-2">
          <img src="/assets/icons/location-mark.svg" alt="location" />
          <figcaption className="font-medium text-gray-100">
            {location}
          </figcaption>
        </figure>
      </article>

      <div className="mt-1 pl-[18px] pr-3.5">
        <ChipListComponent id="travel-chip">
          <ChipsDirective>
            {tags.map((tag, index) => (
              <ChipDirective
                key={index}
                text={getFirstWord(tag)}
                cssClass={cn(
                  index === 1
                    ? "!bg-pink-50 !text-pink-500"
                    : "!bg-green-50 !text-green-700"
                )}
              />
            ))}
          </ChipsDirective>
        </ChipListComponent>
      </div>
      <article className="tripCard-pill">{price}</article>
    </Link>
  );
};

export default TripCard;
