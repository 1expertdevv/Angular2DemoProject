import { Component, ViewChild, ElementRef, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '../app/app.component';

@Component({
    selector: 'adminLogin-page',
    templateUrl: './adminLogin.component.html'
})
export class adminLoginComponent {

    @ViewChild('nameControl')
    private nameControl: ElementRef;

    @ViewChild('passwordControl')
    private passwordControl: ElementRef;

    constructor(private _router: Router, public appComp: AppComponent) {
        this.appComp.hideAdminTemplate();
        this.appComp.hideMemberTemplate();
        this.appComp.showNav = true;
        this.appComp.Logout();
    }


    onLogin() {
        this.appComp.Login();
        var name = this.nameControl.nativeElement.value;
        var password = this.passwordControl.nativeElement.value;

        if (name == "" || password == "") {
            alert("enter the required fields!");
            return;
        }

        if (String(name).toUpperCase() == "ADMIN" && String(password).toUpperCase() == "ADMIN") {
            this._router.navigate(['/addItems']);
        }
        else if (String(name).toUpperCase() == "MEMBER" && String(password).toUpperCase() == "MEMBER") {
            this._router.navigate(['/showItems']);
        }
        else {
            alert("Please enter correct user name and password !");
        }
    }

    onCancel() {
        this.nameControl.nativeElement.value = "";
        this.passwordControl.nativeElement.value = "";
    }



}
