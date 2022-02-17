export const adminMenu = [
  {
    name: "menu.admin.user",
    menus: [
      {
        name: "menu.admin.manage-doctor",
        link: "/system/doctor-manage",
      },
      {
        name: "menu.admin.additional-doctor-information",
        link: "/system/add-information",
      },
      {
        name: "menu.doctor.schedule",
        link: "/doctor/manage-schedule",
      },
    ],
  },
];

export const doctorMenu = [
  {
    name: "menu.doctor.manage-schedule",
    menus: [
      {
        name: "menu.doctor.schedule",
        link: "/doctor/manage-schedule",
      },
    ],
  },
];
