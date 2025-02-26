import App_logo from "./RealLogo.png";

//Icons
import { IoIosArrowDown } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { FaCalendarCheck } from "react-icons/fa";
import { BsStack } from "react-icons/bs";
import { FaSchool } from "react-icons/fa";
import uploadArea from "./upload_area.png"
import { IoEyeOff } from "react-icons/io5";
import { IoEye } from "react-icons/io5";


//App Logo Under Text
const App_Title = "The Afaf Way";

//Navigation Linkes Array Object
const Navigation_Links = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Groups", href: "/groups" },
  // { label: "Quiz", href: "/quiz" },
  { label: "Institutions", href: "/institutions" },
  { label: "Study Materials", href: "/studyMaterials" },
  { label: "Test Master", href: "/testMaster" },
  { label: "Schedule", href: "/schedule" },
  { label: "Achievements", href: "/achievements" },
  { label: "Announcements", href: "/announcements" },
  {
    label: "Reports",
    href: "/reports",
    sub_link: [
      {
        label: "User Reports",
        href: "/reports/usersReport",
      },
      {
        label: "Leaderboard Report",
        href: "/reports/leaderboardReport",
      },
      // {
      //   label: "Announcement Report",
      //   href: "/reports/announcementReport",
      // },
    ],
  },
];


export const app_icons = {
  profile: FaUserCircle,
  downArrow: IoIosArrowDown,
  user: FaUsers,
  check: FaCalendarCheck,
  stack: BsStack,
  institution: FaSchool,
  showEye: IoEye,
  closeEye: IoEyeOff,
};

export const Users = [
  {
    user_id: 1,
    name: "Alice Wonderland",
    email: "alice@example.com",
    phone_no: "123-456-7890",
    education_level: "B.Sc",
    institution_id: 1,
    regid: 12345,
    password: "password123",
    is_active: 1,
    is_admin: 0,
  },
  {
    user_id: 2,
    name: "Bob Smith",
    email: "bob@example.com",
    phone_no: "987-654-3210",
    education_level: "M.Sc",
    institution_id: 2,
    regid: 56789,
    password: "bob123",
    is_active: 1,
    is_admin: 1,
  },
];

const test_master = [
  {
    test_id: 1,
    test_name: "Day 1",
    season: "EPL  - 3",
    test_jd: "2023-05-15",
    cat_id: 1,
    question_id: 1,
  },
  {
    test_id: 2,
    test_name: "Day 2",
    season: "EPL - 3",
    test_jd: "2023-10-20",
    cat_id: 2,
    question_id: 2,
  },
];

const Groups = [
  [
    {
      group_id: 1,
      group_name: "Science Club",
      group_theme: "color code",
    },
    {
      group_id: 2,
      group_name: "Coding Club",
      group_theme: "color code",
    },
  ],
];

const Institutions = [
  {
    institution_id: 1,
    institution_name: "ABC University",
    Address: "123 Main St",
    state: "California",
    pin_code: 90210,
    city: "Los Angeles",
    contact_person_name: "John Doe",
    contact_person_number: "555-1234",
  },
  {
    institution_id: 2,
    institution_name: "XYZ College",
    Address: "456 Oak Ave",
    state: "Texas",
    pin_code: 75001,
    city: "Dallas",
    contact_person_name: "Jane Smith",
    contact_person_number: "555-5678",
  },
];

// export const dashboard_stats = [
//   {
//     label: "Users",
//     value: Users.length,
//     icon: app_icons.user,
//   },
//   {
//     label: "Test Released",
//     value: test_master.length,
//     icon: app_icons.check,
//   },
//   {
//     label: "Groups",
//     value: Groups.length,
//     icon: app_icons.stack,
//   },
//   {
//     label: "Institutions",
//     value: Institutions.length,
//     icon: app_icons.institution,
//   },
//   {
//     label: "Current Season Participants",
//     value: "9k",
//     icon: app_icons.user,
//   },
// ];

const leaderboard_views = [
  { leaderboard_view: "Group Wise", views_type: ["Rank Wise", "Score Wise", "Test Wise"]},
  { leaderboard_view: "Institution Wise", views_type: ["Rank Wise", "Score Wise", "Test Wise"]}
];
// [
  // "Group wise","Institutions wise", "Rank wise", "score wise", "Test wise"
  // ];

const leaderboard_table_data = [
  {
    user: "User 1",
    institute: "Institution 1",
    group: "Group 1",
    rank: "rank 1",
    score: "20393",
  },
  {
    user: "User 2",
    institute: "Institution 2",
    group: "Group 2",
    rank: "rank 2",
    score: "3934",
  },
  {
    user: "User 3",
    institute: "Institution 3",
    group: "Group 3",
    rank: "rank 3",
    score: "1029",
  }
];

// const groups_data = [
//   {
//     group_id: 1,
//     group_name: "Science Club",
//     group_theme: "color code",
//   },
//   {
//     group_id: 2,
//     group_name: "Coding Club",
//     group_theme: "color code",
//   },
// ];

// const quizData = [
//   {
//     id: "1",
//     quiz_name: "essence",
//     created_at: "some Date",
//   },
//   {
//     id: "2",
//     quiz_name: "Quiz Name",
//     created_at: "some Date",
//   },
// ];

// const institution_data = [
//   {
//     institution_id: 1,
//     institution_name: "ABC University",
//     Address: "123 Main St",
//     state: "California",
//     pin_code: 90210,
//     city: "Los Angeles",
//     theme: "#034902",
//     contact_person_name: "John Doe",
//     contact_person_number: "555-1234",
//   },
//   {
//     institution_id: 2,
//     institution_name: "XYZ College",
//     Address: "456 Oak Ave",
//     state: "Texas",
//     pin_code: 75001,
//     city: "Dallas",
//     theme: "#034902",
//     contact_person_name: "Jane Smith",
//     contact_person_number: "555-5678",
//   },
// ];

// const studyMaterialData = [
//   {
//     id: 1,
//     materialName: "Material 1",
//     materialContent: "Taraweeh day 1 Pdf",
//   },
//   {
//     id: 2,
//     materialName: "Material 2",
//     materialContent: "Taraweeh day 2 Pdf",
//   },
// ];

const announcementData = [
  {
    id: 1,
    date: "20/01/2024",
    time: "4:30pm",
    message: "Welcome Message",
  },
  {
    id: 2,
    date: "22/01/2024",
    time: "5:30pm",
    message: "Test Started Message",
  },
];

// const usersData = [
//   {
//     id: 1,
//     name: "John Smith",
//     email: "john.smith@gmail.com",
//     phone_no: "123-456-340",
//     institute: "The New College",
//   },
//   {
//     id: 2,
//     name: "Leo Dhas",
//     email: "leoDhas@gmail.com",
//     phone_no: "123-456-340",
//     institute: "The New College",
//   },
//   {
//     id: 1,
//     name: "John Smith",
//     email: "john.smith@gmail.com",
//     phone_no: "123-456-340",
//     institute: "The New College",
//   },
//   {
//     id: 1,
//     name: "John Smith",
//     email: "john.smith@gmail.com",
//     phone_no: "123-456-340",
//     institute: "The New College",
//   },
//   {
//     id: 1,
//     name: "John Smith",
//     email: "john.smith@gmail.com",
//     phone_no: "123-456-340",
//     institute: "The New College",
//   },
// ];

export {
  App_logo,
  uploadArea,
  App_Title,
  Navigation_Links,
  leaderboard_views,
  leaderboard_table_data,
  // groups_data,
  // quizData,
  // institution_data,
  // studyMaterialData,
  announcementData,
  // usersData
};
