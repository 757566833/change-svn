import { IndexRef } from '../../components/Index/Index_cmpt';
import changepassword from '../../model/changepassword';
export default class Control {
    static async Changepassword(json) {
        const result = await changepassword(json);
        if (typeof result !== 'number') {
            let data = eval(`(${result})`);
            if (data.code == 0) {
                IndexRef.success(data.data);
            } else {
                IndexRef.interfaceError(data.msg);
            }
        } else {
            IndexRef.networkError(result);
        }
    }
}