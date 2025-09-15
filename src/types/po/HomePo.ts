/** 家庭信息表 */
export interface HomePo {
    /** 家庭ID，主键，自增 */
    id: bigint; // 如果前端/JSON 处理大整数可能丢精度，可以改为 string
    /** 家庭名称，唯一 */
    family_name: string;
    /** 家庭颜色标识，可以是hex、rgb、rgba或颜色单词 */
    family_color?: string | null;
    /** 家庭描述 */
    description?: string | null;
    /** 创建时间 */
    created_at?: Date | null;
    /** 最后更新时间 */
    updated_at?: Date | null;
}