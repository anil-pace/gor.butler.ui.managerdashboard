import {BUTLERS_DETAIL} from '../constants/appConstants';


function processButlersData(data) {
  var butlerData=[];
  var task = ["Pick - ", "Put - ", "Audit - ", "Charging - ", "move - "];
  var subTask = ["Moving", "Mounting", "Dismounting", "Docked"];
  var detail={"id": "","status": "","current": "", "msu": "", "location": "", "voltage": ""};
  for (var i = data.length - 1; i >= 0; i--) {
    var detail = {};
    detail.id = "BOT " + data[i].butler_id;
    detail.status = "On";
    var currentTask = task[data[i].current_task];
    var currentSubTask = subTask[data[i].current_subtask];
    detail.current = currentTask + currentSubTask + " MSU "+ data[i].msu_id;
    detail.msu = "MSU " + data[i].msu_id;
    detail.location = data[i].location;
    detail.voltage = data[i].voltage;
    butlerData.push(detail);
  }
  return butlerData;
}

export  function butlerDetail(state={},action){
	switch (action.type) {
	  case BUTLERS_DETAIL:
         var res;
         res=action.data;
         if(res.aggregate_data){
          var butlers = processButlersData(res.aggregate_data);
          }
           return Object.assign({}, state, {
               "butlerDetail" : butlers
          })

	  default:
	    return state
  }
}