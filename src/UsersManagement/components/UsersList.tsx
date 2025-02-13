import React from "react";
import { Table, Button, Modal, Space } from "antd";
import { User } from "../types";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";

interface UsersListProps {
  users: User[];
  deleteUser: (id: number) => void;
  onEditUser: (user: User) => void;
  editingUser: User | null;
}

const UsersList: React.FC<UsersListProps> = ({
  users,
  deleteUser,
  onEditUser,
  editingUser,
}) => {
  const handleDelete = (id: number) => {
    Modal.confirm({
      title: "تأكيد الحذف",
      content: "هل أنت متأكد من حذف هذا المستخدم؟",
      okText: "نعم",
      cancelText: "لا",
      onOk: () => deleteUser(id),
    });
  };

  const columns = [
    { title: "اسم المستخدم", dataIndex: "userName", key: "userName" },
    {
      title: "الاسم بالعربية",
      dataIndex: "arabicUserName",
      key: "arabicUserName",
    },
    {
      title: "الاسم بالإنجليزية",
      dataIndex: "englishUserName",
      key: "englishUserName",
    },
    {
      title: "مدير نظام",
      dataIndex: "isAdmin",
      key: "isAdmin",
      render: (isAdmin: boolean) => (
        <span style={{ color: isAdmin ? "#52c41a" : "#ff4d4f" }}>
          {isAdmin ? <CheckOutlined /> : <CloseOutlined />}
        </span>
      ),
    },
    {
      title: "الإجراءات",
      key: "actions",

      width: 150,
      render: (_: any, record: User) => (
        <div className="flex gap-2">
          <Button
            type="primary"
            size="small"
            onClick={() => onEditUser(record)}
            disabled={editingUser?.id === record.id}
          >
            تعديل
          </Button>
          <Button
            danger
            size="small"
            onClick={() => handleDelete(record.id)}
            disabled={editingUser?.id === record.id}
          >
            حذف
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-4 border rounded-lg shadow-md col-span-2">
      <h2 className="text-lg font-semibold mb-2">قائمة المستخدمين</h2>
      <Table
        dataSource={users}
        columns={columns}
        rowKey="id"
        pagination={{ pageSize: 5 }}
        size="small"
        scroll={{ x: true }}
      />
    </div>
  );
};

export default UsersList;
