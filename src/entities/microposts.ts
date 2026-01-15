import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity()
export class MicroPost {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column()
  user_id: number;

  @Column({ type: 'uuid', default: () => 'uuid_generate_v4()' })
  user_uuid: string;

  @Column()
  content: string;

  @CreateDateColumn()
  readonly created_at?: Date;

  @UpdateDateColumn()
  readonly updated_at?: Date;

  @DeleteDateColumn()
  readonly deleted_at?: Date;
}
