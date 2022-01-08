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
 *  comments: rewrite the same query to get better performance                              
 */

SET SESSION query_cache_type = OFF;
DO SLEEP(1);

SET @@profiling = 0;
SET @@profiling_history_size = 0;
SET @@profiling_history_size = 100; 
SET @@profiling = 1;

use optimized_university_hundred_thousand;
create index index_student_name using HASH  ON student(Name);
create index index_city using HASH  ON student(City);

select
	distinct s.ID, s.Name, s.City
from
(
(select s2.ID, s2.Name, s2.City from student s2 use index(index_student_name) where s2.Name = "Demond Valentine")
union 
(select s3.ID, s3.Name, s3.City from student s3 use index(index_city) where s3.City = "Miami")
) as s;
show profiles;

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
 *  comments: notice significant time improvment after using or instead of union
 */


SET @@profiling = 0;
SET @@profiling_history_size = 0;
SET @@profiling_history_size = 100; 
SET @@profiling = 1;

use optimized_university_hundred_thousand;
select
	distinct s.ID, s.Name, s.City
from
	student s use index(index_student_name, index_city)
where
	(s.Name = "Demond Valentine"
	or s.City = "Miami");
show profiles;



DROP INDEX index_student_name ON student;
DROP INDEX index_city ON student;