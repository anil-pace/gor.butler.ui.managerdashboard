import {BUTLERS_DATA} from '../constants/appConstants';


function processButlersData(data) {
  var butlerData=[], butlerDetail = {};
  var currentTask = {"pick":"Pick", "put":"Put", "audit":"Audit", "charging":"Charging"};
  var currentState = {"online":"Online", "offline":"Offline"};
  for (var i = data.length - 1; i >= 0; i--) {
    butlerDetail = {}
    butlerDetail.id = "BOT " + data[i].butler_id;
    butlerDetail.statusClass = data[i].state;
    butlerDetail.status = currentState[data[i].state];
    butlerDetail.location = data[i].position;
    butlerDetail.voltage = data[i].voltage;
    butlerDetail.taskType = data[i].current_task;
    if(data[i].msu_id === null) {
      butlerDetail.msu = "--";
    }
    else{
      butlerDetail.msu = "MSU " + data[i].msu_id;
    }
    if(data[i].current_task !== null) {
      butlerDetail.current = currentTask[data[i].current_task];
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