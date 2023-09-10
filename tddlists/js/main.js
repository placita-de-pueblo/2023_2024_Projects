class Patient {

  constructor(name, surname) {
    this._name = name;
    this._surname = surname;
  }

  getName() {
    return this._name;  
  }

  getSurname() {
    return this._surname;  
  }

  toString() {
    return "Patient: "+this.getName()+" "+this.getSurname();
  }

}


class WaitingList {
  
  constructor() {
    this._waitingPatients = [];  
    this._numberOfWaitingPatients = 0;
  }
  
  getNumberOfWaitingPatients() {
    return this._numberOfWaitingPatients;  
  }
  
  pushPatient(p) {
    this._waitingPatients[this._numberOfWaitingPatients] = p;
    this._numberOfWaitingPatients++;
  }
  
  shiftPatient() {
    if (this._numberOfWaitingPatients == 0) {
      return null;
    } else {
      let nextPatient = this._waitingPatients[0];
      if (this._numberOfWaitingPatients == 1) {
        this._waitingPatients=[];
        this._numberOfWaitingPatients = 0;
        return nextPatient;
      } else {
        for (let i = 0; i < this._numberOfWaitingPatients; i++) {
          this._waitingPatients[i] = this._waitingPatients[i+1];
        }
        delete this._waitingPatients[this._numberOfWaitingPatients];
        this._numberOfWaitingPatients--;
        return nextPatient;
      }
    }
  
  }
  
  
}


class UI {
    constructor() {
       this._waitingList = new WaitingList();
    }
    
    addNewPatient() {
      let name = document.querySelector("#frm1 input[name=name]").value;
      let surname = document.querySelector("#frm1 input[name=surname]").value;
      
      let p = new Patient(name, surname);
      this._waitingList.pushPatient(p);
      
      document.querySelector("#frm1 input[name=name]").value = "";
      document.querySelector("#frm1 input[name=surname]").value = "";
      
      this.updateNumberOfWaitingPatients();
    }
    
    callNextPatient() {
      let nextPatient = this._waitingList.shiftPatient();
      if (nextPatient != null) {
        document.querySelector("#nextName").innerHTML = nextPatient.getName();
        document.querySelector("#nextSurname").innerHTML = nextPatient.getSurname();
      } else {
        document.querySelector("#nextName").innerHTML = "";
        document.querySelector("#nextSurname").innerHTML = "";
      }
      
      this.updateNumberOfWaitingPatients();
    }
    
    updateNumberOfWaitingPatients() {
      let numberOfWaitingPatients = this._waitingList.getNumberOfWaitingPatients();
      document.querySelector("#numberOfWaitingPatients").innerHTML = numberOfWaitingPatients;
      
    }
}

