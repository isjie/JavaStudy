package com.company.多态;

public class Test
{
    public static void main(String args[]){
        Cat c=new Cat("catname","blue");
        Lady l1= new Lady("l1",c);
        l1.myPetEnjoy();
        Dog d=new Dog("dogname","black");
        Lady l2=new Lady("l2",d);
        l2.myPetEnjoy();
    }
}
class Animal{
    private String name;
    Animal(String name){
        this.name=name;
    }
    public void enjoy(){
        System.out.println("叫声。。。。");
    }
}
class Cat extends Animal{
    private String eyeColor;
    Cat(String n,String c){
        super(n);
        eyeColor=c;
    }
    public void enjoy(){
        System.out.println("猫叫声。。。");
    }
}
class Dog extends Animal{
    private String furColor;
    Dog(String n,String c){
        super(n);
        furColor=c;
    }
    public void enjoy(){
        System.out.println("狗叫声。。。");
    }
}
class Lady{
    private String name;
    private Animal pet;
    Lady(String name,Animal pet){
        this.name=name;this.pet=pet;
    }
    public void myPetEnjoy(){pet.enjoy();}
}