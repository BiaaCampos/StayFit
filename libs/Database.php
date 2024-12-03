<?php


class Database extends PDO
{

    public function __construct()
    {
        $DB_TYPE="mysql";
        $DB_HOST="localhost:3306";
        $DB_NAME="stayfit";
        $DB_USER="root";    
        $DB_PASS="";
        try{
            $dsn= "$DB_TYPE:host=$DB_HOST;dbname=$DB_NAME";

            parent::__construct($dsn, $DB_USER, $DB_PASS,array(PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8'));

            parent::setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            parent::setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
        }
        catch(Exception $e){

            print_r($e);
        }

    }

    public function select($sql, $array = array(), $fetchMode = PDO::FETCH_OBJ)
    {

        $sth = $this->prepare($sql);
        foreach ($array as $key => $value) {
            $sth->bindValue("$key",$value);
        }

        $sth->execute();
        return $sth->fetchAll($fetchMode);
    }

    public function insert($table, $data)
    {
        ksort($data);

        $fieldNames = implode('`, `', array_keys($data));
        $fieldValues = ':' . implode(', :', array_keys($data));


        $sth = $this->prepare("INSERT INTO $table (`$fieldNames`) VALUES ($fieldValues)");

        foreach ($data as $key => $value) {
            $sth->bindValue(":$key", $value);
        }
        $sth->execute();
        return Database::lastInsertId();
    }

    public function update($table, $data, $where)
    {
        ksort($data);

        $fieldDetails = NULL;
        foreach($data as $key=> $value) {
            $fieldDetails .= "`$key`=:$key,";
        }
        $fieldDetails = rtrim($fieldDetails, ',');

        $sth = $this->prepare("UPDATE $table SET $fieldDetails WHERE $where");

        foreach ($data as $key => $value) {
            $sth->bindValue(":$key", $value);
        }
        $sth->execute();

        if ($sth->execute()) {
            return true;
        }
    }

    public function delete($table, $where, $limit = 1)
    {
        return $this->exec("DELETE FROM $table WHERE $where");
    }


}
