import { MemoModel } from "@sejong/model";
import { AbsMemoDao } from "./AbsMemoDao";

export class MemoDao extends AbsMemoDao {

    // 자동생성된 코드 시작
    public static readonly INS = new MemoDao();

    protected async joining(selected: MemoModel[]): Promise<MemoModel[]> {
        return selected;
    }
    // 자동생성된 코드 끝
}
