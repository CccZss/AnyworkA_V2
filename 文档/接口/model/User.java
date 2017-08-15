package com.qg.AnyWork.model;

/**
 * 用户实体
 * Created by FunriLy on 2017/7/10.
 * From small beginnings comes great things.
 */
public class User {

    private int userId;         //id
    private String userName;    //昵称
    private String email;       //邮箱
    private String password;    //密码
    private String phone;       //手机
    private int mark;           //标志，区分是学生还是教师, 0学生，1老师

    public User(){

    }

    //get & set

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public int getMark() {
        return mark;
    }

    public void setMark(int mark) {
        this.mark = mark;
    }

    // toString

    @Override
    public String toString() {
        return "User{" +
                "userId=" + userId +
                ", userName='" + userName + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", phone='" + phone + '\'' +
                ", mark=" + mark +
                '}';
    }
}
