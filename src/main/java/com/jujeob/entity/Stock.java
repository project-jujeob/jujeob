package com.jujeob.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Table(name="stock")
@EntityListeners(AuditingEntityListener.class)
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Stock {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer stockId;

    @Column(name ="productno", nullable = false)
    private Integer productNo;

    @Column(nullable = false)
    private int quantity;

    @Version
    private int version;

    // 재고 차감 메소드 추가
    public boolean decreaseStock(int quantityToDecrease) {
        if (quantity >= quantityToDecrease) {
            quantity -= quantityToDecrease;
            return true; // 재고가 충분하여 차감 가능
        }
        return false; // 재고가 부족하여 차감 불가능
    }


    public void increaseStock(int quantityToIncrease) {
        this.quantity += quantityToIncrease;
    }
}
