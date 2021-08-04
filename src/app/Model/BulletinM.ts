export class BulletinM {

    id : number;
    nomPlanning : string;
    nomBulletin : string;
    nameBulletinCode : string;
    dateSauvegade : Date;

  constructor(id: number, nomPlanning: string, nomBulletin: string, nameBulletinCode: string, dateSauvegade: Date) {
    this.id = id;
    this.nomPlanning = nomPlanning;
    this.nomBulletin = nomBulletin;
    this.nameBulletinCode = nameBulletinCode;
    this.dateSauvegade = dateSauvegade;
  }


}


