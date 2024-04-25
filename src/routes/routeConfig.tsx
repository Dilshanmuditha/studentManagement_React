import { lazy } from "react";

const Dashboard = lazy(() => import("../pages/dashboard"));
const Users = lazy(() => import("../pages/users"));
const Profile = lazy(()=> import("../pages/profile"))




import EqualizerIcon from "@mui/icons-material/Equalizer";
import LayersIcon from '@mui/icons-material/Layers';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import SettingsIcon from '@mui/icons-material/Settings';
import Student from "../pages/student";
import Lecturer from "../pages/lecturer";
import Department from "../pages/department";
import Module from "../pages/module";
import AddStudent from "../pages/student/addStudent";
import AddLecturer from "../pages/lecturer/addLecturer";



interface routesType {
  id: number;
  label: string;
  icon: any;
  path: string;
  component: any;
  sidebar:boolean;
  main:boolean;
  action:string;
  children: {
    id: number;
    label: string;
    icon: any;
    path: string;
    component: any;
    action:string;
  }[];
}
const ROUTES:routesType[] = [
  {
    id: 1,
    label: "Dashboard",
    icon: <EqualizerIcon />,
    path: "/",
    component: <Dashboard/>,
    sidebar:true,
    main:true,
    action:"navigate",
    children: [],
  },
  {
    id: 2,
    label: "Students",
    icon: <LayersIcon/>,
    path: "/students",
    component: <Student/>,
    sidebar:true,
    main:true,
    action:"navigate",
    children: [{
      id: 200,
      label: "Students",
      icon: "",
      path: "/students/students",
      component: <Student/>,
      action:"navigate",
    },
    {
      id: 201,
      label: "Add Student",
      icon: "",
      path: "/students/add",
      component: <AddStudent/>,
      action:"navigate",
    },],
  },
  {
    id: 3,
    label: "Lecturer",
    icon: <CompareArrowsIcon/>,
    path: "/lecturer",
    component: <Lecturer/>,
    sidebar:true,
    main:true,
    action:"navigate",
    children: [
      {
        id: 300,
        label: "Lecturer",
        icon: "",
        path: "/lecturer/lecturer",
        component: <Lecturer/>,
        action:"navigate",
      },
      {
        id: 301,
        label: "AddLecturer",
        icon: "",
        path: "/lecturer/AddLecturer",
        component: <AddLecturer/>,
        action:"navigate",
      },
    ],
  },
  {
    id: 4,
    label: "University",
    icon: <CheckBoxIcon/>,
    path: "/University",
    component: <Department/>,
    sidebar:true,
    main:true,
    action:"navigate",
    children: [
      {
        id: 400,
        label: "Degree",
        icon: "",
        path: "/University/degree",
        component: <Department/>,
        action:"navigate",
      },
      {
        id: 401,
        label: "Module",
        icon: "",
        path: "/University/module",
        component: <Module/>,
        action:"navigate",
      },
    ],
  },
  {
    id: 6,
    label: "Settings",
    icon: <SettingsIcon/>,
    path: "/settings/users",
    component: <Users/>,
    sidebar:true,
    main:false,
    action:"navigate",
    children: [
      {
        id: 600,
        label: "Users",
        icon: "",
        path: "/settings/users",
        component: <Users/>,
        action:"navigate",
      },
    ],
  },
  {
    id: 7,
    label: "Profile",
    icon: "",
    path: "/profile",
    component: <Profile/>,
    sidebar:false,
    main:false,
    action:"navigate",
    children: [],
  },
  {
    id: 100,
    label: "LogOut",
    icon: "",
    path: "",
    component: "",
    sidebar:true,
    main:false,
    action:"logout",
    children: [],
  },
];

export default ROUTES
