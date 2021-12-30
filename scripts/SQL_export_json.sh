#!/bin/bash
schema_name=university
db_username=root
db_passwrod=root
db_port=3306

# get table names in the provided schema
table_names_meta=$(echo "SELECT table_name FROM information_schema.TABLES where TABLE_SCHEMA='$schema_name'"| mysqlsh --sql --uri=$db_username@localhost:$db_port --password=$db_passwrod)
readarray -t table_names <<<"$table_names_meta"
unset 'table_names[0]'

# export data from each table to json files
for t in "${table_names[@]}"
do
  echo "Exporting table $t as json..."
  echo select *, ID as _id from "$t"| mysqlsh --sql --result-format=json --uri=$db_username@localhost:$db_port/$schema_name --password=$db_passwrod > ./data/"$t".json
done

echo "Done exporting data to json"