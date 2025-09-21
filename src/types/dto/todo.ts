export interface TodoDTO {
    /** 标题 */
    title: string;
    /** 详细内容 */
    content?: string | null;
    /** 优先级等级，1~4 */
    task_level: number;
    /** 到期时间 */
    expiration?: Date | string | null;
}