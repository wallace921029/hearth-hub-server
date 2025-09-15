CREATE
DATABASE
IF NOT EXISTS family CHARACTER
	SET utf8mb4 COLLATE utf8mb4_general_ci;
CREATE TABLE
    IF NOT EXISTS family.users
(
    id
    BIGINT
    AUTO_INCREMENT
    PRIMARY
    KEY
    COMMENT
    '用户ID，主键，自增',
    username
    VARCHAR
(
    100
) NOT NULL UNIQUE COMMENT '用户名，唯一',
    encrypted_password VARCHAR
(
    255
) NOT NULL COMMENT '密码（加密后的字符串）',
    nickname VARCHAR
(
    100
) NULL COMMENT '用户昵称',
    disabled_status TINYINT
(
    1
) NOT NULL DEFAULT 0 COMMENT '禁用状态：0=正常，1=禁用',
    email VARCHAR
(
    255
) NULL UNIQUE COMMENT '用户邮箱，可为空',
    phone VARCHAR
(
    20
) NULL UNIQUE COMMENT '手机号，可为空',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '最后更新时间'
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COMMENT = '用户表';
CREATE TABLE
    IF NOT EXISTS family.todos
(
    id
    BIGINT
    AUTO_INCREMENT
    PRIMARY
    KEY
    COMMENT
    '待办事项ID，主键，自增',
    title
    VARCHAR
(
    200
) NOT NULL COMMENT '标题',
    content TEXT NULL COMMENT '详细内容',
    task_level TINYINT NOT NULL DEFAULT 1 COMMENT '优先级等级，1~4',
    expiration DATETIME NULL COMMENT '到期时间',
    task_status TINYINT NOT NULL DEFAULT 0 COMMENT '状态：0=未完成，1=已完成',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '最后更新时间'
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COMMENT = '待办事项表';
CREATE TABLE
    IF NOT EXISTS family.homes
(
    id
    BIGINT
    AUTO_INCREMENT
    PRIMARY
    KEY
    COMMENT
    '家庭ID，主键，自增',
    family_name
    VARCHAR
(
    200
) NOT NULL UNIQUE COMMENT '家庭名称，唯一',
    family_color VARCHAR
(
    50
) NULL COMMENT '家庭颜色标识，可以是hex、rgb、rgba或颜色单词',
    description TEXT NULL COMMENT '家庭描述',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '最后更新时间'
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COMMENT = '家庭信息表';