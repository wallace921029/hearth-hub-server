export interface UserPO {
  /** User ID, primary key, auto-increment */
  id?: number;
  /** Username, unique */
  username?: string;
  /** Password (encrypted string) */
  encryptedPassword?: string;
  /** User nickname */
  nickname?: string | null;
  /** Disabled status: 0=normal, 1=disabled */
  disabledStatus?: 0 | 1;
  /** User email, can be empty */
  email?: string | null;
  /** Phone number, can be empty */
  phone?: string | null;
  /** Creation time */
  createdAt?: Date | null;
  /** Last update time */
  updatedAt?: Date | null;
}
