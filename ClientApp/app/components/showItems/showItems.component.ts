import { Component, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { inject } from '@angular/core/testing';
import { AppComponent } from '../app/app.component';


@Component({
    selector: 'showItems-page',
    templateUrl: './showItems.component.html'
})
export class showItemsComponent {

    public Items: ItemModel[] = [];
    constructor(private _http: Http, @Inject('BASE_URL') private baseUrl: string, public appComp: AppComponent) {
        this.LoadData();
        this.appComp.hideNavBar();
        this.appComp.hideAdminTemplate();
        this.appComp.showMemberTemplate = true;
    }

    LoadData() {
        this._http.get(this.baseUrl + 'api/Item').subscribe(result => {
            this.Items = result.json() as ItemModel[];
        });
    }
}

class ItemModel {
    id: number = 0;
    address: string = "";
    price: number = 0;
    imageFile: string = "";
}

