// import { getUser } from "~/appwrite/auth";
import { getAllUsers, getUser } from "~/appwrite/auth";
import { Header, StatsCard, TripCard } from "~/components";
import type { Route } from "./+types/dashboard";
import {
  getTripsByTravelStyle,
  getUserGrowthPerDay,
  getUsersAndTripsStats,
} from "~/appwrite/dashboard";
import { getAllTrips } from "~/appwrite/trips";
import { parseTripData } from "~/lib/utils";
import {
  Category,
  ChartComponent,
  ColumnDirective,
  ColumnsDirective,
  ColumnSeries,
  DataLabel,
  Inject,
  SeriesCollectionDirective,
  SeriesDirective,
  SplineAreaSeries,
  Tooltip,
} from "@syncfusion/ej2-react-charts";
import {
  interests,
  tripXAxis,
  tripyAxis,
  userXAxis,
  useryAxis,
} from "~/constants";
import { GridComponent } from "@syncfusion/ej2-react-grids";

export const clientLoader = async () => {
  const [
    user,
    dashboardStats,
    trips,
    userGrowth,
    tripsByTravelStyle,
    allUsers,
  ] = await Promise.all([
    await getUser(),
    await getUsersAndTripsStats(),
    await getAllTrips(4, 0),
    await getUserGrowthPerDay(),
    await getTripsByTravelStyle(),
    await getAllUsers(4, 0),
  ]);
  const allTrips = trips.allTrips.map(({ $id, tripDetail, imageUrls }) => {
    // Optionally log tripDetail for debugging

    return {
      id: $id,
      ...parseTripData(tripDetail),
      imageUrls: imageUrls ?? [],
    };
  });

  const mappedUsers: UsersItineraryCount[] = allUsers.users.map((user) => ({
    imageUrl: user.imageUrl,
    name: user.name,
    count: user.itineraryCount ?? Math.floor(Math.random() * 10 ),
  }));

  return {
    user,
    dashboardStats,
    allTrips,
    userGrowth,
    tripsByTravelStyle,
    allUsers: mappedUsers,
  };
};

const Dashboard = ({ loaderData }: Route.ComponentProps) => {
  const user = loaderData.user as User | null;
  const { dashboardStats, userGrowth, allTrips, allUsers, tripsByTravelStyle } =
    loaderData;
  const trips = allTrips.map((trip) => ({
    imageUrl: trip.imageUrls[0],
    name: trip.name,
    interests: trip.interests,
  }));

  const usersAndTrips = [
    {
      title: "Latest user signup",
      dataSource: allUsers,
      field: "count",
      headerText: "Trips Created",
    },
    {
      title: "Trips based on interests",
      dataSource: trips,
      field: 'interests',
      headerText: "interests",
    },
  ];

  return (
    <main className="dashboard wrapper">
      <Header
        title={`Welcome ${user?.name ?? "Guest"} 👋`}
        description="Track activity, trends and popular destinations in real time."
        size="large"
      />
      <section className="flex flex-col gap-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          <StatsCard
            headerTitle={"Total Users"}
            total={dashboardStats.totalUsers}
            currentMonthCount={dashboardStats.usersJoined.currentMonth}
            lastMonthCount={dashboardStats.usersJoined.lastMonth}
          />
          <StatsCard
            headerTitle={"Total Trips"}
            total={dashboardStats.totalTrips}
            currentMonthCount={dashboardStats.tripsCreated.currentMonth}
            lastMonthCount={dashboardStats.tripsCreated.lastMonth}
          />
          <StatsCard
            headerTitle={"Active Users Today"}
            total={dashboardStats.userRole.total}
            currentMonthCount={dashboardStats.userRole.currentMonth}
            lastMonthCount={dashboardStats.userRole.lastMonth}
          />
        </div>
      </section>

      <section className="container">
        <h1 className="text-xl font-semibold text-dark-100">Created Trips</h1>
        <div className="trip-grid">
          {allTrips.map((trip) => (
            <TripCard
              key={trip.id}
              id={trip.id.toString()}
              name={trip.name!}
              imageUrls={trip.imageUrls[0]}
              location={trip.itinerary?.[0]?.location || ""}
              tags={[trip.interests!, trip.travelStyle!]}
              price={trip.estimatedPrice!}
            />
          ))}
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <ChartComponent
          id="chart-1"
          primaryXAxis={userXAxis}
          primaryYAxis={useryAxis}
          title="User Growth"
          tooltip={{ enable: true }}
        >
          <Inject
            services={[
              ColumnSeries,
              SplineAreaSeries,
              Category,
              DataLabel,
              Tooltip,
            ]}
          />
          <SeriesCollectionDirective>
            <SeriesDirective
              dataSource={userGrowth}
              xName="day"
              yName="count"
              type="SplineArea"
              name="Wave"
              fill="rgba(0, 123, 255, 0.5)"
              border={{ width: 2, color: "#4784EE" }}
            />
          </SeriesCollectionDirective>
        </ChartComponent>

        <ChartComponent
          id="chart-2"
          primaryXAxis={tripXAxis}
          primaryYAxis={tripyAxis}
          title="Trip Trends"
          tooltip={{ enable: true }}
        >
          <Inject
            services={[
              ColumnSeries,
              SplineAreaSeries,
              Category,
              DataLabel,
              Tooltip,
            ]}
          />
          <SeriesCollectionDirective>
            <SeriesDirective
              dataSource={tripsByTravelStyle}
              xName="travelStyle"
              yName="count"
              type="Column"
              name="day"
              fill="rgba(0, 123, 255, 0.5)"
              columnWidth={0.3}
              cornerRadius={{ topLeft: 10, topRight: 10 }}
            />
          </SeriesCollectionDirective>
        </ChartComponent>
      </section>

      <section className="user-trip wrapper">
        {usersAndTrips.map(({ title, dataSource, field, headerText }, i) => (
          <div className="flex flex-col gap-5" key={i}>
            <h3 className="p-20-semibold text-dark-100">{title}</h3>
            <GridComponent
              dataSource={dataSource}
              allowPaging={true}
              allowSorting={true}
              allowFiltering={true}
            >
              <ColumnsDirective>
                <ColumnDirective
                  field="name"
                  headerText="Name"
                  width={200}
                  textAlign="Left"
                  type="string"
                  template={(props: UserData) => (
                    <div className="flex items-center gap-2 px-4">
                      <img
                        src={props.imageUrl}
                        alt="user"
                        className="rounded-full size-8 aspect-square"
                        referrerPolicy="no-referrer"
                      />
                      <span>{props.name}</span>
                    </div>
                  )}
                ></ColumnDirective>

                {/* Example: Remove or replace this duplicate column definition with a valid one, or add a different field if needed */}
                <ColumnDirective
                  field={field}
                  headerText={headerText}
                  width="150"
                  textAlign='left'
                />
              </ColumnsDirective>
            </GridComponent>
          </div>
        ))}
      </section>
    </main>
  );
};

export default Dashboard;
