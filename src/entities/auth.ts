import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Auth {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column()
  user_id: number;

  @Column({ type: 'uuid', default: () => 'uuid_generate_v4()' })
  user_uuid: string;

  @Column('varchar')
  token: string;

  @Column()
  expire_at: Date;

  @CreateDateColumn()
  readonly created_at?: Date;

  @UpdateDateColumn()
  readonly updated_at?: Date;
}
