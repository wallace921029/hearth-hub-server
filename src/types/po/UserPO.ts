export interface UserPO {
    /** 用户ID，主键，自增 */
    id: bigint; // 如果在 JS/TS 中处理大整数，可以用 `bigint` 或 `string`，取决于你如何处理
    /** 用户名，唯一 */
    username: string;
    /** 密码（加密后的字符串） */
    encrypted_password: string;
    /** 用户昵称 */
    nickname?: string | null;
    /** 禁用状态：0=正常，1=禁用 */
    disabled_status: 0 | 1;
    /** 用户邮箱，可为空 */
    email?: string | null;
    /** 手机号，可为空 */
    phone?: string | null;
    /** 创建时间 */
    created_at?: Date | null;
    /** 最后更新时间 */
    updated_at?: Date | null;
}