export const adminMenu = [
  {
    name: "menu.admin.user",
    menus: [
      {
        name: "menu.admin.manage-user",
        link: "system/user-manage",
      },
      {
        name: "menu.admin.manage-doctor",
        link: "/system/doctor-manage",
      },
      {
        name: "Manage specialty",
        link: "/system/manage-specialties",
      },
      {
        name: "menu.admin.additional-doctor-information",
        link: "/system/add-information",
      },
      {
        name: "menu.doctor.schedule",
        link: "/system/manage-schedule",
      },
      {
        name: "menu.doctor.manage-patient",
        link: "/system/manage-patient",
      },
      {
        name: "Medical history",
        link: "/system/manage-medical-history",
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
        link: "/system/manage-schedule",
      },
      {
        name: "menu.doctor.manage-patient",
        link: "/system/manage-patient",
      },
      {
        name: "Medical history",
        link: "/system/manage-medical-history",
      },
    ],
  },
];

export const partentMenu = [
  {
    name: "Histories medical",
    menus: [
      {
        name: "Medical history",
        link: "/system/manage-medical-history",
      },
    ],
  },
];
