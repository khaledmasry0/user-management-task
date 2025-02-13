import React from "react";
import { Form, Input, Button, message, Switch } from "antd";
import { useForm } from "antd/es/form/Form";
import { User } from "../types";

interface RegisterUserProps {
  addUser: (user: Omit<User, "id">) => boolean;
  editingUser: User | null;
  onUpdateUser: (user: User) => boolean;
  setEditingUser: (user: User | null) => void;
}

const RegisterUser: React.FC<RegisterUserProps> = ({
  addUser,
  editingUser,
  onUpdateUser,
  setEditingUser,
}) => {
  const [form] = useForm();

  React.useEffect(() => {
    if (editingUser) {
      form.setFieldsValue(editingUser);
    }
  }, [editingUser, form]);

  const handleSubmit = async (values: Omit<User, "id">) => {
    try {
      let success;
      if (editingUser) {
        success = onUpdateUser({ ...values, id: editingUser.id });
        if (success) {
          message.success("تم تحديث المستخدم بنجاح");
          form.resetFields();
        }
      } else {
        success = addUser(values);
        if (success) {
          message.success("تم إضافة المستخدم بنجاح");
          form.resetFields();
        }
      }
    } catch (error) {
      message.error("فشلت العملية");
    }
  };

  return (
    <div className="py-4 px-6 border rounded-lg shadow-lg bg-white w-full">
      <h2 className="text-xl font-bold mb-4">
        {editingUser ? "تعديل المستخدم" : "تسجيل مستخدم جديد"}
      </h2>
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-0 sm:gap-2 lg:gap-4 -pb-4">
          <Form.Item
            label="اسم المستخدم"
            name="userName"
            rules={[{ required: true, message: "الرجاء إدخال اسم المستخدم!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="الاسم بالعربية"
            name="arabicUserName"
            rules={[
              { required: true, message: "الرجاء إدخال الاسم بالعربية!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="الاسم بالإنجليزية"
            name="englishUserName"
            rules={[
              { required: true, message: "الرجاء إدخال الاسم بالإنجليزية!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="كلمة المرور"
            name="password"
            rules={[{ required: true, message: "الرجاء إدخال كلمة المرور!" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="مدير نظام"
            name="isAdmin"
            valuePropName="checked"
            className=""
          >
            <Switch />
          </Form.Item>
        </div>
        <Form.Item className="">
          <div className="flex gap-2">
            <Button type="primary" htmlType="submit">
              {editingUser ? "تحديث" : "حفظ"}
            </Button>
            <Button
              onClick={() => {
                form.resetFields();
                setEditingUser(null);
              }}
            >
              إلغاء
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default RegisterUser;
