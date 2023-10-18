package com.joaco.restaurantflowserver.model;

import org.hibernate.annotations.GenericGenerator;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "payment_methods")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PaymentMethod {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "native")
    @GenericGenerator(name = "native", strategy = "native")
    private int id;

    @Column(name = "full_name")
    private String fullName;

    @Column(name = "expiration_date")
    private String expirationDate;

    @Column(name = "card_type")
    private String cardType;

    private String company;

    @Column(name = "card_number")
    private String cardNumber;

    @Column(name = "security_code")
    private String securityCode;

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + id;
        result = prime * result + ((fullName == null) ? 0 : fullName.hashCode());
        result = prime * result + ((expirationDate == null) ? 0 : expirationDate.hashCode());
        result = prime * result + ((cardType == null) ? 0 : cardType.hashCode());
        result = prime * result + ((company == null) ? 0 : company.hashCode());
        result = prime * result + ((cardNumber == null) ? 0 : cardNumber.hashCode());
        result = prime * result + ((securityCode == null) ? 0 : securityCode.hashCode());
        return result;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        PaymentMethod other = (PaymentMethod) obj;
        if (id != other.id)
            return false;
        if (fullName == null) {
            if (other.fullName != null)
                return false;
        } else if (!fullName.equals(other.fullName))
            return false;
        if (expirationDate == null) {
            if (other.expirationDate != null)
                return false;
        } else if (!expirationDate.equals(other.expirationDate))
            return false;
        if (cardType == null) {
            if (other.cardType != null)
                return false;
        } else if (!cardType.equals(other.cardType))
            return false;
        if (company == null) {
            if (other.company != null)
                return false;
        } else if (!company.equals(other.company))
            return false;
        if (cardNumber == null) {
            if (other.cardNumber != null)
                return false;
        } else if (!cardNumber.equals(other.cardNumber))
            return false;
        if (securityCode == null) {
            if (other.securityCode != null)
                return false;
        } else if (!securityCode.equals(other.securityCode))
            return false;
        return true;
    }

}
