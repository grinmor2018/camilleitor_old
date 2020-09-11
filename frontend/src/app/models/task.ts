export class Task {

  constructor(_id ='', room = '', name='',
   hour='', transport='',
   oxigen=false, destination='', estat=null)
   {
    this._id = _id;
    this.room = room;
    this.name = name;
    this.hour = hour;
    this.transport = transport;
    this.oxigen = oxigen;
    this.destination = destination;
    this.estat = estat;
  }

  _id: string;
  room: string;
  name: string;
  hour: string;
  transport: string;
  oxigen: boolean;
  destination: string;
  estat: [string,string];
}
