import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Modal from "@/components/ui/Modal";
import Select from "@/components/ui/Select";
import userServices from "@/services/user";
import { FormEvent, useState } from "react";

const ModalUpdateUser = (props: any) => {
  const { updatedUser, setUpdatedUser, setUsersData } = props;
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdateUser = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const form: any = event.target as HTMLFormElement;

    const data = {
      role: form.role.value,
    };

    const result = await userServices.updateUser(updatedUser.id, data);
    if (result.status === 200) {
      setIsLoading(false);
      setUpdatedUser({});
      const { data } = await userServices.getAllUsers();
      setUsersData(data.data);
    } else {
      setIsLoading(false);
    }
  };

  return (
    <Modal onClose={() => setUpdatedUser({})}>
      <h1>Update User</h1>
      <form onSubmit={handleUpdateUser}>
        <Input
          name="fullname"
          label="Fullname"
          type="text"
          defaultValue={updatedUser.fullname}
          disabled
        />
        <Input
          name="email"
          label="Email"
          type="email"
          defaultValue={updatedUser.email}
          disabled
        />
        <Input
          name="phone"
          label="Phone"
          type="number"
          defaultValue={updatedUser.phone}
          disabled
        />
        <Select
          name="role"
          defaultValue={updatedUser.role}
          label="Role"
          options={[
            { label: "Member", value: "member" },
            { label: "Admin", value: "admin" },
          ]}
        />
        <Button type="submit">
          {isLoading ? "Loading..." : "Update User"}
        </Button>
      </form>
    </Modal>
  );
};

export default ModalUpdateUser;
