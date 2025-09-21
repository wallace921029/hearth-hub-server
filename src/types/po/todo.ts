export interface Todo {
    /** 待办事项ID，主键，自增 */
    id: number;
    /** 标题 */
    title: string;
    /** 详细内容 */
    content?: string | null;
    /** 优先级等级，1~4 */
    task_level: number;
    /** 到期时间 */
    expiration?: Date | string | null;
    /** 状态：0=未完成，1=已完成 */
    task_status: number;
    /** 创建时间 */
    created_at?: Date | string | null;
    /** 最后更新时间 */
    updated_at?: Date | string | null;
}