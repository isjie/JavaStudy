package ThreadVersion;

import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.WindowAdapter;
import java.awt.event.WindowEvent;
import java.io.DataOutputStream;
import java.io.IOException;
import java.net.Socket;
import java.net.UnknownHostException;

/**
 * WindowAdapter是个抽象类，里面对接口WindowListener的方法都进行了空实现。
 * 这样编程时不需要自己再去实现全部接口WindowListener里的方法。只需覆写自己需要的方法，其他的方法
 * WindowAdapter都实现了。
 */
public class ChatClientThread extends Frame {
    Socket s = null;
    DataOutputStream dos =null;

    TextField tfTxt = new TextField();
    TextArea taContent = new TextArea();

//    public static void main(String args[]){
//        new ChatClientThread().launchFrame();
//    }

//    public void launchFrame(){
//        setLocation(400,300);
//        this.setSize(300,300);
//        add(tfTxt,BorderLayout.SOUTH);
//        add(taContent,BorderLayout.NORTH);
//        pack();
//
//
//        this.addWindowListener(
//                new WindowAdapter() {
//                    @Override
//                    public void windowClosing(WindowEvent e) {
//                        disconnect();//关闭窗口时，关闭连接
//                        System.exit(0);
//                    }
//                }
//        );
//
//        tfTxt.addActionListener(new TFListener());
//        setVisible(true);
//        connect();
//    }


//    public void connect(){
//        try{
//            s = new Socket("127.0.0.1",8888);
//            dos = new DataOutputStream(s.getOutputStream());
//            System.out.println("connected");
//        }catch (UnknownHostException e) {
//            e.printStackTrace();
//        }catch (IOException e) {
//            e.printStackTrace();
//        }
//    }

    /**
     * 一端退出，但退出时并未关闭该连接，另一端如果在从连接中读数据则抛出该异常（Connection reset）。
     * 简单的说就是在连接断开后的读和写操作引起的。
     */

//    public void disconnect(){
//        try {
//            dos.close();
//            s.close();
//        } catch (IOException e) {
//            e.printStackTrace();
//        }
//    }
//    private class TFListener implements ActionListener{
//        @Override
//        public void actionPerformed(ActionEvent e) {
//            String str= tfTxt.getText().trim();
//            taContent.setText(str);
//            tfTxt.setText("");
//
//            try{
//
//                dos.writeUTF(str);
//                dos.flush();
////                dos.close();
//            }catch (IOException e1) {
//                e1.printStackTrace();
//            }
//
//        }
//    }

}
