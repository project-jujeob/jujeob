package com.jujeob.dto;

import com.jujeob.entity.Member;
import com.jujeob.service.CustomMemberDetailInterface;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Optional;

public class CustomMemberDetailDto implements UserDetails, CustomMemberDetailInterface {

    private final Optional<Member> member;

    public CustomMemberDetailDto(Optional<Member> member) {this.member = member;}

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        Collection<GrantedAuthority> collection = new ArrayList<>();
        collection.add(new GrantedAuthority() {
            @Override
            public String getAuthority() {
                return member.get().getMemRole();
            }
        });
        return  collection;
    }

    @Override
    public String getPassword() {return member.get().getMemPw();}

    @Override
    public Long getNo() {return member.get().getMemNo();}

    @Override
    public String getUsername() {return member.get().getMemId();}

    @Override
    public String getNickname() {return member.get().getMemNickname();}

    @Override
    public String getName() {return member.get().getMemName();}

    @Override
    public String getEmail() {return member.get().getMemEmail();}

    @Override
    public String getPhone() {return member.get().getMemPhone();}

    @Override
    public String getAddr() {return member.get().getMemAddr();}


    // 계정 만료 여부(true: 만료안됨)
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    // 계정 잠금 여부(true: 안잠김)
    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    // 계정 password 만료 여부(true: 만료안됨)
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    // 계정 사용 가능 여부(true: 사용 가능)
    @Override
    public boolean isEnabled() {
        return true;
    }
}