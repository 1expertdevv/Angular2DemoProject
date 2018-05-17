import { Component } from '@angular/core';

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']

})
export class AppComponent {
    public showNav: boolean;
    public showAdminTemplate: boolean;
    public showMemberTemplate: boolean;
    public userName: string = "Logout";
    constructor() {
        this.showNav = true;
        this.showAdminTemplate = false;
        this.showMemberTemplate = false;
    }

    hideNavBar() {
        this.showNav = false;
    }

    hideAdminTemplate() {
        this.showAdminTemplate = false;
    }

    hideMemberTemplate() {
        this.showMemberTemplate = false;
    }

    Login() {
        this.userName = "Login";
    }
    Logout() {
        this.userName = "Logout";
    }

}
