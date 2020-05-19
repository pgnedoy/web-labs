export class AlarmView {
    constructor(alarmModel) {
        this.alarmModel = alarmModel;
    }

    toHtml() {
        const checked = this.alarmModel.done ? "checked" : "";
        const color = 'grey';
        return `<tr>
                <td style='color: ${color}'>
                    ${this.alarmModel.time}
                </td>
                <td>
                    <input type="checkbox" data-id="${this.alarmModel.id}" ${checked} />                    
                </td>
                <td>
                    <button data-id='${this.alarmModel.id}' class='del-button'>Delete</button>
                </td>
            </tr>`;
    }
}
