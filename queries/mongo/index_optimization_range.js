/***
 *      ____        __                  ____        _   _           _          _   _             
 *     |  _ \      / _|                / __ \      | | (_)         (_)        | | (_)            
 *     | |_) | ___| |_ ___  _ __ ___  | |  | |_ __ | |_ _ _ __ ___  _ ______ _| |_ _  ___  _ __  
 *     |  _ < / _ \  _/ _ \| '__/ _ \ | |  | | '_ \| __| | '_ ` _ \| |_  / _` | __| |/ _ \| '_ \ 
 *     | |_) |  __/ || (_) | | |  __/ | |__| | |_) | |_| | | | | | | |/ / (_| | |_| | (_) | | | |
 *     |____/ \___|_| \___/|_|  \___|  \____/| .__/ \__|_|_| |_| |_|_/___\__,_|\__|_|\___/|_| |_|
 *                                           | |                                                 
 *                                           |_|          
 *
 *  comments: before using index                              
 */

use optimized_university_hundred_thousand
db.professor.getPlanCache().clear()
db.department.getPlanCache().clear()

db.getCollection("professor").aggregate([
    { '$match': { Salary: { $lt: 1200 } } },
    {
        $lookup: {
            from: 'department',
            localField: 'department_id',
            foreignField: '_id',
            as: 'department'
        }
    },
    {
        $unwind: {
            path: '$department',
            preserveNullAndEmptyArrays: true
        }
    },
])

/*---------------------------------------------------------------------------------------------------*/
/***
 *                __ _               ____        _   _           _          _   _             
 *         /\    / _| |             / __ \      | | (_)         (_)        | | (_)            
 *        /  \  | |_| |_ ___ _ __  | |  | |_ __ | |_ _ _ __ ___  _ ______ _| |_ _  ___  _ __  
 *       / /\ \ |  _| __/ _ \ '__| | |  | | '_ \| __| | '_ ` _ \| |_  / _` | __| |/ _ \| '_ \ 
 *      / ____ \| | | ||  __/ |    | |__| | |_) | |_| | | | | | | |/ / (_| | |_| | (_) | | | |
 *     /_/    \_\_|  \__\___|_|     \____/| .__/ \__|_|_| |_| |_|_/___\__,_|\__|_|\___/|_| |_|
 *                                        | |                                                 
 *                                        |_|                                               
 *  comments: notice significant time improvment when index is used  
 */

db.getCollection("professor").createIndex(
    {
        "Salary": 1
    },
    {
        name: 'Salary_1',
        unique: false,
        sparse: false
    }
)
db.professor.getPlanCache().clear()
db.department.getPlanCache().clear()
db.getCollection("professor").aggregate([
    { '$match': { Salary: { $lt: 1200 } } },
    {
        $lookup: {
            from: 'department',
            localField: 'department_id',
            foreignField: '_id',
            as: 'department'
        }
    },
    {
        $unwind: {
            path: '$department',
            preserveNullAndEmptyArrays: true
        }
    },
])

db.getCollection("professor").dropIndex("Salary_1")