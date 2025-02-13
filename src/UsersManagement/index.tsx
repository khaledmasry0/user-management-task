import React, { useState, useEffect } from "react";
import RegisterUser from "./components/RegisterUser";
import UsersList from "./components/UsersList";
import { User } from "./types";
import { message } from "antd";

const UsersManagementApp: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUsers = localStorage.getItem("users");
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    }
  }, []);

  const isUserNameUnique = (userName: string, userId?: number): boolean => {
    return !users.some(
      (user) => user.userName === userName && user.id !== userId
    );
  };

  const addUser = (user: Omit<User, "id">) => {
    if (!isUserNameUnique(user.userName)) {
      message.error("اسم المستخدم موجود بالفعل، الرجاء اختيار اسم آخر");
      return false;
    }
    const newUsera = [...users, { ...user, id: Date.now() }];
    setUsers(newUsera);
    localStorage.setItem("users", JSON.stringify(newUsera));
    return true;
  };

  const deleteUser = (id: number) => {
    const newUsers = users.filter((user) => user.id !== id);
    setUsers(newUsers);
    localStorage.setItem("users", JSON.stringify(newUsers));
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
  };

  const handleUpdateUser = (updatedUser: User) => {
    if (!isUserNameUnique(updatedUser.userName, updatedUser.id)) {
      message.error("اسم المستخدم موجود بالفعل، الرجاء اختيار اسم آخر");
      return false;
    }
    const newUsers = users.map((user) =>
      user.id === updatedUser.id ? updatedUser : user
    );
    setUsers(newUsers);
    localStorage.setItem("users", JSON.stringify(newUsers));
    setEditingUser(null);
    return true;
  };

  return (
    <div className="p-6 container mx-auto" style={{ direction: "rtl" }}>
      <h1 className="text-2xl font-bold mb-4">إدارة المستخدمين</h1>
      <div className="grid grid-cols-1 gap-4">
        <RegisterUser
          addUser={addUser}
          editingUser={editingUser}
          onUpdateUser={handleUpdateUser}
          setEditingUser={setEditingUser}
        />
        <UsersList
          users={users}
          deleteUser={deleteUser}
          onEditUser={handleEditUser}
          editingUser={editingUser}
        />
      </div>
    </div>
  );
};

export default UsersManagementApp;
