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
 *  comments: before using hashing index                                
 */

use optimized_university_hundred_thousand
db.professor.getPlanCache().clear()
db.department.getPlanCache().clear()

db.getCollection("professor").aggregate([
    { '$match': { Name: 'Abel Warren' } },
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
    { '$group': { _id: null, professor_id: { $addToSet: '$_id' } } },
    { '$unwind': '$professor_id' },
    {
        $lookup: {
            from: 'professor',
            localField: 'professor_id',
            foreignField: '_id',
            as: 'professor'
        }
    },
    {
        $unwind: {
            path: '$professor',
            preserveNullAndEmptyArrays: false
        }
    },
    { '$set': { 'ID': '$professor._id' } },
    { '$set': { 'Name': '$professor.Name' } },
    { '$set': { 'Gender': '$professor.Gender' } },
    { '$set': { 'Salary': '$professor.Salary' } },
    { '$project': { 'ID': 1, 'Name': 1, 'Gender': 1, 'Salary': 1, '_id': 0 } },
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
 *  comments: notice significant time improvment when hashing index is used   
 */

db.getCollection("professor").createIndex(
    {
        "Name": "hashed"
    },
    {
        name: 'Name_1',
        unique: false,
        sparse: false
    }
)

db.professor.getPlanCache().clear()
db.department.getPlanCache().clear()
db.getCollection("professor").aggregate([
    { '$match': { Name: 'Abel Warren' } },
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
    { '$group': { _id: null, professor_id: { $addToSet: '$_id' } } },
    { '$unwind': '$professor_id' },
    {
        $lookup: {
            from: 'professor',
            localField: 'professor_id',
            foreignField: '_id',
            as: 'professor'
        }
    },
    {
        $unwind: {
            path: '$professor',
            preserveNullAndEmptyArrays: false
        }
    },
    { '$set': { 'ID': '$professor._id' } },
    { '$set': { 'Name': '$professor.Name' } },
    { '$set': { 'Gender': '$professor.Gender' } },
    { '$set': { 'Salary': '$professor.Salary' } },
    { '$project': { 'ID': 1, 'Name': 1, 'Gender': 1, 'Salary': 1, '_id': 0 } },
])

db.getCollection("professor").dropIndex("Name_1")