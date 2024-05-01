package com.jujeob.entity;

public enum PaymentMethod {
    CARD("Card Payment"),
    MOBILE("Mobile Payment"),
    BANK("Bank Transfer");

    private final String paymentName;

    PaymentMethod(String paymentName){
        this.paymentName = paymentName;
    }

    public String getDisplayName(){
        return paymentName;
    }

}