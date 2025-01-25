import React from "react";
import Users from "@/app/components/Tables/TablaUsuarios";
import { UserProvider } from "../context/UsersContext";

const UsersList = () => {
  return (
    <UserProvider>
      <Users />
    </UserProvider>
  );
};

export default UsersList;
