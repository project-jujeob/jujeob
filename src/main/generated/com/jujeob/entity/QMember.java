//package com.jujeob.entity;
//
//import static com.querydsl.core.types.PathMetadataFactory.*;
//
//import com.querydsl.core.types.dsl.*;
//
//import com.querydsl.core.types.PathMetadata;
//import javax.annotation.processing.Generated;
//import com.querydsl.core.types.Path;
//
//
///**
// * QMember is a Querydsl query type for Member
// */
//@Generated("com.querydsl.codegen.DefaultEntitySerializer")
//public class QMember extends EntityPathBase<Member> {
//
//    private static final long serialVersionUID = 2024516701L;
//
//    public static final QMember member = new QMember("member1");
//
//    public final DateTimePath<java.time.LocalDateTime> createDate = createDateTime("createDate", java.time.LocalDateTime.class);
//
//    public final DateTimePath<java.time.LocalDateTime> deleteDate = createDateTime("deleteDate", java.time.LocalDateTime.class);
//
//    public final StringPath memAddr = createString("memAddr");
//
//    public final StringPath memDeleted = createString("memDeleted");
//
//    public final StringPath memEmail = createString("memEmail");
//
//    public final StringPath memId = createString("memId");
//
//    public final StringPath memImage = createString("memImage");
//
//    public final StringPath memName = createString("memName");
//
//    public final StringPath memNickname = createString("memNickname");
//
//    public final NumberPath<Long> memNo = createNumber("memNo", Long.class);
//
//    public final StringPath memPhone = createString("memPhone");
//
//    public final StringPath memPw = createString("memPw");
//
//    public final StringPath memRole = createString("memRole");
//
//    public final DateTimePath<java.time.LocalDateTime> updateDate = createDateTime("updateDate", java.time.LocalDateTime.class);
//
//    public QMember(String variable) {
//        super(Member.class, forVariable(variable));
//    }
//
//    public QMember(Path<? extends Member> path) {
//        super(path.getType(), path.getMetadata());
//    }
//
//    public QMember(PathMetadata metadata) {
//        super(Member.class, metadata);
//    }
//
//}

