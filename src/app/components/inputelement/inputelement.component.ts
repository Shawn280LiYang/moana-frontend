import{ Component,Input,ViewChild } from '@angular/core';

@Component({
    selector: 'my-input',
    template:`
    <li [class.invalid-borderless]="isInvalid">
        <span>{{input.label}}</span>
        <input type={{input.type}} class="form-input" [(ngModel)]="input.value" 
                                                      placeholder={{input.placeholder}} 
                                                      [readonly]="input.isReadonly" 
                                                      [class.right-align]="input.isRightAligned"
                                                      name="{{input.name}}"
                                                     
                                                      #inputEle/>
    </li>
    `,
    styles:[`
li{
	position: relative;
	display: -webkit-flex; 
    display: -moz-flex;
    display: flex;
	padding: 0.30rem 0.30rem 0.30rem 0;
	border-bottom:  1px solid #E5E5E5;
	font-size: 0.30rem;
	color: #666;
	line-height: 0.41rem;
}
li span{
    margin: auto 0.3rem;
}
.form-input {
	height: 0.41rem;
	font-size: 0.25rem;
	margin-left: 0.10rem;
	flex:1;
}
.invalid-borderless{
    color: #e54847;
    border: 2px solid;
    border-radius: 0.05rem;
    border-right: 0.15rem solid;
    
}
.form-input.right-align{
    text-align: right !important;
}
.user-page-img{
	line-height:initial !important;
	font-size:0px !important;
}
.user-page-img img{
    position:absolute;
    right:0.3rem;
}
.user-page-img h4{
    font-size: 0.3rem;
	line-height:1.32rem;
}
.error-msg{
    height: 0.4rem;
    background: blue;
    text-align:right;
    font:italic;
}
    `]
})

export class InputelementComponent{

    @Input() input: Object;
    @ViewChild('inputEle') inputEle: any;
    isInvalid: boolean;

    getInputValue(){
        let arr = {};
        arr = {[this.input['name']]: this.input['value']};
        return arr;
    }

    fireFocus(){
        this.inputEle.nativeElement.focus();
    }

    setReadonly(){
        this.input['isReadonly'] = true;
    }

    disableReadonly(){
        this.input['isReadonly'] = false;
    }

    validateInput(){
        if (this.validate()) this.isInvalid = false;
        else this.isInvalid = true;
        return !this.isInvalid;
    }

    validate(){
        if(!this.input['value']) return false;
        if (this.input['type'] === "email"){
            let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return regex.test(this.input['value']);
        }
        return true;
    }
}