export interface MenuData {
  name: string;
  key?: string;
  icon?: string;
  path?: string;
  children?: MenuData[];
}

const menuData: MenuData[] = [
  {
    name: "首页",
    key: "home",
    path: "/home",
    icon: "icon-home",
  },
  {
    name: "文章管理",
    key: "cms",
    icon: "icon-cms",
    path: "/article",
  },
  {
    name: "留言板",
    key: "product",
    icon: "icon-modular",
    path: "/message/board",
  },
  {
    name: "视频管理",
    key: "system",
    icon: "icon-setting",
    path: "/video",
  },
];

export default menuData;
