export class Formconf{
    inputConf: any[];

    constructor(formName: string){
        if(formName === 'login'){
            this.setLoginFormconf();
        }else if(formName === 'signup'){
            this.setSignupFormconf();
        }else if(formName === 'profile'){
            this.setProfileFormconf();
        }
    }

    private setLoginFormconf(){
        this.inputConf = [
            {'label':'用户名','type':'text','placeholder':'请输入您的用户名','value':'','isReadonly':false,'name':'username'},
            {'label':'密码','type':'password','placeholder':'请输入您的密码','value':'','isReadonly':false,'name':'password'}
        ];
    }
    private setSignupFormconf(){
        this.inputConf = [
            {'label':'用户名','type':'text','placeholder':'请输入您的用户名(将用于登陆)','value':'','isReadonly':false,'name':'username'},
            {'label':'邮箱','type':'email','placeholder':'请输入您的邮箱','value':'','isReadonly':false,'name':'email'},
            {'label':'昵称','type':'text','placeholder':'请输入昵称','value':'','isReadonly':false,'name':'nickname'},
            {'label':'密码','type':'password','placeholder':'请输入密码','value':'','isReadonly':false,'name':'password'},
            {'label':'确认密码','type':'password','placeholder':'请再次输入密码','value':'','isReadonly':false,'name':'confirm'}
        ];
    }

    private setProfileFormconf(){
        this.inputConf =[
            {'label':'昵称','type':'text','placeholder':'请输入您的昵称','value':'','isReadonly':true,'isRightAligned':true,'name':'nickname'},
            {'label':'邮箱','type':'email','placeholder':'请输入您的邮箱','value':'','isReadonly':true,'isRightAligned':true,'name':'email'},
        ]
    }
}
