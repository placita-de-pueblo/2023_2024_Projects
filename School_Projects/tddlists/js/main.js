class Patient {

  constructor(name, surname) {
    this._name = name;
    this._surname = surname;
    this._nextPatient = null;
  }

  setNextPatient(p){
      this._nextPatient = p;
  }

  getNextPatient(){
    return this._nextPatient;
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
    this._firstPatient = null;
    this._lastPatient = null;
    this._numberOfWaitingPatients = 0;
  }
  
  getNumberOfWaitingPatients() {
    return this._numberOfWaitingPatients;  
  }

	pushPatient(p){
		if (this.getNumberOfWaitingPatients() == 0) {
			this._firstPatient = p;
			this._lastPatient = p;	
		}	else {
			this._lastPatient.setNextPatient(p);
			this._lastPatient = p;
		}
			this._numberOfWaitingPatients++;
		
		
	}

  shiftPatient() {
		if (this.getNumberOfWaitingPatients() == 1) {
			this._numberOfWaitingPatients--;
			return this._lastPatient;
		}
    else if (this.getNumberOfWaitingPatients() == 0) {
			return null;
		} 
    else {
			let p = this._firstPatient;
			this._firstPatient  = p.getNextPatient();
			this._numberOfWaitingPatients--;
			return p;
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

