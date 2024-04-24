package com.jujeob.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "orderitem")
@EntityListeners(AuditingEntityListener.class)
public class OrderItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long orderItemId;

    @ManyToOne
    @JoinColumn(name = "order_id")
    private CustomerOrder customerOrder;

   /* @ManyToOne // 수정
    @JoinColumn(name = "productno", referencedColumnName = "productno") // 수정
    private Product product; // 수정*/

    private Long productNo;
    private int quantity;
    private double price;

}
