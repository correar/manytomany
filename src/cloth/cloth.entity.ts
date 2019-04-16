import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity('cloth')
export class Cloth {
 @PrimaryGeneratedColumn({
 type: 'int',
 name: 'id',
 })
id: number;

@Column('varchar', {
    nullable: false,
    name: 'name',
})
name: string;

}