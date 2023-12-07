import { getUsersByEmails } from "../services/user.service.js";

export const searchUsersHandler = async (req, res) => {
    const {array_search_params, type, key, search_param} = req.body;
    const userId = req.user.userId;
    console.log(
        'hers'
    )
    if (type === 'in') {
        if (key === 'email') {
            const usersFound = await getUsersByEmails(array_search_params, userId);
            res.status(200).json(usersFound);
        }
    }
}
