package com.java1234.util;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DbUtil {


    private String dbUrl="jdbc:mysql://localhost:3306/db_studentInfo";
    private String jdbcName = "com.mysql.jdbc.Driver";
    private String dbUserName="root";
    private String dbPassword="rootroot";

    /**
     * 获取数据库连接
     * @return
     * @throws ClassNotFoundException
     * @throws SQLException
     */
    public Connection getCon() throws ClassNotFoundException, SQLException {
            Class.forName(jdbcName);
            Connection con=DriverManager.getConnection(dbUrl,dbUserName,dbPassword);
            return con;
    }

    public void closeCon(Connection con) throws SQLException {
        if(con !=null){
            con.close();
        }
    }

    public static void main(String[] args) {
        DbUtil dbUtil = new DbUtil();
        try {
            dbUtil.getCon();
            System.out.println("数据库连接成功");
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        } catch (SQLException e) {
            e.printStackTrace();
        }

    }
}
