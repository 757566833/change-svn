import { postFetch } from '../../../fetch/fetch';
const changepassword = async (json = {}) => {
    return postFetch(
        '/changepassword',
        json
    );
};
export default changepassword;