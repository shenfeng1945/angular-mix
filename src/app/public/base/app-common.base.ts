export abstract class AppComponentBase {
    constructor() { }
    public ismoblie(): boolean {
        // tslint:disable-next-line:max-line-length
        return /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
        .test(navigator.userAgent)
         ? true : false;
    }
}
