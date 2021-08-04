export class ThemesUsersM {
    id : number;
    sidebarTheme : string;
    headerTheme : string;


  constructor( sidebarTheme?: string, headerTheme?: string, id?: number) {
    this.id = id;
    this.sidebarTheme = sidebarTheme;
    this.headerTheme = headerTheme;
  }
}
