package com.company.方法的重载;

public class TestOverload {
    public static void main(String args[]){
    Person p=new Person();
    Person p1=new Person(400);
    //Person p2=new Person(2,500);
        p.info();
        p.info("ok");
    }

}
class Person{
    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    private int id;
    private int age;
    /*
    构造方法的重载
     */
    Person(){
        id =100;
        age=20;
    }
    Person(int _id){
        id=_id;
        age=30;
    }
    Person(int _id,int _age){
        id=_id;
        age=_age;
    }
    void info(){
        System.out.println("my id is"+id);
    }
    void info(String t){
        System.out.println(t+"id"+id);
    }
}