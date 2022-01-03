
export class TranObjectOwner {

    private readonly tranObject: any;

    constructor(tranObject:any) {
        this.tranObject = tranObject;
    }

    public getTranObject():any {
        return this.tranObject;
    }
}