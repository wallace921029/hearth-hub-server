/** 待办事项表 */
export interface TodoPO {
    /** 待办事项ID，主键，自增 */
    id: bigint; // 如果前端/JSON 处理大整数可能丢精度，可以改为 string
    /** 标题 */
    title: string;
    /** 详细内容 */
    content?: string | null;
    /** 优先级等级，1~4 */
    task_level: 1 | 2 | 3 | 4;
    /** 到期时间 */
    expiration?: Date | null;
    /** 状态：0=未完成，1=已完成 */
    task_status: 0 | 1;
    /** 创建时间 */
    created_at?: Date | null;
    /** 最后更新时间 */
    updated_at?: Date | null;
}