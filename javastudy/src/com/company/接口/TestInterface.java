package com.company.接口;

public class TestInterface {
    public static void main(String args[]){
        PetCarer pc = new Worker();
        pc.feed();
    }
}

interface PetCarer {
    void feed();
    void playWithPet();
}

class Worker implements PetCarer {
    public void feed() {
        System.out.println("Worker feed ... ");
    }
    public void playWithPet() {
        System.out.println("Worker play with pet ... ");
    }
}


