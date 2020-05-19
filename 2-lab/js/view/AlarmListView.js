import {AlarmView} from "./AlarmView.js";

export class AlarmListView {
    constructor(alarmListModel) {
        this.alarmListModel = alarmListModel;
        this.controllerOnAddAlarm = null;
        this.controllerOnDelAlarm = null;
        this.controllerOnCheckbox = null;
        document.querySelector('#alarms-list').addEventListener('click', (e) => this.onClick(e)); // 'this' changes
        // this.initAddAlarmButton();
    }

    setControllerOnCheckbox(controllerOnCheckbox) {
        this.controllerOnCheckbox = controllerOnCheckbox;
    }

    setControllerOnAddAlarm(controllerOnAddAlarm) {
        this.controllerOnAddAlarm = controllerOnAddAlarm;
    }

    setControllerOnDelAlarm(controllerOnDelAlarm) {
        this.controllerOnDelAlarm = controllerOnDelAlarm;
    }

    onClick(e) {
        if (e.target.type === 'checkbox') {
            this.controllerOnCheckbox(e.target.dataset.id);
            return;
        }
        if (e.target.className === 'del-button') {
            this.controllerOnDelAlarm(e.target.dataset.id);
            return;
        }
    }

    onAddItem(e) {
        const title = prompt('Enter a new title:', '');
        this.controllerOnAddAlarm(title);
    }

    toHtml() {
        const alarmsHtml = this.alarmListModel.alarms.map(alarm => {
            const alarmView = new AlarmView(alarm);
            return alarmView.toHtml();
        }).join("");
        return `<table border="1"><tr><th>Time</th><th>Done</th><th>Operation</th></tr>${alarmsHtml}</table>`;
    }

}
