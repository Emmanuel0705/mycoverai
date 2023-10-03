import {
  Model,
  Column,
  PrimaryKey,
  AutoIncrement,
  Table,
  DataType,
} from 'sequelize-typescript';

export enum UserRole {
  Customer = 'Customer',
  Distributor = 'Distributor',
  Provider = 'Provider',
  Admin = 'Admin',
}

@Table({ modelName: 'Users' })
export class User extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({
    type: DataType.ENUM(...Object.values(UserRole)),
    allowNull: false,
  })
  role: UserRole;

  @Column({ type: DataType.DATE })
  lastPolicyPurchaseDate: Date;
}

export const userProviders = [
  {
    provide: 'USERS_REPOSITORY',
    useValue: User,
  },
];
