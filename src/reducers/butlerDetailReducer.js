import {BUTLERS_DATA, BUTLERBOTS_REFRESHED} from '../constants/frontEndConstants';
import React  from 'react';
import {FormattedMessage} from 'react-intl';

function processButlersData(data) {
    var butlerData=[], butlerDetail={};
    let online=<FormattedMessage id="butlerDetail.online.status" description='online status for butlerDetail'
                                   defaultMessage='Online'/>;
    let offline=<FormattedMessage id="butlerDetail.offline.status" description='offline status for butlerDetail'
                                    defaultMessage='Offline'/>;
    var currentTask={0: "Pick", 1: "Put", 2: "Audit", 3: "Charging", 4: "Move"};
    var currentSubtask={0: "Moving to", 1: "Moving to mount", 2: "Moving to dismount", 3: "Docked at"};
    var currentState={"online": online, "offline": offline};
    let BOT, PPS, CS, MSU;

    for (var i=data.length - 1; i >= 0; i--) {
        var botId=data[i].butler_id, msuId=data[i].display_msu_id, csId=data[i].charger_id,
            ppsId=data[i].pps_id;
        BOT=<FormattedMessage id="butlerDetail.name.prefix" description='prefix for butler id'
                                defaultMessage='BOT - {botId}' values={{botId: botId}}/>;
        PPS=<FormattedMessage id="pps.name.prefix" description='prefix for pps id' defaultMessage='PPS - {ppsId}'
                                values={{ppsId: ppsId}}/>;
        CS=<FormattedMessage id="charger.name.prefix" description='prefix for charger id' defaultMessage='CS - {csId}'
                               values={{csId: csId}}/>;
        MSU=<FormattedMessage id="msu.name.prefix" description='prefix for msu id' defaultMessage='MSU - {msuId}'
                                values={{msuId: msuId}}/>;
        butlerDetail={};
        butlerDetail.id=BOT;
        butlerDetail.statusClass=data[i].state;
        butlerDetail.status=currentState[data[i].state];
        butlerDetail.location=data[i].location;
        butlerDetail.voltage=data[i].voltage;
        butlerDetail.taskNum=currentTask[data[i].current_task];
        butlerDetail.taskType=data[i].current_task;
        if (data[i].display_msu_id=== null) {
            butlerDetail.msu="--";
        }
        else {
            butlerDetail.msu=MSU;
        }

        if (data[i].current_task !== null) {
            butlerDetail.current=currentTask[data[i].current_task];
            if (data[i].current_subtask !== null) {
                butlerDetail.current=butlerDetail.current + " - " + currentSubtask[data[i].current_subtask];
                if (data[i].charger_id !== null) {
                    butlerDetail.current=butlerDetail.current + " CS " + data[i].charger_id;
                }

                else if (data[i].msu_id !== null) {
                    butlerDetail.current=butlerDetail.current + " MSU " + data[i].msu_id;
                }

                else {
                    butlerDetail.current=butlerDetail.current + " PPS " + data[i].pps_id;
                }
            }


        }
        else {
            butlerDetail.current="--";
        }
        butlerData.push(butlerDetail);
    }

    return butlerData;
}

export function butlerDetail(state={}, action) {

    switch (action.type) {
        case BUTLERS_DATA:
            var res, butlers;
            res=action.data;
            if (!res.complete_data) {
                /**
                 * Error handling
                 */
                return state
            }
            if (res.complete_data) {
                butlers=processButlersData(res.complete_data);


                return Object.assign({}, state, {
                    "butlerDetail": res.complete_data
                })
            }
            break;
        case BUTLERBOTS_REFRESHED:
            return Object.assign({}, state, {
                "butlerBotsRefreshed": new Date()
            })

        default:
            return state
    }
}