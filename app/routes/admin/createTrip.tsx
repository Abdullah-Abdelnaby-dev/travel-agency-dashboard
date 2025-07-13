import {
  ComboBoxComponent,
  DropDownListComponent,
} from "@syncfusion/ej2-react-dropdowns";
import { Header } from "~/components";
import type { Route } from "./+types/createTrip";
import { comboBoxItems, selectItems } from "~/constants";
import { cn, formatKey } from "~/lib/utils";
import {
  LayerDirective,
  LayersDirective,
  MapsComponent,
} from "@syncfusion/ej2-react-maps";
import { useState } from "react";
import { world_map } from "~/constants/world_map";
import { ButtonComponent } from "@syncfusion/ej2-react-buttons";
import { account } from "~/appwrite/client";
import { useNavigate } from "react-router";

export const loader = async () => {
  const res = await fetch(
    "https://restcountries.com/v3.1/all?fields=name,capital,flags,latlng,maps"
  );

  const data = await res.json();

  return data.map((country: any) => ({
    name: country.name.common,
    flag: country.flags?.png,
    coordinates: country.latlng,
    openStreetMap: country.maps?.openStreetMap,
  }));
};
const createTrip = ({ loaderData }: Route.ComponentProps) => {
  const countries = loaderData as Country[];

  const navigate = useNavigate();

  const [formData, setFormData] = useState<TripFormData>({
    country: countries[0]?.name || "",
    travelStyle: "",
    interest: "",
    budget: "",
    duration: 0,
    groupType: "",
  });
  const [isError, setIsError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (key: keyof TripFormData, value: string | number) => {
    setFormData({
      ...formData,
      [key]: value,
    });
  };

  const countriesData = countries.map((country) => ({
    text: country.name,
    value: country.name,
    flag: country.flag,
  }));

  const mapData = [
    {
      country: formData.country,
      color: "#EA382E",
      coordinates:
        countries.find((c: Country) => c.name === formData.country)
          ?.coordinates || [],
    },
  ];
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    if (
      !formData.country ||
      !formData.travelStyle ||
      !formData.interest ||
      !formData.budget ||
      !formData.groupType ||
      !formData.duration
    ) {
      setIsError("Please provide values for all fields");
      setIsLoading(false);
      return null;
    }
    if (formData.duration < 1 || formData.duration > 10) {
      setIsError("Duration must be between 1 and 10 days");
      setIsLoading(false);
      return;
    }
    const user = await account.get();

    if (!user.$id) {
      setIsError("User not authenticated");
      setIsLoading(false);
      return;
    }
    if(formData.travelStyle === undefined){
      setIsError("Please Select TravelStyle");
    }

    try {
      const response = await fetch("/api/create-trip", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          country: formData.country,
          numberOfDays: formData.duration,
          travelStyle: formData.travelStyle,
          interests: formData.interest,
          budget: formData.budget,
          groupType: formData.groupType,
          userId: user.$id,
        }),
      });
      const result: CreateTripResponse = await response.json();

      if (result?.id) navigate(`/trips/${result.id}`);
      else console.error("Failed to generate a trip");
    } catch (e) {
      console.error("Error generatting trip", e);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <main className="flex flex-col gap-10 pb-20 wrapper">
      <Header
        title="Add new Trips"
        description="View and generate AI travel plans"
        size="small"
      />
      <section className="mt-2.5 wrapper-md">
        <form className="trip-form" onSubmit={handleSubmit}>
          <div className="">
            <label htmlFor="country">Country</label>
            <DropDownListComponent
              id="country"
              dataSource={countriesData}
              fields={{ text: "text", value: "value" }}
              placeholder="Select A Country"
              className="combo-box"
              itemTemplate={(data: any) => (
                <div className="!flex items-center ml-1 gap-1">
                  <img src={data.flag} className="w-5 h-4" />
                  <span>{data.text}</span>
                </div>
              )}
              valueTemplate={(data: any) => (
                <div className="flex !flex-row  ">
                  <img src={data.flag} className="w-5 h-4" />
                  <span>{data.text}</span>
                </div>
              )}
              // ubdate el value kol ma el user y8er el value

              change={(e: { value: string | undefined }) => {
                if (e.value) {
                  handleChange("country", e.value);
                }
              }}
              allowFiltering

              //  filtering={(e) => {
              //   const query = e.text.toLowerCase();

              //   e.updateData(
              //     countries
              //       .filter((country) =>
              //         country.name.toLowerCase().includes(query)
              //       )
              //       // el map dy lzmtha any bbt3t al data ll updatedata zy ma el combo box mtok3ha
              //       .map((country) => ({
              //         text: country.name,
              //         value: country.value,
              //       }))
              //   );
              // }}
            />
          </div>

          <div className="">
            <label htmlFor="duration">Duration</label>
            <input
              id="duration"
              name="duration"
              type="number"
              placeholder="Enter a number of days (5, 12... )"
              className="form-input placeholder:text-gray-100"
              onChange={(e) => handleChange("duration", Number(e.target.value))}
            />
          </div>

          {selectItems.map((key) => (
            <div key={key}>
              <label htmlFor={key}>{formatKey(key)}</label>

              <DropDownListComponent
                id={key}
                dataSource={comboBoxItems[key].map((item) => ({
                  text: item,
                  value: item,
                }))}
                fields={{ text: "text", value: "value" }}
                placeholder={`Select ${formatKey(key)}`}
                change={(e: { value: string | undefined }) => {
                  if (e.value) {
                    handleChange(key, e.value);
                  }
                }}
                allowFiltering
                // filtering={(e) => {
                //   const query = e.text.toLowerCase();

                //   e.updateDate(
                //     comboBoxItems[key]
                //       .filter((item) => item.toLowerCase().includes(query))
                //       .map((item) => ({
                //         text: item,
                //         value: item,
                //       }))
                //   );
                // }}
                className="combo-box"
              />
            </div>
          ))}

          <div>
            <label htmlFor="location">Location on the world map</label>
            <MapsComponent>
              <LayersDirective>
                <LayerDirective
                  shapeData={world_map}
                  dataSource={mapData}
                  shapeDataPath="country"
                  shapePropertyPath="name"
                  shapeSettings={{ colorValuePath: "color", fill: "#e5e5e5" }}
                />
              </LayersDirective>
            </MapsComponent>
          </div>

          <div className="bg-gray-200 h-px w-full" />

          {isError && (
            <div className="error">
              <p>{isError}</p>
            </div>
          )}

          <footer className="px-6 w-full ">
            <ButtonComponent
              type="submit"
              className="button-class !h-12 !w-full "
              disabled={isLoading}
            >
              <img
                src={`/assets/icons/${
                  isLoading ? "loader.svg" : "magic-star.svg"
                }`}
                alt=""
                className={cn("size-5", { "animate-spin": isLoading })}
              />
              <span className="p-16-semibold text-white">
                {isLoading ? "Generating..." : "Generate Trip"}
              </span>
            </ButtonComponent>
          </footer>
        </form>
      </section>
    </main>
  );
};

export default createTrip;
