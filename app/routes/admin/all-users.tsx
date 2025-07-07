import { Header } from "~/components";
import {
  ColumnDirective,
  GridComponent,
  ColumnsDirective,
} from "@syncfusion/ej2-react-grids";
import { cn, formatDate } from "~/lib/utils";
import { getAllUsers } from "~/appwrite/auth";
import type { Route } from "./+types/all-users";

export const loader = async () => {
  const { users, total } = await getAllUsers(10, 0);
  return { users, total };
};

const AllUser = ({ loaderData }: Route.ComponentProps) => {
  const { users } = loaderData;
  return (
    <main className="all-users wrapper">
      <Header
        title="Manage Users"
        description="Filter, sort, and access all users in the system."
        size="small"
      />
      <GridComponent
        dataSource={users}
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

          <ColumnDirective
            field="email"
            headerText="Email"
            width={150}
            textAlign="Left"
            type="string"
          />
          <ColumnDirective
            field="joinedAt"
            headerText="Date Joined"
            width={120}
            textAlign="Left"
            type="string"
            template={({joinedAt}:{joinedAt:string})=> formatDate(joinedAt)}
          />
          {/* <ColumnDirective
            field="itineraryCreated"
            headerText="Trip Created"
            width={130}
            textAlign="Left"
            type="string"
          /> */}
          <ColumnDirective
            field="status"
            headerText="Type"
            width={100}
            textAlign="Left"
            type="string"
            template={({ status }: UserData) => (
              <article
                className={cn(
                  "status-column",
                  status === "user" ? "bg-success-50 " : "bg-light-300"
                )}
              >
                <div
                  className={cn(
                    "size-1.5 rounded-full",
                    status === "user" ? "bg-success-500" : "bg-gray-500"
                  )}
                />
                <h3
                  className={cn(
                    "font-inter text-xs font-medium",
                    status === "user" ? "text-success-700" : "text-gray-500"
                  )}
                >
                  {status}
                </h3>
              </article>
            )}
          />
        </ColumnsDirective>
      </GridComponent>
    </main>
  );
};

export default AllUser;
