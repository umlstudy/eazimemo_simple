import { SjAssertUtil, SjDataUtil } from "@sejong/common";
import { AbsIdBaseModel } from "@sejong/model";
import { PageInfo } from "@sejong/model/dist/PageInfo";
import { initializeApp } from "firebase/app";
import { collection, doc, DocumentData, Firestore, getDoc, getDocs, getFirestore, limit, Query, query, QueryConstraint, startAfter, WriteBatch } from "firebase/firestore/lite";
import { firebaseConfig } from "../FirebaseConfig";
import { SequenceGenerator } from "./SequenceGenerator";

const app = initializeApp(firebaseConfig);
const fireStore = getFirestore(app);

export abstract class AbsDao<M extends AbsIdBaseModel> {

    protected abstract getTableName(): string;

    public abstract getCountColumn(): string;

    public async insert(db: Firestore, writeBatch: WriteBatch, model: M): Promise<WriteBatch> {

        const tableName = this.getTableName();
        const id = await SequenceGenerator.nextString(db, tableName);
        const docRef = doc(db, tableName, id);
        const modelTmp = model as any;
        delete modelTmp['id'];
        const wb = writeBatch.set(docRef, modelTmp);
        model.id = id;

        return wb;
    }

    public update(db: Firestore, writeBatch: WriteBatch, model: M): WriteBatch {
        const tableName = this.getTableName();
        const docRef = doc(db, tableName, model.id);
        const modelTmp = model as any;
        delete modelTmp['id'];
        return writeBatch.set(docRef, modelTmp, { merge: true });
    }

    public delete(db: Firestore, writeBatch: WriteBatch, model: M): WriteBatch {
        const tableName = this.getTableName();
        const docRef = doc(db, tableName, model.id);
        return writeBatch.delete(docRef);
    }

    public async selectByPrimaryKey(db: Firestore, model: M): Promise<M | null> {
        const tableName = this.getTableName();
        const docRef = doc(db, tableName, model.id);
        const docSnapShot = await getDoc(docRef);
        return docSnapShot.data() as M | null;
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

    private async paging(db: Firestore, model: M, queryConstantsWithoutPaging: QueryConstraint[])
        : Promise<QueryConstraint[]> {

        const queryConstants = [] as QueryConstraint[];
        const page = model.pageInfo;
        if (SjDataUtil.isNullOrUndefined(page)) {
            return queryConstants;
        }

        const tableName = this.getTableName();
        const q = query(collection(db, tableName), ...queryConstantsWithoutPaging);

        const allSnapShot = await getDocs(q);
        const totalCount = allSnapShot.size;

        if (totalCount > 0) {
            let rowStartPos = page.rowsPerPage * page.curPagePos;
            if (totalCount < rowStartPos) {
                const realPageCnt = (totalCount / page.rowsPerPage)
                    + (totalCount % page.rowsPerPage) > 0 ? 1 : 0;
                rowStartPos = page.rowsPerPage * (realPageCnt - 1);
            }

            if (rowStartPos > 0) {
                const lastVisible = allSnapShot.docs[rowStartPos];
                queryConstants.push(startAfter(lastVisible));
            }

            queryConstants.push(limit(page.rowsPerPage));
        }
        return queryConstants;
    }

    // public async selectFirst(model: AbsModel = {} as AbsModel)
    //     : Promise<M | null> {
    //     const limitOne = await this.limit(knex, 1, model);
    //     return limitOne.length > 0 ? limitOne[0] as M : null;
    // }

    // public limit(knex: Knex, limitCnt:number, model:AbsModel={} as AbsModel)
    //     : Knex.QueryBuilder {
    //     const qb = this.selectQueryBuilder(knex, model as M).limit(limitCnt);
    //     return qb;
    // }

    public async selectList(model: M)
        : Promise<M[]> {
        return await this.select(fireStore, model);
    }

    public async select(db: Firestore, model: M)
        : Promise<M[]> {
        const q = this.createQuery(db, model);
        return null;
    }

    private async createQuery(db: Firestore, model: M)
        : Promise<Query<DocumentData>> {

        const queryConstraints = [] as QueryConstraint[];
        SjDataUtil.pushAll(queryConstraints, this.createWhereConditions(model));
        SjDataUtil.pushAll(queryConstraints, this.orderBy());
        SjDataUtil.pushAll(queryConstraints, this.groupBy());

        SjDataUtil.pushAll(queryConstraints, await this.paging(db, model, queryConstraints));
        

        const tableName = this.getTableName();
        const q = query(collection(db, tableName), ...queryConstraints);
        return q;

        // const allSnapShot = await getDocs(all);
        // const allSnapShotSize = allSnapShot.size;
        // console.log("allSnapShotSize => " + allSnapShotSize);

        // // Query the first page of docs
        // const firstPage = query(collection(db, "eazimemo_simple"), orderBy("message"), limit(limitCnt));
        // const documentSnapshots = await getDocs(firstPage);

        // // Get the last visible document
        // const lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];
        // // console.log("last", lastVisible);

        // // Construct a new query starting at this document,
        // // get the next 25 cities.
        // if (allSnapShotSize > limitCnt) {
        //     const next = query(collection(db, "eazimemo_simple"),
        //         orderBy("message"),
        //         startAfter(lastVisible),
        //         limit(limitCnt));
        //     const nextSnapshots = await getDocs(next);

        //     console.log("next ----> ");
        //     nextSnapshots.forEach((doc) => {
        //         console.log(doc.id, " => ", doc.data());
        //     });
        //     console.log("next ----> end");

        // }
        // console.log("pagingTest end");

        // // const tableName = this.getTableName();
        // let queryBuilder = knex.select().from<M>(tableName)
        //     .whereRaw('1=1');

        // // 페이징
        // queryBuilder = this.fromTo(queryBuilder, model);

        // // 조건절
        // queryBuilder = this.where(queryBuilder, model);

        // // 조인절
        // queryBuilder = this.joining(queryBuilder);

        // // orderBy
        // queryBuilder = this.orderBy(queryBuilder);

        // // groupBy
        // queryBuilder = this.groupBy(queryBuilder);

        // // selectColumns
        // queryBuilder = this.selectColumns(queryBuilder);

        // return queryBuilder;
    }
}