"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type User = {
  id: number;
  name: string;
  mail: string;
  rol: string;
  clave: string;
};

type UserContextType = {
  users: User[];
  fetchUsers: () => Promise<void>;
  addUser: (user: User) => void;
  removeUser: (id: number) => void;
  updateUser: (
    id: number,
    updatedData: Partial<Omit<User, "id">>
  ) => Promise<void>;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [users, setUsers] = useState<User[]>([]);

  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/users");
      if (!res.ok) {
        throw new Error("Error fetching users");
      }
      const data = await res.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching clients: ", error);
    }
  };

  const addUser = (user: User) => {
    setUsers((prevUsers) => [...prevUsers, user]);
  };

  const removeUser = (id: number) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
  };

  const updateUser = async (
    id: number,
    updatedData: Partial<Omit<User, "id">>
  ) => {
    const res = await fetch(`/api/users/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    });
    const updatedUser = await res.json();
    setUsers((prev) =>
      prev.map((user) => (user.id === id ? updatedUser : user))
    );
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <UserContext.Provider
      value={{ users, addUser, removeUser, updateUser, fetchUsers }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
