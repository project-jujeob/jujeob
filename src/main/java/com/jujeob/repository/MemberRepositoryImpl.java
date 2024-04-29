package com.jujeob.repository;

import com.jujeob.dto.GetMemberDto;
import com.jujeob.entity.Member;
import com.jujeob.entity.QMember;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.stream.Collectors;

@Log4j2
@Repository
@RequiredArgsConstructor
public class MemberRepositoryImpl implements MemberRepositoryCustom {
    private final JPAQueryFactory queryFactory;

    @Override
    public List<Member> findAllBySearchTypeAndKeyword(String searchType, String keyword) {
        QMember qMember = QMember.member;
        BooleanBuilder builder = new BooleanBuilder();

        if (keyword != null && !keyword.isEmpty()) {
            switch (searchType) {
                case "userId":
                    builder.and(qMember.memId.containsIgnoreCase(keyword));
                    break;
                case "userName":
                    builder.and(qMember.memName.containsIgnoreCase(keyword));
                    break;
                case "nickname":
                    builder.and(qMember.memNickname.containsIgnoreCase(keyword));
                    break;
                case "phone":
                    builder.and(qMember.memPhone.containsIgnoreCase(keyword));
                    break;
            }
        }
        return queryFactory
                .selectFrom(qMember)
                .where(builder)
                .fetch();
    }
}
