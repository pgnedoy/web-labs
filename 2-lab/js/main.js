import {AlarmListModel} from "./model/AlarmListModel.js";
import {AlarmListView} from "./view/AlarmListView.js";
import {AlarmListController} from "./controller/AlarmListController.js";

const alarmListModel = new AlarmListModel();
const alarmListView = new AlarmListView(alarmListModel);

const controller = new AlarmListController(alarmListModel, alarmListView);

controller.addAlarm('10:05:07');

