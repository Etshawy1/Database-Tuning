#!/bin/bash
schema_name=university
db_username=root
db_passwrod=root
db_port=3306

# get table names in the provided schema
table_names_meta=$(echo "SELECT table_name FROM information_schema.TABLES where TABLE_SCHEMA='$schema_name'"| mysqlsh --sql --uri=$db_username@localhost:$db_port --password=$db_passwrod)
readarray -t table_names <<<"$table_names_meta"
unset 'table_names[0]'

# clear the collections first
mongo --eval "use $schema_name;"
for table in "${table_names[@]}"
do 
  mongo --eval "db.$table.deleteMany({});" $schema_name
done

# import data from the json files
for table in "${table_names[@]}" 
do 
  mongoimport --db $schema_name --collection $table --file ./data/$table.json
done

