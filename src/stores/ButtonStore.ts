import { makeAutoObservable } from 'mobx';

export enum ButtonType {
    Prashad = 'Prashad',
    AboutTemple = 'AboutTemple',
    Dakshana = 'Dakshana',
    Menu = 'Menu',
    LogOut = 'LogOut',
    DeleteAccount = 'DeleteAccount'
}

class ButtonStore {
    selectedButton: ButtonType | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    setSelectedButton(button: ButtonType | null) {
        this.selectedButton = button;
    }
}

export const buttonStore = new ButtonStore();
