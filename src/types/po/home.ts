/** Family Information Table */
export interface HomePo {
  /** Family ID, primary key, auto-increment */
  id?: number;
  /** Family name, unique */
  familyName?: string;
  /** Family color identifier, can be hex, rgb, rgba or color word */
  familyColor?: string | null;
  /** Family description */
  description?: string | null;
  /** Creation time */
  createdAt?: Date | null;
  /** Last update time */
  updatedAt?: Date | null;
}
