import { SjDataUtil } from "@sejong/common";
import { AbsIdBaseModel } from "@sejong/model";
import { initializeApp } from "firebase/app";
import { collection, doc, DocumentData, DocumentSnapshot, getDoc, getDocs, getFirestore, limit, Query, query, QueryConstraint, startAfter, writeBatch, WriteBatch } from "firebase/firestore/lite";
import { firebaseConfig } from "../FirebaseConfig";
import { SequenceGenerator } from "./SequenceGenerator";

const app = initializeApp(firebaseConfig);
const fireStore = getFirestore(app);

export abstract class AbsDao<M extends AbsIdBaseModel> {

    protected abstract getTableName(): string;

    public static createWriteBatch():WriteBatch {
        return writeBatch(fireStore);
    }

    public async insert(writeBatch: WriteBatch, model: M): Promise<WriteBatch> {

        const tableName = this.getTableName();
        const id = await SequenceGenerator.nextString(fireStore, tableName);
        const docRef = doc(fireStore, tableName, id);
        const modelTmp = model as any;
        delete modelTmp['id'];
        const wb = writeBatch.set(docRef, modelTmp);
        model.id = id;

        return wb;
    }

    public update(writeBatch: WriteBatch, model: M): WriteBatch {
        const tableName = this.getTableName();
        const id = model.id;
        const docRef = doc(fireStore, tableName, id);
        const modelTmp = model as any;
        delete modelTmp['id'];
        const wb = writeBatch.set(docRef, modelTmp, { merge: true });
        model.id = id;

        return wb;
    }

    public delete(writeBatch: WriteBatch, model: M): WriteBatch {
        const tableName = this.getTableName();
        const docRef = doc(fireStore, tableName, model.id);
        return writeBatch.delete(docRef);
    }

    private convertDataToModel(snapshot:DocumentSnapshot<DocumentData>):M|null {
        const data = snapshot.data();
        if (SjDataUtil.isNotNullOrUndefined(data)) {
            const model = data as M;
            model.id = snapshot.id;
            return model;
        } else {
            return null;
        }
    }

    public async selectByPrimaryKey(model: M): Promise<M | null> {
        const tableName = this.getTableName();
        const docRef = doc(fireStore, tableName, model.id);
        const docSnapShot = await getDoc(docRef);
        const resultTmp = [] as M[];
        const modelResult = this.convertDataToModel(docSnapShot);
        if (modelResult!= null ) {
            resultTmp.push(modelResult);
            const result = await this.joining(resultTmp);
            return result[0];
        } else {
            return null;
        }
    }

    protected createWhereConditions(model: M): QueryConstraint[] {
        console.log("createWhereConditions " + model.id);
        return [] as QueryConstraint[];
    }

    protected orderBy(): QueryConstraint[] {
        return [] as QueryConstraint[];
    }

    protected groupBy(): QueryConstraint[] {
        return [] as QueryConstraint[];
    }

    private async paging(model: M, queryConstantsWithoutPaging: QueryConstraint[])
        : Promise<QueryConstraint[]> {

        const queryConstants = [] as QueryConstraint[];
        const page = model.pageInfo;
        if (SjDataUtil.isNullOrUndefined(page)) {
            return queryConstants;
        }

        const tableName = this.getTableName();
        const q = query(collection(fireStore, tableName), ...queryConstantsWithoutPaging);

        const allSnapShot = await getDocs(q);
        const totalCount = allSnapShot.size;

        if (totalCount > 0) {
            const rowStartPosTmp = page.rowsPerPage * page.curPagePos;
            const rowStartPos = (()=>{
                if (totalCount < rowStartPosTmp) {
                    const realPageCnt = (totalCount / page.rowsPerPage)
                        + (totalCount % page.rowsPerPage) > 0 ? 1 : 0;
                    return page.rowsPerPage * (realPageCnt - 1);
                } else {
                    return rowStartPosTmp;
                }
            })();

            if (rowStartPos > 0) {
                const lastVisible = allSnapShot.docs[rowStartPos];
                queryConstants.push(startAfter(lastVisible));
            }

            queryConstants.push(limit(page.rowsPerPage));
        }
        return queryConstants;
    }

    public async selectFirst(model: M)
        : Promise<M|null> {

        const result = await this.select(model, [], true);
        if ( result.length>0 ) {
            return result[0];
        } else {
            return null;
        }
    }

    protected async joining(selected: M[]): Promise<M[]> {
        return selected;
    }

    public async selectList(model: M, preQueryConstraints: QueryConstraint[])
        : Promise<M[]> {
        return await this.select(model, preQueryConstraints, false);
    }

    public async select(model: M
        , preQueryConstraints: QueryConstraint[]
        , selectFirst:boolean)
        : Promise<M[]> {
        const q = await this.createQuery(model, preQueryConstraints);
        const querySnapshot = await getDocs(q);
        const resultTmp = [] as M[];
        if ( selectFirst ) {
            if (querySnapshot.docs.length>0) {
                const modelResult = this.convertDataToModel(querySnapshot.docs[0]);
                if (modelResult != null ) {
                    resultTmp.push(modelResult);
                }
            }
        } else {
            querySnapshot.forEach((doc) => {
                const modelResult = this.convertDataToModel(doc);
                if (modelResult != null) {
                    resultTmp.push(modelResult);
                }
            });
        }

        const result = await this.joining(resultTmp);

        return result;
    }

    private async createQuery(model: M, preQueryConstraints: QueryConstraint[])
        : Promise<Query<DocumentData>> {

        const queryConstraints = [] as QueryConstraint[];
        if (SjDataUtil.isNotNullOrUndefined(preQueryConstraints) ) {
            SjDataUtil.pushAll(queryConstraints, preQueryConstraints);
        }
        SjDataUtil.pushAll(queryConstraints, this.createWhereConditions(model));
        SjDataUtil.pushAll(queryConstraints, this.orderBy());
        SjDataUtil.pushAll(queryConstraints, this.groupBy());

        // 페이징
        SjDataUtil.pushAll(queryConstraints, await this.paging(model, queryConstraints));

        const tableName = this.getTableName();
        const q = query(collection(fireStore, tableName), ...queryConstraints);
        return q;
    }
}