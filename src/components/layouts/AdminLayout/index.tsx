import Sidebar from "@/components/fragments/Sidebar";
import styles from "./AdminLayout.module.scss";
import { MdSpaceDashboard } from "react-icons/md";
import { FaBox } from "react-icons/fa6";

type PropsType = {
  children: React.ReactNode;
};

const listSidebarItem = [
  {
    title: "Dashboard",
    url: "/admin",
    icon: <MdSpaceDashboard size={24} />,
  },
  {
    title: "Products",
    url: "/admin/products",
    icon: <FaBox size={24} />,
  },
];

const AdminLayout = (props: PropsType) => {
  const { children } = props;
  return (
    <div className={styles.admin}>
      <Sidebar lists={listSidebarItem} />
      {children}
    </div>
  );
};

export default AdminLayout;
