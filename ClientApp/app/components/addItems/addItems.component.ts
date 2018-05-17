import { Component, Inject, ViewChild, ElementRef, OnInit, Input } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { AppComponent } from '../app/app.component';


@Component({
    selector: 'addItems-page',
    templateUrl: './addItems.component.html'
})
export class addItemsComponent {
    @ViewChild('imageControl')
    public imageControl: ElementRef;

    @ViewChild('fileControl')
    public fileControl: ElementRef;

    @ViewChild('SuccessfullyDone')
    public Successfullydone: ElementRef;


    public id: number = 0;
    Model = new ItemModel();
    public FileToUpload: File;
    buttonName: string = "Save";
    filePath: string = "";
    public msg: string = "";
    public Items: ItemModel[] = [];
    public DisplayMessage: string = "";




    constructor(private _http: Http, @Inject('BASE_URL') private baseUrl: string, public appComp: AppComponent, private _router: Router) {
        if (this.appComp.userName == "Logout") {
            this._router.navigate(['/adminLogin']);
        }
        this.LoadData();
        this.appComp.hideNavBar();
        this.appComp.hideMemberTemplate();
        this.appComp.showAdminTemplate = true;
    }


    LoadData() {
        this._http.get(this.baseUrl + 'api/Item').subscribe(result => {
            this.Items = result.json() as ItemModel[];
        });
    }


    onSave() {

        if (this.validateField()) {
            if (this.Model.id == 0) {
                this.DisplayMessage = "Successfully Added.";
                this._http.post(this.baseUrl + 'api/Item', this.Model).subscribe((res) => {
                    this.LoadData();
                    this.onCancel();
                    this.Successfullydone.nativeElement.click();
                });
            }
            else {
                this.DisplayMessage = "Successfully Updated.";
                this._http.put(this.baseUrl + 'api/Item', this.Model).subscribe(result => {
                    this.LoadData();
                    this.onCancel();
                    this.Successfullydone.nativeElement.click();
                })
            }
        }
        else {
            alert(this.msg);
        }

    }

    onOpenFile() {
        this.imageControl.nativeElement.click();
    }

    //file upload event  
    fileChange(file: FileList) {
        this.FileToUpload = file.item(0);
        var reader = new FileReader();
        reader.onload = (event: any) => {
            this.Model.imageFile = event.target.result;
            this.filePath = event.target.result;
        }
        reader.readAsDataURL(this.FileToUpload);
        this.fileControl.nativeElement.value = this.FileToUpload.name;
        this.Model.fileName = this.FileToUpload.name;
    }


    setDeleteId(empId: number) {
        this.id = empId;
    }

    onDelete() {
        if (this.id > 0) {
            this._http.delete(this.baseUrl + 'api/Item/' + this.id).subscribe((res) => {
                this.LoadData();
            });
        }
    }


    onEdit(id: number) {
        this.buttonName = "Update";
        this._http.get(this.baseUrl + 'api/Item/' + id).subscribe(result => {
            this.Model = result.json() as ItemModel;
            this.filePath = this.Model.imageFile;
        });
    }

    validateField(): boolean {
        this.msg = "";
        if (this.Model.address == "") {
            this.msg = "Please Enter Address !\n";
        }

        if (this.Model.price == 0) {
            this.msg += "Please Enter Price !\n";
        }


        if (this.fileControl.nativeElement.value == "") {
            this.msg += "Please Select Image !\n";
        }
        if (this.msg == "") {
            return true;
        } else {
            return false;
        }
    }

    onCancel() {
        this.Model.id = 0;
        this.Model.address = "";
        this.Model.price = 0;
        this.Model.fileName = "";
        this.imageControl.nativeElement.value = null;
        this.fileControl.nativeElement.value = "";
        this.filePath = "";
        this.buttonName = "Save";
    }
}


class ItemModel {
    id: number = 0;
    address: string = "";
    price: number = 0;
    fileName: string = "";
    imageFile: string = "";
}
