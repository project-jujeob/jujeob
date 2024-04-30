package com.jujeob.entity;

import static com.QUerydsl.core.types.PathMetadataFactory.*;

import com.QUerydsl.core.types.dsl.*;

import com.QUerydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.QUerydsl.core.types.Path;


/**
 * QMember is a Querydsl Query type for Member
 */
@Generated("com.QUerydsl.codegen.DefaultEntitySerializer")
public class QUser extends EntityPathBase<User> {

    private static final long serialVersionUID = 2024516701L;

    public static final QUser user = new QUser("user1");

    public final DateTimePath<java.time.LocalDateTime> createDate = createDateTime("createDate", java.time.LocalDateTime.class);

    public final DateTimePath<java.time.LocalDateTime> deleteDate = createDateTime("deleteDate", java.time.LocalDateTime.class);

    public final StringPath address = createString("address");

    public final StringPath deleted = createString("deleted");

    public final StringPath email = createString("email");

    public final StringPath userId = createString("userId");

    public final StringPath profileImage = createString("profileImage");

    public final StringPath name = createString("name");

    public final StringPath nickname = createString("nickname");

    public final NumberPath<Long> userNo = createNumber("userNo", Long.class);

    public final StringPath phone = createString("phone");

    public final StringPath password = createString("password");

//    public final RolePath role = createString("role");

    public final StringPath<Role> role = createString("role");

    public final DateTimePath<java.time.LocalDateTime> updateDate = createDateTime("updateDate", java.time.LocalDateTime.class);

    public QUser(String variable) {
        super(User.class, forVariable(variable));
    }

    public QUser(Path<? extends user> path) {
        super(path.getType(), path.getMetadata());
    }

    public QUser(PathMetadata metadata) {
        super(user.class, metadata);
    }

}

