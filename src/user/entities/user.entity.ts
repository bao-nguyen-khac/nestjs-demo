import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'user' })
export class UserEntity {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'id',
  })
  id: number;

  @Column({
    nullable: false,
  })
  username: string;

  @Column({
    nullable: false,
  })
  password: string;

  @Column({
    nullable: true,
    default: '',
  })
  email: string;

  @Column({
    nullable: true,
  })
  refreshToken: string;
}
