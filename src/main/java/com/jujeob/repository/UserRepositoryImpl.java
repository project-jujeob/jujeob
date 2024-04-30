package com.jujeob.repository;

import com.jujeob.entity.QUser;
import com.jujeob.entity.User;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Log4j2
@Repository
@RequiredArgsConstructor
public class UserRepositoryImpl implements UserRepositoryCustom {
    private final JPAQueryFactory queryFactory;

    @Override
    public List<User> findAllBySearchTypeAndKeyword(String searchType, String keyword) {
        QUser qUser = QUser.user;
        BooleanBuilder builder = new BooleanBuilder();

        if (keyword != null && !keyword.isEmpty()) {
            switch (searchType) {
                case "userId":
                    builder.and(qUser.userId.containsIgnoreCase(keyword));
                    break;
                case "userName":
                    builder.and(qUser.name.containsIgnoreCase(keyword));
                    break;
                case "nickname":
                    builder.and(qUser.nickname.containsIgnoreCase(keyword));
                    break;
                case "phone":
                    builder.and(qUser.phone.containsIgnoreCase(keyword));
                    break;
            }
        }
        return queryFactory
                .selectFrom(qUser)
                .where(builder)
                .fetch();
    }
}
