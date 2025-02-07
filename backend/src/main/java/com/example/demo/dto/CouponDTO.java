package com.example.demo.dto;

import com.example.demo.model.Coupon;
import com.example.demo.model.Word;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CouponDTO {
    private int id;
    private String code;
    private int value;
    private int isExpired;
    public CouponDTO(Coupon coupon){
        this.id = coupon.getId();
        this.code = coupon.getCode();
        this.value = coupon.getValue();
        this.isExpired = coupon.getIsExpired();
    }
}