package com.company.多态;
/*
需求：
电脑运行实例，
电脑运行基于主板
 */
interface PCI
{
    public void open();
    public void close();

}
class MainBoard
{
    public void run()
    {
        System.out.println("mainboard run");
    }
    public void usePCI(PCI p)
    {
        p.close();
        p.open();
    }
}
class NetCard implements PCI
{
    public void open()
    {
        System.out.println("netcard open");
    }
    public void close()
    {
        System.out.println("netcard close");
    }
}
public class 多态的主板示例
{
    public static void main(String args[])
    {
        MainBoard mb = new MainBoard();
        mb.run();
        mb.usePCI(new NetCard());
    }
}

/*
class MainBoard
{
    public void run()
    {
        System.out.println("mainboard run");
    }
    public void useNetCard(NetCard c)
    {
        c.open();
        c.close();
    }
}
class NetCard
{
    public void open()
    {
        System.out.println("netcard open");
    }
    public void close()
    {
        System.out.println("netcard close");
    }
}
public class 多态的主板示例
{
    public static void main(String args[])
    {
        MainBoard mb = new MainBoard();
        mb.run();
        mb.useNetCard(new NetCard());
    }
}

 */

