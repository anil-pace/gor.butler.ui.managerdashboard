import {BUTLERS_DATA} from '../constants/appConstants';


function processButlersData(data) {
  var butlerData=[], butlerDetail = {};
  var currentTask = {0:"Pick", 1:"Put", 2:"Audit", 3:"Charging", 4:"Move"};
  var currentSubtask = {0:"Moving to",1:"Moving to mount",2:"Moving to dismount",3:"Docked at"};
  var currentState = {"online":"Online", "offline":"Offline"};

  for (var i = data.length - 1; i >= 0; i--) {
    butlerDetail = {}
    butlerDetail.id = "BOT " + data[i].butler_id;
    butlerDetail.statusClass = data[i].state;
    butlerDetail.status = currentState[data[i].state];
    butlerDetail.location = data[i].location;
    butlerDetail.voltage = data[i].voltage;
    butlerDetail.taskNum = currentTask[data[i].current_task];
    butlerDetail.taskType = data[i].current_task;
    if(data[i].msu_id === null) {
      butlerDetail.msu = "--";
    }
    else{
      butlerDetail.msu = "MSU " + data[i].msu_id;
    }

    if(data[i].current_task !== null) {
      butlerDetail.current = currentTask[data[i].current_task];
      if(data[i].current_subtask !== null) {
        butlerDetail.current = butlerDetail.current +" - "+ currentSubtask[data[i].current_subtask];
        if(data[i].charger_id !== null) {
          butlerDetail.current = butlerDetail.current + " CS " + data[i].charger_id;
        }

        else if(data[i].msu_id !== null) {
          butlerDetail.current = butlerDetail.current + " MSU " + data[i].msu_id;
        }

        else {
          butlerDetail.current = butlerDetail.current + " PPS " + data[i].pps_id;
        }
      }

      
    }
    else {
      butlerDetail.current = "--";
    }
    butlerData.push(butlerDetail);
  }
  
  return butlerData;
}

export  function butlerDetail(state={},action){

	switch (action.type) {
	  case BUTLERS_DATA:
         var res, butlers ;
         res=action.data;
         if(res.complete_data){
             butlers = processButlersData(res.complete_data);

          
           return Object.assign({}, state, {
               "butlerDetail" : butlers
          })
         }

	  default:
	    return state
  }
}