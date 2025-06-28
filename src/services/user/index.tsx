import instance from "@/lib/axios/instance";

const userServices = {
  getAllUsers: () => instance.get("/user"),
};

export default userServices;
