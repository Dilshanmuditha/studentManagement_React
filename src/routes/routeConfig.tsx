import EqualizerIcon from "@mui/icons-material/Equalizer";
import LayersIcon from "@mui/icons-material/Layers";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import SettingsIcon from "@mui/icons-material/Settings";
import Student from "../pages/student";
import Lecturer from "../pages/lecturer";
import Department from "../pages/department";
import Module from "../pages/module";
import AddStudent from "../pages/student/addStudent";
import AddLecturer from "../pages/lecturer/addLecturer";
import Addmodule from "../pages/addmodule";
import Dashboard from "../pages/dashboard";
import Users from "../pages/users";
import Profile from "../pages/profile";
import AddUser from "../pages/users/addUser";
import CourseView from "../pages/course";

interface routesType {
  id: number;
  label: string;
  icon: JSX.Element; // Changed 'any' to 'JSX.Element' for icon type
  path: string;
  component: JSX.Element; // Changed 'any' to 'JSX.Element' for component type
  sidebar: boolean;
  main: boolean;
  action: string;
  children: {
    id: number;
    label: string;
    icon: JSX.Element; // Changed 'any' to 'JSX.Element' for icon type
    path: string;
    component: JSX.Element; // Changed 'any' to 'JSX.Element' for component type
    action: string;
  }[];
}

const ROUTES: routesType[] = [
  {
    id: 1,
    label: "Dashboard",
    icon: <EqualizerIcon />,
    path: "/",
    component: <Dashboard />,
    sidebar: true,
    main: true,
    action: "navigate",
    children: [],
  },
  {
    id: 2,
    label: "Students",
    icon: <LayersIcon />,
    path: "/students",
    component: <Student />,
    sidebar: true,
    main: true,
    action: "navigate",
    children: [
      {
        id: 200,
        label: "Students",
        icon: "",
        path: "/students/students",
        component: <Student />,
        action: "navigate",
      },
      {
        id: 201,
        label: "Add Student",
        icon: "",
        path: "/students/add",
        component: <AddStudent />,
        action: "navigate",
      },
    ],
  },
  {
    id: 3,
    label: "Lecturer",
    icon: <CompareArrowsIcon />,
    path: "/lecturer",
    component: <Lecturer />,
    sidebar: true,
    main: true,
    action: "navigate",
    children: [
      {
        id: 300,
        label: "Lecturer",
        icon: <CompareArrowsIcon />,
        path: "/lecturer/lecturer",
        component: <Lecturer />,
        action: "navigate",
      },
      {
        id: 301,
        label: "AddLecturer",
        icon: <CompareArrowsIcon />,
        path: "/lecturer/AddLecturer",
        component: <AddLecturer />,
        action: "navigate",
      },
    ],
  },
  {
    id: 4,
    label: "Course",
    icon: <CheckBoxIcon />,
    path: "/University",
    component: <Department />,
    sidebar: true,
    main: true,
    action: "navigate",
    children: [
      {
        id: 400,
        label: "Course",
        icon: <CheckBoxIcon />,
        path: "/University/degree",
        component: <Module />,
        action: "navigate",
      },
      {
        id: 401,
        label: "Add Course",
        icon: <CheckBoxIcon />,
        path: "/University/module/addcourse",
        component: <Department />,
        action: "navigate",
      },
      {
        id: 402,
        label: "Add Module",
        icon: <CheckBoxIcon />,
        path: "/University/module/addmodule",
        component: <Addmodule />,
        action: "navigate",
      },
    ],
  },
  {
    id: 6,
    label: "Settings",
    icon: <SettingsIcon />,
    path: "/settings/users",
    component: <Users />,
    sidebar: true,
    main: false,
    action: "navigate",
    children: [
      {
        id: 600,
        label: "Users",
        icon: <SettingsIcon />,
        path: "/settings/users",
        component: <Users />,
        action: "navigate",
      },
      {
        id: 600,
        label: "Add Users",
        icon: <SettingsIcon />,
        path: "/add/users",
        component: <AddUser />,
        action: "navigate",
      },
    ],
  },
  {
    id: 7,
    label: "Profile",
    icon: <SettingsIcon />, // Changed to a valid icon
    path: "/profile",
    component: <Profile />,
    sidebar: false,
    main: false,
    action: "navigate",
    children: [],
  },
  {
    id: 100,
    label: "LogOut",
    icon: <SettingsIcon />, // Changed to a valid icon
    path: "",
    component: <></>, // Empty fragment as component
    sidebar: true,
    main: false,
    action: "logout",
    children: [],
  },
  {
    id: 8,
    label: "",
    icon: "", // Changed to a valid icon
    path: "/course/:id",
    component: <CourseView/>,
    sidebar: false,
    main: false,
    action: "navigate",
    children: [],
  },
];

export default ROUTES;
