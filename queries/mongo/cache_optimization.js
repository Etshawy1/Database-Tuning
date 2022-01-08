use optimized_university_hundred_thousand;
//db.createView(
//  "memory_optimization",
//  "professor_research",
//  [
//    {
//        $lookup: {
//            from: 'professor',
//            localField: 'professor_id',
//            foreignField: '_id',
//            as: 'professor'
//        }
//    },
//    {
//        $unwind: {
//            path: '$professor',
//            preserveNullAndEmptyArrays: false
//        }
//    },
//    {
//        $lookup: {
//            from: 'research_project',
//            localField: 'research_project_id',
//            foreignField: '_id',
//            as: 'research_project'
//        }
//    },
//    {
//        $unwind: {
//            path: '$research_project',
//            preserveNullAndEmptyArrays: false
//        }
//    },
//    {
//        $lookup: {
//            from: 'department',
//            localField: 'professor.department_id',
//            foreignField: '_id',
//            as: 'department'
//        }
//    },
//    {
//        $unwind: {
//            path: '$department',
//            preserveNullAndEmptyArrays: false
//        }
//    },
//    { '$match': { 'department.Name': 'Mechanical Electrical & Process Engineering' } },
//    {
//        '$group': {
//            _id: null, array: {
//                $addToSet: {
//                    "prof_name": "$professor.Name",
//                    "research_project_name": "$research_project.Name",
//                    "research_project_filed": "$research_project.Field"
//                }
//            }
//        }
//    },
//    {
//        $unwind: {
//            path: '$array',
//            preserveNullAndEmptyArrays: false
//        }
//    },
//    { '$set': { 'Professor_Name': '$array.prof_name' } },
//    { '$set': { 'Research_Project_Name': '$array.research_project_name' } },
//    { '$set': { 'Research_Project_Field': '$array.research_project_filed' } },
//    { '$project': { 'Professor_Name': 1, 'Research_Project_Name': 1, 'Research_Project_Field': 1, _id: 0 } },
//] 
//)
//

db.getCollection("professor_research").aggregate([
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
    {
        $lookup: {
            from: 'department',
            localField: 'professor.department_id',
            foreignField: '_id',
            as: 'department'
        }
    },
    {
        $unwind: {
            path: '$department',
            preserveNullAndEmptyArrays: false
        }
    },
    { '$match': { 'department.Name': 'Mechanical Electrical & Process Engineering' } },
    {
        $lookup: {
            from: 'research_project',
            localField: 'research_project_id',
            foreignField: '_id',
            as: 'research_project'
        }
    },
    {
        $unwind: {
            path: '$research_project',
            preserveNullAndEmptyArrays: false
        }
    },
    {
        '$group': {
            _id: "professor._id", array: {
                $addToSet: {
                    "prof_name": "$professor.Name",
                    "research_project_name": "$research_project.Name",
                    "research_project_filed": "$research_project.Field"
                }
            }
        }
    },
    {
        $unwind: {
            path: '$array',
            preserveNullAndEmptyArrays: false
        }
    },
    { '$set': { 'Professor_Name': '$array.prof_name' } },
    { '$set': { 'Research_Project_Name': '$array.research_project_name' } },
    { '$set': { 'Research_Project_Field': '$array.research_project_filed' } },
    { '$project': { 'Professor_Name': 1, 'Research_Project_Name': 1, 'Research_Project_Field': 1, _id: 0 } },
])
