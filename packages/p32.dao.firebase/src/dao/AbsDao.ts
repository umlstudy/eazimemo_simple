import { AbsListModel, AbsModel, TranObjectOwner } from "@sejong/model";
import { initializeApp } from "firebase/app";
import { Firestore, getFirestore, runTransaction } from "firebase/firestore/lite";
import { firebaseConfig } from "../FirebaseConfig";

const app = initializeApp(firebaseConfig);
const fireStore = getFirestore(app);

export abstract class AbsDao<M extends AbsModel> {

    protected abstract getTableName(): string;

    public static async transaction(
        codePart: (tranObjectOwner: TranObjectOwner) => Promise<unknown>)
        : Promise<unknown> {

        const result = await runTransaction(fireStore, async (transaction) => {
            const tranObjectOwner = new TranObjectOwner(transaction);
            await codePart(tranObjectOwner);
        });

        return result;
    }

    protected static getFireStore():Firestore {
        return fireStore;
    }

    public abstract insert(tranObjectOwner: TranObjectOwner, model: M): Promise<number>;

    public abstract update(tranObjectOwner: TranObjectOwner, model: M): Promise<number>;

    public abstract delete(tranObjectOwner: TranObjectOwner, model: M): number;

    public abstract selectByPrimaryKey(model: M): Promise<M | null>;

    public abstract selectFirst(model: M)
        : Promise<M | null>;

    public abstract selectList(model: M)
        : Promise<AbsListModel<M>>;

    public abstract select(model: M
        , selectFirst: boolean)
        : Promise<AbsListModel<M>>;
}