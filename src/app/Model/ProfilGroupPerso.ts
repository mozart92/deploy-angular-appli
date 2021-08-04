import {Group} from './group';

export class ProfilGroupPerso {
      id: number;
      libillePage: String;
      modulesPage: String;
      idGroup: any;
      allInfoPrivil: any;
      groupes: Group[];

      constructor(id=null,libillePage=null, modulesPage=null, idGroup= null, allInfoPrivil={} ) {
          this.id=id;
          this.libillePage=libillePage;
          this.modulesPage=modulesPage;
          this.idGroup = idGroup;
          this.allInfoPrivil = allInfoPrivil;
      }

}