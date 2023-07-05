export interface MenuItem {
    label: string;
    icon: string;
    subMenuItems: SubMenuItem[];
    url?:string;
    subMenuOpened: boolean;
  }
  
 interface SubMenuItem {
    label: string;
    icon: string;
    url:string;
  }