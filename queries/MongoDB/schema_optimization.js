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
 *  comments: notice significant improvement in time when the schema is optimized                             
 */

use university_hundred_thousand
//db.setProfilingLevel(0)
//db.system.profile.drop()
//db.setProfilingLevel(2)
db.student_course.getPlanCache().clear()
db.course.getPlanCache().clear()
db.student.getPlanCache().clear()
db.getCollection("student_course").aggregate([
    { '$match': { 'Final_Exam_Grade': 'A' } },
    {
        $lookup: {
            from: 'course',
            localField: 'course_id',
            foreignField: '_id',
            as: 'course'
        }
    },
    {
        $unwind: {
            path: '$course',
            preserveNullAndEmptyArrays: false
        }
    },
    {
        $lookup: {
            from: 'student',
            localField: 'student_id',
            foreignField: '_id',
            as: 'student'
        }
    },
    {
        $unwind: {
            path: '$student',
            preserveNullAndEmptyArrays: false
        }
    },
    {
        $lookup: {
            from: 'final_exam',
            localField: 'student.student_id',
            foreignField: 'student_id',
            as: 'final_exam'
        }
    },
    {
        $unwind: {
            path: '$final_exam',
            preserveNullAndEmptyArrays: false
        }
    },
    {
        $lookup: {
            from: 'grade',
            localField: 'final_exam.grade_id',
            foreignField: '_id',
            as: 'grade'
        }
    },
    {
        $unwind: {
            path: '$grade',
            preserveNullAndEmptyArrays: false
        }
    },
    {
        '$group': {
            _id: null, students: {
                $addToSet: {
                    "stud_id": "$student._id",
                    "stud_name": "$student.Name",
                    "stud_gender": "$student.Gender"
                }
            }
        }
    },
    { '$unwind': '$students' },
    { '$set': { 'ID': '$students.stud_id' } },
    { '$set': { 'Name': '$students.stud_name' } },
    { '$set': { 'Gender': '$students.stud_gender' } },
    { '$project': { 'ID': 1, 'Name': 1, 'Gender': 1, _id: 0 } },
])
//db.system.profile.find().limit(10).sort( { ts : -1 } ).pretty()

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
 *  comments: notice significant time improvment after schema optimization
 */

use optimized_university_hundred_thousand
db.student_course.getPlanCache().clear()
db.course.getPlanCache().clear()
db.student.getPlanCache().clear()
db.getCollection("student_course").aggregate([
    { '$match': { 'Final_Exam_Grade': 'A' } },
    {
        $lookup: {
            from: 'course',
            localField: 'course_id',
            foreignField: '_id',
            as: 'course'
        }
    },
    {
        $unwind: {
            path: '$course',
            preserveNullAndEmptyArrays: false
        }
    },
    {
        $lookup: {
            from: 'student',
            localField: 'student_id',
            foreignField: '_id',
            as: 'student'
        }
    },
    {
        $unwind: {
            path: '$student',
            preserveNullAndEmptyArrays: false
        }
    },
    {
        '$group': {
            _id: null, students: {
                $addToSet: {
                    "stud_id": "$student._id",
                    "stud_name": "$student.Name",
                    "stud_gender": "$student.Gender"
                }
            }
        }
    },
    { '$unwind': '$students' },
    { '$set': { 'ID': '$students.stud_id' } },
    { '$set': { 'Name': '$students.stud_name' } },
    { '$set': { 'Gender': '$students.stud_gender' } },
    { '$project': { 'ID': 1, 'Name': 1, 'Gender': 1, _id: 0 } },
])