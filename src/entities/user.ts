import {
        Entity,
        Column,
        PrimaryGeneratedColumn,
        CreateDateColumn,
        UpdateDateColumn,
        Generated
} from 'typeorm'

@Entity()
export class User {
        @PrimaryGeneratedColumn()
        readonly id: number;

        @Column({ type: 'uuid', unique: true })
        @Generated('uuid')
        uuid: string;

        @Column('varchar')
        name: string;

        @Column('varchar')
        hash: string;

        @Column('varchar')
        umail: string;

        @CreateDateColumn()
        readonly created_at?: Date;

        @UpdateDateColumn()
        readonly updated_at?: Date;
}