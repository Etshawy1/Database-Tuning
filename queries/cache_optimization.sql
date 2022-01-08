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
 *  comments: before using cache run the query twice and notice time doesn't change                                 
 */

SET SESSION query_cache_type = OFF;
DO SLEEP(1);

SET @@profiling = 0;
SET @@profiling_history_size = 0;
SET @@profiling_history_size = 100; 
SET @@profiling = 1;

use optimized_university_hundred_thousand;
select SQL_NO_CACHE
	distinct p.Name, rp.Name, rp.Field
from
	department d
join professor p on
	p.department_id = d.ID
join professor_research pr on
	pr.professor_id = p.ID
join research_project rp on
	rp.ID = pr.research_project_id
where d.Name = 'Mechanical Electrical & Process Engineering';
  
show profiles;

SET @@profiling = 0;
SET @@profiling_history_size = 0;
SET @@profiling_history_size = 100; 
SET @@profiling = 1;

use optimized_university_hundred_thousand;
select SQL_NO_CACHE
	distinct p.Name, rp.Name, rp.Field
from
	department d
join professor p on
	p.department_id = d.ID
join professor_research pr on
	pr.professor_id = p.ID
join research_project rp on
	rp.ID = pr.research_project_id
where d.Name = 'Mechanical Electrical & Process Engineering';
  
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
 *  comments: notice significant time improvment when cache is used    
 */

SET SESSION query_cache_type = ON;
DO SLEEP(1);

SET @@profiling = 0;
SET @@profiling_history_size = 0;
SET @@profiling_history_size = 100; 
SET @@profiling = 1;

use optimized_university_hundred_thousand;
select
	distinct p.Name, rp.Name, rp.Field
from
	department d
join professor p on
	p.department_id = d.ID
join professor_research pr on
	pr.professor_id = p.ID
join research_project rp on
	rp.ID = pr.research_project_id
where d.Name = 'Mechanical Electrical & Process Engineering';
  
show profiles;
