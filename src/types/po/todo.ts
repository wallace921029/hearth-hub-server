export interface TodoPO {
  /** Todo item ID, primary key, auto-increment */
  id?: number;
  /** Title */
  title?: string;
  /** Detailed content */
  content?: string | null;
  /** Priority level, 1~4 */
  taskLevel?: number;
  /** Expiration time */
  expiration?: Date | string | null;
  /** Status: 0=unfinished, 1=completed */
  taskStatus?: number;
  /** Creation time */
  createdAt?: Date | string | null;
  /** Last update time */
  updatedAt?: Date | string | null;
}
