export interface SignUpDTO {
    /** 用户名，唯一 */
    username: string;
    /** 密码 */
    password: string;
    /** 用户昵称 */
    nickname?: string;
    /** 禁用状态：0=正常，1=禁用 */
    disabled_status: number;
    /** 用户邮箱，可为空 */
    email?: string;
    /** 手机号，可为空 */
    phone?: string;
    /** 创建时间 */
    created_at?: Date;
    /** 最后更新时间 */
    updated_at?: Date;
}

export interface SignInDTO {
    /** 用户名，唯一 */
    username: string;
    /** 密码 */
    password: string;
}