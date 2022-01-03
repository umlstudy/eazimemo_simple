import { AbsDao } from "@sejong/dao";
import { AbsModel, TranObjectOwner } from "@sejong/model";

export abstract class AbsBiz<M extends AbsModel> {

    protected abstract getAbsDao(): AbsDao<M>;

    public async selectById(model: M): Promise<M | null> {
        return this.getAbsDao().selectByPrimaryKey(model);
    }

    public async selectFirst(): Promise<M | null> {
        return this.getAbsDao().selectFirst();
    }

    protected abstract validate4Insert(model: M):void;

    public async insert(too: TranObjectOwner, model: M): Promise<number> {
        this.validate4Insert(model);
        return await this.getAbsDao().insert(too, model);
    }

    public async update(too: TranObjectOwner, model: M): Promise<number> {
        return await this.getAbsDao().update(too, model);
    }

    public async delete(too: TranObjectOwner, model: M): Promise<number> {
        return await this.getAbsDao().delete(too, model);
    }
}