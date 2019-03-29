package com.company.数组;
class Person{
    private int age;
    public void setAge(int a){
        age = a;
    }
    public int getAge(){
        return age;
    }
    void speak(){
        System.out.println(age);
    }
}
public class PersonDemo {
    public static void main(String args[]){
        Person p=new Person();
        p.setAge(-20);
        p.speak();
    }
}
